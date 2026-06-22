// src/pages/projects/ProjectPage.jsx
import { useLayoutEffect, useEffect, useRef, useCallback } from 'react';
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

const IMAGE_RADIUS  = '16px';
const IMAGE_PADDING = '24px';

// Cursor-follow constants (match Work3App)
const LERP_DUR       = 0.35;
const LERP_EASE      = 'power3.out';
const REVEAL_DUR     = 0.5;
const HIDE_DUR       = 0.35;
const IMAGE_W        = 340;
const IMAGE_H        = 420;
const IMAGE_OFFSET_X = 28;
const IMAGE_OFFSET_Y = -IMAGE_H * 0.45;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Maps image.aspect → Tailwind class for mobile */
function getMobileAspect(aspect) {
    switch (aspect) {
        case 'portrait':  return 'aspect-[4/5]';
        case 'square':    return 'aspect-square';
        case 'landscape':
        default:          return 'aspect-[16/9]';
    }
}

/** Splits a string into animated word spans */
function renderRevealText(text) {
    return text.split(' ').map((w, i) => (
        <span key={i} className="reveal-word text-light/20 inline-block mr-3">{w}</span>
    ));
}

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────

/**
 * ProjectPage — universal project page template.
 *
 * Project data shape:
 * {
 *   name, category, year,
 *   heroImage,
 *   description,
 *   keyInfo: { client, timeSpan, typeOfWork, kpi },
 *   sections: [ ...section objects ],
 *   nextProject: { name, path, heroImage }
 * }
 *
 * Section types:
 *   { type: 'full-image',  src, alt, aspect }
 *   { type: 'desktop',     src, alt }
 *   { type: 'iphone-row',  images: [{src,alt},...] }
 *   { type: 'text',        content, layout: 'left'|'right'|'center'|'full' }
 *   { type: 'palette',     colors: [{hex,name},...], fonts: [{name,weights,specimen},...] }
 *   { type: 'gallery',     images: [{src,alt,aspect},...] }
 *   { type: 'wireframe',   src, alt, aspect }
 *   { type: 'masonry',     images: [{src,alt},...] }
 */
export default function ProjectPage({ project }) {
    const { navigateTo } = useTransition();
    const resizeTick = useResizeTick();
    const descriptionRef = useRef(null);
    const { handlers: backBtnHandlers, glowStyle: backBtnGlow } = useCursorGlow({ glowSize: 200 });

    const {
        name        = 'Project Name',
        category    = 'WEBSITE',
        year        = '2025',
        heroImage,
        description,
        keyInfo     = {},
        sections    = [],
        nextProject,
    } = project || {};

    // Description word-by-word reveal
    useLayoutEffect(() => {
        const el = descriptionRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            const words = el.querySelectorAll('.reveal-word');
            if (!words.length) return;
            gsap.set(words, { opacity: 0.2, color: 'var(--color-light)' });
            ScrollTrigger.getById('project-desc')?.kill();
            gsap.timeline({
                scrollTrigger: {
                    id: 'project-desc',
                    trigger: el,
                    start: 'top 70%',
                    end: () => `+=${Math.max(600, window.innerHeight * 0.8)}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }).to(words, { opacity: 1, ease: 'none', stagger: { each: 0.12, from: 'start' } });
        }, el);
        return () => ctx.revert();
    }, [resizeTick, description]);

    return (
        <div className="min-h-screen bg-dark text-light">

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

            {/* ── Hero ── */}
            <section className="relative bg-dark pt-[300px]">
                <div className="w-full overflow-x-hidden">
                    <DynamicMarquee duration="70s">
                        <span className="font-urbanist font-normal text-[120px] md:text-[200px] leading-none text-light pr-16">
                            {name}&nbsp;&nbsp;{name}&nbsp;&nbsp;{name}&nbsp;&nbsp;
                        </span>
                    </DynamicMarquee>
                </div>

                {/* Info bar */}
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

                {/* Hero image — portrait on mobile, 16:9 on desktop */}
                {heroImage && (
                    <div className="mt-16 w-full aspect-[9/16] md:aspect-[16/9]" style={{ padding: IMAGE_PADDING }}>
                        <img
                            src={heroImage}
                            alt={`${name} hero`}
                            className="w-full h-full object-cover"
                            style={{ borderRadius: IMAGE_RADIUS }}
                        />
                    </div>
                )}
            </section>

            {/* ── Description ── */}
            {description && (
                <section className="w-full bg-dark py-16 md:py-40 px-4 md:px-12">
                    <div className="flex justify-end">
                        <p
                            ref={descriptionRef}
                            className="font-urbanist text-[22px] md:text-[40px] leading-[1.35] font-normal w-full md:w-[50%]"
                        >
                            {renderRevealText(description)}
                        </p>
                    </div>
                </section>
            )}

            {/* ── Key information ── */}
            {Object.keys(keyInfo).length > 0 && (
                <section className="w-full bg-dark px-4 md:px-12 pb-10 md:pb-16">
                    <div className="flex flex-col gap-8 md:gap-10">
                        <h2 className="font-urbanist text-[26px] md:text-[32px] font-normal text-light">Key information</h2>
                        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between gap-6 md:gap-8">
                            {keyInfo.client && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-spaceg text-[10px] md:text-[12px] uppercase tracking-widest text-gray400">Client</span>
                                    <span className="font-urbanist text-[15px] md:text-[16px] text-light">{keyInfo.client}</span>
                                </div>
                            )}
                            {keyInfo.timeSpan && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-spaceg text-[10px] md:text-[12px] uppercase tracking-widest text-gray400">Time Span</span>
                                    <span className="font-urbanist text-[15px] md:text-[16px] text-light">{keyInfo.timeSpan}</span>
                                </div>
                            )}
                            {keyInfo.typeOfWork && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-spaceg text-[10px] md:text-[12px] uppercase tracking-widest text-gray400">Type of Work</span>
                                    <span className="font-urbanist text-[15px] md:text-[16px] text-light">{keyInfo.typeOfWork}</span>
                                </div>
                            )}
                            {keyInfo.kpi && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-spaceg text-[10px] md:text-[12px] uppercase tracking-widest text-gray400">KPI</span>
                                    <span className="font-urbanist text-[15px] md:text-[16px] text-light">{keyInfo.kpi}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Dynamic sections ── */}
            {sections.map((section, i) => (
                <SectionRenderer
                    key={i}
                    section={section}
                    index={i}
                    name={name}
                    resizeTick={resizeTick}
                />
            ))}

            {/* ── Next project ── */}
            {nextProject && (
                <NextProjectSection nextProject={nextProject} navigateTo={navigateTo} />
            )}

            <Footer resizeTick={resizeTick} />
        </div>
    );
}

// ─────────────────────────────────────────────
// Section router
// ─────────────────────────────────────────────

function SectionRenderer({ section, index, name, resizeTick }) {
    switch (section.type) {
        case 'full-image':  return <FullImageSection  section={section} name={name} index={index} />;
        case 'desktop':     return <DesktopSection    section={section} name={name} index={index} />;
        case 'iphone-row':  return <IPhoneRowSection  section={section} name={name} />;
        case 'text':        return <TextSection       section={section} index={index} resizeTick={resizeTick} />;
        case 'palette':     return <PaletteSection    section={section} />;
        case 'gallery':     return <GallerySection    section={section} name={name} />;
        case 'wireframe':   return <WireframeSection  section={section} name={name} index={index} />;
        case 'masonry':     return <MasonrySection    section={section} name={name} />;
        case 'live-ui':     return (
            <section className="w-full" style={{ paddingLeft: IMAGE_PADDING, paddingRight: IMAGE_PADDING, paddingBottom: IMAGE_PADDING }}>
                {section.content}
            </section>
        );
        default:            return null;
    }
}

// ─────────────────────────────────────────────
// Section components
// ─────────────────────────────────────────────

/**
 * Full-bleed single image
 * Mobile: aspect from data (portrait/square/landscape)
 * Desktop: 16:9
 */
function FullImageSection({ section, name, index }) {
    const mobileAspect = getMobileAspect(section.aspect);
    return (
        <section className="w-full bg-dark py-10 md:py-16" style={{ paddingLeft: IMAGE_PADDING, paddingRight: IMAGE_PADDING }}>
            <div className={`w-full ${mobileAspect} md:aspect-[16/9]`}>
                <img
                    src={section.src}
                    alt={section.alt || `${name} image ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: IMAGE_RADIUS }}
                />
            </div>
        </section>
    );
}

/**
 * Desktop-oriented screenshot — always 16:9
 */
function DesktopSection({ section, name, index }) {
    return (
        <section className="w-full bg-dark py-10 md:py-16" style={{ paddingLeft: IMAGE_PADDING, paddingRight: IMAGE_PADDING }}>
            <div className="w-full aspect-[16/9]">
                <img
                    src={section.src}
                    alt={section.alt || `${name} desktop ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: IMAGE_RADIUS }}
                />
            </div>
        </section>
    );
}

// iPhone portrait aspect ratio (390×844 ≈ 9/19.5)
const IPHONE_ASPECT = 'aspect-[390/844]';

/**
 * 3 iPhone PNG mockups — floating group with staggered vertical offsets.
 * Each phone starts at a different Y position for depth, then parallaxes
 * at a different speed — creates the Dennis Snellenberg floating effect.
 *
 * Desktop: centered group at ~72vw, 3 equal flex columns.
 * Mobile:  3 images in a row (all visible at once), small gap.
 */
function IPhoneRowSection({ section, name }) {
    const images = section.images || [];

    // Descending strengths: forte → medio → debole
    // Creates a clear staircase depth effect (Dennis Snellenberg style)
    const strengths = [16, 9, 3];

    // Static Y offset (px): stagger iniziale che amplifica la scala visiva
    const yOffsets = [80, 40, 0];

    return (
        <section
            className="w-full bg-dark py-24 md:py-40"
            style={{ paddingLeft: IMAGE_PADDING, paddingRight: IMAGE_PADDING }}
        >
            {/* Mobile: all 3 in a row */}
            <div className="flex gap-2 md:hidden">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="flex-1"
                        style={{ transform: `translateY(${yOffsets[i] ?? 0}px)` }}
                    >
                        <ParallaxImage
                            src={img.src}
                            alt={img.alt || `${name} mockup ${i + 1}`}
                            strength={strengths[i] ?? 4}
                            radius="20px"
                            className={`w-full ${IPHONE_ASPECT}`}
                        />
                    </div>
                ))}
            </div>

            {/* Desktop: centered group, max 72% viewport */}
            <div className="hidden md:flex justify-center">
                <div className="flex gap-8 w-[72%]">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="flex-1"
                            style={{ transform: `translateY(${yOffsets[i] ?? 0}px)` }}
                        >
                            <ParallaxImage
                                src={img.src}
                                alt={img.alt || `${name} mockup ${i + 1}`}
                                strength={strengths[i] ?? 4}
                                radius="28px"
                                className={`w-full ${IPHONE_ASPECT}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** Narrative text block with word-by-word scroll reveal */
function TextSection({ section, index, resizeTick }) {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            const isMobile = window.matchMedia('(max-width: 767px)').matches;
            const words = sectionRef.current.querySelectorAll('.reveal-word');
            if (!words.length) return;
            gsap.set(words, { color: 'var(--color-light)', opacity: 0.2 });
            ScrollTrigger.getById(`text-${index}`)?.kill();
            gsap.timeline({
                scrollTrigger: {
                    id: `text-${index}`,
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: () => `+=${isMobile ? 300 : 500}`,
                    scrub: isMobile ? true : 0.5,
                    invalidateOnRefresh: true,
                },
            }).to(words, { opacity: 1, ease: 'none', stagger: { each: 0.12, from: 'start' } });
        }, sectionRef.current);
        return () => ctx.revert();
    }, [resizeTick, index]);

    const layout  = section.layout || 'full';
    const justify = { right: 'justify-end', center: 'justify-center', left: 'justify-start', full: 'justify-start' }[layout];
    const width   = layout === 'full' ? 'w-full' : 'w-full md:w-[50%]';

    return (
        <section ref={sectionRef} className="w-full bg-dark py-14 md:py-24 px-4 md:px-12">
            <div className={`flex ${justify}`}>
                <div className={`font-urbanist text-[19px] md:text-[32px] leading-[1.5] ${width}`}>
                    {renderRevealText(section.content)}
                </div>
            </div>
        </section>
    );
}

/**
 * Palette & Typography section.
 *
 * NEW (image-based) — preferred:
 *   section.paletteImage    = { src, alt }   ← screenshot della palette
 *   section.typographyImage = { src, alt }   ← screenshot della tipografia
 *
 * LEGACY (code-generated) — mantenuto per backward compat:
 *   section.colors = [{ hex, name }, ...]
 *   section.fonts  = [{ name, weights, specimen }, ...]
 */
function PaletteSection({ section }) {
    const hasImages = section.paletteImage || section.typographyImage;

    // ── Image-based mode ───────────────────────────────────────────────────────
    if (hasImages) {
        const items = [
            section.paletteImage    && { ...section.paletteImage,    label: 'Color Palette'  },
            section.typographyImage && { ...section.typographyImage, label: 'Typography'      },
        ].filter(Boolean);

        return (
            <section className="w-full bg-dark" style={{ padding: IMAGE_PADDING }}>
                {/* Mobile: stacked */}
                <div className="flex flex-col gap-4 md:hidden">
                    {items.map((item, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <span className="font-spaceg text-[10px] uppercase tracking-[0.12em] text-gray400">
                                {item.label}
                            </span>
                            <ParallaxImage
                                src={item.src}
                                alt={item.alt || item.label}
                                strength={3 + i * 2}
                                radius={IMAGE_RADIUS}
                                className="w-full aspect-[4/3]"
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop: side by side */}
                <div className="hidden md:flex flex-col gap-5">
                    <div className="flex gap-5">
                        {items.map((item, i) => (
                            <div key={i} className="flex flex-col gap-4 flex-1">
                                <span className="font-spaceg text-[10px] uppercase tracking-[0.12em] text-gray400">
                                    {item.label}
                                </span>
                                <ParallaxImage
                                    src={item.src}
                                    alt={item.alt || item.label}
                                    strength={3 + i * 3}
                                    radius={IMAGE_RADIUS}
                                    className="w-full aspect-[4/3]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // ── Legacy code-generated mode ─────────────────────────────────────────────
    const colors = section.colors || [];
    const fonts  = section.fonts  || [];

    return (
        <section className="w-full bg-dark px-4 md:px-12 py-14 md:py-24">

            {/* Colour swatches */}
            {colors.length > 0 && (
                <div className={fonts.length > 0 ? 'mb-16 md:mb-24' : ''}>
                    <span className="font-spaceg text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-gray400 block mb-6 md:mb-8">
                        Colour Palette
                    </span>
                    <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-3 md:gap-6">
                        {colors.map((color, i) => (
                            <div key={i} className="flex flex-col gap-2 md:gap-3 md:flex-1">
                                <div
                                    className="w-full aspect-[3/2] md:h-[160px] md:aspect-auto rounded-[10px] md:rounded-[12px] border border-white/5"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <div className="flex flex-col gap-[3px]">
                                    {color.name && (
                                        <span className="font-urbanist text-[12px] md:text-[14px] text-light leading-tight">{color.name}</span>
                                    )}
                                    <span className="font-spaceg text-[10px] md:text-[11px] tracking-[0.06em] text-gray400 uppercase">{color.hex}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Typography */}
            {fonts.length > 0 && (
                <div>
                    <span className="font-spaceg text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-gray400 block mb-6 md:mb-8">
                        Typography
                    </span>
                    <div className="flex flex-col gap-0">
                        {fonts.map((font, i) => (
                            <div key={i} className="flex flex-col gap-4 md:gap-5 border-t border-gray600 py-6 md:py-8">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                                    <span className="font-urbanist text-[20px] md:text-[28px] text-light leading-none">
                                        {font.name}
                                    </span>
                                    {font.weights?.length > 0 && (
                                        <div className="flex gap-2 flex-wrap">
                                            {font.weights.map((w, wi) => (
                                                <span
                                                    key={wi}
                                                    className="font-spaceg text-[9px] md:text-[10px] tracking-[0.06em] uppercase text-gray400 border border-gray600 px-2 md:px-3 py-[4px] md:py-[5px] rounded-full"
                                                >
                                                    {w}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {font.specimen && (
                                    <p className="font-urbanist text-[32px] md:text-[72px] leading-[1.05] text-light/50 break-words">
                                        {font.specimen}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

/** Wraps DynamicGallery as a section type */
function GallerySection({ section, name }) {
    return <DynamicGallery images={section.images || []} name={name} />;
}

/** Wireframe / user flow — object-contain so diagrams aren't cropped */
function WireframeSection({ section, name, index }) {
    const mobileAspect = getMobileAspect(section.aspect || 'landscape');
    return (
        <section className="w-full bg-dark" style={{ padding: IMAGE_PADDING }}>
            <div
                className={`w-full ${mobileAspect} md:aspect-[16/9] bg-[#111]`}
                style={{ borderRadius: IMAGE_RADIUS }}
            >
                <img
                    src={section.src}
                    alt={section.alt || `${name} wireframe ${index + 1}`}
                    className="w-full h-full object-contain"
                    style={{ borderRadius: IMAGE_RADIUS }}
                />
            </div>
        </section>
    );
}

/** CSS-columns masonry — ideal for AI visual grids */
function MasonrySection({ section, name }) {
    const images = section.images || [];
    return (
        <section className="w-full bg-dark" style={{ padding: IMAGE_PADDING }}>
            <div className="columns-2 md:columns-3 gap-3 md:gap-6 [column-fill:_balance]">
                {images.map((img, i) => (
                    <div key={i} className="break-inside-avoid mb-3 md:mb-6">
                        <img
                            src={img.src}
                            alt={img.alt || `${name} ${i + 1}`}
                            className="w-full h-auto"
                            style={{ borderRadius: IMAGE_RADIUS }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

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

// ─────────────────────────────────────────────
// DynamicGallery — strict alternation: full → split → full → split
// Full:  one image at 16:9
// Split: two images at 4:5 side by side
// Rule:  two multi-image sections can never be adjacent.
// ─────────────────────────────────────────────

function DynamicGallery({ images, name }) {
    const totalImages    = images.length;
    const loadedCountRef = useRef(0);

    const handleImageLoad = useCallback(() => {
        loadedCountRef.current += 1;
        if (loadedCountRef.current >= totalImages) {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
                if (window.lenis) window.lenis.resize();
            });
        }
    }, [totalImages]);

    const elements = [];
    let idx      = 0;
    let wantSplit = false; // start with full, then alternate

    while (idx < images.length) {
        const remaining = images.length - idx;

        if (wantSplit && remaining >= 2) {
            // Two images side by side
            elements.push(
                <GallerySplit
                    key={`split-${idx}`}
                    left={images[idx]} right={images[idx + 1]}
                    name={name} startIdx={idx} onLoad={handleImageLoad}
                />
            );
            idx += 2;
        } else {
            // Single full-width image (either by choice or because only 1 remains)
            elements.push(
                <GalleryFull
                    key={`full-${idx}`}
                    image={images[idx]} name={name} idx={idx} onLoad={handleImageLoad}
                />
            );
            idx += 1;
        }

        wantSplit = !wantSplit;
    }

    return <>{elements}</>;
}

/**
 * Image with scroll-driven parallax.
 * The entire box (wrapper) translates on the Y axis — Dennis Snellenberg style.
 * The image inside fills the box statically (object-cover, no extra scale).
 *
 * Props:
 *   src, alt, onLoad  — forwarded to <img>
 *   className         — applied to the outer wrapper (aspect ratio, width, etc.)
 *   radius            — border-radius string
 *   strength          — yPercent range applied to the BOX. E.g. 5 → box travels from +5% to -5%
 */
function ParallaxImage({ src, alt, onLoad, className = '', radius = IMAGE_RADIUS, strength = 5 }) {
    const wrapRef = useRef(null);

    useLayoutEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(wrap,
                { yPercent: strength },
                {
                    yPercent: -strength,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrap,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );
        });
        return () => ctx.revert();
    }, [strength]);

    return (
        <div ref={wrapRef} className={className} style={{ overflow: 'hidden', borderRadius: radius }}>
            <img
                src={src}
                alt={alt}
                onLoad={onLoad}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

/**
 * Two images side by side — NOT full-width.
 * Desktop: images are inset (~10% each side), 4:5, the dark background
 *          is clearly visible around and between them.
 * Mobile: stacked full-width, each image uses its own aspect ratio.
 * Parallax: left and right move at slightly different speeds for depth.
 */
function GallerySplit({ left, right, name, startIdx, onLoad }) {
    const lMobile = getMobileAspect(left.aspect);
    const rMobile = getMobileAspect(right.aspect);

    return (
        <section className="w-full bg-dark py-16 md:py-24" style={{ paddingLeft: IMAGE_PADDING, paddingRight: IMAGE_PADDING }}>
            {/* Mobile: stacked */}
            <div className="flex flex-col gap-4 md:hidden">
                <ParallaxImage
                    src={left.src} alt={left.alt || `${name} ${startIdx + 1}`}
                    onLoad={onLoad} strength={14} radius={IMAGE_RADIUS}
                    className={`w-full ${lMobile}`}
                />
                <ParallaxImage
                    src={right.src} alt={right.alt || `${name} ${startIdx + 2}`}
                    onLoad={onLoad} strength={5} radius={IMAGE_RADIUS}
                    className={`w-full ${rMobile}`}
                />
            </div>
            {/* Desktop: side by side — sinistra forte, destra debole */}
            <div className="hidden md:flex justify-center gap-5">
                <ParallaxImage
                    src={left.src} alt={left.alt || `${name} ${startIdx + 1}`}
                    onLoad={onLoad} strength={14} radius={IMAGE_RADIUS}
                    className="w-[38vw] aspect-[4/5] flex-shrink-0"
                />
                <ParallaxImage
                    src={right.src} alt={right.alt || `${name} ${startIdx + 2}`}
                    onLoad={onLoad} strength={5} radius={IMAGE_RADIUS}
                    className="w-[38vw] aspect-[4/5] flex-shrink-0"
                />
            </div>
        </section>
    );
}

/**
 * Single full-width image
 * Mobile: aspect from data  |  Desktop: 16:9
 */
function GalleryFull({ image, name, idx, onLoad }) {
    const mA = getMobileAspect(image.aspect);
    return (
        <section className="w-full bg-dark py-10 md:py-16" style={{ paddingLeft: IMAGE_PADDING, paddingRight: IMAGE_PADDING }}>
            <div className={`w-full ${mA} md:aspect-[16/9]`}>
                <img
                    src={image.src}
                    alt={image.alt || `${name} ${idx + 1}`}
                    onLoad={onLoad}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: IMAGE_RADIUS }}
                />
            </div>
        </section>
    );
}

export { PaletteSection, TextSection };
