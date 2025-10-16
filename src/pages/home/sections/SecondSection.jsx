// src/pages/home/sections/SecondSection.jsx
import { useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ChevronRight } from 'lucide-react';

import DynamicButton from '../../../components/DynamicButton.jsx';
import iconOne from '../../../../img/icona-01.svg';
import iconTwoOne from '../../../../img/icona-02-1.svg';
import iconTwoTwo from '../../../../img/icona-02-2.svg';
import iconTwoThree from '../../../../img/icona-02-3.svg';
import iconThree from '../../../../img/icona-03.svg';
gsap.registerPlugin(ScrollTrigger);

const COLOR_LIGHT = 'var(--color-light)';

export default function SecondSection({ resizeTick = 0 }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const words = q('.reveal-word');
      if (!words.length) return; 

      // colore iniziale: light con opacità 20%
      gsap.set(words, { color: COLOR_LIGHT, opacity: 0.2 });

      // timeline unica: il progress dello scroll colora parola-per-parola
      gsap.timeline({
        scrollTrigger: {
          id: 'second-section-text',
          trigger: el,
          start: () => {
            const heroTrigger = ScrollTrigger.getById('hero-scroll');
            if (heroTrigger) {
              return heroTrigger.end;
            }
            const rect = el.getBoundingClientRect();
            return window.scrollY + rect.top - window.innerHeight;
          },
          end: () => `+=${Math.max(800, window.innerHeight * 1)}`,
          scrub: true,
          invalidateOnRefresh: true,
          markers: false, 
        },
      }).to(words, {
        opacity: 1,
        ease: 'none',
        stagger: { each: 0.12, from: 'start' },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [resizeTick]);

  const buttonScrollTrigger = useMemo(
    () => ({
      trigger: () => sectionRef.current,
      start: 'top bottom',
      end: 'bottom bottom+=100',
      toggleActions: 'play reverse play reverse',
    }),
    [resizeTick],
  );

  // helper: wrappa ogni parola
  const renderText = (text) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="reveal-word text-light/20 inline-block mr-3">{w}</span>
    ));

  return (
    <section
      id="about-me"
      ref={sectionRef}
      className="relative isolate min-h-[700px] bg-dark px-6 py-16 md:py-32 z-10 w-screen"
    >
      {/* Testo introduttivo (64px Urbanist) */}
      <div className="w-[full] mx-auto font-normal title-44 md:title-64 leading-[110%] tracking-tight">
        <p className="w-[100%] md:w-[80%]">{renderText('Digital & Web Designer based in Italy.')}
        {renderText('Design, for me, is not about what appears first.')}
        
          {renderText(
            'It’s about what lasts quietly. Each interface, each brand, each visual layer is shaped through observation, balance, and a respect for space.'
          )}
        </p> 
      </div>

      {/* --- Design focus --- */}
      <div className="w-full mt-32">
        <h3 className="title-32 font-normal text-center mb-8">Design focus</h3>

        {/* Riga blocchi: flex, gap 24px, allineati top */}
        <div className="flex md:flex-row flex-col items-start gap-6">
          {/* Blocco 1 - 50% width, 550px height */}
          <div className="md:basis-1/2 w-full">
            <a href="#" className="block transition-transform duration-300 hover:scale-[1.02] ease-out">
              <div className="w-full h-[50vh] md:h-[550px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] flex items-center justify-center">
                <img src={iconOne} alt="icona 01" className="md:w-[400px] w-[250px]" />
              </div>
              <div className="title-24 font-normal mt-2">Web design</div>
            </a>
          </div>

          {/* Blocco 2 - 25% width, 300px height */}
          <div className="md:basis-1/4 w-full">
            <a href="#" className="block transition-transform duration-300 hover:scale-[1.02] ease-out">
              <div className="w-full h-[50vh] md:h-[300px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] flex gap-[32px] hover:gap-[64px] transition-all duration-300 ease-out items-center justify-center">
                <img src={iconTwoOne} alt="icona 02" className="h-[60px]" />
                <img src={iconTwoTwo} alt="icona 02" className="h-[150px]" />
                <img src={iconTwoThree} alt="icona 02" className="h-[60px]" />
              </div>
              <div className="title-24 font-normal mt-2">UX/UI Design</div>
            </a>
          </div>

          {/* Blocco 3 - 25% width, 300px height */}
          <div className="md:basis-1/4 w-full">
            <a href="#" className="group block transition-transform duration-300 hover:scale-[1.03] ease-out">
              <div className="w-full h-[50vh] md:h-[300px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] flex items-center justify-center">
                <img
                  src={iconThree}
                  alt="icona 03"
                  className="w-[140px] h-[140px] transform transition-transform duration-[5000ms] ease-out motion-reduce:transform-none motion-safe:group-hover:rotate-[360deg]"
                />
              </div>
              <div className="title-24 font-normal mt-2">AI visual</div>
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-16 left-1/2 z-30 flex -translate-x-1/2 justify-center">
        <div className="pointer-events-auto transition-transform duration-300 hover:scale-[1.05]">
          <DynamicButton
            label="The process"
            href="/process.html"
            icon={ChevronRight}
            scrollTrigger={buttonScrollTrigger}
          />
        </div>
      </div>
    </section>
  );
}
