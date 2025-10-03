// src/sections/ThirdSection.jsx
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

export default function ThirdSection() {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const listRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!section || !wrap || !list) return;

    let rows = Array.from(list.querySelectorAll('.skill-row'));
    if (!rows.length) return;

    // colore iniziale
    gsap.set(rows, { color: ROW_COLOR, opacity: INACTIVE_OPACITY });

    // helpers
    const centerY = () => wrap.clientHeight / 2;
    const rowCenter = (el) => el.offsetTop + el.offsetHeight / 2;

    // calcola y iniziale: prima riga centrata
    const yStart = () => centerY() - rowCenter(rows[0]);
    // distanza totale: portare l'ULTIMA riga al centro
    const travel = () => rowCenter(rows[rows.length - 1]) - rowCenter(rows[0]);

    // evidenzia la riga più vicina al centro
    let activeIdx = -1;
    const updateActive = () => {
      const y = gsap.getProperty(list, 'y'); // y corrente della lista
      const cy = centerY();
      let min = Infinity;
      let idx = 0;
      for (let i = 0; i < rows.length; i++) {
        const c = rowCenter(rows[i]) + y; // centro riga in coord. wrapper
        const d = Math.abs(cy - c);
        if (d < min) { min = d; idx = i; }
      }
      if (idx !== activeIdx) {
        if (activeIdx >= 0) {
          gsap.to(rows[activeIdx], { opacity: INACTIVE_OPACITY, color: '#181818', duration: 0.2, ease: 'none', overwrite: 'auto' });
        }
        gsap.to(rows[idx], { opacity: 1, color: ROW_COLOR, duration: 0.2, ease: 'none', overwrite: 'auto' });
        activeIdx = idx;
      }
    };

    // set iniziale posizione e attivo
    gsap.set(list, { y: yStart() });
    updateActive();

    // timeline che muove la lista; un solo ScrollTrigger con pin
    const tween = gsap.to(list, {
      y: () => yStart() - travel(),
      ease: 'none',
      onUpdate: updateActive,
      invalidateOnRefresh: true, // ricalcola yStart/travel ai refresh
      scrollTrigger: {
        id: 'third-section-skills',
        trigger: section,
        start: 'top top',
        end: () => `+=${travel()}`, // durata = tragitto fino all’ultima
        scrub: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        markers: false, 
      },
    });

    // refresh quando cambiano misure/font 
    const refreshAll = () => {
      rows = Array.from(list.querySelectorAll('.skill-row'));
      ScrollTrigger.refresh();
      // dopo il refresh aggiorna subito l'attivo
      requestAnimationFrame(updateActive);
    };
    window.addEventListener('resize', refreshAll); 
    if (document.fonts?.ready) document.fonts.ready.then(refreshAll);

    return () => {
      window.removeEventListener('resize', refreshAll);
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []); 

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-screen bg-light text-dark px-6 z-10"
    >
      <div className="mx-auto w-full max-w-[1400px] h-full flex items-center gap-16">
        {/* sinistra: headline 32px Urbanist, centrata verticalmente */}
        <div className="shrink-0 w-[34%]">
          <h3 className="title-32 font-normal leading-tight">
            Different skills for
            <br /> the best result
          </h3>
        </div>

        {/* destra: wrapper con overflow nascosto; la lista parte già allineata al centro */}
        <div ref={wrapRef} className="relative flex-1 h-[80vh]"> 
          <ul ref={listRef} className="will-change-transform">
            {SKILLS.map((label, i) => (
              <li
                key={i}
                className="skill-row font-urbanist font-normal leading-[1.10]"
                style={{ fontSize: '80px' }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
