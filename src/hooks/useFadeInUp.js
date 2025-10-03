// src/hooks/useFadeInUp.js
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/**
 * rootRef: ref al contenitore del componente (section/div)
 * selector: selettore degli elementi da animare (default ".fadeInUp")
 */
export function useFadeInUp(rootRef, selector = '.fadeInUp') {
  useLayoutEffect(() => {
    if (!rootRef?.current) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(selector);
      els.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 30 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            // niente kill globali, niente roba condivisa
            // toggleActions: 'play none none reverse' // se vuoi che torni indietro
            once: false, // metti true se vuoi animare una sola volta
          },
        });
      });
    }, rootRef); // 👈 limita tutto a questo subtree

    return () => ctx.revert(); // 👈 ripulisce SOLO ciò che ha creato l’hook
  }, [rootRef, selector]);
}
