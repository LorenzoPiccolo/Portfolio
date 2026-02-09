// src/components/IntroLoader.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapConfig.js';

const MIN_DURATION = 1; // seconds

export default function IntroLoader({ onComplete }) {
    const wrapperRef = useRef(null);
    const fillRef = useRef(null);
    const readyRef = useRef(false);
    const fillDoneRef = useRef(false);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const fill = fillRef.current;
        if (!wrapper || !fill) return;

        // Lock scroll
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();

        const startTime = Date.now();

        const exit = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    if (window.lenis) window.lenis.start();
                    onComplete?.();
                },
            });

            // Brief hold, then slide out
            tl.to({}, { duration: 0.3 })
                .to(wrapper, {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: 0.6,
                    ease: 'power3.inOut',
                });
        };

        const tryExit = () => {
            if (readyRef.current && fillDoneRef.current) {
                // Ensure minimum duration has elapsed
                const elapsed = (Date.now() - startTime) / 1000;
                const remaining = Math.max(0, MIN_DURATION - elapsed);
                gsap.delayedCall(remaining, exit);
            }
        };

        // Single smooth fill animation (bottom to top)
        gsap.fromTo(fill,
            { clipPath: 'inset(100% 0 0 0)' },
            {
                clipPath: 'inset(0% 0 0 0)',
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    fillDoneRef.current = true;
                    tryExit();
                },
            }
        );

        // Wait for page load
        const onReady = () => {
            readyRef.current = true;
            tryExit();
        };

        if (document.readyState === 'complete') {
            onReady();
        } else {
            window.addEventListener('load', onReady);
        }

        return () => {
            window.removeEventListener('load', onReady);
        };
    }, [onComplete]);

    const logoPaths = [
        'M13.002 13.0285V8.66812H4.35154V0H0V13.0285H13.002Z',
        'M13.002 23.6659H0V28.0263H13.002V23.6659Z',
        'M14.998 19.3692H21.0689L14.998 23.1884V28.0373H28V23.6769H21.9291L28 19.8577V15.0088H14.998V19.3692Z',
        'M4.35157 18.5312L8.02259 21.512H13.0241L13.0063 21.4975V14.9977H8.65479V17.9642L5.00175 14.9977H2.59072e-05V21.512H4.35157V18.5312Z',
        'M19.3491 3.24893V0H14.9979V13.0285H19.3491V7.60908H23.6483V9.77127H27.9999V3.24893H19.3491Z',
        'M13.002 0H6.51203V6.50324H13.002V0Z',
    ];

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: '#181818', clipPath: 'inset(0 0 0 0)' }}
        >
            <div className="relative" style={{ width: 80, height: 83 }}>
                {/* Gray base */}
                <svg width="80" height="83" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                    {logoPaths.map((d, i) => <path key={i} d={d} fill="#555555" />)}
                </svg>
                {/* Light fill – clipped bottom-to-top */}
                <div ref={fillRef} className="absolute inset-0" style={{ clipPath: 'inset(100% 0 0 0)' }}>
                    <svg width="80" height="83" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {logoPaths.map((d, i) => <path key={i} d={d} fill="#F4F4F4" />)}
                    </svg>
                </div>
            </div>
        </div>
    );
}
