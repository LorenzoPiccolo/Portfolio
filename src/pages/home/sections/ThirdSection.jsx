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
  'Nano Banana',
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

    const triggers = [];
    const triggerId = isMobile ? 'third-mobile' : 'third-desktop';

    // Kill existing triggers
    rows.forEach((_, idx) => {
      ScrollTrigger.getById(`${triggerId}-skill-${idx}`)?.kill();
    });

    const ctx = gsap.context(() => {
      rows.forEach((row, idx) => {
        // Create a ScrollTrigger for each skill item
        // Each skill only handles its own activation/deactivation
        const trigger = ScrollTrigger.create({
          id: `${triggerId}-skill-${idx}`,
          trigger: row,
          start: 'top 50%', // Activate when top of skill reaches center
          end: 'bottom 50%', // Deactivate when bottom passes center
          markers: false,
          onToggle: (self) => {
            // Single callback for enter/leave in both directions
            // Only animate opacity, color stays the same
            gsap.to(row, {
              opacity: self.isActive ? ACTIVE_OPACITY : INACTIVE_OPACITY,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: true,
            });
          },
        });
        triggers.push(trigger);
      });
    }, sectionRef.current);

    return () => {
      triggers.forEach(t => t.kill());
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
            className="m-0 flex w-full max-w-[360px] flex-col items-center gap-5 text-center"
          >
            {SKILLS.map((label, i) => (
              <li
                key={`mobile-${i}`}
                className="skill-row font-urbanist font-normal leading-[1] transition-colors duration-300"
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
                Different skills for
                <br /> the best result
              </h3>
            </div>
          </div>

          {/* Right column - Scrolling skill list */}
          <div className="flex-1 py-[50vh]">
            <ul
              ref={listRef}
              className="m-0 flex w-full flex-col gap-4 lg:gap-7"
            >
              {SKILLS.map((label, i) => (
                <li
                  key={`desktop-${i}`}
                  className="skill-row font-urbanist font-normal leading-[0.9] transition-colors duration-300"
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
