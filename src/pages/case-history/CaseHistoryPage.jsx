// src/pages/case-history/CaseHistoryPage.jsx
import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import { ArrowDown } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig.js';
import useResizeTick from '../../hooks/useResizeTick.js';
import useCursorGlow from '../../hooks/useCursorGlow.js';
import arrow02Left from '../../../img/icons/arrow-02-left.svg';
import DynamicMarquee from '../../components/DynamicMarquee.jsx';

const COLOR_LIGHT = 'var(--color-light)';
const IMAGE_RADIUS = '16px';
const IMAGE_PADDING = '24px';

/**
 * CaseHistoryPage - Reusable case history/project page template
 */
export default function CaseHistoryPage({ project }) {
    const navigate = useNavigate();
    const resizeTick = useResizeTick();
    const heroRef = useRef(null);
    const descriptionRef = useRef(null);
    const { handlers: backButtonGlowHandlers, glowStyle: backButtonGlowStyle } = useCursorGlow({ glowSize: 200 });

    const {
        name = 'Project Name',
        category = 'WEBSITE',
        year = '2025',
        heroImage,
        description,
        images = [],
        sections = [],
    } = project || {};

    // Word-by-word text reveal animation (matching works page)
    useLayoutEffect(() => {
        const el = descriptionRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const words = el.querySelectorAll('.reveal-word');
            if (!words.length) return;

            // Initial state: light color with 20% opacity
            gsap.set(words, { opacity: 0.2, color: COLOR_LIGHT });

            ScrollTrigger.getById('case-history-text')?.kill();

            gsap.timeline({
                scrollTrigger: {
                    id: 'case-history-text',
                    trigger: el,
                    start: 'top 70%',
                    end: () => `+=${Math.max(600, window.innerHeight * 0.8)}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                    markers: false,
                },
            }).to(words, {
                opacity: 1,
                ease: 'none',
                stagger: { each: 0.12, from: 'start' },
            });
        }, el);

        return () => ctx.revert();
    }, [resizeTick, description]);



    // Helper: wrap each word in span for animation
    const renderText = (text) =>
        text.split(' ').map((w, i) => (
            <span key={i} className="reveal-word text-light/20 inline-block mr-3">{w}</span>
        ));

    return (
        <div className="min-h-screen bg-dark text-light">
            {/* Back Button - Fixed position, same height as header */}
            <button
                onClick={() => {
                    // Navigate back to works page if history is empty or external
                    if (window.history.state && window.history.state.idx > 0) {
                        navigate(-1);
                    } else {
                        navigate('/works');
                    }
                }}
                className="fixed top-[84px] left-4 z-50 w-[60px] h-[60px] md:top-6 md:left-6 md:w-12 md:h-12 aspect-square rounded-[14px] border border-gray600 backdrop-blur-[12px] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                style={{ backgroundColor: 'var(--blurBg)' }}
                {...backButtonGlowHandlers}
            >
                <div style={backButtonGlowStyle} aria-hidden="true" />
                <img src={arrow02Left} alt="Back" className="w-5 h-5 relative z-10" />
            </button>

            <Header currentPage="Works" />

            {/* Hero Section */}
            <section ref={heroRef} className="relative bg-dark pt-[300px]">
                {/* Project Name Marquee - NO overflow hidden */}
                <div className="w-full overflow-x-hidden">
                    <DynamicMarquee duration="70s">
                        <span className="font-urbanist font-normal text-[120px] md:text-[200px] leading-none text-light pr-16">
                            {name}&nbsp;&nbsp;{name}&nbsp;&nbsp;{name}&nbsp;&nbsp;
                        </span>
                    </DynamicMarquee>
                </div>

                {/* Info Bar - 64px below marquee */}
                <div className="mt-16 w-full px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-none md:items-center font-spaceg text-[12px] tracking-[0.1em] uppercase text-gray400">
                        <span>{category}</span>
                        <div className="flex items-center gap-2">
                            <ArrowDown className="w-4 h-4 animate-[floatUpDown_1.5s_ease-in-out_infinite]" />
                            <span>SCROLL TO EXPLORE</span>
                        </div>
                        <span>CREATED {year}</span>
                    </div>
                </div>

                {/* Hero Image - 64px below info bar, with radius and padding */}
                {heroImage && (
                    <div className="mt-16 w-full aspect-[9/16] md:aspect-auto md:h-[100svh]" style={{ padding: IMAGE_PADDING }}>
                        <img
                            src={heroImage}
                            alt={`${name} hero`}
                            className="w-full h-full object-cover"
                            style={{ borderRadius: IMAGE_RADIUS }}
                        />
                    </div>
                )}
            </section>

            {/* Description Section - 50% width, right aligned, word-by-word reveal */}
            {description && (
                <section className="w-full bg-dark py-24 md:py-40 px-6 md:px-12">
                    <div className="flex justify-end">
                        <p
                            ref={descriptionRef}
                            className="font-urbanist text-[28px] md:text-[40px] leading-[1.3] font-normal w-full md:w-[50%]"
                        >
                            {renderText(description)}
                        </p>
                    </div>
                </section>
            )}

            {/* Two Images Section - Right image sticky in center */}
            {images.length >= 2 && (
                <section className="w-full bg-dark" style={{ padding: IMAGE_PADDING }}>
                    {/* Desktop: flex row, Mobile: flex column */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-6">
                        {/* Left image - 9:16 on mobile, 100svh on desktop */}
                        <div className="w-full md:w-[45vw] aspect-[9/16] md:aspect-auto md:h-[100svh]">
                            <img
                                src={images[0].src}
                                alt={images[0].alt || `${name} image 1`}
                                className="w-full h-full object-cover"
                                style={{ borderRadius: IMAGE_RADIUS }}
                            />
                        </div>
                        {/* Right image - sticky at center when section reaches middle */}
                        <div className="w-full md:w-[45vw] md:h-[100svh] flex items-start">
                            <div
                                className="w-full aspect-[9/16] md:aspect-auto md:h-[40svh] md:sticky"
                                style={{ top: 'calc(50vh - 20svh)' }}
                            >
                                <img
                                    src={images[1].src}
                                    alt={images[1].alt || `${name} image 2`}
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: IMAGE_RADIUS }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Second Full Width Image */}
            {images.length >= 3 && (
                <section className="w-full bg-dark" style={{ padding: IMAGE_PADDING }}>
                    <div className="w-full aspect-[9/16] md:aspect-auto md:h-[100svh]">
                        <img
                            src={images[2].src}
                            alt={images[2].alt || `${name} image 3`}
                            className="w-full h-full object-cover"
                            style={{ borderRadius: IMAGE_RADIUS }}
                        />
                    </div>
                </section>
            )}

            {/* Split Section - Long image on right, small sticky on left */}
            {images.length >= 5 && (
                <section className="w-full bg-dark" style={{ padding: IMAGE_PADDING }}>
                    <div className="flex flex-col md:flex-row md:justify-between gap-6">
                        {/* Left image - small, sticky at center */}
                        <div className="w-full md:w-[45vw] md:h-[100svh] flex items-start">
                            <div
                                className="w-full aspect-[9/16] md:aspect-auto md:h-[40svh] md:sticky"
                                style={{ top: 'calc(50vh - 20svh)' }}
                            >
                                <img
                                    src={images[3].src}
                                    alt={images[3].alt || `${name} image 4`}
                                    className="w-full h-full object-cover"
                                    style={{ borderRadius: IMAGE_RADIUS }}
                                />
                            </div>
                        </div>
                        {/* Right image - 9:16 on mobile, 100svh on desktop (long) */}
                        <div className="w-full md:w-[45vw] aspect-[9/16] md:aspect-auto md:h-[100svh]">
                            <img
                                src={images[4].src}
                                alt={images[4].alt || `${name} image 5`}
                                className="w-full h-full object-cover"
                                style={{ borderRadius: IMAGE_RADIUS }}
                            />
                        </div>
                    </div>
                </section>
            )}

            <Footer resizeTick={resizeTick} />
        </div>
    );
}

/**
 * CaseHistorySection - Reusable section component with word-by-word text reveal
 */
function CaseHistorySection({ type, content, layout = 'full', sectionIndex, resizeTick }) {
    const sectionRef = useRef(null);

    // Word-by-word text reveal for text sections
    useLayoutEffect(() => {
        if (type !== 'text' || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            const isMobileDevice = window.matchMedia('(max-width: 767px)').matches;
            const words = sectionRef.current.querySelectorAll('.reveal-word');
            if (!words.length) return;

            gsap.set(words, { color: 'var(--color-light)', opacity: 0.2 });

            ScrollTrigger.getById(`case-section-${sectionIndex}`)?.kill();
            gsap.timeline({
                scrollTrigger: {
                    id: `case-section-${sectionIndex}`,
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: () => `+=${isMobileDevice ? 300 : 500}`,
                    scrub: isMobileDevice ? true : 0.5,
                    invalidateOnRefresh: true,
                    markers: false,
                },
            }).to(words, {
                opacity: 1,
                ease: 'none',
                stagger: { each: 0.12, from: 'start' },
            });
        }, sectionRef.current);

        return () => ctx.revert();
    }, [resizeTick, type, sectionIndex]);

    // Helper: wrap each word
    const renderText = (text) =>
        text.split(' ').map((w, i) => (
            <span key={i} className="reveal-word text-light/20 inline-block mr-3">{w}</span>
        ));

    switch (type) {
        case 'text':
            return (
                <section ref={sectionRef} className="w-full bg-dark py-16 md:py-24 px-6 md:px-12">
                    <div className={`flex ${layout === 'right' ? 'justify-end' : layout === 'center' ? 'justify-center' : 'justify-start'}`}>
                        <div className={`font-urbanist text-[20px] md:text-[24px] leading-[1.5] ${layout === 'full' ? 'w-full' : 'w-full md:w-[50%]'
                            }`}>
                            {renderText(content)}
                        </div>
                    </div>
                </section>
            );

        case 'image':
            return (
                <section className={`w-full bg-dark ${content.rounded ? 'p-6' : ''}`}>
                    <img
                        src={content.src}
                        alt={content.alt || 'Project image'}
                        className={`w-full h-[100svh] object-cover ${content.rounded ? 'rounded-[24px]' : ''
                            }`}
                    />
                </section>
            );

        case 'gallery':
            return (
                <section className="w-full bg-dark py-8 px-6 md:px-12">
                    <div className={`grid gap-6 ${content.columns === 3 ? 'grid-cols-1 md:grid-cols-3' :
                        content.columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
                            'grid-cols-1'
                        }`}>
                        {content.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img.src}
                                alt={img.alt || `Gallery image ${i + 1}`}
                                className="w-full aspect-[4/3] object-cover rounded-[16px]"
                            />
                        ))}
                    </div>
                </section>
            );

        case 'split':
            return (
                <section ref={sectionRef} className="w-full bg-dark py-16 md:py-24 px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="font-urbanist text-[20px] md:text-[24px] leading-[1.5]">
                            {renderText(content.text)}
                        </div>
                        <img
                            src={content.image?.src}
                            alt={content.image?.alt || 'Project image'}
                            className="w-full aspect-[4/3] object-cover rounded-[16px]"
                        />
                    </div>
                </section>
            );

        default:
            return null;
    }
}

export { CaseHistorySection };
