// src/components/MagneticEffect.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Global magnetic pull for all [data-magnetic] elements.
// Single window mousemove listener, RAF-throttled, tracks active elements
// to avoid unnecessary GSAP calls on every frame.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../utils/gsapConfig.js';

const STRENGTH = 0.38;
const RADIUS   = 90;

export default function MagneticEffect() {
  const location = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let elements   = [];
    let rafId      = null;
    let lastX      = 0;
    let lastY      = 0;
    // Track which elements are currently displaced so we only reset those
    const active   = new Set();

    // Refresh element list after route render settles
    const refreshTimer = setTimeout(() => {
      elements = Array.from(document.querySelectorAll('[data-magnetic]'));
    }, 80);

    const processMove = () => {
      rafId = null;
      const mx = lastX;
      const my = lastY;

      elements.forEach((el) => {
        // Guard against stale refs after DOM changes
        if (!document.contains(el)) {
          active.delete(el);
          return;
        }

        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = mx - cx;
        const dy   = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          active.add(el);
          gsap.to(el, {
            x: dx * STRENGTH,
            y: dy * STRENGTH,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else if (active.has(el)) {
          // Only reset elements that were previously pulled
          active.delete(el);
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.55,
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto',
          });
        }
      });
    };

    const onMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(processMove);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);

      // Snap all active elements back to origin on unmount / route change
      active.forEach((el) => {
        if (document.contains(el)) {
          gsap.killTweensOf(el, 'x,y');
          gsap.set(el, { x: 0, y: 0 });
        }
      });
      active.clear();
    };
  }, [location.pathname]); // Re-run on each route change to refresh element list

  return null;
}
