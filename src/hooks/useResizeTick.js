// src/hooks/useResizeTick.js
import { useEffect, useRef, useState } from 'react';

/**
 * Returns a monotonic counter that increments after the user finishes resizing
 * the viewport. Useful to reinitialise ScrollTrigger timelines in a controlled
 * way without re-running them on every resize tick.
 */
export default function useResizeTick(delay = 200) {
  const [tick, setTick] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const scheduleTick = () => {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setTick((prev) => prev + 1);
      }, delay);
    };

    window.addEventListener('resize', scheduleTick, { passive: true });
    window.addEventListener('orientationchange', scheduleTick, { passive: true });

    return () => {
      window.removeEventListener('resize', scheduleTick);
      window.removeEventListener('orientationchange', scheduleTick);
      window.clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return tick;
}
