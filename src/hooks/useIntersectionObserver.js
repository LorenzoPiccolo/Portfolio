// src/hooks/useIntersectionObserver.js
import { useEffect, useState } from 'react';

/**
 * Observes when an element enters/leaves the viewport.
 * Returns the latest IntersectionObserverEntry (or null).
 */
export default function useIntersectionObserver(targetRef, options) {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const element = targetRef?.current;
    if (!element) return undefined;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const [observedEntry] = entries;
      if (observedEntry) setEntry(observedEntry);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [targetRef, options]);

  return entry;
}

