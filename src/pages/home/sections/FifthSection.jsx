// src/pages/home/sections/FifthSection.jsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';
import gradientImage from '../../../../img/gradient-2.png';
import sticker8 from '../../../../img/stickers/sticker-8.svg';
import sticker7 from '../../../../img/stickers/sticker-7.svg';
import sticker5Icon from '../../../../img/stickers/sticker-5-icon.svg';
import sticker4Icon from '../../../../img/stickers/sticker-4-icon.svg';
import sticker6 from '../../../../img/stickers/sticker-6.svg';
import sticker2 from '../../../../img/stickers/sticker-2.svg';
import sticker3 from '../../../../img/stickers/sticker-3.svg';
import sticker1 from '../../../../img/stickers/sticker-1.svg';
import { useFadeInUp } from '../../../hooks/useFadeInUp.js';

const STICKERS = [
  {
    src: sticker8,
    alt: 'Orange code 90210 sticker',
    top: '22%',
    left: '38%',
    width: '120px',
    aspect: '94 / 32',
    frame: false,
    zIndex: 4,
    fromY: 10,
    toY: -200,
    transform: 'rotate(18deg)',
  },
  {
    src: sticker7,
    alt: 'Profile',
    top: '12%',
    left: '74%',
    width: '340px',
    frame: false,
    zIndex: 6,
    fromY: 10,
    toY: -170,
  },
  {
    src: sticker5Icon,
    alt: 'Outline globe sticker',
    top: '38%',
    left: '25%',
    width: '260px',
    aspect: '1 / 1',
    frame: true,
    paddingClass: 'p-8',
    zIndex: 3,
    fromY: 10,
    toY: -120,
  },
  {
    src: sticker4Icon,
    alt: 'Red star sticker',
    top: '40%',
    left: '80%',
    width: '240px',
    aspect: '138 / 79',
    frame: true,
    paddingClass: 'p-6',
    zIndex: 5,
    fromY: 10,
    toY: -110,
  },
  {
    src: sticker6,
    alt: 'Warm gradient sticker',
    top: '54%',
    left: '30%',
    width: '280px',
    aspect: '194 / 48',
    frame: false,
    zIndex: 2,
    fromY: 80,
    toY: -160,
  },
  {
    src: sticker2,
    alt: 'Torii sticker',
    top: '80%',
    left: '65%',
    width: '200px',
    aspect: '1 / 1',
    frame: false,
    zIndex: 4,
    fromY: 90,
    toY: -200,
  },
  {
    src: sticker3,
    alt: 'LN badge sticker',
    top: '95%',
    left: '28%',
    width: '340px',
    aspect: '272 / 83',
    frame: false,
    zIndex: 2,
    fromY: 110,
    toY: -200,
  },
  {
    src: sticker1,
    alt: 'Radial burst sticker',
    top: '62%',
    left: '86%',
    width: '150px',
    aspect: '1 / 1',
    frame: false,
    zIndex: 1,
    fromY: 70,
    toY: -130,
  },
];

export default function FifthSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stickersRef = useRef(null);
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
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray(section.querySelectorAll('[data-fifth-box]'));
      if (!boxes.length) return;

      gsap.set(boxes, { willChange: 'transform' });

      ScrollTrigger.getById('fifth-section-gallery')?.kill();

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'fifth-section-gallery',
          trigger: section,
          start: 'top center',
          end: 'bottom top', // Continue parallax until section is completely off screen
          scrub: 0.5,
          invalidateOnRefresh: true,
          refreshPriority: -2,
          markers: false,
        },
      });

      timeline.add('stickers');

      const headingAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -2,
          markers: false,
        }
      })

      headingAnimation.fromTo(heading, { scale: 1.5 }, { scale: 1, duration: 1 })

      boxes.forEach((box) => {
        const fromY = Number(box.getAttribute('data-from') || 40);
        const toY = Number(box.getAttribute('data-to') || -120);

        timeline.fromTo(
          box,
          { yPercent: fromY },
          { yPercent: toY },
          'stickers'
        );
      });
    }, section);

    return () => ctx.revert();
  }, [resizeTick]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[200svh] bg-dark px-6 text-light overflow-hidden"
    >
      {/* Sticky heading stays fixed in viewport center while scrolling */}
      <div
        ref={headingRef}
        className="fixed w-full top-0 flex h-[100svh] items-center justify-center px-6 z-0"
      >
        <h4 className="md:title-32 title-24 w-[60%] md:max-w-[30vw] text-center font-normal leading-tight fifth-section-heading">
          Full-time perfection seeker.
          <br />
          Love minimalism, Japan, space and Ferrari.
        </h4>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col align-center">

        <div className="h-full w-full pointer-events-none"></div>

        <div
          ref={stickersRef}
          className="relative min-h-[250svh] z-10 w-full"
        >
          {STICKERS.map((sticker, index) => {
            const frameBase = sticker.frame
              ? 'overflow-hidden rounded-[28px] border border-gray600/80 bg-gray850/70 backdrop-blur-[18px] shadow-[0_0_60px_rgba(24,24,24,0.6)]'
              : '';
            const padding = sticker.frame ? sticker.paddingClass ?? 'p-6' : sticker.paddingClass ?? '';

            const innerClasses = [
              'flex items-center justify-center w-full',
              frameBase,
              padding,
            ]
              .filter(Boolean)
              .join(' ');

            const fit = sticker.fit ?? 'contain';

            const imageClasses = [
              'w-full',
              sticker.frame ? 'h-full' : 'h-auto',
              fit === 'cover' ? 'object-cover' : 'object-contain',
              sticker.imageClass,
            ]
              .filter(Boolean)
              .join(' ');

            let computedWidth = sticker.width;
            if (
              isMobile &&
              typeof sticker.width === 'string' &&
              sticker.width.trim().endsWith('px')
            ) {
              const numeric = parseFloat(sticker.width);
              if (!Number.isNaN(numeric)) {
                computedWidth = `${numeric * 0.6}px`;
              }
            }

            const outerStyle = {
              top: sticker.top,
              left: sticker.left,
              zIndex: sticker.zIndex ?? index + 1,
              width: computedWidth,
              transform: 'translate(-50%, -50%)',
            };

            const innerStyle = {
              aspectRatio: sticker.aspect,
            };

            return (
              <div key={sticker.src} className="absolute" style={outerStyle}>
                <div
                  data-fifth-box
                  data-from={sticker.fromY}
                  data-to={sticker.toY}
                  className={innerClasses}
                  style={innerStyle}
                >
                  <img src={sticker.src} alt={sticker.alt} className={imageClasses} />
                </div>
              </div>
            );
          })}
          <div className="w-full absolute bottom-0 left-0 right-0 z-2">
            <img src={gradientImage} alt="" aria-hidden="true" className="w-full origin-bottom" />
          </div>
        </div>

      </div>
    </section>
  );
}
