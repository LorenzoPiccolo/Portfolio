// src/components/PageTransition.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapConfig.js';
import { useTransition } from '../context/TransitionContext.jsx';

// Inline SVG path data from logo.svg for use as mask
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 29" fill="white">
<path d="M13.002 13.0285V8.66812H4.35154V0H0V13.0285H13.002Z"/>
<path d="M13.002 23.6659H0V28.0263H13.002V23.6659Z"/>
<path d="M14.998 19.3692H21.0689L14.998 23.1884V28.0373H28V23.6769H21.9291L28 19.8577V15.0088H14.998V19.3692Z"/>
<path d="M4.35157 18.5312L8.02259 21.512H13.0241L13.0063 21.4975V14.9977H8.65479V17.9642L5.00175 14.9977H2.59072e-05V21.512H4.35157V18.5312Z"/>
<path d="M19.3491 3.24893V0H14.9979V13.0285H19.3491V7.60908H23.6483V9.77127H27.9999V3.24893H19.3491Z"/>
<path d="M13.002 0H6.51203V6.50324H13.002V0Z"/>
</svg>`;

const LOGO_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}")`;

export default function PageTransition() {
    const overlayRef = useRef(null);
    const logoRef = useRef(null);
    const maskLayerRef = useRef(null);
    const { playTransitionRef } = useTransition();

    useEffect(() => {
        // Register the animation callback with the context
        playTransitionRef.current = (onNavigate, onComplete) => {
            const overlay = overlayRef.current;
            const logo = logoRef.current;
            const maskLayer = maskLayerRef.current;

            if (!overlay || !logo || !maskLayer) {
                onNavigate();
                onComplete();
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                },
            });

            // Phase 1: Slide overlay in from bottom
            tl.set(overlay, { display: 'block', clipPath: 'inset(100% 0 0 0)' })
                .set(logo, { opacity: 0, scale: 0.5 })
                .set(maskLayer, { display: 'none', opacity: 0 })
                .to(overlay, {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 0.6,
                    ease: 'power3.inOut',
                })
                // Phase 2: Logo fades in
                .to(logo, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                })
                // Phase 3: Navigate while overlay is covering (add small pause)
                .call(() => {
                    onNavigate();
                    // Scroll to top immediately after nav
                    window.scrollTo(0, 0);
                    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
                })
                .to({}, { duration: 0.15 }) // Small pause for DOM to settle
                // Phase 4: Hide logo
                .to(logo, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    ease: 'power2.in',
                })
                // Phase 5: Slide overlay out to the top
                .to(overlay, {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: 0.6,
                    ease: 'power3.inOut',
                })
                // Cleanup
                .set(overlay, { display: 'none', clipPath: 'inset(100% 0 0 0)' });
        };

        return () => {
            playTransitionRef.current = null;
        };
    }, [playTransitionRef]);

    return (
        <>
            {/* Dark overlay that slides in */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9995] pointer-events-none"
                style={{
                    display: 'none',
                    backgroundColor: '#181818',
                    clipPath: 'inset(100% 0 0 0)',
                }}
            >
                {/* Centered logo for the "appear" phase */}
                <div
                    ref={logoRef}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: 0 }}
                >
                    <svg width="60" height="62" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.002 13.0285V8.66812H4.35154V0H0V13.0285H13.002Z" fill="#F4F4F4" />
                        <path d="M13.002 23.6659H0V28.0263H13.002V23.6659Z" fill="#F4F4F4" />
                        <path d="M14.998 19.3692H21.0689L14.998 23.1884V28.0373H28V23.6769H21.9291L28 19.8577V15.0088H14.998V19.3692Z" fill="#F4F4F4" />
                        <path d="M4.35157 18.5312L8.02259 21.512H13.0241L13.0063 21.4975V14.9977H8.65479V17.9642L5.00175 14.9977H2.59072e-05V21.512H4.35157V18.5312Z" fill="#F4F4F4" />
                        <path d="M19.3491 3.24893V0H14.9979V13.0285H19.3491V7.60908H23.6483V9.77127H27.9999V3.24893H19.3491Z" fill="#F4F4F4" />
                        <path d="M13.002 0H6.51203V6.50324H13.002V0Z" fill="#F4F4F4" />
                    </svg>
                </div>
            </div>

            {/* Mask layer: shows the new page content through the logo shape */}
            <div
                ref={maskLayerRef}
                className="fixed inset-0 z-[9996] pointer-events-none"
                style={{
                    display: 'none',
                    opacity: 0,
                    backgroundColor: 'transparent',
                    /* This layer will be transparent, letting the page show through the mask */
                    /* The mask reveals the page underneath by punching through the overlay */
                    backdropFilter: 'none',
                }}
            />
        </>
    );
}
