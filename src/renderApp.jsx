// src/renderApp.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from './utils/gsapConfig.js';

export default function renderApp(RootComponent) {
  // Robust touch device detection - disable Lenis on ANY touch device
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return true; // SSR safety: assume touch

    // Primary check: pointer capability (most reliable)
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasNoHover = window.matchMedia('(hover: none)').matches;

    // Secondary check: touch points
    const hasTouchPoints = navigator.maxTouchPoints > 0;

    // Tertiary check: touch events support
    const hasTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Fallback: user agent (last resort)
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Be aggressive: if ANY of these suggest touch, disable Lenis
    return hasCoarsePointer || hasNoHover || hasTouchPoints || hasTouchEvents || isMobileUA;
  };

  let lenis = null;

  // Only enable Lenis on non-touch devices
  if (!isTouchDevice()) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false, // Never smooth touch scrolling
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Disable touch handling entirely
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
