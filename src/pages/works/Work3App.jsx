// src/pages/works/Work3App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Work page v3 — editorial table list + grid toggle with cursor-follow preview.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger }  from '../../utils/gsapConfig.js';
import Header                   from '../../components/Header.jsx';
import Footer                   from '../../components/Footer.jsx';
import TransitionLink           from '../../components/TransitionLink.jsx';
import DynamicButton            from '../../components/DynamicButton.jsx';
import useResizeTick            from '../../hooks/useResizeTick.js';
import useAttentionTitle        from '../../hooks/useAttentionTitle.js';

// ─── Project images ───────────────────────────────────────────────────────────
import buildZeroImg  from '../../../img/build-zero/build-zero-01.jpg';
import portfolioImg  from '../../../img/portfolio/portfolio-01.jpg';
import alidaysImg    from '../../../img/footer-image.jpg';
import rediImg       from '../../../img/image-footer-05.jpg';
import romajiImg     from '../../../img/romaji/romaji-01.jpg';
import atalusImg     from '../../../img/atalus/atalus-01.jpg';
import rebornImg     from '../../../img/reborn/reborn-01.jpg';

// ─── Data ─────────────────────────────────────────────────────────────────────
export const ALL_PROJECTS = [
  {
    id: 'build-zero',
    title: 'Build Zero',
    discipline: 'UX/UI',
    services: ['Product Design', 'Prototyping'],
    year: '2024',
    href: '/works/build-zero',
    image: buildZeroImg,
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    discipline: 'Web',
    services: ['Design', 'Development'],
    year: '2025',
    href: '/works/portfolio-website',
    image: portfolioImg,
  },
  {
    id: 'alidays',
    title: 'Alidays',
    discipline: 'UX/UI',
    services: ['Brand Identity', 'Visual Identity'],
    year: '2024',
    href: '/works/alidays',
    image: alidaysImg,
  },
  {
    id: 'redi-website',
    title: 'Redi Website',
    discipline: 'Web',
    services: ['Web Development', 'React'],
    year: '2025',
    href: '/works/redi',
    image: rediImg,
  },
  {
    id: 'romaji',
    title: 'Romaji',
    discipline: 'Branding',
    services: ['Art Direction', 'Layout Design'],
    year: '2024',
    href: '/works/romaji',
    image: romajiImg,
  },
  {
    id: 'atalus',
    title: 'Atalus',
    discipline: 'Branding',
    services: ['Brand Identity', 'Web Design'],
    year: '2025',
    href: '/works/atalus',
    image: atalusImg,
  },
  {
    id: 'reborn',
    title: 'Reborn',
    discipline: 'Branding',
    services: ['Visual Design', 'Print'],
    year: '2023',
    href: '/works/reborn',
    image: rebornImg,
  },
];

const FILTERS = ['All', 'UX/UI', 'Web', 'Branding', 'AI'];

// ─── Animation constants ──────────────────────────────────────────────────────
const LERP_EASE      = 'power3.out';
const LERP_DUR       = 0.35;
const REVEAL_DUR     = 0.5;
const HIDE_DUR       = 0.35;
const IMAGE_W        = 340;
const IMAGE_H        = 420;
const IMAGE_OFFSET_X = 28;
const IMAGE_OFFSET_Y = -IMAGE_H * 0.45;

// ─── View toggle SVG icons ────────────────────────────────────────────────────
function ListIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      className={`transition-colors duration-200 ${active ? 'text-light' : 'text-gray500'}`}>
      <line x1="2" y1="5"  x2="16" y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="9"  x2="16" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GridIconSvg({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      className={`transition-colors duration-200 ${active ? 'text-light' : 'text-gray500'}`}>
      <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CursorImage — floating project preview (list mode, desktop only)
// ─────────────────────────────────────────────────────────────────────────────
function CursorImage({ imgRef }) {
  return (
    <div
      ref={imgRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: `${IMAGE_W}px`,
        height: `${IMAGE_H}px`,
        borderRadius: '8px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 9000,
        opacity: 0,
        scale: '0.92',
        willChange: 'transform, opacity',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}
    >
      <div id="w3-slot-a" style={{ position: 'absolute', inset: 0, transition: 'opacity 0.28s ease' }} />
      <div id="w3-slot-b" style={{ position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.28s ease' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function Work3App() {
  const resizeTick = useResizeTick();
  useAttentionTitle();

  const [activeFilter, setActiveFilter] = useState('All');
  // 'list' on desktop, 'grid' on mobile (pointer:coarse or narrow viewport)
  const [viewMode, setViewMode]         = useState('list');
  const [hoveredId, setHoveredId]       = useState(null);
  const [isAnimating, setIsAnimating]   = useState(false);

  // Keep a ref so callbacks don't need viewMode in their deps
  const viewModeRef = useRef(viewMode);
  useEffect(() => { viewModeRef.current = viewMode; }, [viewMode]);

  const filteredProjects = activeFilter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.discipline === activeFilter);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const pageRef  = useRef(null);
  const heroRef  = useRef(null);
  const tableRef = useRef(null);
  const imgRef   = useRef(null);
  const ctaRef   = useRef(null);

  const cursor = useRef({
    x: 0, y: 0,
    curSlot: 'a',
    isVisible: false,
    quickX: null,
    quickY: null,
    revealAnim: null,
  });

  // ── Force grid on mobile/touch ─────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    if (mq.matches) setViewMode('grid');
  }, []);

  // ── Cursor follow setup ────────────────────────────────────────────────────
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set(el, { x: -IMAGE_W * 2, y: -IMAGE_H * 2 });
    cursor.current.quickX = gsap.quickTo(el, 'x', { duration: LERP_DUR, ease: LERP_EASE });
    cursor.current.quickY = gsap.quickTo(el, 'y', { duration: LERP_DUR, ease: LERP_EASE });

    const onMove = (e) => {
      cursor.current.x = e.clientX + IMAGE_OFFSET_X;
      cursor.current.y = e.clientY + IMAGE_OFFSET_Y;
      if (cursor.current.isVisible && cursor.current.quickX) {
        cursor.current.quickX(cursor.current.x);
        cursor.current.quickY(cursor.current.y);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ── Image show/hide + crossfade ───────────────────────────────────────────
  const getSlotEl = useCallback((slot) => {
    const wrap = imgRef.current;
    return wrap ? wrap.querySelector(`#w3-slot-${slot}`) : null;
  }, []);

  const setSlotBg = useCallback((slot, src) => {
    const el = getSlotEl(slot);
    if (!el) return;
    el.style.backgroundImage    = `url(${src})`;
    el.style.backgroundSize     = 'cover';
    el.style.backgroundPosition = 'center';
  }, [getSlotEl]);

  const showImage = useCallback((src) => {
    const el = imgRef.current;
    const c  = cursor.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (c.quickX) { c.quickX(c.x); c.quickY(c.y); }
    else { gsap.set(el, { x: c.x, y: c.y }); }

    if (!c.isVisible) {
      c.curSlot = 'a';
      setSlotBg('a', src);
      const slotA = getSlotEl('a');
      const slotB = getSlotEl('b');
      if (slotA) slotA.style.opacity = '1';
      if (slotB) slotB.style.opacity = '0';
      if (c.revealAnim) c.revealAnim.kill();
      if (prefersReduced) {
        gsap.set(el, { opacity: 1, scale: 1 });
      } else {
        c.revealAnim = gsap.to(el, { opacity: 1, scale: 1, duration: REVEAL_DUR, ease: 'power3.out' });
      }
      c.isVisible = true;
    } else {
      const nextSlot = c.curSlot === 'a' ? 'b' : 'a';
      const prevSlot = c.curSlot;
      setSlotBg(nextSlot, src);
      const nextEl = getSlotEl(nextSlot);
      const prevEl = getSlotEl(prevSlot);
      if (nextEl) nextEl.style.opacity = '1';
      if (prevEl) prevEl.style.opacity = '0';
      c.curSlot = nextSlot;
    }
  }, [setSlotBg, getSlotEl]);

  const hideImage = useCallback(() => {
    const el = imgRef.current;
    const c  = cursor.current;
    if (!el || !c.isVisible) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (c.revealAnim) c.revealAnim.kill();
    if (prefersReduced) {
      gsap.set(el, { opacity: 0, scale: 0.92 });
    } else {
      c.revealAnim = gsap.to(el, { opacity: 0, scale: 0.92, duration: HIDE_DUR, ease: 'power2.in' });
    }
    c.isVisible = false;
  }, []);

  // ── Row hover handlers ─────────────────────────────────────────────────────
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleRowEnter = useCallback((project) => {
    if (isMobile) return;
    setHoveredId(project.id);
    // Cursor follower only in list mode — grid shows images inline
    if (viewModeRef.current === 'list') showImage(project.image);
  }, [isMobile, showImage]);

  const handleRowLeave = useCallback(() => {
    if (isMobile) return;
    setHoveredId(null);
    if (viewModeRef.current === 'list') hideImage();
  }, [isMobile, hideImage]);

  const handleListLeave = useCallback(() => {
    if (isMobile) return;
    setHoveredId(null);
    if (viewModeRef.current === 'list') hideImage();
  }, [isMobile, hideImage]);

  // ── Hero entry animation ───────────────────────────────────────────────────
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const words    = hero.querySelectorAll('.w3-word');
      const subItems = hero.querySelectorAll('.w3-sub');
      gsap.set(words,    { y: '110%', opacity: 0 });
      gsap.set(subItems, { y: 20, opacity: 0 });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(words, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.08, clearProps: 'transform,opacity' })
        .to(subItems, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, clearProps: 'transform,opacity' }, '-=0.5');
    }, hero);

    return () => ctx.revert();
  }, []);

  // ── Row reveal — Step 1: hide synchronously ────────────────────────────────
  useLayoutEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rows = table.querySelectorAll('.w3-row');
    if (rows.length) gsap.set(rows, { opacity: 0, y: 18 });
  }, [activeFilter, viewMode]);

  // ── Row reveal — Step 2: animate in ───────────────────────────────────────
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rows = Array.from(table.querySelectorAll('.w3-row'));
    if (!rows.length) return;

    const animate = () => {
      gsap.to(rows, {
        opacity: 1, y: 0,
        duration: 0.55, ease: 'power3.out', stagger: 0.055,
        clearProps: 'transform,opacity',
      });
    };

    const rect = table.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      const raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }

    const st = ScrollTrigger.create({ trigger: table, start: 'top 88%', once: true, onEnter: animate });
    return () => st.kill();
  }, [activeFilter, viewMode]);

  // ── CTA reveal ────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const items = cta.querySelectorAll('.w3-cta-item');
      gsap.set(items, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: cta, start: 'top 85%',
        onEnter: () => {
          gsap.to(items, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, clearProps: 'transform,opacity' });
        },
      });
    }, cta);

    return () => ctx.revert();
  }, []);

  // ── Shared stagger-out → update-state → stagger-in ────────────────────────
  const animateTransition = useCallback((updateFn) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { updateFn(); return; }

    const rows = tableRef.current?.querySelectorAll('.w3-row');
    if (!rows?.length) { updateFn(); return; }

    setIsAnimating(true);
    hideImage();
    setHoveredId(null);

    gsap.to(Array.from(rows), {
      opacity: 0, y: -12,
      duration: 0.22, ease: 'power2.in', stagger: 0.03,
      onComplete: () => { updateFn(); setIsAnimating(false); },
    });
  }, [hideImage]);

  const handleFilterChange = useCallback((filter) => {
    if (filter === activeFilter || isAnimating) return;
    animateTransition(() => setActiveFilter(filter));
  }, [activeFilter, isAnimating, animateTransition]);

  const handleViewChange = useCallback((mode) => {
    if (mode === viewMode || isAnimating) return;
    animateTransition(() => setViewMode(mode));
  }, [viewMode, isAnimating, animateTransition]);

  // ── ScrollTrigger refresh on resize ───────────────────────────────────────
  useEffect(() => { ScrollTrigger.refresh(); }, [resizeTick]);

  // Lenis caches the max-scroll limit at render time. When viewMode changes the
  // page height grows significantly (grid images), so we must tell Lenis and
  // ScrollTrigger to recalculate — otherwise scrolling stops before the bottom.
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.lenis) window.lenis.resize();
    }, 80); // small delay so the new layout has painted
    return () => clearTimeout(t);
  }, [viewMode]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div ref={pageRef} className="min-h-screen bg-dark text-light">
      <Header currentPage="Works" />

      {/* Cursor-follow image (list mode, desktop only) */}
      <CursorImage imgRef={imgRef} />

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="px-6 pt-40 pb-20 lg:px-16 xl:px-24 text-center">
          <h1
            className="title-104 font-normal leading-[0.92] tracking-[-0.03em] text-light"
            aria-label="Selected works"
          >
            {['Selected', 'works'].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.18em] last:mr-0" aria-hidden="true">
                <span className="w3-word inline-block">{word}</span>
              </span>
            ))}
          </h1>
        </section>

        {/* ── FILTERS + TOGGLE + PROJECT LIST ───────────────────────────────── */}
        <section className="px-6 pb-0 lg:px-16 xl:px-24">

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 py-6 border-b border-gray700">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                disabled={isAnimating}
                className={`
                  px-3.5 py-1.5 rounded-full font-spaceg text-[11px] uppercase tracking-[0.12em]
                  transition-all duration-200 leading-none select-none
                  ${activeFilter === f
                    ? 'bg-primary text-light'
                    : 'border border-gray600 text-gray500 hover:border-gray400 hover:text-gray200'
                  }
                `}
              >
                {f}
              </button>
            ))}

            {/* View toggle — desktop only */}
            <div className="ml-auto hidden md:flex items-center gap-0.5">
              <button
                onClick={() => handleViewChange('list')}
                disabled={isAnimating}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                className="p-2 rounded-md transition-colors duration-150 hover:bg-white/5"
              >
                <ListIcon active={viewMode === 'list'} />
              </button>
              <button
                onClick={() => handleViewChange('grid')}
                disabled={isAnimating}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                className="p-2 rounded-md transition-colors duration-150 hover:bg-white/5"
              >
                <GridIconSvg active={viewMode === 'grid'} />
              </button>
            </div>
          </div>

          {/* Table column headers — list mode, desktop only */}
          {viewMode === 'list' && (
            <div
              className="hidden md:grid py-4 border-b border-gray700"
              style={{ gridTemplateColumns: 'var(--w3-grid)' }}
            >
              {['Project', 'Discipline', 'Services', 'Year', ''].map((col) => (
                <span key={col} className="font-spaceg text-[10px] uppercase tracking-[0.22em] text-gray500">
                  {col}
                </span>
              ))}
            </div>
          )}

          {/* Project items */}
          <ul
            ref={tableRef}
            onMouseLeave={handleListLeave}
            aria-label="Projects"
            className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 py-6'
              : ''
            }
          >
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredId === project.id;
              // Dimming only in list mode — grid cards rely on image scale only
              const isDimmed  = viewMode === 'list' && hoveredId !== null && !isHovered;
              const num       = String(idx + 1).padStart(2, '0');

              return (
                <li
                  key={project.id}
                  className={`w3-row group ${viewMode === 'list' ? 'border-b border-gray700' : ''}`}
                  onMouseEnter={() => handleRowEnter(project)}
                  onMouseLeave={handleRowLeave}
                >

                  {/* ── GRID CARD (grid mode — all screens) ─────────────────── */}
                  {viewMode === 'grid' && (
                    <TransitionLink
                      to={project.href}
                      data-follower-text="View"
                      className={`block transition-opacity duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
                      aria-label={`View ${project.title} project`}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gray800 mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      </div>
                      {/* Meta */}
                      <div className="flex items-baseline justify-between gap-3">
                        <span
                          className="font-urbanist font-normal text-light leading-tight"
                          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
                        >
                          {project.title}
                        </span>
                        <span className="font-spaceg text-[11px] text-gray500 shrink-0">
                          {project.discipline}
                        </span>
                      </div>
                      <div className="mt-1 font-spaceg text-[11px] text-gray600">
                        {project.year}
                      </div>
                    </TransitionLink>
                  )}

                  {/* ── LIST ROW (list mode — desktop table / mobile card) ──── */}
                  {viewMode === 'list' && (
                    <TransitionLink
                      to={project.href}
                      data-follower-text="View"
                      className={`
                        relative flex items-center py-5 md:py-6
                        transition-opacity duration-300
                        ${isDimmed ? 'opacity-20' : 'opacity-100'}
                      `}
                      aria-label={`View ${project.title} project`}
                    >
                      {/* Hover accent line — desktop */}
                      <span
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary hidden md:block origin-top"
                        style={{
                          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                          transition: 'transform 0.3s ease-out',
                        }}
                        aria-hidden="true"
                      />

                      {/* Desktop grid layout */}
                      <span
                        className="hidden md:grid w-full items-center pl-6"
                        style={{ gridTemplateColumns: 'var(--w3-grid)' }}
                      >
                        {/* Index + Title */}
                        <span className="flex items-center gap-5">
                          <span className="font-spaceg text-[11px] text-gray600 tabular-nums flex-shrink-0 w-6 transition-colors duration-300 group-hover:text-gray400">
                            {num}
                          </span>
                          <span
                            className="font-urbanist font-normal leading-none tracking-tight text-light"
                            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.9rem)' }}
                          >
                            {project.title}
                          </span>
                        </span>

                        {/* Discipline */}
                        <span className="font-spaceg text-[13px] text-gray400 transition-colors duration-300 group-hover:text-gray200">
                          {project.discipline}
                        </span>

                        {/* Services */}
                        <span className="font-spaceg text-[12px] text-gray500 transition-colors duration-300 group-hover:text-gray300">
                          {project.services.join(', ')}
                        </span>

                        {/* Year */}
                        <span className="font-spaceg text-[13px] text-gray500 tabular-nums transition-colors duration-300 group-hover:text-gray300">
                          {project.year}
                        </span>

                        {/* Arrow */}
                        <span
                          className="flex items-center justify-end text-gray600 transition-all duration-300 ease-out group-hover:text-primary group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4 14L14 4M14 4H7M14 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>

                      {/* Mobile: vertical grid card with image */}
                      <span className="flex md:hidden w-full flex-col gap-3 py-1">
                        <span className="relative block overflow-hidden rounded-lg aspect-[4/3] bg-gray800">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </span>
                        <span className="flex items-baseline justify-between gap-2">
                          <span
                            className="font-urbanist font-normal text-light leading-tight"
                            style={{ fontSize: 'clamp(1rem, 5vw, 1.2rem)' }}
                          >
                            {project.title}
                          </span>
                          <span className="font-spaceg text-[11px] text-gray500 shrink-0">
                            {project.discipline}
                          </span>
                        </span>
                        <span className="font-spaceg text-[11px] text-gray600">{project.year}</span>
                      </span>
                    </TransitionLink>
                  )}

                </li>
              );
            })}
          </ul>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <p className="py-16 font-spaceg text-[13px] text-gray500 text-center">
              No projects found in this category.
            </p>
          )}

        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
        <section
          ref={ctaRef}
          className="px-6 py-28 lg:px-16 xl:px-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
        >
          <div className="flex flex-col gap-4">
            <span className="w3-cta-item font-spaceg text-[11px] uppercase tracking-[0.25em] text-gray400">
              Have a project in mind?
            </span>
            <h2 className="w3-cta-item title-80 font-normal leading-none tracking-tight text-light">
              Let's work<br />together.
            </h2>
          </div>

          <div className="w3-cta-item">
            <DynamicButton
              label="Get in touch"
              href="mailto:lorenzopikkolo@gmail.com"
            />
          </div>
        </section>
      </main>

      <Footer resizeTick={resizeTick} />

      <style>{`
        :root { --w3-grid: 2.2fr 1fr 1.5fr 0.5fr 2.5rem; }

        @media (prefers-reduced-motion: reduce) {
          .w3-word, .w3-cta-item, .w3-row {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
