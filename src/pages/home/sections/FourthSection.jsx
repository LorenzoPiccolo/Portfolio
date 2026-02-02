// src/pages/home/sections/FourthSection.jsx
import { useLayoutEffect, useRef, useMemo, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';

import { ChevronRight } from 'lucide-react';

import SelectedWorkCard from '../../../components/SelectedWorkCard.jsx';
import DynamicButton from '../../../components/DynamicButton.jsx';
import { WORKS } from '../../../data/works.js';
import { useFadeInUp } from '../../../hooks/useFadeInUp.js';

export default function FourthSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });
  useFadeInUp(sectionRef, { trigger: sectionRef });

  // Track mobile state
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

  // Desktop-only animation logic
  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // Skip all animation on mobile - just use simple column layout
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(sectionEl.querySelectorAll('[data-work-card]'));
      const cardsContainer = sectionEl.querySelector('[data-cards-container]');
      if (!cards.length) return;

      // First card visible, all others start outside viewport (below)
      cards.forEach((card, idx) => {
        gsap.set(card, {
          transformOrigin: 'center center',
          yPercent: idx === 0 ? 0 : 120, // First card visible, others hidden below
          scale: 1,
        });
      });

      const hiddenOffset = 120;
      const levelOffset = 14;

      const applyState = (progress = 0, immediate = false) => {
        const clamped = gsap.utils.clamp(0, 1, progress);
        const totalSteps = Math.max(0, cards.length - 1);
        const activeFloat = totalSteps > 0 ? clamped * totalSteps : 0;
        let activeIndex = totalSteps > 0 ? Math.floor(activeFloat) : 0;
        activeIndex = Math.min(cards.length - 1, Math.max(0, activeIndex));
        const t = totalSteps > 0 ? activeFloat - activeIndex : 0;
        const nextIndex = totalSteps > 0 ? Math.min(cards.length - 1, activeIndex + 1) : activeIndex;

        cards.forEach((card, idx) => {
          let yPercent;
          let scale;

          if (idx < activeIndex) {
            // Cards that have already passed - stack them up
            const depth = activeIndex - idx + t;
            yPercent = -levelOffset * depth;
            scale = 0.9;
          } else if (idx === activeIndex) {
            // Current active card - animate up as it becomes "previous"
            yPercent = -levelOffset * t;
            scale = 1 - 0.1 * t;
          } else if (idx === nextIndex && nextIndex !== activeIndex) {
            // Next card - start animating in from below
            yPercent = hiddenOffset * (1 - t);
            scale = 1;
          } else {
            // All other cards - stay hidden below
            yPercent = hiddenOffset;
            scale = 1;
          }

          const vars = { yPercent, scale };
          if (immediate) {
            gsap.set(card, vars);
          } else {
            gsap.to(card, { ...vars, duration: 0.4, ease: 'power2.out', overwrite: true });
          }
        });
      };

      ScrollTrigger.getById('fourth-section-works')?.kill();
      ScrollTrigger.getById('fourth-section-exit')?.kill();

      const getScrollDistance = () => {
        const cardHeight = cards[0]?.offsetHeight || window.innerHeight;
        const stepDistance = Math.max(320, Math.round(cardHeight * 0.75));
        const steps = Math.max(1, cards.length - 1);
        return stepDistance * steps;
      };

      // Main stacking animation (desktop only)
      const trigger = ScrollTrigger.create({
        id: 'fourth-section-works',
        trigger: sectionEl,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        markers: false,
        onUpdate: (self) => applyState(self.progress),
        onRefresh: (self) => applyState(self?.progress ?? 0, true),
      });

      // Exit parallax - cards move up faster as section leaves
      if (cardsContainer) {
        gsap.to(cardsContainer, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            id: 'fourth-section-exit',
            trigger: sectionEl,
            start: () => `top+=${getScrollDistance()} top`,
            end: () => `top+=${getScrollDistance() + window.innerHeight} top`,
            scrub: 1,
            invalidateOnRefresh: true,
            markers: false,
          },
        });
      }

      applyState(trigger.progress || 0, true);

    }, sectionEl);

    return () => ctx.revert();
  }, [resizeTick, isMobile]);

  const buttonScrollTrigger = useMemo(
    () => ({
      id: 'fourth-section-button',
      trigger: () => sectionRef.current,
      start: isMobile ? 'top 80%' : 'top top',
      end: isMobile ? 'bottom bottom-=20%' : 'bottom top-=800',
    }),
    [resizeTick, isMobile],
  );

  return (
    <section
      id="works"
      ref={sectionRef}
      className={`relative isolate bg-light text-dark z-10 fourthSection ${isMobile ? 'py-16 px-4' : 'section-full min-h-[700px]'
        }`}
    >
      {/* Button - fixed at bottom on mobile, absolute bottom on desktop */}
      <div className={`z-20 transition-transform duration-300 hover:scale-[1.05] ${isMobile
        ? 'fixed bottom-6 left-1/2 -translate-x-1/2'
        : 'absolute bottom-12 left-1/2 -translate-x-1/2'
        }`}>
        <DynamicButton
          label="More projects"
          href="/works"
          icon={ChevronRight}
          scrollTrigger={buttonScrollTrigger}
        />
      </div>

      {isMobile ? (
        /* Mobile: Simple column layout, no overlapping */
        <div className="flex flex-col gap-6 w-full">
          {WORKS.map((work) => (
            <div key={work.id} className="w-full aspect-[4/5]">
              <SelectedWorkCard {...work} />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: Overlapping stacking animation */
        <div className="flex min-h-full w-full flex-col items-center justify-center gap-12">
          <div data-cards-container className="relative flex w-full justify-center">
            <div className="relative w-[70vw] max-w-[1400px] aspect-[4/5] lg:aspect-[16/9]">
              {WORKS.map((work, index) => (
                <div
                  key={work.id}
                  data-work-card
                  className="selected-work-card absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{ zIndex: index + 1 }}
                >
                  <SelectedWorkCard {...work} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
