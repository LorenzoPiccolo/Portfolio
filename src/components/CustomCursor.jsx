import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig.js';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
    const circleRef = useRef(null);
    const textRef = useRef(null);
    const isActiveRef = useRef(false);
    const [text, setText] = useState('');
    const location = useLocation();

    // Hide cursor on mobile/touch devices
    const isMobile = typeof window !== 'undefined' && (
        window.matchMedia('(max-width: 768px)').matches ||
        window.matchMedia('(pointer: coarse)').matches
    );

    if (isMobile) {
        return null;
    }

    // Reset state on route change
    useEffect(() => {
        setText('');
        isActiveRef.current = false;
        if (circleRef.current && textRef.current) {
            gsap.set(circleRef.current, { scale: 0, opacity: 0 });
            gsap.set(textRef.current, { opacity: 0, scale: 0.5 });
        }
    }, [location.pathname]);

    useEffect(() => {
        const circle = circleRef.current;
        const textEl = textRef.current;

        // Center origins
        gsap.set([circle, textEl], { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

        // Parallax durations: Text trails mouse slightly, Circle trails text (slower)
        const xToCircle = gsap.quickTo(circle, 'x', { duration: 0.3, ease: 'power3.out' });
        const yToCircle = gsap.quickTo(circle, 'y', { duration: 0.3, ease: 'power3.out' });

        const xToText = gsap.quickTo(textEl, 'x', { duration: 0.25, ease: 'power3.out' });
        const yToText = gsap.quickTo(textEl, 'y', { duration: 0.25, ease: 'power3.out' });

        const showCursor = (followerText) => {
            if (isActiveRef.current && text === followerText) return; // Already showing same text
            isActiveRef.current = true;
            setText(followerText);

            // Kill only scale/opacity animations, not position (quickTo)
            gsap.killTweensOf(circle, 'scale,opacity');
            gsap.killTweensOf(textEl, 'scale,opacity');

            gsap.to(circle, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(textEl, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                delay: 0.1,
                ease: 'power2.out'
            });
        };

        const hideCursor = () => {
            if (!isActiveRef.current) return; // Already hidden
            isActiveRef.current = false;

            // Kill only scale/opacity animations, not position (quickTo)
            gsap.killTweensOf(circle, 'scale,opacity');
            gsap.killTweensOf(textEl, 'scale,opacity');

            gsap.to(circle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(textEl, {
                opacity: 0,
                scale: 0.5,
                duration: 0.2,
                ease: 'power2.out'
            });
        };

        const moveCursor = (e) => {
            xToCircle(e.clientX);
            yToCircle(e.clientY);
            xToText(e.clientX);
            yToText(e.clientY);

            // Check element under cursor on every mouse move for reliable detection
            const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
            if (!elementUnderCursor) {
                hideCursor();
                return;
            }

            // Check if cursor is over header or any element with data-no-cursor
            const isOverHeader = elementUnderCursor.closest('header') || elementUnderCursor.closest('[data-no-cursor]');
            if (isOverHeader) {
                hideCursor();
                return;
            }

            const target = elementUnderCursor.closest('[data-follower-text]');
            if (target) {
                const followerText = target.getAttribute('data-follower-text');
                showCursor(followerText);
            } else {
                hideCursor();
            }
        };

        const handleMouseLeave = () => {
            hideCursor();
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseleave', handleMouseLeave);
            gsap.killTweensOf(circle, 'scale,opacity');
            gsap.killTweensOf(textEl, 'scale,opacity');
        };
    }, [location.pathname]);

    return (
        <>
            {/* Background Circle */}
            <div
                ref={circleRef}
                className="fixed top-0 left-0 z-[9990] pointer-events-none backdrop-blur-[12px] rounded-full overflow-hidden"
                style={{
                    width: '128px',
                    height: '128px',
                    backgroundColor: 'rgba(24, 24, 24, 0.6)',
                    scale: 0,
                    opacity: 0,
                }}
            />

            {/* Text Container */}
            <div
                ref={textRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center p-4 text-center"
                style={{
                    width: 'auto',
                    minWidth: '128px', // Match circle width ideally, or just be centered
                    opacity: 0,
                    // scale: 0, // Controlled by GSAP
                }}
            >
                <span className="font-urbanist text-[16px] text-light whitespace-normal leading-tight">
                    {text}
                </span>
            </div>
        </>
    );
}
