// src/pages/home/sections/Hero.jsx
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';
import heroGradient from '../../../../img/gradient-2.png';
import useViewportHeight from '../../../hooks/useViewportHeight.js';
import { useFadeInUp } from '../../../hooks/useFadeInUp.js';
import useResizeObserver from '../../../hooks/useResizeObserver.js';

const FRAME_MODULES = import.meta.glob('../../../../img/frames/*.jpg', {
  eager: true,
  import: 'default',
});
const FRAME_SOURCES = Object.keys(FRAME_MODULES)
  .sort((a, b) => a.localeCompare(b))
  .map((key) => FRAME_MODULES[key]);
const FRAME_COUNT = FRAME_SOURCES.length;
const INITIAL_FRAME = FRAME_COUNT ? FRAME_SOURCES[0] : null;

export default function Hero({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const gradientRef = useRef(null);
  const stateRef = useRef({ frame: 0 });
  const scrollStartedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [scrollStarted, setScrollStarted] = useState(false);

  useViewportHeight();

  // Ridimensiona canvas al container e ridisegna
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = sectionRef.current;
    if (!canvas || !container) return;

    // risoluzione “nitida”
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, []);

  // draw “cover”: centra e copre come object-fit: cover
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const imgs = imagesRef.current;
    if (!canvas || !ctx || !imgs.length) return;

    const frame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(stateRef.current.frame)));
    const img = imgs[frame];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    // pulizia
    ctx.clearRect(0, 0, cw, ch);

    // calcolo scala per “cover”
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Preload immagini
  useEffect(() => {
    if (!FRAME_COUNT) {
      setReady(true);
      imagesRef.current = [];
      return;
    }

    const imgs = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_SOURCES[i];
      img.decode?.(); // hint ai browser moderni
      img.onload = () => {
        loaded++;
        if (loaded === 1) {
          setReady(true);
          requestAnimationFrame(() => {
            resizeCanvas();
            render();
          });
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [resizeCanvas, render]);

  // Setup ScrollTrigger + tween progress-driven
  useLayoutEffect(() => {
    if (!ready || !sectionRef.current || !canvasRef.current) return;
    if (!FRAME_COUNT) return;

    resizeCanvas();
    render();

    const ctx = gsap.context(() => {
      // tween “master” (paused) che va da 0 → FRAME_COUNT-1
      const scrubTween = gsap.to(stateRef.current, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        paused: true,
        onUpdate: render,
      });

      const gradientTween = gradientRef.current
        ? gsap.fromTo(
            gradientRef.current,
            { scaleY: 0, transformOrigin: 'bottom center' },
            { scaleY: 1, ease: 'none', paused: true }
          )
        : null;

      // smoothing dello scroll + pin della sezione
      ScrollTrigger.getById('hero-scroll')?.kill();
      ScrollTrigger.create({
        id: 'hero-scroll',
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${Math.max(2000, window.innerHeight * 1.5)}`, // lunghezza scrub
        scrub: 0.5,    // 0.2–1 per più/meno morbido
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          scrubTween.progress(progress);
          gradientTween?.progress(progress);

          const started = progress > 0.001;
          if (scrollStartedRef.current !== started) {
            scrollStartedRef.current = started;
            setScrollStarted(started);
          }
        },
        onRefresh: (self) => {
          const started = self.progress > 0.001;
          scrollStartedRef.current = started;
          setScrollStarted(started);
        },
      });
    }, sectionRef);

    // resize handler
    const onResize = () => {
      resizeCanvas();
      render();
    };
    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('scroll', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('scroll', onResize);
      ctx.revert();
    };
  }, [ready, resizeCanvas, render, resizeTick]);

  useFadeInUp(sectionRef, {
    immediate: true,
    once: true,
    stagger: 0.18,
    enabled: ready,
  });

  const handleSectionResize = useCallback(() => {
    if (!ready) return;
    resizeCanvas();
    render();
  }, [ready, resizeCanvas, render]);

  useResizeObserver(sectionRef, handleSectionResize);

  useEffect(() => {
    if (!ready) return;
    resizeCanvas();
    render();
  }, [ready, resizeCanvas, render]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section-full relative isolate flex w-screen flex-col justify-end overflow-x-hidden overflow-y-visible bg-black z-10 min-h-[700px]"
      style={
        !scrollStarted && INITIAL_FRAME
          ? {
              backgroundImage: `url(${INITIAL_FRAME})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      {/* Canvas background (sotto al contenuto) */}
      <canvas
        ref={canvasRef}
        id="hero-lightpass"
        className="absolute inset-0 z-[2] block"
      />

      {INITIAL_FRAME && (
        <img
          src={INITIAL_FRAME}
          alt=""
          className="absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: !ready || !scrollStarted ? 1 : 0 }}
        />
      )}

      <div className="absolute bottom-0 select-none z-[3]">
        <img
          ref={gradientRef}
          src={heroGradient}
          className="w-[100vw]"
          style={{ transformOrigin: 'bottom center', transform: 'scaleY(0)' }}
        />
      </div>

      {/* Contenuto in basso, allineato con flex (niente absolute) */}
      <div className="w-full px-6 pb-20 flex flex-col gap-20 z-10">
        {/* 3 scritte sopra il marquee */}
        <div className="fade-in-up hidden w-full mx-auto items-center justify-between text-[12px] font-spaceg tracking-wide md:flex">
          <span className="font-bold">LORENZO PICCOLO</span>
          <span className="opacity-90">PORTFOLIO 2025</span> 
          <span className="opacity-90">@2025 ALL RIGHTS RESERVED</span>
        </div>

        {/* Marquee */}
        <div className="fade-in-up hero-marquee overflow-y-visible">
          <div className="whitespace-nowrap will-change-transform inline-block animate-[marqueeLeft_35s_linear_infinite]">
            <MarqueeChunk />
            <MarqueeChunk /> 
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeChunk() {
  return (
    <span
      className="
        pr-[4rem]
        text-[160px] leading-none font-urbanist font-normal md:text-[240px]
        select-none
      "
      style={{ WebkitTextStroke: '0 transparent' }}
    >
      design anything&nbsp;&nbsp;design anything&nbsp;&nbsp;design anything&nbsp;&nbsp;design anything&nbsp;&nbsp;
    </span>
  );
}
