// src/hooks/useFadeInUp.js
import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig.js';

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
    useObserver = true,
    observerOptions,
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

    const ctx = gsap.context((self) => {
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

      const timeline = gsap.timeline({ paused: true });
      timeline.to(elements, { autoAlpha: 1, y: 0, duration, ease, stagger });

      const play = () => timeline.play();
      const reverse = () => timeline.reverse();

      const target = resolveTrigger();

      const canUseObserver =
        useObserver &&
        typeof window !== 'undefined' &&
        'IntersectionObserver' in window &&
        target;

      if (canUseObserver) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry) return;
            if (entry.isIntersecting) {
              play();
              if (once) observer.unobserve(entry.target);
            } else if (!once) {
              reverse();
            }
          },
          observerOptions ?? { threshold: 0.2, rootMargin: '0px 0px -10%' },
        );

        observer.observe(target);
        self.add(() => observer.disconnect());
        return;
      }

      if (typeof ScrollTrigger !== 'undefined') {
        const mm = ScrollTrigger.matchMedia({
          all: () => {
            timeline.progress(0).pause();
            const st = ScrollTrigger.create({
              trigger: target ?? root,
              start,
              once,
              toggleActions: once ? 'play none none none' : 'play reverse play reverse',
              onEnter: () => play(),
              onLeave: () => {
                if (!once) reverse();
              },
              onEnterBack: () => play(),
              onLeaveBack: () => {
                if (!once) reverse();
              },
            });
            return () => st.kill();
          },
        });
        self.add(() => mm.revert());
        return;
      }

      play();
    }, root);

    return () => ctx.revert();
  }, [
    rootRef,
    selector,
    start,
    once,
    stagger,
    duration,
    ease,
    immediate,
    enabled,
    trigger,
    useObserver,
    observerOptions,
  ]);
}
