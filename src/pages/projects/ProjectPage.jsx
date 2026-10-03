// src/pages/projects/ProjectPage.jsx
import { useLayoutEffect, useEffect, useRef, useCallback, useState } from 'react';
import { useTransition } from '../../context/TransitionContext.jsx';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import { ArrowDown } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig.js';
import useResizeTick from '../../hooks/useResizeTick.js';
import useCursorGlow from '../../hooks/useCursorGlow.js';
import arrow02Left  from '../../../img/icons/arrow-02-left.svg';
import arrow02Right from '../../../img/icons/arrow-02-right.svg';
import DynamicMarquee from '../../components/DynamicMarquee.jsx';
import DynamicButton from '../../components/DynamicButton.jsx';
import './caseHistory.css';
import { LegacySection, scheduleScrollRefresh } from './sections/LegacySections.jsx';
import { LocalNav, Overview, Chapter, CopyTwo, Outro, Highlights } from './sections/common.jsx';
import {
    ScreenTour, PhoneRow, BrandGrid, AppSystem, ColorBands, ShrinkPayoff, PaperCover,
    Bleed, Quote, VinylSleeve, BackCover, PageScroll, DeviceSwitch, SiteSystem,
} from './sections/custom.jsx';
import EuricaLive from './eurica/EuricaLive.jsx';
import LandingFeatures from './eurica/LandingFeatures.jsx';
import LandingHero from './eurica/LandingHero.jsx';

// Cursor-follow constants (match Work3App)
const LERP_DUR       = 0.35;
const LERP_EASE      = 'power3.out';
const REVEAL_DUR     = 0.5;
const HIDE_DUR       = 0.35;
const IMAGE_W        = 340;
const IMAGE_H        = 420;
const IMAGE_OFFSET_X = 28;
const IMAGE_OFFSET_Y = -IMAGE_H * 0.45;

// I tipi di sezione nuovi. Tutto il resto passa a LegacySection (le sezioni della prima versione).
const SECTIONS = {
    chapter: Chapter,
    copy: CopyTwo,
    outro: Outro,
    highlights: ({ section }) => <Highlights items={section.items} title={section.title} />,
    tour: ScreenTour,
    phones: PhoneRow,
    brandgrid: BrandGrid,
    appsystem: AppSystem,
    bands: ColorBands,
    shrink: ShrinkPayoff,
    papercover: PaperCover,
    bleed: Bleed,
    quote: Quote,
    sleeve: VinylSleeve,
    backcover: BackCover,
    pagescroll: PageScroll,
    devices: DeviceSwitch,
    sitesystem: SiteSystem,
    'eurica-live': EuricaLive,
    'landing-features': LandingFeatures,
    'landing-hero': LandingHero,
};

/** Senza `overview` (progetti non ancora migrati) la panoramica si ricava da description e keyInfo. */
function deriveOverview(project) {
    if (project.overview) return project.overview;
    const k = project.keyInfo || {};
    const specs = [['Client', k.client], ['Time Span', k.timeSpan], ['Type of Work', k.typeOfWork], ['Focus', k.kpi]].filter(([, v]) => v);
    if (!project.description && !specs.length) return null;
    return { title: project.name, lede: project.description, specs };
}

/**
 * ProjectPage — lo scheletro di tutte le case history (stile pagina prodotto, pulito e minimale).
 *
 *   Intestazione (marquee del nome, barra categoria · scroll · anno, prima immagine che si allarga)
 *   → barra di sezione (si ferma sotto l'header) → panoramica (titolo, due righe, dati in riga)
 *   → «In short» (carosello) → sezioni del progetto → Next Project → Footer.
 *
 * Project data shape:
 * {
 *   name, category, year, heroImage, heroAlt,
 *   theme: 'eurica' | 'home' | 'atalus' | 'romaji' | 'reborn'   (variabili colore di caseHistory.css)
 *   hue:   colore delle parole sopra i titoli (default: primary del sito)
 *   overview:   { eyebrow, title, lede, specs: [[label, value], ...] }
 *   highlights: [{ src, alt, strong, text, fit, bg, position }]
 *   ctaButton:  { label, href, target, rel }   (bottone fluttuante, opzionale)
 *   sections:   [{ type, ... }]   tipi in SECTIONS qui sopra, oppure quelli di LegacySections
 *               un `chapter` con `nav` finisce anche nella barra di sezione
 *   nextProject: { name, path, heroImage }
 * }
 */
export default function ProjectPage({ project }) {
    const { navigateTo } = useTransition();
    const resizeTick = useResizeTick();
    const rootRef = useRef(null);
    const heroSectionRef = useRef(null);
    const footerRef = useRef(null);
    const { handlers: backBtnHandlers, glowStyle: backBtnGlow } = useCursorGlow({ glowSize: 200 });

    const {
        name        = 'Project Name',
        category    = 'WEBSITE',
        year        = '2025',
        heroImage,
        heroAlt,
        theme,
        hue,
        highlights,
        ctaButton   = null,
        sections    = [],
        nextProject,
    } = project || {};
    const overview = deriveOverview(project || {});
    const navLinks = sections.filter((s) => s.type === 'chapter' && s.nav).map((s) => ({ id: s.id, label: s.nav }));

    // Re-measure once mounted — fixes Lenis staying stuck at the previous
    // page's scroll limit after a client-side (SPA) navigation.
    useEffect(() => {
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(raf);
    }, []);

    // CTA button visibility — like FourthSection's "More projects":
    // appears once the hero has been scrolled past, stays fixed while
    // scrolling through the case history, and hides again once the
    // footer arrives.
    const [ctaPastHero, setCtaPastHero]   = useState(false);
    const [ctaNearFooter, setCtaNearFooter] = useState(false);
    const ctaVisible = Boolean(ctaButton) && ctaPastHero && !ctaNearFooter;

    useLayoutEffect(() => {
        if (!ctaButton) return undefined;
        const heroEl   = heroSectionRef.current;
        const footerEl = footerRef.current;
        if (!heroEl || !footerEl) return undefined;

        const ctx = gsap.context(() => {
            ScrollTrigger.getById('project-cta-show')?.kill();
            ScrollTrigger.create({
                id: 'project-cta-show',
                trigger: heroEl,
                start: 'bottom top',
                onEnter:     () => setCtaPastHero(true),
                onLeaveBack: () => setCtaPastHero(false),
                invalidateOnRefresh: true,
            });
            ScrollTrigger.getById('project-cta-footer')?.kill();
            ScrollTrigger.create({
                id: 'project-cta-footer',
                trigger: footerEl,
                start: 'top 90%',
                onEnter:     () => setCtaNearFooter(true),
                onLeaveBack: () => setCtaNearFooter(false),
                invalidateOnRefresh: true,
            });
        });
        return () => ctx.revert();
    }, [resizeTick, ctaButton]);

    // Effetti comuni: la prima immagine si allarga, i titoli salgono, i dati entrano a scalare
    useLayoutEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        const root = rootRef.current;
        const ctx = gsap.context(() => {
            const hero = root.querySelector('.heroimg .frame');
            if (hero) {
                gsap.fromTo(hero, { clipPath: 'inset(0% 12% 0% 12% round 16px)' }, {
                    clipPath: 'inset(0% 0% 0% 0% round 16px)', ease: 'none',
                    scrollTrigger: { trigger: hero, start: 'top 90%', end: 'top 12%', scrub: true },
                });
            }
            root.querySelectorAll('.ov > .eb, .ov > .display, .ov > .lede, .ch > *').forEach((el) => {
                gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
            });
            root.querySelectorAll('.specs > div').forEach((el, i) => {
                gsap.from(el, { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.07, scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
            });
        }, root);
        return () => ctx.revert();
    }, [resizeTick]);

    return (
        <div ref={rootRef} className="chp min-h-screen bg-dark text-light" style={hue ? { '--hue': hue } : undefined}>
            <div className={`cs${theme ? ` cs--${theme}` : ''}`}>

                {/* ── Floating CTA button — appears after the hero, hides near the footer ── */}
                {ctaButton && (
                    <div
                        className="pointer-events-none fixed left-1/2 -translate-x-1/2 z-[45]"
                        style={{ bottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))' }}
                    >
                        <div
                            className={`transition-transform duration-500 ease-out will-change-transform ${ctaVisible ? 'scale-100' : 'scale-0'}`}
                            style={{ transformOrigin: 'center bottom' }}
                        >
                            <div className="pointer-events-auto">
                                <DynamicButton label={ctaButton.label} href={ctaButton.href} target={ctaButton.target} rel={ctaButton.rel} />
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Back button ── */}
                <button
                    onClick={() => navigateTo('/works')}
                    className="fixed top-[84px] left-4 z-50 w-[60px] h-[60px] md:top-6 md:left-6 md:w-12 md:h-12 aspect-square rounded-[14px] border border-gray600 backdrop-blur-[12px] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: 'var(--blurBg)' }}
                    {...backBtnHandlers}
                >
                    <div style={backBtnGlow} aria-hidden="true" />
                    <img src={arrow02Left} alt="Back" className="w-5 h-5 relative z-10" />
                </button>

                <Header currentPage="Works" />

                {/* ── Intestazione: uguale per tutti i progetti ── */}
                <section ref={heroSectionRef} className="relative bg-dark pt-[300px]">
                    <div className="w-full overflow-x-hidden">
                        <DynamicMarquee duration="70s">
                            <span className="font-urbanist font-normal text-[120px] md:text-[200px] leading-none text-light pr-16">
                                {name}&nbsp;&nbsp;{name}&nbsp;&nbsp;{name}&nbsp;&nbsp;
                            </span>
                        </DynamicMarquee>
                    </div>
                    <h1 className="sr-only">{name}</h1>

                    <div className="mt-16 w-full px-4 md:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 font-spaceg text-[11px] md:text-[12px] tracking-[0.1em] uppercase text-gray400">
                            <span>{category}</span>
                            <div className="flex items-center gap-2">
                                <ArrowDown className="w-3 h-3 md:w-4 md:h-4 animate-[floatUpDown_1.5s_ease-in-out_infinite]" />
                                <span>SCROLL TO EXPLORE</span>
                            </div>
                            <span>CREATED {year}</span>
                        </div>
                    </div>

                    {/* La prima immagine parte incorniciata e si allarga fino ai bordi mentre scorri */}
                    {heroImage && (
                        <div className="heroimg">
                            <div className="frame">
                                <img src={heroImage} alt={heroAlt || `${name} hero`} onLoad={scheduleScrollRefresh} />
                            </div>
                        </div>
                    )}
                </section>

                <LocalNav name={name} links={navLinks} />

                {overview && <Overview overview={overview} />}
                {highlights?.length > 0 && <Highlights items={highlights} />}

                {/* ── Sezioni del progetto ── */}
                {sections.map((section, i) => {
                    const Comp = SECTIONS[section.type];
                    return Comp
                        ? <Comp key={i} section={section} resizeTick={resizeTick} />
                        : <LegacySection key={i} section={section} index={i} name={name} resizeTick={resizeTick} />;
                })}

                {/* ── Next project ── */}
                {nextProject && (
                    <NextProjectSection nextProject={nextProject} navigateTo={navigateTo} />
                )}

                <div ref={footerRef}>
                    <Footer resizeTick={resizeTick} />
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Next project
// ─────────────────────────────────────────────

/**
 * Next project teaser with cursor-following image preview (desktop only).
 * nextProject: { name, path, heroImage }
 */
function NextProjectSection({ nextProject, navigateTo }) {
    const sectionRef = useRef(null);
    const imgWrapRef = useRef(null);
    const cursor     = useRef({
        x: 0, y: 0,
        isVisible: false,
        quickX: null,
        quickY: null,
        revealAnim: null,
    });

    // Set up GSAP cursor follow (desktop only)
    useEffect(() => {
        const isTouchOnly = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchOnly) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const el = imgWrapRef.current;
        if (!el) return;

        gsap.set(el, { x: -IMAGE_W * 2, y: -IMAGE_H * 2 });
        cursor.current.quickX = gsap.quickTo(el, 'x', { duration: LERP_DUR, ease: LERP_EASE });
        cursor.current.quickY = gsap.quickTo(el, 'y', { duration: LERP_DUR, ease: LERP_EASE });

        const onMove = (e) => {
            cursor.current.x = e.clientX + IMAGE_OFFSET_X;
            cursor.current.y = e.clientY + IMAGE_OFFSET_Y;
            if (cursor.current.isVisible) {
                cursor.current.quickX(cursor.current.x);
                cursor.current.quickY(cursor.current.y);
            }
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    const showPreview = useCallback(() => {
        const el  = imgWrapRef.current;
        const c   = cursor.current;
        if (!el) return;
        const isTouchOnly = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchOnly) return;

        if (c.quickX) { c.quickX(c.x); c.quickY(c.y); }
        else { gsap.set(el, { x: c.x, y: c.y }); }

        if (c.revealAnim) c.revealAnim.kill();
        c.revealAnim = gsap.to(el, { opacity: 1, scale: 1, duration: REVEAL_DUR, ease: 'power3.out' });
        c.isVisible = true;
    }, []);

    const hidePreview = useCallback(() => {
        const el = imgWrapRef.current;
        const c  = cursor.current;
        if (!el || !c.isVisible) return;
        if (c.revealAnim) c.revealAnim.kill();
        c.revealAnim = gsap.to(el, { opacity: 0, scale: 0.92, duration: HIDE_DUR, ease: 'power2.in' });
        c.isVisible = false;
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-dark px-4 md:px-12 py-20 md:py-40 cursor-pointer group overflow-hidden border-t border-gray600"
            onClick={() => navigateTo(nextProject.path)}
            onMouseEnter={showPreview}
            onMouseLeave={hidePreview}
        >
            {/* Cursor-follow image preview (desktop) */}
            {nextProject.heroImage && (
                <div
                    ref={imgWrapRef}
                    aria-hidden="true"
                    style={{
                        position: 'fixed',
                        top: 0, left: 0,
                        width:  `${IMAGE_W}px`,
                        height: `${IMAGE_H}px`,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        zIndex: 9000,
                        opacity: 0,
                        scale: '0.92',
                        willChange: 'transform, opacity',
                        backgroundImage: `url(${nextProject.heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-5 md:gap-6">
                <span className="font-spaceg text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-gray400">
                    Next Project
                </span>
                <div className="flex items-center gap-4 md:gap-6">
                    <h2 className="font-urbanist text-[40px] md:text-[96px] leading-[1] text-light transition-opacity duration-500 group-hover:opacity-50">
                        {nextProject.name}
                    </h2>
                    <img
                        src={arrow02Right}
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8 md:w-14 md:h-14 opacity-100 transition-all duration-500 group-hover:opacity-50 group-hover:translate-x-2 flex-shrink-0"
                    />
                </div>
            </div>
        </section>
    );
}

