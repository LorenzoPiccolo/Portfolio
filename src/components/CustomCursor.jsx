// src/components/CustomCursor.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Root-cause fix: document.elementFromPoint() returns the cursor circle itself
// when it is rendered on top of the hovered element (pointer-events:none does
// NOT exclude elements from elementFromPoint — MDN confirmed).
//
// Fix: use document.elementsFromPoint() (plural) which returns ALL elements
// at the point, then skip our own cursor element via [data-cursor-el], and
// find the first real element underneath.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapConfig.js';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef   = useRef(null);
  const state     = useRef({ visible: false });
  const location  = useLocation();

  const isMobile = typeof window !== 'undefined' && (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches
  );

  // ── Reset on route change ─────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const el = cursorRef.current;
    if (!el) return;
    state.current.visible = false;
    gsap.killTweensOf(el, 'scale,opacity');
    gsap.set(el, { scale: 0, opacity: 0 });
  }, [location.pathname, isMobile]);

  // ── Main effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const el     = cursorRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    // Start off-screen, hidden
    gsap.set(el, { xPercent: -50, yPercent: -50, x: -200, y: -200, scale: 0, opacity: 0 });

    // Single quickTo drives both position — text lives inside the circle so it
    // comes along for free, no second tracking needed.
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const show = (text) => {
      // Update label via DOM so we never trigger a React re-render
      if (textEl.textContent !== text) textEl.textContent = text;
      if (state.current.visible) return;
      state.current.visible = true;
      gsap.killTweensOf(el, 'scale,opacity');
      gsap.to(el, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' });
    };

    const hide = () => {
      if (!state.current.visible) return;
      state.current.visible = false;
      gsap.killTweensOf(el, 'scale,opacity');
      gsap.to(el, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    };

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // elementsFromPoint returns elements from topmost to bottommost.
      // We skip our own cursor ([data-cursor-el]) to find the real top element.
      const allEls = document.elementsFromPoint(e.clientX, e.clientY);
      const topEl  = allEls.find(node => !node.closest('[data-cursor-el]'));

      if (!topEl)                                          { hide(); return; }
      if (topEl.closest('header'))                         { hide(); return; }
      if (topEl.closest('[data-no-cursor]'))               { hide(); return; }

      const target = topEl.closest('[data-follower-text]');
      if (target) show(target.getAttribute('data-follower-text'));
      else        hide();
    };

    const onLeave = () => hide();

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [location.pathname, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      data-cursor-el
      className="fixed top-0 left-0 z-[9990] pointer-events-none rounded-full flex items-center justify-center select-none"
      style={{
        width: '110px',
        height: '110px',
        backgroundColor: 'rgba(18, 18, 18, 0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <span
        ref={textRef}
        data-cursor-el
        className="font-urbanist text-[14px] font-medium text-light leading-none pointer-events-none"
      />
    </div>
  );
}
