import { useRef, useState, useLayoutEffect, useMemo } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';

export default function DynamicMarquee({ children, className = '', duration = '35s' }) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [repeatCount, setRepeatCount] = useState(1);
    const [isMeasured, setIsMeasured] = useState(false);

    // Function to calculate how many times we need to repeat the children
    // to fill the screen width at least once throughout.
    const calculateRepetitions = () => {
        if (!containerRef.current || !contentRef.current) return;

        const viewportWidth = window.innerWidth;
        const contentWidth = contentRef.current.scrollWidth;

        if (contentWidth === 0) return;

        // We need the content chunk to be at least as wide as the viewport
        // so that when we duplicate it, we have enough coverage.
        const needed = Math.ceil(viewportWidth / contentWidth);

        // Add a buffer just in case (e.g. +1) to ensure no gaps if rounding is tricky
        setRepeatCount(needed + 1);
        setIsMeasured(true);
    };

    useLayoutEffect(() => {
        calculateRepetitions();
    }, [children]);

    // Recalculate on resize
    useResizeObserver(containerRef, calculateRepetitions);

    // We create a "Block" of repeated children
    const repeatedChildren = useMemo(() => {
        return Array.from({ length: repeatCount }).map((_, i) => (
            <span key={i} className="inline-block">
                {children}
            </span>
        ));
    }, [repeatCount, children]);

    // If we haven't measured yet, render a single invisible copy to measure width
    if (!isMeasured) {
        return (
            <div ref={containerRef} className={`w-full ${className}`}>
                <div ref={contentRef} className="inline-block opacity-0">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`w-full ${className}`}>
            <div
                className="whitespace-nowrap will-change-transform inline-block animate-marqueeLeft"
                style={{ animationDuration: duration }}
            >
                {/* The first block */}
                <div className="inline-block">
                    {repeatedChildren}
                </div>
                {/* The duplicate block for seamless looping */}
                <div className="inline-block">
                    {repeatedChildren}
                </div>
            </div>
        </div>
    );
}
