// src/components/TransitionLink.jsx
import { useTransition } from '../context/TransitionContext.jsx';

export default function TransitionLink({ to, children, ...props }) {
    const { navigateTo } = useTransition();

    const handleClick = (e) => {
        e.preventDefault();
        navigateTo(to);
    };

    return (
        <a href={to} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}
