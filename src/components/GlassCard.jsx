// src/components/GlassCard.jsx
import { useRef, useState, useCallback } from 'react';

/**
 * GlassCard - A reusable glass-morphism card with cursor-following glow effect
 * 
 * @param {string} className - Additional classes to apply
 * @param {React.ReactNode} children - Card content
 * @param {string} glowColor - Color of the glow (default: primary color)
 * @param {number} glowSize - Size of the glow in pixels (default: 200)
 * @param {number} glowIntensity - Intensity of the glow 0-1 (default: 0.15)
 * @param {string} as - HTML element to render (default: 'div')
 */
export default function GlassCard({
    className = '',
    children,
    glowColor = 'rgba(244, 244, 244, 0.05)', // Light color with alpha
    glowSize = 800,
    glowIntensity = 0.15,
    as: Component = 'div',
    ...props
}) {
    const cardRef = useRef(null);
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    const baseClasses = 'relative overflow-hidden border border-gray600 backdrop-blur-[12px]';
    const combinedClasses = `${baseClasses} ${className}`.trim();

    return (
        <Component
            ref={cardRef}
            className={combinedClasses}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundColor: 'var(--blurBg)',
                ...props.style,
            }}
            {...props}
        >
            {/* Cursor-following glow overlay */}
            <div
                className="pointer-events-none absolute z-0"
                style={{
                    opacity: isHovering ? 1 : 0,
                    transform: isHovering ? 'scale(1)' : 'scale(0.5)',
                    left: glowPosition.x - glowSize / 2,
                    top: glowPosition.y - glowSize / 2,
                    width: glowSize,
                    height: glowSize,
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
                    transition: isHovering
                        ? 'opacity 400ms ease-out, transform 400ms ease-out'
                        : 'opacity 400ms ease-out, transform 400ms ease-out',
                }}
                aria-hidden="true"
            />

            {/* Content layer */}
            <div className="relative z-10 h-full w-full flex items-center justify-center">
                {children}
            </div>
        </Component>
    );
}

// CSS classes string for use without the component
export const glassCardClasses = 'relative overflow-hidden border border-gray600 backdrop-blur-[12px]';
export const glassCardStyle = { backgroundColor: 'var(--blurBg)' };
