// src/pages/home/sections/ThirdSection.jsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';
import { useFadeInUp } from '../../../hooks/useFadeInUp.js';

const SKILLS = [
  'Gsap',
  'HTML',
  'Figma',
  'Photoshop',
  'GPT img',
  'Webflow',
  'Firefly',
  'Midjourney',
  'CSS',
  'Claude',
  'React',
  'Vercel',
];

const ROW_COLOR = '#1a1a1a';
const DIM_COLOR = '#d0d0d0';
const INACTIVE_OPACITY = 0.25;
const ACTIVE_OPACITY = 1;

export default function ThirdSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const mobileListRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });
  useFadeInUp(sectionRef, { trigger: sectionRef });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
  }, [resizeTick]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const list = isMobile ? mobileListRef.current : listRef.current;
    if (!list) return undefined;

    const rows = Array.from(list.querySelectorAll('.skill-row'));
    if (!rows.length) return undefined;

    // Set all skills with the same color, only opacity differs
    gsap.set(rows, { color: ROW_COLOR, opacity: INACTIVE_OPACITY });

    // Activate first skill initially
    gsap.set(rows[0], { opacity: ACTIVE_OPACITY });

    const triggerId = isMobile ? 'third-mobile' : 'third-desktop';

    // Kill any leftover triggers from a previous mount/resize
    ScrollTrigger.getById(triggerId)?.kill();
    rows.forEach((_, idx) => {
      ScrollTrigger.getById(`${triggerId}-skill-${idx}`)?.kill();
    });

    let prevIdx = 0;

    // Cache page-absolute positions (offsetTop from viewport + scrollY) once,
    // and recompute only on layout changes (onRefresh).
    // This avoids calling getBoundingClientRect() on every scroll frame, which
    // forces a layout read per row and causes jank on mobile.
    let cachedRowPositions = [];

    const cacheRowPositions = () => {
      // getBoundingClientRect is viewport-relative; add scrollY for page-absolute
      cachedRowPositions = rows.map((r) => {
        const rect = r.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          height: rect.height,
        };
      });
    };

    cacheRowPositions();

    // Pick the row whose CENTER is closest to viewport center, instead of
    // toggling each row "active" while the 50% line is anywhere between its
    // top and bottom edges. With per-row top/bottom triggers, the active row
    // could sit up to half a row-height off from viewport center — which is
    // why "Gsap" looked below the heading at the start and "Vercel" looked
    // above it at the end. Closest-to-center makes the handoff happen at the
    // midpoint between adjacent rows.
    // Uses cached positions: only window.scrollY is read per frame (no layout).
    const updateActive = () => {
      if (!cachedRowPositions.length) return;
      const pageCenter = window.scrollY + window.innerHeight / 2;
      let activeIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < cachedRowPositions.length; i++) {
        const center = cachedRowPositions[i].top + cachedRowPositions[i].height / 2;
        const dist = Math.abs(center - pageCenter);
        if (dist < minDist) {
          minDist = dist;
          activeIdx = i;
        }
      }
      if (activeIdx !== prevIdx) {
        gsap.to(rows[prevIdx], {
          opacity: INACTIVE_OPACITY,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        });
        gsap.to(rows[activeIdx], {
          opacity: ACTIVE_OPACITY,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        });
        prevIdx = activeIdx;
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: triggerId,
        trigger: list,
        start: 'top bottom',
        end: 'bottom top',
        // Desktop: onUpdate fires via GSAP's RAF ticker.
        // Mobile: native scroll listener below handles iOS momentum scroll —
        // onUpdate is kept as a fallback but native listener is more reliable.
        onUpdate: updateActive,
        onRefresh: () => {
          // Recompute cached positions on layout changes (resize, font load, etc.)
          cacheRowPositions();
          updateActive();
        },
      });
    }, sectionRef.current);

    // Mobile: add a native passive scroll listener so the highlight updates
    // during iOS momentum scroll (GSAP's onUpdate can lag behind on fast flings).
    // updateActive only reads window.scrollY (no layout reads) so it's safe.
    const mobileScrollHandler = isMobile ? updateActive : null;
    if (mobileScrollHandler) {
      window.addEventListener('scroll', mobileScrollHandler, { passive: true });
    }

    return () => {
      if (mobileScrollHandler) {
        window.removeEventListener('scroll', mobileScrollHandler);
      }
      ScrollTrigger.getById(triggerId)?.kill();
      ctx.revert();
    };
  }, [resizeTick, isMobile]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative isolate min-w-screen bg-light text-dark z-10"
    >
      {isMobile ? (
        /* Mobile: Simple scrolling list */
        <div className="flex min-h-screen w-full flex-col items-center justify-start px-6 py-[15vh] md:py-[50vh]">
          <ul
            ref={mobileListRef}
            className="m-0 flex w-full max-w-[360px] flex-col items-center text-center"
          >
            {SKILLS.map((label, i) => (
              <li
                key={`mobile-${i}`}
                className="skill-row font-urbanist font-normal leading-[1] transition-colors duration-300 py-[10px]"
                style={{ fontSize: 'clamp(2.5rem, 15vw, 4.5rem)' }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        /* Desktop: Two-column layout with sticky left heading */
        <div className="flex w-full max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Left column - Sticky heading */}
          <div className="hidden lg:block lg:w-[40%] shrink-0">
            <div className="sticky top-0 h-screen flex items-center">
              <h3 className="title-32 font-normal leading-tight">
                Different tools for
                <br /> the best result
              </h3>
            </div>
          </div>

          {/* Right column - Scrolling skill list.
              Padding is `50vh - half-row-height` so the FIRST/LAST skill's
              center (not its top) lands at viewport center — i.e. aligned
              with the heading on the left, which is centered via items-center
              in an h-screen sticky container. */}
          <div className="flex-1 pt-[calc(50vh-2.5rem)] pb-[calc(50vh-2.5rem)]">
            <ul
              ref={listRef}
              className="m-0 flex w-full flex-col"
            >
              {SKILLS.map((label, i) => (
                <li
                  key={`desktop-${i}`}
                  className="skill-row font-urbanist font-normal leading-[0.9] transition-colors duration-300 py-[10px]"
                  style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
