// src/hooks/useCursorGlow.js
import { useState, useCallback } from 'react';

/**
 * Hook to add cursor-following glow effect to any element
 * Returns handlers and styles to apply to your component
 * 
 * @param {Object} options
 * @param {string} options.glowColor - Color of the glow (default: light color)
 * @param {number} options.glowSize - Size of the glow in pixels (default: 800)
 */
export default function useCursorGlow({
    glowColor = 'rgba(244, 244, 244, 0.05)',
    glowSize = 800,
} = {}) {
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
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

    const glowStyle = {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: isHovering ? 1 : 0,
        transform: isHovering ? 'scale(1)' : 'scale(0.5)',
        left: glowPosition.x - glowSize / 2,
        top: glowPosition.y - glowSize / 2,
        width: glowSize,
        height: glowSize,
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
        transition: 'opacity 400ms ease-out, transform 400ms ease-out',
    };

    return {
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
        glowStyle,
        isHovering,
    };
}
