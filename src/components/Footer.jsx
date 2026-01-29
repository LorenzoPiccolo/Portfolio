// src/components/Footer.jsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig.js';
import footerBackground from '../../img/image-footer-05.jpg';
import logo from '../../img/logo.svg';
import gradientOverlay from '../../img/gradient-footer.png';

const MENU_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Works', href: '/works.html' },
  { label: 'About me', href: '/#about-me' },
  { label: 'Process', href: '/#process' },
];

const CONTACT_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/lorenzopiccolo_/', external: true },
  { label: 'Behance', href: 'https://www.behance.net/lorenzopiccolo9926', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lorenzo-piccolo-9619b9251/', external: true },
];

function FooterNavList({ title, links }) {
  const [hovered, setHovered] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const resetHover = () => {
    setHovered(null);
    window.clearTimeout(hoverTimeoutRef.current);
  };

  useEffect(
    () => () => {
      window.clearTimeout(hoverTimeoutRef.current);
    },
    []
  );

  return (
    <div className="flex flex-col gap-5">
      <span className="text-16 uppercase tracking-[0.22em] text-light/70">{title}</span>

      <ul className="flex flex-col gap-3 text-16">
        {links.map(({ label, href, external }) => {
          const isHovered = hovered === label;
          const isDimmed = hovered && hovered !== label;

          return (
            <li key={label}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer noopener' : undefined}
                onMouseEnter={() => {
                  window.clearTimeout(hoverTimeoutRef.current);
                  setHovered(label);
                }}
                onFocus={() => setHovered(label)}
                onMouseLeave={() => {
                  hoverTimeoutRef.current = window.setTimeout(resetHover, 120);
                }}
                onBlur={resetHover}
                className={`group relative flex items-center gap-3 transition-all duration-300 ease-out ${isDimmed ? 'text-gray400' : 'text-light'
                  } ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
              >
                <span
                  className={`w-2 text-[20px] leading-none text-light transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  ·
                </span>
                <span className="leading-tight">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FooterMarquee({ marqueeRef }) {
  return (
    <a href="mailto:lorenzopikkolo@gmail.com">
      <div ref={marqueeRef} className="absolute inset-x-0 bottom-10 z-10 px-6">
        <div className="whitespace-nowrap">
          <div className="inline-block will-change-transform animate-[marqueeLeft_35s_linear_infinite]">
            <FooterMarqueeChunk />
            <FooterMarqueeChunk />
          </div>
        </div>
      </div>
    </a>
  );
}

function FooterMarqueeChunk() {
  return (
    <span
      className="
        pr-[4rem]
        font-urbanist font-normal leading-none text-light
        md:text-[240px] text-[160px]
        select-none footerMarquee
      "
      style={{ WebkitTextStroke: '0 transparent' }}
    >
      get in touch!&nbsp;&nbsp;get in touch!&nbsp;&nbsp;get in touch!&nbsp;&nbsp;
    </span>
  );
}

export default function Footer({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const gradientRef = useRef(null);
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const gradient = gradientRef.current;
    if (!section || !gradient) return;

    const ctx = gsap.context(() => {
      gsap.set(gradient, { scaleY: 0, transformOrigin: 'top center' });

      ScrollTrigger.getById('footer-gradient')?.kill();

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'footer-gradient',
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight * 1, 1200)}`,
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            refreshPriority: -3,
          },
        })
        .to(gradient, { scaleY: 1 }, 0);
    }, section);

    return () => ctx.revert();
  }, [resizeTick]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const marquee = marqueeRef.current;
    if (!section || !marquee) return;

    const ctx = gsap.context(() => {
      gsap.set(marquee, { y: 200, autoAlpha: 0, x: 200 });

      ScrollTrigger.getById('footer-marquee')?.kill();

      gsap.to(marquee, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          id: 'footer-marquee',
          trigger: section,
          start: 'top 10%',
          markers: false,
          toggleActions: 'play reverse play reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, [resizeTick]);

  return (
    <section ref={sectionRef} className="section-full relative z-10 min-h-[700px] w-screen overflow-hidden text-light">
      <div className="absolute inset-0 -z-20">
        <img
          src={footerBackground}
          alt="Rock with moss and vegetation"
          className="h-full w-full object-cover"
        />
      </div>

      {/* <div className="absolute w-full inset-x-0 top-0 z-0 select-none">
        <img
          ref={gradientRef}
          src={gradientOverlay}
          alt=""
          className="h-full w-full origin-top object-cover"
          style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
        />
      </div>  */}

      <div className="absolute bottom-0 md:left-0 flex h-full w-full flex-col">
        <div className="flex flex-1 items-end justify-start">
          <div
            className="flex md:h-[55%] h-[40vh] min-h-[370px] w-full max-w-[1180px] flex-col justify-between rounded-[0] rounded-tr-[64px] rounded-tl-[64px] md:rounded-tl-[0px] md:border-r-[1px] border-r-[0px] border-t-[1px] backdrop-blur-[18px] sm:w-[85vw] lg:w-[70vw]"
            style={{
              backgroundColor: 'var(--blurBg)',
              borderColor: 'var(--blurStroke)',
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 justify-between md:w-[90%] px-8 pt-10 text-light/80 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)] md:px-12 md:pt-12">
              <div className="flex justify-between md:flex-col items-center justify-center md:justify-start md:items-start md:gap-6 gap-10 text-16 text-light">
                <img src={logo} alt="Logo" className="h-16 md:h-14 w-auto" />

                <div className="flex flex-col text-[14px] gap-2 text-gray400">
                  <span>Lorenzo Piccolo</span>
                  <span>©2025 Portfolio</span>
                  <a
                    href="mailto:lorenzopikkolo@gmail.com"
                    className="transition-colors duration-300 hover:text-light"
                  >
                    Email me
                  </a>
                </div>
              </div>

              <div className="hidden md:block ">
                <FooterNavList title="" links={MENU_LINKS} />
              </div>

              <div className="hidden md:block">
                <FooterNavList title="" links={CONTACT_LINKS} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterMarquee marqueeRef={marqueeRef} />
    </section>
  );
}
