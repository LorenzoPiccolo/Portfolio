// src/renderApp.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from './utils/gsapConfig.js';

export default function renderApp(RootComponent) {
  // Touch device detection - disable Lenis on actual touch/mobile devices
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return true; // SSR safety: assume touch

    // Primary check: CSS pointer capability (most reliable cross-browser)
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasNoHover = window.matchMedia('(hover: none)').matches;

    // Fallback: user agent (for older browsers without CSS pointer support)
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // NOTE: navigator.maxTouchPoints is intentionally NOT used here.
    // macOS Safari reports maxTouchPoints = 5 (trackpad), which would
    // incorrectly disable Lenis on Safari desktop and cause scroll jank.
    // CSS pointer/hover media queries correctly distinguish desktop from touch.
    return hasCoarsePointer || hasNoHover || isMobileUA;
  };

  let lenis = null;

  // Only enable Lenis on non-touch devices
  if (!isTouchDevice()) {
    lenis = new Lenis({
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false, // Never smooth touch scrolling
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Disable touch handling entirely
    });
    window.lenis = lenis;

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.addEventListener('refresh', () => lenis?.resize());
  }

  // Delay ScrollTrigger refresh to avoid interrupting first touch scroll on mobile
  const safeRefresh = () => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      // Give mobile browsers time to settle before refreshing
      setTimeout(safeRefresh, 300);
    });
  } else {
    setTimeout(safeRefresh, 400);
  }

  gsap.ticker.lagSmoothing(0);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RootComponent />
    </React.StrictMode>
  );
}
