// src/pages/projects/buildzero/BuildZeroSections.jsx
// Le sezioni su misura della case history di Build Zero: l'evento, il restyling da confrontare,
// la ricerca, le quattro fasi, l'orso che si riempie, i flussi, il sistema, i risultati, la nota legale.
// I testi e le immagini stanno in ../BuildZero.jsx; lo stile in ../caseHistory.css (prefisso bz-).
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../../../utils/gsapConfig.js';
import { scheduleScrollRefresh } from '../sections/LegacySections.jsx';
import { createMouseDrag, glideTo, nearestCard, stopGlide, stripLeft } from '../sections/common.jsx';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Effetti GSAP chiusi nel contesto della sezione; si rifanno quando cambia la larghezza. */
function useFx(ref, build, resizeTick) {
    useLayoutEffect(() => {
        if (!ref.current || reduceMotion()) return undefined;
        const ctx = gsap.context(() => build(ref.current), ref);
        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resizeTick]);
}

/** Le card entrano dal basso a scalare quando la sezione arriva. */
const rise = (els, trigger) => gsap.from(els, { y: 48, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger, start: 'top 85%', once: true } });

/** Una schermata dell'app con gli angoli dell'iPhone. Le immagini sono a 2x (804 × 1748). */
export function Phone({ src, alt = '', eager = false }) {
    return (
        <div className="bz-ph">
            <img src={src} alt={alt} width="804" height="1748" loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" />
        </div>
    );
}

/** Trascinamento col mouse per le strisce che scorrono di lato, con l'aggancio morbido di «In short»
 *  (al dito ci pensa lo scroll nativo). */
function useDragScroll(ref) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const onAnyDown = () => stopGlide(el);
        el.addEventListener('pointerdown', onAnyDown);
        if (!window.matchMedia('(pointer: fine)').matches) return () => el.removeEventListener('pointerdown', onAnyDown);
        const drag = createMouseDrag();
        const onDown = (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag.down(el, e); };
        const onMove = (e) => drag.move(e);
        const onUp = () => { const x = drag.up(); if (x !== null) glideTo(el, stripLeft(el, nearestCard(el, x))); };
        const onClick = (e) => { if (drag.state.moved) { e.preventDefault(); e.stopPropagation(); drag.state.moved = false; } };
        el.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerup', onUp);
        el.addEventListener('click', onClick, true);
        el.classList.add('can-drag');
        return () => {
            el.removeEventListener('pointerdown', onAnyDown);
            el.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            el.removeEventListener('click', onClick, true);
            stopGlide(el);
        };
    }, [ref]);
}

// ─── Intestazione: l'orso di mattoncini sul giallo, con tre Home dell'app ───
export function BzHeroStage({ bear, phones, title, note, label }) {
    return (
        <div className="bz-stage" role="img" aria-label={label}>
            <div className="bz-stage__tag"><b>{title}</b><span>{note}</span></div>
            <img className="bz-stage__bear" src={bear} alt="" width="1035" height="593" onLoad={scheduleScrollRefresh} />
            <div className="bz-stage__phones">
                {phones.map((p) => <Phone key={p} src={p} eager />)}
            </div>
        </div>
    );
}

/** Due schermate affiancate su un fondo colorato, per il carosello «In short». */
export const Duo = ({ shots }) => (
    <div className="bz-duo">{shots.map(([src, alt]) => <Phone key={src} src={src} alt={alt} />)}</div>
);

// ─── L'evento: lo stand isometrico, il mini-box e il percorso ───
export function BzEvent({ section, resizeTick }) {
    const ref = useRef(null);
    useFx(ref, (root) => rise(root.querySelectorAll('.bz-ev > div > *, .bz-ev__stand'), root), resizeTick);
    const { stand, box, route } = section;
    return (
        <section ref={ref}>
            <div className="bz-ev">
                <div className="bz-ev__stand"><img src={stand.src} alt={stand.alt} width="1800" height="1195" loading="lazy" decoding="async" onLoad={scheduleScrollRefresh} /></div>
                <div className="bz-ev__side">
                    <div className="bz-ev__box">
                        <span className="mono">{box.label}</span>
                        <img src={box.src} alt={box.alt} width="1100" height="871" loading="lazy" decoding="async" />
                        <p>{box.text}</p>
                    </div>
                    <div className="bz-ev__route">
                        <span className="mono">{route.label}</span>
                        <ol>{route.steps.map(([b, t]) => <li key={b}><span><b>{b}</b> {t}</span></li>)}</ol>
                    </div>
                </div>
            </div>
            {section.caption && <p className="bz-cap">{section.caption}</p>}
        </section>
    );
}

// ─── Il restyling: due schede, poi lo stesso passo nel 2024 e nel 2026 con la linea da trascinare ───
export function BzRedesign({ section }) {
    const [key, setKey] = useState(section.pairs[0].key);
    const cmpRef = useRef(null);
    const rangeRef = useRef(null);
    const pair = section.pairs.find((p) => p.key === key);
    const setX = (v) => cmpRef.current.style.setProperty('--x', `${v}%`);
    const pick = (k) => { setKey(k); rangeRef.current.value = 50; setX(50); };
    const [before, after] = section.cards;
    return (
        <section>
            <div className="bz-rd">
                <div className="bz-rd__card"><span className="mono">{before.kicker}</span><h3>{before.title}</h3><p>{before.text}</p></div>
                <div className="bz-rd__arrow" aria-hidden="true">→</div>
                <div className="bz-rd__card bz-rd__card--new"><span className="mono">{after.kicker}</span><h3>{after.title}</h3><p>{after.text}</p></div>
            </div>
            <div className="bz-tn">
                <div className="seg">
                    <div className="seg__in" role="tablist" aria-label="Compare">
                        {section.pairs.map((p) => (
                            <button key={p.key} role="tab" aria-selected={key === p.key} onClick={() => pick(p.key)}>{p.label}</button>
                        ))}
                    </div>
                </div>
                <div className="bz-tn__stage">
                    <div className="bz-tn__side">
                        <p className="mono">{before.kicker} · thesis app</p>
                        <h3>{pair.before.title}</h3><p>{pair.before.text}</p>
                    </div>
                    <div className="bz-cmp" ref={cmpRef} style={{ '--x': '50%' }}>
                        <img src={pair.before.src} alt={`2024 version: ${pair.before.title}`} width="430" height="984" draggable="false" />
                        <img className="bz-cmp__new" src={pair.after.src} alt={`2026 version: ${pair.after.title}`} width="804" height="1748" draggable="false" />
                        <span className="bz-cmp__lab">2024 · ORIGINAL</span>
                        <span className="bz-cmp__lab bz-cmp__lab--r">2026 · REDESIGN</span>
                        <div className="bz-cmp__line" />
                        <div className="bz-cmp__knob" aria-hidden="true">⇆</div>
                        <input ref={rangeRef} type="range" min="0" max="100" defaultValue="50" aria-label="Drag to compare 2024 and 2026" onInput={(e) => setX(e.target.value)} />
                    </div>
                    <div className="bz-tn__side bz-tn__side--r">
                        <p className="mono bz-y">{after.kicker}</p>
                        <h3>{pair.after.title}</h3><p>{pair.after.text}</p>
                    </div>
                </div>
                <p className="bz-hint">{section.hint}</p>
            </div>
            <div className="copy2 bz-lists">
                {section.lists.map((l) => (
                    <div key={l.title}><h3>{l.title}</h3><ul>{l.items.map((it) => <li key={it}>{it}</li>)}</ul></div>
                ))}
            </div>
        </section>
    );
}

// ─── Ricerca: le cinque tavole fatte per il sito, in una striscia che si trascina ───
export function BzBoards({ section }) {
    const ref = useRef(null);
    useDragScroll(ref);
    return (
        <section>
            <div ref={ref} className="bz-boards">
                {section.boards.map((b, i) => (
                    <figure key={b.src}>
                        <div className="bz-boards__fr"><img src={b.src} alt={b.alt} width="1600" height="1000" loading="lazy" decoding="async" draggable="false" /></div>
                        <figcaption><span className="mono">{String(i + 1).padStart(2, '0')}</span><span><b>{b.strong}</b> {b.text}</span></figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
}

// ─── I tre momenti critici e il momento clou ───
export function BzMoments({ section, resizeTick }) {
    const ref = useRef(null);
    useFx(ref, (root) => rise(root.querySelectorAll('.bz-mo'), root), resizeTick);
    return (
        <section ref={ref}>
            <div className="bz-moments">
                {section.moments.map((m) => (
                    <div key={m.title} className="bz-mo">
                        <span className="mono">{m.kicker}</span><h3>{m.title}</h3><p>{m.text}</p>
                        <div className="bz-mo__ans">{m.answer}</div>
                    </div>
                ))}
            </div>
            <div className="bz-truth"><span className="mono">{section.truth.kicker}</span><blockquote>{section.truth.quote}</blockquote></div>
        </section>
    );
}

// ─── Cinque regole, numerate su un mattoncino ───
export function BzRules({ section, resizeTick }) {
    const ref = useRef(null);
    useFx(ref, (root) => rise(root.children, root), resizeTick);
    return (
        <section ref={ref} className="bz-rules">
            {section.rules.map((r, i) => (
                <div key={r.title} className="bz-rule"><span className="bz-n">{i + 1}</span><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
        </section>
    );
}

// ─── Le quattro fasi: il telefono resta fermo, la stanza cambia colore ───
export function BzWorlds({ section }) {
    const [on, setOn] = useState(0);
    const stepsRef = useRef(null);
    useEffect(() => {
        const steps = [...stepsRef.current.children];
        const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(+e.target.dataset.i); }), { rootMargin: '-45% 0px -45% 0px' });
        steps.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);
    const w = section.worlds[on];
    return (
        <section className="bz-worlds" style={{ '--w-bg': w.bg, '--w-ink': w.ink }}>
            <div className="bz-worlds__grid">
                <div ref={stepsRef} className="bz-worlds__steps">
                    {section.worlds.map((s, i) => (
                        <article key={s.title} className="bz-wstep" data-i={i}>
                            <span className="mono">{i + 1} of {section.worlds.length} · {s.kicker}</span>
                            <h3>{s.title}</h3><p>{s.text}</p>
                            <Phone src={s.src} alt={s.alt} />
                        </article>
                    ))}
                </div>
                <div className="bz-worlds__phone" aria-hidden="true">
                    <div>
                        <div className="bz-worlds__stack">
                            {section.worlds.map((s, i) => <img key={s.src} className={i === on ? 'on' : ''} src={s.src} alt="" width="804" height="1748" loading="lazy" decoding="async" />)}
                        </div>
                        <div className="bz-worlds__count">{section.worlds.map((s, i) => <i key={s.src} className={i === on ? 'on' : ''} />)}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── L'orso si riempie dal basso mentre «vendi» mini-box ───
export function BzBear({ section }) {
    const { src, total, start, messages, caption } = section;
    const [v, setV] = useState(start);
    const p = v / total;
    return (
        <section className={`bz-bearbox${v >= total ? ' full' : ''}`}>
            <div className="bz-bear" aria-hidden="true">
                <img className="bz-bear__ghost" src={src} alt="" width="1035" height="593" loading="lazy" decoding="async" />
                <img className="bz-bear__done" src={src} alt="" width="1035" height="593" loading="lazy" decoding="async" style={{ '--p': p.toFixed(4) }} />
                <span className="bz-bear__ring" />
            </div>
            <div className="bz-bear__ui">
                <span className="mono">Try it · boxes sold</span>
                <div className="bz-bear__num">{v.toLocaleString('en-US')}<small>of {total.toLocaleString('en-US')} mini-boxes · {Math.round(p * 100)}%</small></div>
                <label className="mono" htmlFor="bz-bear-range">Drag to sell more boxes</label>
                <input className="bz-range" type="range" id="bz-bear-range" min="0" max={total} step="1" value={v} onChange={(e) => setV(+e.target.value)} />
                <p className="bz-bear__msg" aria-live="polite">{v >= total ? messages.full : v === 0 ? messages.zero : messages.going(v)}</p>
                <p className="bz-bear__cap">{caption}</p>
            </div>
        </section>
    );
}

// ─── Flussi: una fila di schermate numerate per ogni momento della giornata ───
function FlowRow({ flow }) {
    const ref = useRef(null);
    useDragScroll(ref);
    return (
        <div className="bz-flow">
            <div className="bz-flow__head"><h3>{flow.title}</h3><p>{flow.text}</p></div>
            <div ref={ref} className="bz-flow__row">
                {flow.steps.map(([src, label], i) => (
                    <figure key={src}><Phone src={src} alt={label} /><figcaption><span className="mono">{i + 1}</span>{label}</figcaption></figure>
                ))}
            </div>
        </div>
    );
}
export function BzFlows({ section }) {
    return <section>{section.flows.map((f) => <FlowRow key={f.title} flow={f} />)}</section>;
}

// ─── Il sistema: palette, carattere, componenti veri da premere, illustrazioni ───
const TABS = [
    { label: 'Home', icon: <><rect x="3" y="9" width="18" height="10" rx="2" /><rect x="6" y="6" width="4" height="3" rx="1" /><rect x="14" y="6" width="4" height="3" rx="1" /></> },
    { label: 'Scan', icon: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><rect x="8" y="8" width="8" height="8" rx="1" /></> },
    { label: 'Tickets', icon: <><path d="M3 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-4z" /><path d="M9 6v12" strokeDasharray="2 2" /></> },
];
export function BzSystem({ section, resizeTick }) {
    const ref = useRef(null);
    const [tab, setTab] = useState(0);
    useFx(ref, (root) => rise(root.children, root), resizeTick);
    const { palette, typeface: type, tags, ill } = section;
    return (
        <section ref={ref} className="bz-bento">
            <div className="bz-tile bz-t-pal" aria-label="Palette">
                {palette.map((c) => (
                    <div key={c.hex} className="bz-sw" style={{ background: c.hex, color: c.ink, boxShadow: c.ring ? 'inset 0 0 0 1px #d8d8d8' : undefined }}>{c.name}<span>{c.hex}</span></div>
                ))}
            </div>
            <div className="bz-tile bz-t-type"><span className="mono">{type.label}</span><div className="bz-big">{type.big[0]}<br />{type.big[1]}</div><p>{type.note}</p></div>
            <div className="bz-tile bz-t-ui">
                <span className="mono">Components · try them</span>
                <div className="bz-app">
                    <button className="bz-brick" type="button">Get tickets</button>
                    <button className="bz-brick bz-brick--blue" type="button">Pay</button>
                    <button className="bz-brick bz-brick--white" type="button">Show your ticket</button>
                    <div className="bz-tags">{tags.map((t) => <span key={t.label} className="bz-tag" style={{ background: t.bg, color: t.ink }}>{t.label}</span>)}</div>
                    <div className="bz-tabbar" role="group" aria-label="Tab bar">
                        {TABS.map((t, i) => (
                            <button key={t.label} type="button" aria-pressed={tab === i} aria-label={t.label} onClick={() => setTab(i)}>
                                <svg viewBox="0 0 24 24">{t.icon}</svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bz-tile bz-t-ill">
                <span className="mono">{ill.label}</span>
                <div className="bz-ill">
                    <img src={ill.main.src} alt={ill.main.alt} width="1035" height="593" loading="lazy" decoding="async" />
                    <div className="bz-ill__s">{ill.small.map((im) => <img key={im.src} src={im.src} alt={im.alt} loading="lazy" decoding="async" />)}</div>
                </div>
                <p>{ill.text}</p>
            </div>
        </section>
    );
}

// ─── Gli obiettivi, su mattoncini gialli ───
export function BzMetrics({ section, resizeTick }) {
    const ref = useRef(null);
    useFx(ref, (root) => rise(root.querySelectorAll('.bz-metric'), root), resizeTick);
    return (
        <section ref={ref}>
            <div className="bz-metrics">
                {section.metrics.map(([n, t]) => <div key={t} className="bz-metric"><b>{n}</b><span>{t}</span></div>)}
            </div>
            {section.caption && <p className="bz-cap bz-cap--c">{section.caption}</p>}
        </section>
    );
}

// ─── Nota legale in fondo: la formula «Fair Play» di LEGO e cosa è inventato ───
export function BzLegal({ section }) {
    return (
        <section className="bz-legal">
            {section.lines.map((l) => <p key={l}>{l}</p>)}
        </section>
    );
}
