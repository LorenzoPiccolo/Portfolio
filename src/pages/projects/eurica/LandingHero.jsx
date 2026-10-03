// src/pages/projects/eurica/LandingHero.jsx
// L'apertura della landing di Eurica, rifatta con il suo markup, il suo CSS e la sua logica:
// il titolo entra parola per parola, i riquadri fluttuano e si trascinano, passando sopra un riquadro
// si accende la sua tappa, la tappa 3 si riscrive da sola, l'ultimo promemoria lancia i coriandoli.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';
import { confetti } from './confetti.js';
import kamakura from '../../../../img/eurica-home/kamakura.webp';
import icoColosseum from '../../../../img/eurica/icons/colosseum.webp';
import icoPasta from '../../../../img/eurica/icons/pasta.webp';
import icoGelato from '../../../../img/eurica/icons/ice-cream-bar.webp';
import icoTicket from '../../../../img/eurica/icons/ticket.webp';

const motionOK = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const WALK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" /><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" /><path d="M16 17h4" /><path d="M4 13h4" /></svg>;
const CHECK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
const ARROW = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const TITLE = [['Plan', 'every', 'day.'], ['Then', 'just', 'go.']];
const DRAFT_FULL = 'Gelato at Fatamorgana';

/** Riquadro che si trascina col mouse dentro l'apertura; un clic fermo resta un clic. */
function useChipDrag(stageRef, chipRef, onDragged) {
    useEffect(() => {
        const ch = chipRef.current;
        if (!window.matchMedia('(pointer: fine)').matches) return undefined;
        let sx = 0, sy = 0, ox = 0, oy = 0, x = 0, y = 0, moving = false, lim;
        const inner = ch.querySelector('.hp-chip-in');
        const move = (e) => {
            const dx = e.clientX - sx, dy = e.clientY - sy;
            if (!moving) {
                if (Math.abs(dx) + Math.abs(dy) < 5) return;
                moving = true; ch.classList.add('is-drag');
                const r = ch.getBoundingClientRect(), b = stageRef.current.getBoundingClientRect();
                lim = { l: b.left - r.left + ox, r: b.right - r.right + ox, t: b.top - r.top + oy, b: b.bottom - r.bottom + oy };
                if (motionOK()) gsap.to(inner, { scale: 1.05, duration: 0.3, ease: 'expo.out' });
            }
            e.preventDefault();
            x = Math.min(lim.r, Math.max(lim.l, ox + dx)); y = Math.min(lim.b, Math.max(lim.t, oy + dy));
            ch.style.translate = `${x}px ${y}px`;
        };
        const up = () => {
            window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
            if (moving) { ox = x; oy = y; onDragged(); ch.classList.remove('is-drag'); if (motionOK()) gsap.to(inner, { scale: 1, duration: 0.5, ease: 'expo.out' }); }
            moving = false;
        };
        const down = (e) => {
            if (e.button !== 0 || e.pointerType !== 'mouse') return;
            moving = false; sx = e.clientX; sy = e.clientY;
            window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
        };
        const noDrag = (e) => e.preventDefault();
        ch.addEventListener('pointerdown', down); ch.addEventListener('dragstart', noDrag);
        return () => { ch.removeEventListener('pointerdown', down); ch.removeEventListener('dragstart', noDrag); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    }, [stageRef, chipRef, onDragged]);
}

function Chip({ className, link, stageRef, onLight, children }) {
    const ref = useRef(null);
    const dragged = useRef(false);
    const onDragged = useCallback(() => { dragged.current = true; setTimeout(() => { dragged.current = false; }, 0); }, []);
    useChipDrag(stageRef, ref, onDragged);
    return (
        <div
            ref={ref} className={`hp-chip ${className}`}
            onPointerEnter={() => link && onLight(link)} onPointerLeave={() => link && onLight(null)}
            onClickCapture={(e) => { if (dragged.current) { e.preventDefault(); e.stopPropagation(); } }}
        >
            <div className="hp-chip-in">{children}</div>
        </div>
    );
}

export default function LandingHero() {
    const wrapRef = useRef(null);
    const stageRef = useRef(null);
    const introRef = useRef(null);
    const [lit, setLit] = useState(null);
    const [checks, setChecks] = useState([true, true, false]);
    const [draft, setDraft] = useState(null);   // null = tappa normale, stringa = bozza in scrittura

    const toggleCheck = (i, e) => {
        const next = checks.map((c, k) => (k === i ? !c : c));
        setChecks(next);
        if (next.every(Boolean)) confetti(e.currentTarget.querySelector('.hp-box'));
    };

    const playIntro = () => {
        if (!motionOK()) return;
        const root = wrapRef.current;
        if (introRef.current) introRef.current.progress(1).kill();
        introRef.current = gsap.timeline({ defaults: { ease: 'expo.out' } })
            .from(root.querySelectorAll('.lh-w > span'), { yPercent: 115, duration: 1.1, stagger: 0.09 }, 0.1)
            .from(root.querySelectorAll('.lh-in'), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, 0.5)
            .from(root.querySelector('.lh-arc'), { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 100%', duration: 1.4 }, 0.6)
            .from(root.querySelector('.hp-phone'), { yPercent: 35, autoAlpha: 0, duration: 1.3 }, 0.75)
            .from(root.querySelectorAll('.hp-chip'), { autoAlpha: 0, y: 18, scale: 0.9, duration: 0.8, stagger: 0.1 }, 1.15)
            .from(root.querySelector('.lh-ai'), { autoAlpha: 0, duration: 0.6 }, 1.6);
    };

    // Entrata la prima volta che l'apertura arriva a schermo; i riquadri fluttuano piano
    useLayoutEffect(() => {
        if (!motionOK()) return undefined;
        const root = wrapRef.current;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({ trigger: root, start: 'top 70%', once: true, onEnter: playIntro });
            root.querySelectorAll('.hp-chip-in').forEach((el, i) => {
                gsap.fromTo(el, { y: 6 }, { y: -8, duration: 2.8 + i * 0.35, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.3 });
            });
        }, root);
        return () => { ctx.revert(); introRef.current?.kill(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // La tappa 3 torna bozza («Double-click to add») e si riscrive da sola, solo con l'apertura a schermo
    useEffect(() => {
        if (!motionOK()) return undefined;
        let alive = true, seen = false;
        const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; });
        io.observe(stageRef.current);
        const wait = (s) => new Promise((res) => setTimeout(res, s * 1000));
        (async () => {
            await wait(2.2);
            while (alive) {
                await wait(3.2); if (!alive) return;
                if (!seen) continue;
                setDraft('Double-click to add');
                await wait(1.9);
                for (let i = 1; i <= DRAFT_FULL.length && alive; i++) { setDraft(DRAFT_FULL.slice(0, i)); await wait(0.045); }
                await wait(0.35); if (!alive) return;
                setDraft(null);
                await wait(3.8);
            }
        })();
        return () => { alive = false; io.disconnect(); };
    }, []);

    const stop = (k) => (lit === k ? ' is-lit' : '');

    return (
        <section ref={wrapRef} className="lh-wrap">
            <div ref={stageRef} className="lh">
                <div className="lh-copy">
                    <h3 className="lh-h1">
                        {TITLE.map((line, li) => (
                            <span key={li}>
                                {line.map((w, wi) => <span key={wi}><span className="lh-w"><span>{w}</span></span>{wi < line.length - 1 ? ' ' : ''}</span>)}
                                {li === 0 && <br />}
                            </span>
                        ))}
                    </h3>
                    <p className="lh-lede lh-in">Eurica is a free trip planner. Every day hour by hour, with the map and your tickets in the same place.</p>
                    <div className="lh-cta lh-in"><a className="lh-btn lh-btn-lilac" href="https://eurica.it" target="_blank" rel="noopener noreferrer">Start planning <span className="arrow" aria-hidden="true">{ARROW}</span></a></div>
                    <p className="lh-fine lh-in">Free. Works in your browser, on phone and desktop.</p>
                </div>
                <div className="lh-stage">
                    <div className="lh-arc"><img src={kamakura} width="1200" height="670" alt="" /></div>
                    <p className="lh-ai">AI-generated image</p>
                    <div className="hp-phone" aria-hidden="true">
                        <div className="hp-screen">
                            <div className="hp-status"><span>9:41</span><b /><span>87%</span></div>
                            <div className="hp-kick">Day 2 · Sat 14 Nov</div>
                            <div className="hp-title">Rome</div>
                            <div className="hp-days"><span>Day 1</span><span className="on">Day 2</span><span>Day 3</span><span>Day 4</span></div>
                            <div className="hp-agenda">
                                <div className={`ag${stop('1')}`} style={{ '--c': 'var(--cat-culture)' }}><div className="ag-rail"><span className="ag-pin">1</span><span className="ag-start">09:30</span><span className="ag-end">11:30</span></div><div className="ag-body"><span className="ag-title">Colosseum</span><span className="ag-place">Piazza del Colosseo</span><div className="ag-badges"><span className="badge badge-booked badge-sm">Booked</span></div></div><img className="ag-ico" src={icoColosseum} alt="" /></div>
                                <div className={`hp-step${stop('walk')}`}>{WALK}28 min on foot</div>
                                <div className={`ag${stop('2')}`} style={{ '--c': 'var(--cat-food)' }}><div className="ag-rail"><span className="ag-pin">2</span><span className="ag-start">13:00</span><span className="ag-end">14:15</span></div><div className="ag-body"><span className="ag-title">Carbonara at Da Enzo</span><span className="ag-place">Trastevere</span></div><img className="ag-ico" src={icoPasta} alt="" /></div>
                                <div className="hp-step">{WALK}6 min on foot</div>
                                <div className={`ag hp-draft${draft !== null ? ' is-draft' : ''}`} style={{ '--c': 'var(--cat-food)' }}><div className="ag-rail"><span className="ag-pin">3</span><span className="ag-start">16:00</span><span className="ag-end">16:30</span></div><div className="ag-body"><span className="ag-title">{draft ?? DRAFT_FULL}{draft !== null && <span className="hp-caret" />}</span><span className="ag-place">Trastevere</span></div><img className="ag-ico" src={icoGelato} alt="" /></div>
                                <div className="hp-step">{WALK}24 min on foot</div>
                                <div className={`ag${stop('4')}`} style={{ '--c': 'var(--cat-culture)' }}><div className="ag-rail"><span className="ag-pin">4</span><span className="ag-start">20:00</span><span className="ag-end">22:30</span></div><div className="ag-body"><span className="ag-title">Vatican Museums</span><span className="ag-place">Night opening</span><div className="ag-badges"><span className="badge badge-booked badge-sm">Booked</span><span className="ag-pdf">Ticket PDF</span></div></div><img className="ag-ico" src={icoColosseum} alt="" /></div>
                            </div>
                        </div>
                    </div>
                    <Chip className="hp-ticket" link="4" stageRef={stageRef} onLight={setLit}>
                        <img src={icoTicket} alt="" />
                        <div><div className="hp-t">Vatican Museums</div><div className="hp-s">Sat 14 Nov · 20:00</div><div className="ag-badges"><span className="badge badge-booked badge-sm">Booked</span><span className="ag-pdf">Ticket PDF</span></div></div>
                    </Chip>
                    <Chip className="hp-walk" link="walk" stageRef={stageRef} onLight={setLit}>
                        <div className="hp-big">{WALK}28 min</div><div className="hp-s">On foot, Colosseum to Da Enzo</div>
                    </Chip>
                    <Chip className="hp-split" link="2" stageRef={stageRef} onLight={setLit}>
                        <div className="hp-k">Expenses · split 3 ways</div><div className="hp-t">Dinner at Da Enzo · €64.00</div><div className="hp-big">You're owed €42.67</div>
                    </Chip>
                    <Chip className="hp-check" stageRef={stageRef} onLight={setLit}>
                        <div className="hp-k">Reminders · Before Rome</div>
                        <ul>
                            {['Passport', 'Plug adapter', 'Download museum tickets'].map((label, i) => (
                                <li key={label}><button type="button" aria-pressed={checks[i]} onClick={(e) => toggleCheck(i, e)}><span className="hp-box">{CHECK}</span><span className="hp-lbl">{label}</span></button></li>
                            ))}
                        </ul>
                    </Chip>
                </div>
            </div>
            <div className="lh-bar">
                <button type="button" className="lh-replay" onClick={playIntro}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
                    Replay the intro
                </button>
            </div>
        </section>
    );
}
