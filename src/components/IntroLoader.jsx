// src/components/IntroLoader.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapConfig.js';

export default function IntroLoader({ onComplete }) {
    const wrapperRef = useRef(null);
    const fillRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const fill = fillRef.current;
        if (!wrapper || !fill) return;

        // Lock scroll
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();

        // --- Phase 1: quickly fill to ~90% ---
        const fillTween = gsap.fromTo(fill,
            { clipPath: 'inset(100% 0 0 0)' },
            {
                clipPath: 'inset(10% 0 0 0)', // 90% filled (10% remaining from top)
                duration: 0.8,
                ease: 'power2.out',
                onComplete: checkReady,
            }
        );

        let pageReady = false;

        // --- Detect when the page is truly ready ---
        const markReady = () => { pageReady = true; checkReady(); };

        if (document.readyState === 'complete') {
            markReady();
        } else {
            window.addEventListener('load', markReady);
        }

        // --- Phase 2 + exit: finish fill → slide loader out ---
        function checkReady() {
            // Both conditions: fill reached 90% AND page is loaded
            if (!pageReady || gsap.isTweening(fill)) return;

            // Complete the last 10%
            gsap.to(fill, {
                clipPath: 'inset(0% 0 0 0)',
                duration: 0.35,
                ease: 'power2.inOut',
                onComplete: exit,
            });
        }

        function exit() {
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
        }

        return () => {
            window.removeEventListener('load', markReady);
            fillTween.kill();
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
