// src/pages/home/sections/Hero.jsx
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

// === Config ===
const FRAME_COUNT = 147;              // <-- imposta il numero di frame
const PAD = 3;                        // <-- padding numerico: 001, 002, ...
const EXT = '.jpg';                   // <-- cambia in '.png' se serve
const BASE_PATH = '../../../../img/frames/';         // <-- cartella in /public

function frameSrc(index) {
  const n = String(index + 1).padStart(PAD, '0');
  return `${BASE_PATH}header${n}${EXT}`; 
}

export default function Hero({ resizeTick = 0 }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const gradientRef = useRef(null);
  const marqueeRef = useRef(null);
  const stateRef = useRef({ frame: 0 });
  const [ready, setReady] = useState(false);

  // Preload immagini
  useEffect(() => {
    const imgs = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.decode?.(); // hint ai browser moderni
      img.onload = () => {
        loaded++;
        if (loaded === 1) {
          // appena c'è la prima, possiamo rendere
          setReady(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

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

  // Setup ScrollTrigger + tween progress-driven
  useLayoutEffect(() => {
    if (!ready || !sectionRef.current || !canvasRef.current) return;

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
          scrubTween.progress(self.progress);
          gradientTween?.progress(self.progress);
        },
      });
    }, sectionRef);

    // resize handler
    const onResize = () => {
      resizeCanvas();
      render();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [ready, resizeCanvas, render, resizeTick]);

  useLayoutEffect(() => {
    if (!ready) return;

    const marquee = marqueeRef.current;
    const section = sectionRef.current;
    if (!marquee || !section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        marquee,
        { y: 200, x: 200, autoAlpha: 0 },
        { y: 0, x: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
    }, section);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate h-screen min-h-[700px] w-screen bg-black flex flex-col justify-end overflow-x-hidden overflow-y-visible z-10"
    >
      {/* Canvas background (sotto al contenuto) */}
      <canvas
        ref={canvasRef}
        id="hero-lightpass"
        className="absolute inset-0 z-0 block"
      />

      <div className="absolute bottom-0 select-none">
        <img
          ref={gradientRef}
          src="../../../../img/gradient-2.png"
          className="w-[100vw]"
          style={{ transformOrigin: 'bottom center', transform: 'scaleY(0)' }}
        />
      </div>

      {/* Contenuto in basso, allineato con flex (niente absolute) */}
      <div className="w-full px-6 pb-20 flex flex-col gap-20 z-10">
        {/* 3 scritte sopra il marquee */}
        <div className="hidden w-full mx-auto items-center justify-between text-[12px] font-spaceg tracking-wide md:flex">
          <span className="font-bold">LORENZO PICCOLO</span>
          <span className="opacity-90">PORTFOLIO 2025</span> 
          <span className="opacity-90">@2025 ALL RIGHTS RESERVED</span>
        </div>

        {/* Marquee */}
        <div ref={marqueeRef} className="hero-marquee overflow-y-visible">
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
