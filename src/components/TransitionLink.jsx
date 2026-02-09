// src/components/TransitionLink.jsx
import { forwardRef } from 'react';
import { useTransition } from '../context/TransitionContext.jsx';

const TransitionLink = forwardRef(function TransitionLink({ to, children, ...props }, ref) {
    const { navigateTo } = useTransition();

    const handleClick = (e) => {
        e.preventDefault();
        navigateTo(to);
    };

    return (
        <a ref={ref} href={to} onClick={handleClick} {...props}>
            {children}
        </a>
    );
});

export default TransitionLink;
