// src/hooks/useViewportHeight.js
import { useEffect, useRef } from 'react';

/**
 * Keeps a CSS custom property in sync with the current viewport height.
 * Useful for mobile Safari where the dynamic toolbar changes the visible
 * viewport height and 100vh values may not match the real space.
 * 
 * Optimized: Uses debouncing to prevent lag during scroll on mobile.
 */
export default function useViewportHeight(varName = '--app-vh') {
  const rafIdRef = useRef(null);
  const lastHeightRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const setViewportHeight = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      // Only update if height actually changed (avoid layout thrashing)
      if (Math.abs(vh - lastHeightRef.current) > 1) {
        lastHeightRef.current = vh;
        document.documentElement.style.setProperty(varName, `${vh * 0.01}px`);
      }
    };

    // Debounced version for resize events
    const debouncedSetViewportHeight = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(setViewportHeight);
    };

    setViewportHeight();

    window.addEventListener('resize', debouncedSetViewportHeight, { passive: true });
    window.addEventListener('orientationchange', debouncedSetViewportHeight, { passive: true });
    // Only listen to visualViewport resize, NOT scroll (scroll fires too often and causes lag)
    window.visualViewport?.addEventListener('resize', debouncedSetViewportHeight, { passive: true });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('resize', debouncedSetViewportHeight);
      window.removeEventListener('orientationchange', debouncedSetViewportHeight);
      window.visualViewport?.removeEventListener('resize', debouncedSetViewportHeight);
    };
  }, [varName]);
}
