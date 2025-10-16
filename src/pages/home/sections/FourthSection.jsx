// src/pages/home/sections/FourthSection.jsx
import { useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ChevronRight } from 'lucide-react';

import SelectedWorkCard from '../../../components/SelectedWorkCard.jsx';
import DynamicButton from '../../../components/DynamicButton.jsx';
import { WORKS } from '../../../data/works.js';

gsap.registerPlugin(ScrollTrigger);

export default function FourthSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(sectionEl.querySelectorAll('[data-work-card]'));
      if (!cards.length) return;

      cards.forEach((card) => {
        gsap.set(card, { transformOrigin: 'center center' });
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
            const depth = activeIndex - idx + t;
            yPercent = -levelOffset * depth;
            scale = 0.9;
          } else if (idx === activeIndex) {
            yPercent = -levelOffset * t;
            scale = 1 - 0.1 * t;
          } else if (idx === nextIndex && nextIndex !== activeIndex) {
            yPercent = hiddenOffset * (1 - t);
            scale = 1;
          } else {
            yPercent = hiddenOffset;
            scale = 1;
          }

          const vars = {
            yPercent,
            scale,
            ease: 'power3.out',
          };

          if (immediate) {
            gsap.set(card, vars);
          } else {
            gsap.to(card, { ...vars, duration: 0.6, overwrite: true });
          }
        });
      };

      const trigger = ScrollTrigger.create({
        id: 'fourth-section-works',
        trigger: sectionEl,
        start: 'top top',
        end: () => {
          const cardHeight = cards[0]?.offsetHeight || window.innerHeight;
          const stepDistance = Math.max(320, Math.round(cardHeight * 0.75));
          const steps = Math.max(1, cards.length - 1);
          return `+=${stepDistance * steps}`;
        },
        scrub: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        markers: false,
        onUpdate: (self) => applyState(self.progress),
        onRefresh: (self) => applyState(self?.progress ?? 0, true),
      });

      applyState(trigger.progress || 0, true);

    }, sectionEl);

    return () => ctx.revert();
  }, [resizeTick]);

  const buttonScrollTrigger = useMemo(
    () => ({
      trigger: () => sectionRef.current,
      start: 'top top',
      end: 'bottom top-=800',
    }),
    [resizeTick],
  );

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative isolate min-h-[700px] bg-light text-dark z-10 fourthSection"
    >
      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 transition-transform duration-300 hover:scale-[1.05]">
        <DynamicButton
          label="More projects"
          href="/works.html"
          icon={ChevronRight}
          scrollTrigger={buttonScrollTrigger}
        />
      </div>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-12">

        <div className="relative flex w-full justify-center">
          <div className="relative w-[90vw] md:w-[70vw] max-w-[1400px] aspect-[9/16] md:aspect-[4/5] lg:aspect-[16/9]">
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
    </section>
  );
}
