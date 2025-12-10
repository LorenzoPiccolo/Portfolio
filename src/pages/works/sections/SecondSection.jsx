// src/pages/works/sections/SecondSection.jsx
import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';

const INACTIVE_OPACITY = 0.2;
const COLOR_LIGHT = 'var(--color-light, rgba(255, 255, 255, 1))';

const PARAGRAPHS = [
  'White space creates focus. Silence holds meaning.',
  'In a landscape defined by speed and automation, design must remain thoughtful.',
  'AI adds power. Design brings restraint.',
  'The goal is not complexity, but clarity.', 
  'Not control, but connection.',
  ];

export default function WorksSecondSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const words = section.querySelectorAll('.reveal-word');
      if (!words.length) return;

      gsap.set(words, { opacity: INACTIVE_OPACITY, color: COLOR_LIGHT });

      ScrollTrigger.getById('works-overview-text')?.kill();

      gsap
        .timeline({
          scrollTrigger: {
            id: 'works-overview-text',
            trigger: section,
            start: 'top 70%',
            end: () => `+=${Math.max(600, window.innerHeight * 0.8)}`,
            scrub: true,
            invalidateOnRefresh: true,
            markers: false,
          },
        })
        .to(words, {
          opacity: 1,
          ease: 'none',
          stagger: { each: 0.12, from: 'start' },
        });
    }, section);

    return () => ctx.revert();
  }, [resizeTick]);

  const renderParagraph = (text, paragraphIndex) =>
    text.split(' ').map((word, wordIndex) => (
      <span key={`${paragraphIndex}-${wordIndex}`} className="reveal-word inline-block mr-2 text-light/20">
        {word}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[700px] w-screen items-center justify-center bg-dark px-6 py-32 text-light"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center title-32 lg:title-44 leading-[1.25] md:leading-[1.2]">
        {PARAGRAPHS.map((paragraph, index) => (
          <p key={index} className="font-normal">
            {renderParagraph(paragraph, index)}
          </p>
        ))}
      </div>
    </section>
  );
}
