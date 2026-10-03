// src/pages/projects/sections/common.jsx
// I moduli uguali in tutte le case history: barra di sezione, panoramica, «In short»,
// titolo di capitolo, testo su due colonne, chiusura. Stile in ../caseHistory.css.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../../../utils/gsapConfig.js';
import { scheduleScrollRefresh } from './LegacySections.jsx';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Porta a una sezione tenendo conto dell'header fisso (con Lenis se c'è). */
export function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 150;
    if (window.lenis) window.lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: reduceMotion() ? 'auto' : 'smooth' });
}

/** Barra di sezione: nome del progetto e link ai capitoli che hanno `nav`. */
export function LocalNav({ name, links }) {
    if (!links.length) return null;
    return (
        <nav className="lnav" aria-label={`${name} sections`}>
            <div className="lnav__in">
                <span className="lnav__dot" aria-hidden="true" />
                <span className="lnav__name">{name}</span>
                {links.map((l) => (
                    <a key={l.id} className="lk" href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(l.id); }}>
                        {l.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}

/** Panoramica: titolo di una frase, due righe, dati chiave in riga. */
export function Overview({ overview }) {
    const { eyebrow = 'Overview', title, lede, specs = [] } = overview;
    return (
        <section className="ov" id="overview">
            <p className="eb">{eyebrow}</p>
            <h2 className="display">{title}</h2>
            {lede && <p className="lede">{lede}</p>}
            {specs.length > 0 && (
                <dl className="specs">
                    {specs.map(([k, v]) => (
                        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                </dl>
            )}
        </section>
    );
}

/** Titolo di capitolo: parola colorata, titolo grande, una riga. `lede` accetta <strong>. */
export function Chapter({ section }) {
    return (
        <section className="ch" id={section.id}>
            {section.eyebrow && <p className="eb">{section.eyebrow}</p>}
            <h2 className="display">{section.title}</h2>
            {section.lede && <p className="lede">{section.lede}</p>}
        </section>
    );
}

/** Due paragrafi affiancati, con l'inizio in bianco. items: [{ strong, text }] */
export function CopyTwo({ section }) {
    return (
        <div className="copy2">
            {section.items.map((it, i) => (
                <p key={i}><strong>{it.strong}</strong> {it.text}</p>
            ))}
        </div>
    );
}

/** Chiusura con un bottone verso il sito o l'app. */
export function Outro({ section }) {
    return (
        <section className="outro">
            <h2 className="display">{section.title}</h2>
            {section.lede && <p className="lede" style={{ marginTop: 0 }}>{section.lede}</p>}
            {section.cta && (
                <a className="cta" href={section.cta.href} target="_blank" rel="noopener noreferrer" style={section.cta.color ? { background: section.cta.color } : undefined}>
                    {section.cta.label} <span aria-hidden="true">↗</span>
                </a>
            )}
        </section>
    );
}

const PAUSE_ICON = (
    <svg viewBox="0 0 14 14" fill="currentColor" width="14" height="14"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>
);
const PLAY_ICON = (
    <svg viewBox="0 0 14 14" fill="currentColor" width="14" height="14"><path d="M3 1.5v11l9.5-5.5z" /></svg>
);
const HL_DURATION = 5000;

/**
 * «In short»: carosello di immagini grandi con una frase sotto.
 * Va avanti da solo quando è a schermo, si mette in pausa, si scorre col dito
 * e si trascina col mouse. La rotella verticale resta alla pagina (Lenis).
 * items: [{ src, alt, strong, text, fit: 'contain', bg, position }]
 */
export function Highlights({ items, title = 'In short.' }) {
    const rootRef = useRef(null);
    const trackRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(() => !reduceMotion());
    const [tick, setTick] = useState(0);          // riavvia l'animazione del puntino attivo
    const visible = useRef(false);
    const drag = useRef({ on: false, moved: false, x0: 0, left0: 0, lastX: 0, lastT: 0, vel: 0 });

    const cardLeft = (i) => {
        const track = trackRef.current;
        const card = track.children[i];
        return card.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft);
    };
    const go = (i) => {
        trackRef.current.scrollTo({ left: cardLeft(i), behavior: reduceMotion() ? 'auto' : 'smooth' });
        setIndex(i); setTick((t) => t + 1);
    };
    const stop = () => setPlaying(false);

    // Avanzamento automatico, solo con il carosello a schermo
    useEffect(() => {
        const track = trackRef.current;
        const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; setTick((t) => t + 1); }, { threshold: 0.45 });
        io.observe(track);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        if (!playing || !visible.current) return undefined;
        const t = setTimeout(() => go((index + 1) % items.length), HL_DURATION);
        return () => clearTimeout(t);
    }, [playing, index, tick, items.length]);

    // Il puntino attivo segue lo scroll fatto a mano
    useEffect(() => {
        const track = trackRef.current;
        let t;
        const onScroll = () => {
            clearTimeout(t);
            t = setTimeout(() => {
                let best = 0, bd = Infinity;
                [...track.children].forEach((_, i) => { const d = Math.abs(cardLeft(i) - track.scrollLeft); if (d < bd) { bd = d; best = i; } });
                setIndex((cur) => (cur === best ? cur : best));
            }, 120);
        };
        track.addEventListener('scroll', onScroll, { passive: true });
        return () => { clearTimeout(t); track.removeEventListener('scroll', onScroll); };
    }, []);

    // Trascinamento col mouse (al dito ci pensa lo scroll nativo)
    const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    const onPointerDown = (e) => {
        stop();
        if (!fine || e.pointerType !== 'mouse' || e.button !== 0) return;
        const d = drag.current, track = trackRef.current;
        Object.assign(d, { on: true, moved: false, x0: e.clientX, lastX: e.clientX, left0: track.scrollLeft, lastT: performance.now(), vel: 0 });
        track.setPointerCapture(e.pointerId);
        track.classList.add('dragging');
    };
    const onPointerMove = (e) => {
        const d = drag.current; if (!d.on) return;
        const dx = e.clientX - d.x0; if (Math.abs(dx) > 4) d.moved = true;
        trackRef.current.scrollLeft = d.left0 - dx;
        const now = performance.now(); d.vel = (e.clientX - d.lastX) / Math.max(1, now - d.lastT); d.lastX = e.clientX; d.lastT = now;
    };
    const onPointerUp = () => {
        const d = drag.current; if (!d.on) return;
        d.on = false; trackRef.current.classList.remove('dragging');
        const target = trackRef.current.scrollLeft - d.vel * 260;
        let best = index, bd = Infinity;
        items.forEach((_, i) => { const dd = Math.abs(cardLeft(i) - target); if (dd < bd) { bd = dd; best = i; } });
        go(best);
    };
    const onWheel = (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(); };

    // Le immagini entrano leggermente rimpicciolite
    useLayoutEffect(() => {
        if (reduceMotion()) return undefined;
        const ctx = gsap.context(() => {
            rootRef.current.querySelectorAll('.hl__card .frame').forEach((f) => {
                gsap.from(f, { scale: 0.94, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: f, start: 'top 90%', once: true } });
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={rootRef} className={`hl${playing ? ' playing' : ''}`} style={{ '--dur': `${HL_DURATION}ms` }}>
            <div className="hl__head"><h2>{title}</h2></div>
            <div
                ref={trackRef}
                className={`hl__track${fine ? ' can-drag' : ''}`}
                onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
                onWheel={onWheel}
                onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
                onDragStart={(e) => e.preventDefault()}
            >
                {items.map((it, i) => (
                    <figure className="hl__card" key={i}>
                        <div className="frame" style={it.bg ? { background: it.bg } : undefined}>
                            <img
                                src={it.src} alt={it.alt} width={it.width} height={it.height} draggable="false"
                                style={{ objectFit: it.fit || 'cover', objectPosition: it.position || 'center' }}
                                onLoad={scheduleScrollRefresh}
                            />
                        </div>
                        <figcaption><strong>{it.strong}</strong> {it.text}</figcaption>
                    </figure>
                ))}
            </div>
            <div className="hl__ctl">
                <div className="dots">
                    {items.map((_, i) => (
                        <button
                            key={`${i}-${i === index ? tick : 0}`}
                            className={`dot${i === index ? ' on' : ''}`}
                            aria-label={`Image ${i + 1}`}
                            onClick={() => { stop(); go(i); }}
                        />
                    ))}
                </div>
                <button className="play" aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)}>
                    {playing ? PAUSE_ICON : PLAY_ICON}
                </button>
            </div>
        </section>
    );
}
