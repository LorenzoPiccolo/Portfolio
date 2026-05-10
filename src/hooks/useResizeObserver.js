// src/hooks/useResizeObserver.js
import { useEffect, useRef } from 'react';

/**
 * Subscribes to ResizeObserver updates on the provided element.
 * Returns the observer instance via ref if you need manual access.
 */
export default function useResizeObserver(targetRef, callback, options) {
  const observerRef = useRef(null);

  useEffect(() => {
    const element = targetRef?.current;
    if (!element) return undefined;
    if (typeof window === 'undefined' || !('ResizeObserver' in window)) return undefined;
    if (typeof callback !== 'function') return undefined;

    const observer = new ResizeObserver((entries) => {
      callback(entries);
    });

    observer.observe(element, options);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [targetRef, callback, options]);

  return observerRef;
}

