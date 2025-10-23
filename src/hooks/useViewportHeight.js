// src/hooks/useViewportHeight.js
import { useEffect } from 'react';

/**
 * Keeps a CSS custom property in sync with the current viewport height.
 * Useful for mobile Safari where the dynamic toolbar changes the visible
 * viewport height and 100vh values may not match the real space.
 */
export default function useViewportHeight(varName = '--app-vh') {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const setViewportHeight = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty(varName, `${vh * 0.01}px`);
    };

    setViewportHeight();

    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    window.visualViewport?.addEventListener('resize', setViewportHeight);
    window.visualViewport?.addEventListener('scroll', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
      window.visualViewport?.removeEventListener('resize', setViewportHeight);
      window.visualViewport?.removeEventListener('scroll', setViewportHeight);
    };
  }, [varName]);
}

