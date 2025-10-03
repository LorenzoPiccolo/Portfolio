// src/sections/SecondSection.jsx
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const COLOR_LIGHT = 'var(--color-light)';

export default function SecondSection() {
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
  }, []);

  // helper: wrappa ogni parola
  const renderText = (text) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="reveal-word text-light/20 inline-block mr-3">{w}</span>
    ));

  return (
    <section ref={sectionRef} className="relative isolate bg-dark px-6 py-32 z-10">
      {/* Testo introduttivo (64px Urbanist) */}
      <div className="w-[full] mx-auto font-normal title-64 leading-[110%] tracking-tight">
        <p className="w-[80%]">{renderText('Digital & Web Designer based in Italy.')}
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
        <div className="flex items-start gap-6">
          {/* Blocco 1 - 50% width, 550px height */}
          <div className="basis-1/2">
            <a href="#" className="block transition-transform duration-300 hover:-translate-y-4">
              <div className="h-[550px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] flex items-center justify-center">
                <img src="../../img/icona-01.svg" alt="icona 01" className="w-[300px] h-[300px]" />
              </div>
              <div className="title-24 font-normal mt-2">Web design</div>
            </a>
          </div>

          {/* Blocco 2 - 25% width, 300px height */}
          <div className="basis-1/4">
            <a href="#" className="block transition-transform duration-300 hover:-translate-y-4">
              <div className="h-[300px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] flex items-center justify-center">
                <img src="../../img/icona-02.svg" alt="icona 02" className="w-[230px] h-[230px]" />
              </div>
              <div className="title-24 font-normal mt-2">UX/UI Design</div>
            </a>
          </div>

          {/* Blocco 3 - 25% width, 300px height */}
          <div className="basis-1/4">
            <a href="#" className="block transition-transform duration-300 hover:-translate-y-4">
              <div className="h-[300px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] flex items-center justify-center">
                <img src="../../img/icona-03.svg" alt="icona 03" className="w-[140px] h-[140px]" />
              </div>
              <div className="title-24 font-normal mt-2">AI visual</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
