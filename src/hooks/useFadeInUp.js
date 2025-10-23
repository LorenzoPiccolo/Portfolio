// src/hooks/useFadeInUp.js
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/**
 * rootRef: ref al contenitore del componente (section/div)
 * selector: selettore degli elementi da animare (default ".fade-in-up")
 */
export function useFadeInUp(
  rootRef,
  {
    selector = '.fade-in-up',
    trigger,
    start = 'top 85%',
    once = false,
    stagger = 0.12,
    duration = 0.8,
    ease = 'power2.out',
    immediate = false,
    enabled = true,
  } = {},
) {
  useLayoutEffect(() => {
    if (!enabled) return undefined;
    const root = rootRef?.current;
    if (!root) return undefined;

    const resolveTrigger = () => {
      if (typeof trigger === 'function') return trigger(root);
      if (trigger && 'current' in (trigger ?? {})) return trigger.current;
      return trigger ?? root;
    };

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector, root);
      if (!elements.length) return;

      if (immediate) {
        gsap.fromTo(
          elements,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            ease,
            stagger,
          },
        );
        return;
      }

      gsap.set(elements, { autoAlpha: 0, y: 30 });

      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: resolveTrigger(),
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef, selector, start, once, stagger, duration, ease, immediate, enabled, trigger]);
}
