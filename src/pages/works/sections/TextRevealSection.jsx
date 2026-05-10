// src/pages/works/sections/TextRevealSection.jsx
import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';

const TEXTS = [
    'White space creates focus. Silence holds meaning.',
    'In a landscape defined by speed and automation, design must remain thoughtful.',
    'The goal is not complexity, but clarity.',
];

export default function TextRevealSection({ resizeTick = 0 }) {
    const sectionRef = useRef(null);
    const textsRef = useRef([]);
    const progressBarsRef = useRef([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const texts = textsRef.current.filter(Boolean);
            const progressBars = progressBarsRef.current.filter(Boolean);
            if (!texts.length) return;

            // Initial state: all texts invisible and slightly translated
            gsap.set(texts, {
                opacity: 0,
                y: 60,
                scale: 0.95,
            });

            // Initial state: all progress bars empty
            gsap.set(progressBars, {
                scaleX: 0,
                transformOrigin: 'left center',
            });

            ScrollTrigger.getById('text-reveal-section')?.kill();

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'text-reveal-section',
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 3}`, // 3x viewport height for smooth scrolling
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    markers: false,
                },
            });

            // Each text fades in, stays visible, then fades out
            // Progress bar fills during the entire text animation cycle
            texts.forEach((text, index) => {
                const isLast = index === texts.length - 1;
                const progressBar = progressBars[index];

                // Fade in text and start filling progress bar
                tl.to(text, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power2.out',
                }, index === 0 ? 0 : undefined);

                // Fill progress bar during fade in
                if (progressBar) {
                    tl.to(progressBar, {
                        scaleX: 0.4,
                        duration: 1,
                        ease: 'none',
                    }, '<');
                }

                // Hold visible - continue filling progress bar
                tl.to(text, {
                    opacity: 1,
                    duration: 0.5,
                });

                if (progressBar) {
                    tl.to(progressBar, {
                        scaleX: 0.7,
                        duration: 0.5,
                        ease: 'none',
                    }, '<');
                }

                // Fade out (except for the last one which stays visible)
                if (!isLast) {
                    tl.to(text, {
                        opacity: 0,
                        y: -40,
                        scale: 1.02,
                        duration: 0.8,
                        ease: 'power2.in',
                    });

                    // Complete progress bar fill during fade out
                    if (progressBar) {
                        tl.to(progressBar, {
                            scaleX: 1,
                            duration: 0.8,
                            ease: 'none',
                        }, '<');
                    }
                } else {
                    // For last text, complete the progress bar
                    if (progressBar) {
                        tl.to(progressBar, {
                            scaleX: 1,
                            duration: 0.3,
                            ease: 'none',
                        });
                    }
                }
            });
        }, section);

        return () => ctx.revert();
    }, [resizeTick]);

    return (
        <section
            ref={sectionRef}
            className="relative w-screen h-screen flex items-center justify-center bg-dark overflow-hidden"
        >
            {/* Optional subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark pointer-events-none" />

            {/* Text container */}
            <div className="relative z-10 w-full max-w-5xl px-6 text-center">
                {TEXTS.map((text, index) => (
                    <h2
                        key={index}
                        ref={(el) => (textsRef.current[index] = el)}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 title-32 lg:title-44 font-medium text-light leading-tight"
                    >
                        {text}
                    </h2>
                ))}
            </div>

            {/* Progress indicator lines */}
            <div
                className="absolute left-1/2 -translate-x-1/2 flex gap-3"
                style={{ bottom: '64px' }}
            >
                {TEXTS.map((_, index) => (
                    <div
                        key={index}
                        className="relative h-[2px] bg-light/20 overflow-hidden"
                        style={{ width: '40px' }}
                    >
                        {/* Fill bar */}
                        <div
                            ref={(el) => (progressBarsRef.current[index] = el)}
                            className="absolute inset-0 bg-light origin-left"
                            style={{ transform: 'scaleX(0)' }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
