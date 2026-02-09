// src/context/TransitionContext.jsx
import { createContext, useContext, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isTransitioning = useRef(false);
    const safetyTimerRef = useRef(null);
    // Callback ref that the PageTransition component will set
    const playTransitionRef = useRef(null);

    const navigateTo = useCallback((path) => {
        // Prevent double-transition
        if (isTransitioning.current) return;

        // Skip transition if already on the same page
        if (path === location.pathname) return;

        isTransitioning.current = true;

        // Safety timeout: force-reset if timeline gets stuck
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = setTimeout(() => {
            isTransitioning.current = false;
        }, 5000);

        const doNavigate = () => {
            navigate(path);
        };

        if (playTransitionRef.current) {
            playTransitionRef.current(doNavigate, () => {
                clearTimeout(safetyTimerRef.current);
                isTransitioning.current = false;
            });
        } else {
            // Fallback: navigate immediately
            doNavigate();
            clearTimeout(safetyTimerRef.current);
            isTransitioning.current = false;
        }
    }, [navigate, location.pathname]);

    return (
        <TransitionContext.Provider value={{ navigateTo, isTransitioning, playTransitionRef }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error('useTransition must be used within TransitionProvider');
    return ctx;
}
