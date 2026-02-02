// src/components/DynamicButton.jsx
import { forwardRef, isValidElement, cloneElement, useLayoutEffect, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapConfig.js';
import useCursorGlow from '../hooks/useCursorGlow.js';

const baseBtnClasses =
  'relative overflow-hidden flex items-center gap-4 rounded-full border border-gray600 bg-dark/70 backdrop-blur-lg pl-4 pr-2 py-2 text-light transform transition-transform duration-300 hover:scale-[1.05] group whitespace-nowrap w-fit';

const iconWrapClasses =
  'flex h-12 w-12 md:h-10  md:w-10 shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-300';

const labelClasses = 'text-16 leading-none tracking-[0.02em] group-hover:translate-y-[-20px] transition-transform duration-300';
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
  const innerRef = useRef(null);
  const { handlers: glowHandlers, glowStyle } = useCursorGlow({ glowSize: 300 });
  const buttonClasses = `${baseBtnClasses}${className ? ` ${className}` : ''}`;
  const iconClasses = `${iconWrapClasses}${iconClassName ? ` ${iconClassName}` : ''}`;

  const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');
  const isAnchor = href?.startsWith('#');

  // Decide which tag to use
  let Tag = 'button';
  if (href) {
    if (isExternal || isAnchor) {
      Tag = 'a';
    } else {
      Tag = Link;
    }
  }

  const computedRel = rel ?? (href && target === '_blank' ? 'noopener noreferrer' : undefined);
  const tagProps = href
    ? {
      [Tag === Link ? 'to' : 'href']: href,
      ...(target ? { target } : {}),
      ...(computedRel ? { rel: computedRel } : {}),
    }
    : { type: 'button' };

  let iconContent = null;
  if (icon) {
    const { className: iconExtraClass = '', ...restIconProps } = iconProps;

    if (typeof icon === 'string') {
      iconContent = (
        <img
          src={icon}
          alt={iconAlt}
          className={`h-6 w-6 md:h-5 md:w-5 ${iconExtraClass}`.trim()}
          {...restIconProps}
        />
      );
    } else if (isValidElement(icon)) {
      iconContent = cloneElement(icon, {
        className: `h-6 w-6 md:h-5 md:w-5 ${iconExtraClass} ${icon.props?.className ?? ''}`.trim(),
        ...restIconProps,
      });
    } else if (typeof icon === 'function' || typeof icon === 'object') {
      const IconComponent = icon;
      iconContent = (
        <IconComponent
          className={`h-6 w-6 md:h-5 md:w-5 ${iconExtraClass}`.trim()}
          {...restIconProps}
        />
      );
    }
  }

  const revealRef = useRef(reveal);
  useEffect(() => {
    revealRef.current = reveal;
  }, [reveal]);

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
    const toVars = {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'easeOut',
      ...(revealConfig.to ?? {}),
    };

    const scrollTrigger = {
      toggleActions: 'play none none none',
      markers: false,
      start: 'bottom bottom',
      once: true,
      ...scrollTriggerConfig,
      trigger: triggerEl,
    };

    const ctx = gsap.context(() => {
      gsap.set(el, fromVars);
      if (scrollTrigger.id) {
        ScrollTrigger.getById(scrollTrigger.id)?.kill();
      }
      gsap.to(el, { ...toVars, scrollTrigger });
    }, el);

    return () => ctx.revert();
  }, [scrollTriggerConfig]);

  const setRefs = (node) => {
    innerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <Tag ref={setRefs} className={buttonClasses} {...tagProps} {...props} {...glowHandlers}>
      {/* Glow overlay */}
      <div style={glowStyle} aria-hidden="true" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex flex-col h-[18px] gap-1 overflow-hidden">
          {label && <span className={labelClasses}>{label}</span>}
          {label && <span className={labelClasses}>{label}</span>}
        </div>
        {iconContent && <span className={iconClasses}>{iconContent}</span>}
      </div>
    </Tag>
  );
});

export default DynamicButton;
