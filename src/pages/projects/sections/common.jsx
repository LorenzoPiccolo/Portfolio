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

/** Panoramica: titolo di una frase, due righe, dati chiave in riga. `legal`: riquadro sotto i dati (es. progetto non ufficiale). */
export function Overview({ overview }) {
    const { eyebrow = 'Overview', title, lede, specs = [], legal } = overview;
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
            {legal && <p className="legal">{legal}</p>}
        </section>
    );
}

/** Titolo di capitolo: parola colorata, titolo grande, una riga. `lede` accetta <strong>. `small`: sottocapitolo. */
export function Chapter({ section }) {
    return (
        <section className={`ch${section.small ? ' ch--sm' : ''}`} id={section.id}>
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

/** Distanza di una scheda dall'inizio della striscia, al netto del margine interno. */
export function stripLeft(track, i) {
    const card = track.children[i];
    return card.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft);
}

/** La scheda più vicina a una posizione di scroll. */
export function nearestCard(track, x) {
    let best = 0, bd = Infinity;
    [...track.children].forEach((_, i) => { const d = Math.abs(stripLeft(track, i) - x); if (d < bd) { bd = d; best = i; } });
    return best;
}

/**
 * Porta una striscia orizzontale a `x` con un'animazione morbida. Lo snap CSS resta spento
 * (classe `gliding`) finché l'animazione non arriva: altrimenti il browser salta di colpo
 * alla scheda più vicina. La durata cresce un po' con la distanza.
 */
export function glideTo(track, x, duration) {
    gsap.killTweensOf(track.__glide || {});
    // prima si spegne lo snap, poi si legge la posizione: leggerla con lo snap acceso lo fa scattare
    track.classList.add('gliding');
    track.classList.remove('dragging');
    const to = Math.max(0, Math.min(track.scrollWidth - track.clientWidth, x));
    const from = track.scrollLeft;
    if (reduceMotion()) { track.scrollLeft = to; track.classList.remove('gliding'); return; }
    const dur = duration ?? Math.min(1.1, 0.6 + Math.abs(to - from) / 2400);
    const p = (track.__glide = { x: from });
    gsap.to(p, {
        x: to, duration: dur, ease: 'power3.out',
        onUpdate: () => { track.scrollLeft = p.x; },
        onComplete: () => track.classList.remove('gliding'),
    });
}

/** Ferma l'animazione in corso (es. quando l'utente riprende la striscia col dito o col mouse). */
export function stopGlide(track) {
    gsap.killTweensOf(track.__glide || {});
    track.classList.remove('gliding');
}

/**
 * Trascinamento col mouse che segue il puntatore con un leggero ritardo morbido e,
 * al rilascio, restituisce dove la spinta porterebbe la striscia (velocità smussata).
 */
export function createMouseDrag() {
    const d = { on: false, moved: false, x0: 0, left0: 0, target: 0, lastX: 0, lastT: 0, vel: 0, follow: null, proxy: null };
    return {
        state: d,
        down(track, e) {
            stopGlide(track);
            const proxy = { x: track.scrollLeft };
            Object.assign(d, {
                on: true, moved: false, x0: e.clientX, left0: track.scrollLeft, target: track.scrollLeft,
                lastX: e.clientX, lastT: performance.now(), vel: 0, proxy,
                follow: gsap.quickTo(proxy, 'x', { duration: 0.32, ease: 'power3.out', onUpdate: () => { track.scrollLeft = proxy.x; } }),
            });
            track.classList.add('dragging');
        },
        move(e) {
            if (!d.on) return;
            const dx = e.clientX - d.x0;
            if (Math.abs(dx) > 4) d.moved = true;
            d.target = d.left0 - dx;
            d.follow(d.target);
            const now = performance.now(), dt = now - d.lastT;
            if (dt > 0) d.vel = d.vel * 0.7 + ((e.clientX - d.lastX) / dt) * 0.3;
            d.lastX = e.clientX; d.lastT = now;
        },
        /** Fine del trascinamento: restituisce la posizione «lanciata», o null se non stava trascinando.
         *  La classe `dragging` resta: la toglie glideTo, che va chiamata subito dopo. */
        up() {
            if (!d.on) return null;
            d.on = false;
            gsap.killTweensOf(d.proxy);
            if (performance.now() - d.lastT > 90) d.vel = 0;   // fermo prima di lasciare: niente spinta
            return d.target - d.vel * 320;
        },
    };
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
 *        oppure [{ node, bg, strong, text }]: una scena composta al posto dell'immagine
 */
export function Highlights({ items, title = 'In short.' }) {
    const rootRef = useRef(null);
    const trackRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(() => !reduceMotion());
    const [tick, setTick] = useState(0);          // riavvia l'animazione del puntino attivo
    const visible = useRef(false);
    const drag = useRef(null);
    if (!drag.current) drag.current = createMouseDrag();

    const go = (i, duration) => {
        glideTo(trackRef.current, stripLeft(trackRef.current, i), duration);
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
        const t = setTimeout(() => go((index + 1) % items.length, 1.1), HL_DURATION);
        return () => clearTimeout(t);
    }, [playing, index, tick, items.length]);

    // Il puntino attivo segue lo scroll fatto a mano
    useEffect(() => {
        const track = trackRef.current;
        let t;
        const onScroll = () => {
            clearTimeout(t);
            t = setTimeout(() => {
                const best = nearestCard(track, track.scrollLeft);
                setIndex((cur) => (cur === best ? cur : best));
            }, 120);
        };
        track.addEventListener('scroll', onScroll, { passive: true });
        return () => { clearTimeout(t); track.removeEventListener('scroll', onScroll); gsap.killTweensOf(track.__glide || {}); };
    }, []);

    // Trascinamento col mouse (al dito ci pensa lo scroll nativo)
    const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    const onPointerDown = (e) => {
        stop();
        const track = trackRef.current;
        stopGlide(track);
        if (!fine || e.pointerType !== 'mouse' || e.button !== 0) return;
        drag.current.down(track, e);
        track.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e) => drag.current.move(e);
    const onPointerUp = () => {
        const target = drag.current.up();
        if (target !== null) go(nearestCard(trackRef.current, target));
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
            {title && <div className="hl__head"><h2>{title}</h2></div>}
            <div
                ref={trackRef}
                className={`hl__track${fine ? ' can-drag' : ''}`}
                onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
                onWheel={onWheel}
                onClickCapture={(e) => { const d = drag.current.state; if (d.moved) { e.preventDefault(); e.stopPropagation(); d.moved = false; } }}
                onDragStart={(e) => e.preventDefault()}
            >
                {items.map((it, i) => (
                    <figure className="hl__card" key={i}>
                        <div className="frame" style={it.bg ? { background: it.bg } : undefined}>
                            {it.node || (
                                <img
                                    src={it.src} alt={it.alt} width={it.width} height={it.height} draggable="false"
                                    style={{ objectFit: it.fit || 'cover', objectPosition: it.position || 'center' }}
                                    onLoad={scheduleScrollRefresh}
                                />
                            )}
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
