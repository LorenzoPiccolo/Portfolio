// src/pages/works/sections/Hero.jsx
import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';

import imageA from '../../../../img/image-footer-02.jpg';
import imageB from '../../../../img/image-footer-03.jpg';
import imageC from '../../../../img/image-footer-04.jpg';
import imageD from '../../../../img/image-footer-05.jpg';
import imageE from '../../../../img/footer-image.jpg';
import imageF from '../../../../img/project-03.jpg';
import imageG from '../../../../img/gradient-footer.png';

const COLUMNS = [
  {
    id: 'col-1',
    images: [{ id: 'img-1', src: imageA, alt: 'Dark themed mobile app concept', size: 'lg' }],
  },
  {
    id: 'col-2 ',
    images: [
      { id: 'img-2a', src: imageG, alt: 'Abstract gradient composition', size: 'lg' },
      { id: 'img-2b', src: imageB, alt: 'Laptop mockup with colorful panels', size: 'lg' },
    ],
  },
  {
    id: 'col-3',
    images: [{ id: 'img-3', src: imageC, alt: 'Dashboard interface with orange accent', size: 'lg' }],
  },
  {
    id: 'col-4',
    images: [
      { id: 'img-4a', src: imageE, alt: 'Rock texture lit with soft light', size: 'lg' },
      { id: 'img-4b', src: imageF, alt: 'Portrait silhouette with gradient light', size: 'lg' },
    ],
  },
  {
    id: 'col-5',
    images: [{ id: 'img-5', src: imageD, alt: 'Abstract sculpture illuminated from side', size: 'lg' }],
  },
  {
    id: 'col-6',
    images: [
      { id: 'img-6a', src: imageB, alt: 'Interface close-up with switches', size: 'lg' },
      { id: 'img-6b', src: imageA, alt: 'Conceptual phone UI', size: 'lg' },
    ],
  },
  {
    id: 'col-7',
    images: [{ id: 'img-7', src: imageF, alt: 'Portrait silhouette abstract', size: 'lg' }],
  },
];

const SIZE_TO_CLASS = {
  sm: 'w-[110px] md:w-[130px]',
  md: 'w-[140px] md:w-[160px]',
  lg: 'w-[170px] md:w-[350px]',
};

const COLUMN_ROTATIONS = [-15, -10, -5, 0, 5, 10, 15];
const CLUSTER_SWING = 10;
const HERO_SCROLL_ID = 'works-hero-columns';

export default function WorksHeroSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const columnRefs = useRef([]);
  columnRefs.current = [];

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const railEl = railRef.current;
    if (!sectionEl || !railEl) return;

    const ctx = gsap.context(() => {
      const columns = columnRefs.current.filter(Boolean);
      if (!columns.length) return;

      gsap.set(railEl, {
        rotate: -CLUSTER_SWING / 2,
        transformOrigin: '50% 100%',
        xPercent: -25,
      });

      columns.forEach((col, index) => {
        const baseRotation = COLUMN_ROTATIONS[index] ?? 0;
        gsap.set(col, {
          rotate: baseRotation - CLUSTER_SWING / 2,
          transformOrigin: '50% 100%',
        });
      });

      ScrollTrigger.getById(HERO_SCROLL_ID)?.kill();

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: HERO_SCROLL_ID,
          trigger: sectionEl,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.1}`,
          scrub: true,
          pin: false,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      timeline.to(
        railEl,
        {
          rotate: CLUSTER_SWING / 2,
          xPercent: 25,
          ease: 'none',
        },
        0,
      );

      columns.forEach((col, index) => {
        const baseRotation = COLUMN_ROTATIONS[index] ?? 0;
        timeline.to(
          col,
          {
            rotate: baseRotation + CLUSTER_SWING / 2,
            ease: 'none',
          },
          0,
        );
      });
    }, sectionEl);

    return () => ctx.revert();
  }, [resizeTick]);

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-center gap-16 px-6 pb-6 text-light pt-[40vh] lg:pt-[16vw] overflow-x-hidden overflow-y-visible"
    >
      <div className="text-center">
        <h1 className="title-80 leading-[1.05] tracking-[-0.02em]">Projects that breathe</h1>
      </div>

      <div className="flex w-screen justify-center mt-20 lg:mt-40">
        <div
          ref={railRef}
          className="mx-auto flex w-[150vw] max-w-none justify-center gap-6"
          style={{ transformOrigin: '50% 100%' }}
        >
          {COLUMNS.map((column, index) => (
            <div
              key={column.id}
              className="flex flex-col justify-center gap-6"
              style={{ transformOrigin: '50% 100%' }}
              ref={(el) => {
                columnRefs.current[index] = el;
              }}
            >
              {column.images.map((image) => (
                <figure
                  key={image.id}
                  className={`relative aspect-[9/16] overflow-hidden rounded-[26px] border border-light/10 bg-gray800 ${SIZE_TO_CLASS[image.size]}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
