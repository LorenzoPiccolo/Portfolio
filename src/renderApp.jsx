// src/renderApp.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from './utils/gsapConfig.js';

export default function renderApp(RootComponent) {
  const prefersTouchScrolling =
    typeof window !== 'undefined' &&
    (window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth <= 768);

  let lenis;
  if (!prefersTouchScrolling) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.addEventListener('refresh', () => lenis?.resize());
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  } else {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }

  gsap.ticker.lagSmoothing(0);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RootComponent />
    </React.StrictMode>
  );
}
