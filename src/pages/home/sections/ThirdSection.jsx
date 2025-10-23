// src/pages/home/sections/ThirdSection.jsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInUp } from '../../../hooks/useFadeInUp.js';
gsap.registerPlugin(ScrollTrigger);

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
];

const ROW_COLOR = 'dark';
const INACTIVE_OPACITY = 0.2;

export default function ThirdSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const mobileSectionRef = useRef(null);
  const mobileWrapRef = useRef(null);
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

    const buildAnimation = ({ section, wrap, list, triggerId, start }) => {
      if (!section || !wrap || !list) return () => {};

      let rows = Array.from(list.querySelectorAll('.skill-row'));
      if (!rows.length) return () => {};

      gsap.set(rows, { color: ROW_COLOR, opacity: INACTIVE_OPACITY });

      const centerY = () => wrap.clientHeight / 2;
      const rowCenter = (el) => el.offsetTop + el.offsetHeight / 2;
      const yStart = () => centerY() - rowCenter(rows[0]);
      const travel = () => rowCenter(rows[rows.length - 1]) - rowCenter(rows[0]);

      let activeIdx = -1;
      const updateActive = () => {
        const y = gsap.getProperty(list, 'y');
        const cy = centerY();
        let min = Infinity;
        let idx = 0;
        for (let i = 0; i < rows.length; i++) {
          const c = rowCenter(rows[i]) + y;
          const d = Math.abs(cy - c);
          if (d < min) { min = d; idx = i; }
        }
        if (idx !== activeIdx) {
          if (activeIdx >= 0) {
            gsap.to(rows[activeIdx], {
              opacity: INACTIVE_OPACITY,
              color: '#181818',
              duration: 0.2,
              ease: 'none',
              overwrite: 'auto',
            });
          }
          gsap.to(rows[idx], {
            opacity: 1,
            color: ROW_COLOR,
            duration: 0.2,
            ease: 'none',
            overwrite: 'auto',
          });
          activeIdx = idx;
        }
      };

      gsap.set(list, { y: yStart() });
      updateActive();

      let tweenInstance = null;

      const ctx = gsap.context(() => {
        tweenInstance = gsap.to(list, {
          y: () => yStart() - travel(),
          ease: 'none',
          onUpdate: updateActive,
          invalidateOnRefresh: true,
          scrollTrigger: {
            id: triggerId,
            trigger: section,
            start,
            end: () => `+=${travel()}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            markers: false,
          },
        });
      }, section);

      const refreshAll = () => {
        rows = Array.from(list.querySelectorAll('.skill-row'));
        if (!rows.length) return;

        const currentProgress = typeof tweenInstance?.progress === 'function'
          ? tweenInstance.progress()
          : null;

        ScrollTrigger.refresh();

        requestAnimationFrame(() => {
          if (!rows.length) return;

          if (tweenInstance && currentProgress !== null) {
            tweenInstance.progress(currentProgress);
          }

          activeIdx = -1;
          updateActive();
        });
      };

      window.addEventListener('resize', refreshAll);
      let resizeObserver = null;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(refreshAll);
        resizeObserver.observe(wrap);
      }
      if (document.fonts?.ready) document.fonts.ready.then(refreshAll);

      return () => {
        window.removeEventListener('resize', refreshAll);
        resizeObserver?.disconnect();
        tweenInstance?.kill();
        ctx.revert();
      };
    };

    const mm = ScrollTrigger.matchMedia({
      '(max-width: 767px)': () =>
        buildAnimation({
          section: mobileSectionRef.current,
          wrap: mobileWrapRef.current,
          list: mobileListRef.current,
          triggerId: 'third-section-skills-mobile',
          start: 'top top',
        }),
      '(min-width: 768px) and (max-width: 1023px)': () =>
        buildAnimation({
          section: sectionRef.current,
          wrap: wrapRef.current,
          list: listRef.current,
          triggerId: 'third-section-skills-tablet',
          start: 'center center',
        }),
      '(min-width: 1024px)': () =>
        buildAnimation({
          section: sectionRef.current,
          wrap: wrapRef.current,
          list: listRef.current,
          triggerId: 'third-section-skills-desktop',
          start: 'top top',
        }),
    });

    return () => mm.revert();
  }, [resizeTick]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-full relative isolate min-h-[700px] min-w-screen bg-light text-dark px-6 py-0 z-10 flex items-center justify-center"
    >
      {isMobile ? (
        <div
          ref={mobileSectionRef}
          className="relative flex min-h-full w-full grow items-center justify-center px-6"
        >

          <div
            ref={mobileWrapRef}
            className="relative flex h-full w-full items-center justify-center"
          >
            <ul
              ref={mobileListRef}
              className="m-0 flex w-full max-w-[360px] flex-col items-center gap-10 text-center will-change-transform"
            >
              {SKILLS.map((label, i) => (
                <li
                  key={`mobile-${i}`}
                  className="skill-row font-urbanist font-normal leading-[0.7]"
                  style={{ fontSize: 'clamp(2.5rem, 18vw, 4.5rem)' }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full max-w-[1400px] flex-col items-center justify-center gap-8 overflow-hidden lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="hidden w-full shrink-0 lg:block lg:w-[34%]">
            <h3 className="title-32 font-normal leading-tight">
              Different skills for
              <br /> the best result
            </h3>
          </div>

          <div
            ref={wrapRef}
            className="relative flex h-full max-h-[100dvh] min-h-[320px] w-full max-w-[520px] mx-auto flex-1 items-center justify-center"
          >
            <ul
              ref={listRef}
              className="m-0 flex w-full flex-col items-center text-center gap-8 will-change-transform lg:items-start lg:text-left"
            >
              {SKILLS.map((label, i) => (
                <li
                  key={`desktop-${i}`}
                  className="skill-row font-urbanist font-normal md:leading-[0.9] leading-[0.6]"
                  style={{ fontSize: 'clamp(2.75rem, 12vw, 5rem)' }}
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
