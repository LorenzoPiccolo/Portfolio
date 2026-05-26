// src/components/DynamicButton.jsx
// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT — CSS transform / GSAP coexistence rule:
//   GSAP magnetic writes `transform: translate3d(x,y,0)` on the ROOT element.
//   Any Tailwind class that also sets `transform` on the SAME element
//   (hover:scale-*, transition-transform …) will overwrite GSAP and break
//   the magnetic.  All hover effects must live on CHILD elements only.
// ─────────────────────────────────────────────────────────────────────────────
import { forwardRef, isValidElement, cloneElement, useLayoutEffect, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TransitionLink from './TransitionLink.jsx';
import { gsap, ScrollTrigger } from '../utils/gsapConfig.js';
import useCursorGlow from '../hooks/useCursorGlow.js';

// No transform / transition-transform / hover:scale on this string ↓
// transition-colors is safe here: it only animates color/bg/border — NOT transform.
// hover:border-transparent removes the border on hover so the fill effect is clean.
const baseBtnClasses =
  'relative overflow-hidden flex items-center gap-4 rounded-full border border-gray600 bg-dark/70 backdrop-blur-lg pl-4 pr-2 py-2 text-light group whitespace-nowrap w-fit cursor-pointer transition-colors duration-300 hover:border-transparent';

const DynamicButton = forwardRef(function DynamicButton(
  {
    label,
    icon = ArrowUpRight,
    iconAlt = '',
    iconProps = {},
    className = '',
    iconClassName = '',
    href,
    target,
    rel,
    scrollTrigger: scrollTriggerConfig,
    reveal,
    ...props
  },
  ref,
) {
  const innerRef = useRef(null);   // root element  (magnetic lives here)
  const fillRef  = useRef(null);   // fill circle   (hover fill lives here)
  const { handlers: glowHandlers, glowStyle } = useCursorGlow({ glowSize: 300 });
  const buttonClasses = `${baseBtnClasses}${className ? ` ${className}` : ''}`;

  // ── Tag resolution ────────────────────────────────────────────────────────
  const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');
  const isAnchor   = href?.startsWith('#');
  let Tag = 'button';
  if (href) Tag = isExternal || isAnchor ? 'a' : TransitionLink;

  const computedRel = rel ?? (href && target === '_blank' ? 'noopener noreferrer' : undefined);
  const tagProps = href
    ? {
        [Tag === TransitionLink ? 'to' : 'href']: href,
        ...(target      ? { target }      : {}),
        ...(computedRel ? { rel: computedRel } : {}),
      }
    : { type: 'button' };

  // ── Icon content ──────────────────────────────────────────────────────────
  let iconContent = null;
  if (icon) {
    const { className: iconExtraClass = '', ...restIconProps } = iconProps;
    if (typeof icon === 'string') {
      iconContent = <img src={icon} alt={iconAlt} className={`h-6 w-6 md:h-5 md:w-5 ${iconExtraClass}`.trim()} {...restIconProps} />;
    } else if (isValidElement(icon)) {
      iconContent = cloneElement(icon, {
        className: `h-6 w-6 md:h-5 md:w-5 ${iconExtraClass} ${icon.props?.className ?? ''}`.trim(),
        ...restIconProps,
      });
    } else if (typeof icon === 'function' || typeof icon === 'object') {
      const IconComponent = icon;
      iconContent = <IconComponent className={`h-6 w-6 md:h-5 md:w-5 ${iconExtraClass}`.trim()} {...restIconProps} />;
    }
  }

  // ── Magnetic + fill animation ─────────────────────────────────────────────
  useEffect(() => {
    const el     = innerRef.current;
    const fillEl = fillRef.current;
    if (!el || !fillEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Set fill circle to scale 0 initially (hidden)
    gsap.set(fillEl, { scale: 0 });

    // ── Fill: mouseenter / mouseleave on the button ────────────────────────
    const onEnter = () =>
      gsap.to(fillEl, { scale: 12, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });

    const onLeave = () =>
      gsap.to(fillEl, { scale: 0, duration: 0.4, ease: 'power3.in', overwrite: 'auto' });

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    // ── Magnetic: skip on touch devices ───────────────────────────────────
    if (window.matchMedia('(pointer: coarse)').matches) {
      return () => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      };
    }

    const STRENGTH = 0.42;
    const RADIUS   = 110;
    let isNear     = false;

    // ── Root-cause fix: calculate distance from the RESTING center ────────────
    // getBoundingClientRect() returns the ANIMATED (visual) position.
    // During the elastic snap-back the button oscillates, so the animated center
    // can drift within RADIUS of the cursor even though the cursor is far away.
    // That falsely re-triggers a pull tween, which kills the elastic, creating
    // an infinite loop that looks like "magnetic stopped working after first hover".
    //
    // Fix: subtract GSAP's current x/y offset from the rect center so we always
    // measure distance from where the button WOULD be at rest.
    const onMove = (e) => {
      const rect   = el.getBoundingClientRect();
      const rawX   = gsap.getProperty(el, 'x') ?? 0;
      const rawY   = gsap.getProperty(el, 'y') ?? 0;
      // Resting center (independent of current animation state)
      const cx     = rect.left + rect.width  / 2 - rawX;
      const cy     = rect.top  + rect.height / 2 - rawY;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const dist   = Math.sqrt(dx * dx + dy * dy);

      if (dist < RADIUS) {
        isNear = true;
        gsap.to(el, {
          x: dx * STRENGTH,
          y: dy * STRENGTH,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else if (isNear) {
        isNear = false;
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.75,
          ease: 'elastic.out(1.1, 0.45)',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el,     'x,y');
      gsap.killTweensOf(fillEl, 'scale');
      gsap.set(el,     { x: 0, y: 0 });
      gsap.set(fillEl, { scale: 0 });
    };
  }, []);

  // ── ScrollTrigger reveal ──────────────────────────────────────────────────
  const revealRef = useRef(reveal);
  useEffect(() => { revealRef.current = reveal; }, [reveal]);

  useLayoutEffect(() => {
    if (!scrollTriggerConfig) return;
    const el = innerRef.current;
    if (!el) return;

    const resolveTrigger = () => {
      const source = scrollTriggerConfig.trigger;
      if (!source) return el;
      if (typeof source === 'function') return source();
      if (source && typeof source === 'object' && 'current' in source) return source.current;
      return source;
    };

    const triggerEl = resolveTrigger();
    if (!triggerEl) return;

    const revealConfig = revealRef.current ?? {};
    const fromVars = { autoAlpha: 0, scale: 0, y: -80, ...(revealConfig.from ?? {}) };
    const toVars   = { autoAlpha: 1, scale: 1, y: 0, duration: 0.3, ease: 'easeOut', ...(revealConfig.to ?? {}) };
    const stConfig = {
      toggleActions: 'play none none none',
      markers: false, start: 'bottom bottom', once: true,
      ...scrollTriggerConfig, trigger: triggerEl,
    };

    const ctx = gsap.context(() => {
      gsap.set(el, fromVars);
      if (stConfig.id) ScrollTrigger.getById(stConfig.id)?.kill();
      gsap.to(el, { ...toVars, scrollTrigger: stConfig });
    }, el);

    return () => ctx.revert();
  }, [scrollTriggerConfig]);

  // ── Ref merge ─────────────────────────────────────────────────────────────
  const setRefs = (node) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Tag ref={setRefs} className={buttonClasses} {...tagProps} {...props} {...glowHandlers}>

      {/* Cursor-glow (visible in dark-bg state) */}
      <div style={glowStyle} aria-hidden="true" />

      {/* ── Fill circle ────────────────────────────────────────────────────
          Positioned exactly over the icon circle (right side, vertically
          centred).  GSAP scales it from 0 → 12 so it covers the full button.
          overflow:hidden on the root clips it to the pill shape.            */}
      <span
        ref={fillRef}
        aria-hidden="true"
        className="absolute rounded-full bg-primary pointer-events-none"
        style={{
          width:  '40px',
          height: '40px',
          right:  '8px',           // matches pr-2 padding
          top:    '50%',
          marginTop: '-20px',      // vertically centred
          transformOrigin: 'center center',
        }}
      />

      {/* Content — z-10 so it floats above the fill */}
      <div className="relative z-10 flex items-center gap-4">
        {label && (
          <span className="text-16 leading-none tracking-[0.02em]">
            {label}
          </span>
        )}

        {iconContent && (
          <span
            className={`
              relative z-10 flex h-12 w-12 md:h-10 md:w-10 shrink-0
              items-center justify-center rounded-full bg-primary
              transition-colors duration-300 group-hover:bg-transparent
              ${iconClassName}
            `.trim()}
          >
            {iconContent}
          </span>
        )}
      </div>

    </Tag>
  );
});

export default DynamicButton;
