// src/hooks/useResizeTick.js
import { useEffect, useRef, useState } from 'react';

/**
 * Returns a monotonic counter that increments after the user finishes resizing
 * the viewport. Useful to reinitialise ScrollTrigger timelines in a controlled
 * way without re-running them on every resize tick.
 *
 * On mobile (iOS Safari), the browser toolbar showing/hiding fires a window
 * resize event that only changes innerHeight, not innerWidth. Reacting to
 * those events would cascade into ScrollTrigger.refresh() calls mid-scroll,
 * causing pin spacers to recalculate and the page to jump.
 * Fix: only tick when innerWidth actually changes (same logic as
 * ScrollTrigger.config({ ignoreMobileResize: true })).
 */
export default function useResizeTick(delay = 200) {
  const [tick, setTick] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let lastWidth = window.innerWidth;

    const scheduleTick = () => {
      const currentWidth = window.innerWidth;
      // Ignore height-only resizes (iOS Safari toolbar show/hide)
      if (currentWidth === lastWidth) return;
      lastWidth = currentWidth;

      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setTick((prev) => prev + 1);
      }, delay);
    };

    // orientationchange fires before new dimensions are available.
    // Reset lastWidth so the subsequent resize event is always processed.
    const onOrientationChange = () => {
      lastWidth = 0;
    };

    window.addEventListener('resize', scheduleTick, { passive: true });
    window.addEventListener('orientationchange', onOrientationChange, { passive: true });

    return () => {
      window.removeEventListener('resize', scheduleTick);
      window.removeEventListener('orientationchange', onOrientationChange);
      window.clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return tick;
}
