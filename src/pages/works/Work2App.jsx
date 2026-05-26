// src/pages/works/Work2App.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig.js';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import TransitionLink from '../../components/TransitionLink.jsx';
import useResizeTick from '../../hooks/useResizeTick.js';
import useAttentionTitle from '../../hooks/useAttentionTitle.js';

// ─── Images ──────────────────────────────────────────────────────────────────
import buildZeroImg   from '../../../img/build-zero/build-zero-01.jpg';
import portfolioImg   from '../../../img/portfolio/portfolio-01.jpg';
import alidaysImg     from '../../../img/footer-image.jpg';
import rediImg        from '../../../img/image-footer-05.jpg';
import romajiImg      from '../../../img/romaji/romaji-01.jpg';
import atalusImg      from '../../../img/atalus/atalus-01.jpg';
import rebornImg      from '../../../img/reborn/reborn-01.jpg';

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_PROJECTS = [
  { id: 'build-zero',        title: 'Build Zero',        type: 'UX/UI',            year: '2024', image: buildZeroImg, href: '/works/build-zero'        },
  { id: 'portfolio-website', title: 'Portfolio Website', type: 'Web Design',        year: '2025', image: portfolioImg, href: '/works/portfolio-website'  },
  { id: 'alidays',           title: 'Alidays',           type: 'Brand Identity',    year: '2024', image: alidaysImg,  href: '/works/alidays'             },
  { id: 'redi-website',      title: 'Redi Website',      type: 'Web Development',   year: '2025', image: rediImg,     href: '/works/redi'                },
  { id: 'romaji',            title: 'Romaji',            type: 'Magazine',          year: '2024', image: romajiImg,   href: '/works/romaji'              },
  { id: 'atalus',            title: 'Atalus',            type: 'Brand Identity',    year: '2025', image: atalusImg,   href: '/works/atalus'              },
  { id: 'reborn',            title: 'Reborn',            type: 'Vinyl',             year: '2023', image: rebornImg,   href: '/works/reborn'              },
];

const FILTERS = ['All', 'UX/UI', 'Web Design', 'Web Development', 'Brand Identity', 'Magazine', 'Vinyl'];

// ─── Animation constants ──────────────────────────────────────────────────────
const EASE          = 'cubic-bezier(0.76, 0, 0.24, 1)';
const CLIP_HIDDEN   = 'inset(0% 0% 100% 0% round 10px)';
const CLIP_VISIBLE  = 'inset(0% 0% 0%   0% round 10px)';
const REVEAL_MS     = 520;
const HIDE_MS       = 380;
const SLIDE_MS      = 440;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Work2App() {
  const resizeTick = useResizeTick();
  useAttentionTitle();

  const [activeFilter, setActiveFilter]   = useState('All');
  const [hoveredId,    setHoveredId]      = useState(null);

  const filteredProjects = activeFilter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.type === activeFilter);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const clipWrapRef = useRef(null);
  const slotARef    = useRef(null);
  const slotBRef    = useRef(null);
  const imgARef     = useRef(null);
  const imgBRef     = useRef(null);
  const listRef     = useRef(null);

  // Mutable animation state (never triggers re-render)
  const anim = useRef({
    curSlot:   'A',   // 'A' | 'B'
    activeIdx: -1,    // index within filteredProjects
    isVisible: false,
    clipAnim:  null,
    slideAnims: [],
  });

  // Always-current reference to the filtered list (avoids stale closure)
  const projectsRef = useRef(filteredProjects);
  useEffect(() => { projectsRef.current = filteredProjects; }, [filteredProjects]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const setSlotImg = useCallback((slot, src) => {
    const el = slot === 'A' ? imgARef.current : imgBRef.current;
    if (el) el.src = src;
  }, []);

  const revealBlock = useCallback(() => {
    const wrap = clipWrapRef.current;
    if (!wrap) return;
    const st = anim.current;
    if (st.clipAnim) { try { st.clipAnim.cancel(); } catch (_) {} st.clipAnim = null; }
    wrap.style.clipPath = CLIP_HIDDEN;
    const a = wrap.animate(
      [{ clipPath: CLIP_HIDDEN }, { clipPath: CLIP_VISIBLE }],
      { duration: REVEAL_MS, easing: EASE, fill: 'forwards' }
    );
    a.onfinish = () => { wrap.style.clipPath = CLIP_VISIBLE; };
    st.clipAnim  = a;
    st.isVisible = true;
  }, []);

  const hideBlock = useCallback(() => {
    const wrap = clipWrapRef.current;
    const st   = anim.current;
    if (!wrap || !st.isVisible) { st.isVisible = false; st.activeIdx = -1; return; }
    if (st.clipAnim) { try { st.clipAnim.cancel(); } catch (_) {} st.clipAnim = null; }
    const a = wrap.animate(
      [{ clipPath: CLIP_VISIBLE }, { clipPath: CLIP_HIDDEN }],
      { duration: HIDE_MS, easing: EASE, fill: 'forwards' }
    );
    a.onfinish = () => { wrap.style.clipPath = CLIP_HIDDEN; };
    st.clipAnim  = a;
    st.isVisible = false;
    st.activeIdx = -1;
  }, []);

  const slideSwap = useCallback((newIdx, goingDown) => {
    const st     = anim.current;
    const fromY  = goingDown ? '100%'  : '-100%';
    const exitY  = goingDown ? '-100%' : '100%';
    const nxtSlot  = st.curSlot === 'A' ? 'B' : 'A';
    const curSlotEl = st.curSlot === 'A' ? slotARef.current : slotBRef.current;
    const nxtSlotEl = st.curSlot === 'A' ? slotBRef.current : slotARef.current;

    // Cancel any running slide
    st.slideAnims.forEach(a => { try { a.cancel(); } catch (_) {} });
    st.slideAnims = [];

    // Load image into next slot before animating
    setSlotImg(nxtSlot, projectsRef.current[newIdx].image);
    if (nxtSlotEl) nxtSlotEl.style.transform = `translateY(${fromY})`;

    const aCur = curSlotEl?.animate(
      [{ transform: 'translateY(0%)' }, { transform: `translateY(${exitY})` }],
      { duration: SLIDE_MS, easing: EASE, fill: 'forwards' }
    );
    const aNxt = nxtSlotEl?.animate(
      [{ transform: `translateY(${fromY})` }, { transform: 'translateY(0%)' }],
      { duration: SLIDE_MS, easing: EASE, fill: 'forwards' }
    );

    if (aNxt) {
      aNxt.onfinish = () => {
        // Park old slot off-screen so it's ready for next swap
        if (curSlotEl) curSlotEl.style.transform = 'translateY(100%)';
        if (nxtSlotEl) nxtSlotEl.style.transform = 'translateY(0%)';
      };
    }

    if (aCur) st.slideAnims.push(aCur);
    if (aNxt) st.slideAnims.push(aNxt);

    st.curSlot   = nxtSlot;
    st.activeIdx = newIdx;
  }, [setSlotImg]);

  // ── Row handlers ───────────────────────────────────────────────────────────
  const handleRowEnter = useCallback((idx) => {
    const st = anim.current;

    if (!st.isVisible) {
      // First reveal: paint slot A immediately, then reveal clip-path
      setSlotImg('A', projectsRef.current[idx].image);
      if (slotARef.current) slotARef.current.style.transform = 'translateY(0%)';
      if (slotBRef.current) slotBRef.current.style.transform = 'translateY(100%)';
      anim.current.curSlot   = 'A';
      anim.current.activeIdx = idx;
      revealBlock();
    } else if (idx !== st.activeIdx) {
      slideSwap(idx, idx > st.activeIdx);
    }

    setHoveredId(projectsRef.current[idx].id);
  }, [revealBlock, slideSwap, setSlotImg]);

  const handleListLeave = useCallback(() => {
    hideBlock();
    setHoveredId(null);
  }, [hideBlock]);

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [resizeTick]);

  // Reset image state when filter changes
  useEffect(() => {
    hideBlock();
    if (slotARef.current) slotARef.current.style.transform = 'translateY(0%)';
    if (slotBRef.current) slotBRef.current.style.transform = 'translateY(100%)';
    anim.current.curSlot   = 'A';
    anim.current.activeIdx = -1;
    setHoveredId(null);
  }, [activeFilter, hideBlock]);

  // Entry animation for list rows
  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('.w2-row');
    if (!rows?.length) return;
    const ctx = gsap.context(() => {
      gsap.from(rows, {
        y: 24,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.055,
        clearProps: 'all',
      });
    });
    return () => ctx.revert();
  }, [activeFilter]); // Re-animate when filter changes

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark text-light">
      <Header currentPage="Works" />

      <main>
        {/* ── Page hero ─────────────────────────────────────────────────── */}
        <section className="px-6 pt-36 pb-12 lg:px-16">
          <div className="flex items-end justify-between border-b border-gray600 pb-8">
            <h1
              className="font-urbanist font-semibold leading-none tracking-tighter text-light"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
            >
              Works
            </h1>
            <p className="font-spaceg text-13 text-gray400 mb-1 tabular-nums">
              {String(filteredProjects.length).padStart(2, '0')} projects
            </p>
          </div>
        </section>

        {/* ── Filters + List ────────────────────────────────────────────── */}
        <section className="px-6 pb-32 lg:px-16">

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`
                  px-4 py-1.5 rounded-full font-spaceg text-13 transition-all duration-200 leading-none
                  ${activeFilter === f
                    ? 'bg-primary text-light'
                    : 'border border-gray600 text-gray400 hover:border-gray300 hover:text-light'
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── Two-column layout ──────────────────────────────────────── */}
          <div className="flex items-start gap-0 lg:gap-16">

            {/* ── Project list ───────────────────────────────────────── */}
            <ul
              ref={listRef}
              className="flex-1 min-w-0"
              onMouseLeave={handleListLeave}
            >
              {filteredProjects.map((project, idx) => {
                const isHovered = hoveredId === project.id;
                const isDimmed  = hoveredId !== null && !isHovered;
                const num       = String(idx + 1).padStart(2, '0');

                return (
                  <li
                    key={project.id}
                    className="w2-row border-t border-gray600 group"
                    onMouseEnter={() => handleRowEnter(idx)}
                  >
                    <TransitionLink
                      to={project.href}
                      className={`
                        flex items-center gap-4 lg:gap-6 py-5 lg:py-7
                        transition-opacity duration-300
                        ${isDimmed ? 'opacity-25' : 'opacity-100'}
                      `}
                    >
                      {/* Index */}
                      <span className="w-8 font-spaceg text-12 text-gray500 flex-shrink-0 transition-colors duration-300 group-hover:text-gray300">
                        {num}
                      </span>

                      {/* Title */}
                      <span
                        className="flex-1 font-urbanist font-semibold leading-none tracking-tight text-light transition-colors duration-200"
                        style={{ fontSize: 'clamp(1.25rem, 3vw, 2.25rem)' }}
                      >
                        {project.title}
                      </span>

                      {/* Category */}
                      <span className="hidden sm:block font-spaceg text-13 text-gray400 flex-shrink-0 transition-colors duration-300 group-hover:text-gray200">
                        {project.type}
                      </span>

                      {/* Year */}
                      <span className="font-spaceg text-13 text-gray400 flex-shrink-0 w-10 text-right transition-colors duration-300 group-hover:text-gray200">
                        {project.year}
                      </span>

                      {/* Arrow */}
                      <span
                        className="flex-shrink-0 text-gray600 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 select-none"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </TransitionLink>
                  </li>
                );
              })}

              {/* Closing border */}
              <li className="border-t border-gray600" aria-hidden="true" />
            </ul>

            {/* ── Sticky image panel (desktop only) ──────────────────── */}
            <div className="hidden lg:flex w-[42%] flex-shrink-0 sticky top-0 h-screen items-center justify-center pointer-events-none">
              {/*
                clip-wrap: handles show/hide via clip-path
                Two absolute slots inside handle per-row image transitions via translateY
              */}
              <div
                ref={clipWrapRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '460px',
                  aspectRatio: '4 / 5',
                  maxHeight: '72vh',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  clipPath: CLIP_HIDDEN,
                  willChange: 'clip-path',
                }}
              >
                {/* Slot A */}
                <div
                  ref={slotARef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'translateY(0%)',
                    willChange: 'transform',
                  }}
                >
                  <img
                    ref={imgARef}
                    src={ALL_PROJECTS[0].image}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Slot B */}
                <div
                  ref={slotBRef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'translateY(100%)',
                    willChange: 'transform',
                  }}
                >
                  <img
                    ref={imgBRef}
                    src={ALL_PROJECTS[1].image}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>

          </div>{/* end flex */}
        </section>
      </main>

      <Footer resizeTick={resizeTick} />
    </div>
  );
}
