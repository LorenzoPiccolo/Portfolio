// src/pages/projects/eurica/LandingFeatures.jsx
// Le schede «Everything a trip needs» della landing di Eurica (landing.html), con la loro logica:
// il badge si cambia, il promemoria si spunta (coriandoli), si sceglie chi modifica, si prova un tema.
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../../../utils/gsapConfig.js';
import { confetti } from './confetti.js';
import icoAirplane from '../../../../img/eurica/icons/airplane.webp';
import icoHotel from '../../../../img/eurica/icons/hotel-bed.webp';
import icoGate from '../../../../img/eurica/icons/brandenburg-gate.webp';
import icoSun from '../../../../img/eurica/icons/sunglasses.webp';

const motionOK = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pop = (el) => { if (motionOK()) gsap.fromTo(el, { scale: 0.82 }, { scale: 1, duration: 0.6, ease: 'expo.out' }); };
const CHECK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
const THEME_BG = { dark: '#0A0A0A', light: '#F0F0F5', eurica: '#211F20', brand: '#6A5AC7' };

function StatusBadge({ initial }) {
    const [booked, setBooked] = useState(initial);
    return (
        <button
            type="button" aria-pressed={booked}
            className={`badge badge-toggle ${booked ? 'badge-booked' : 'badge-ticket'}`}
            onClick={(e) => { setBooked(!booked); pop(e.currentTarget); }}
        >
            <span className="lbl">{booked ? 'Booked' : 'Get ticket'}</span>
        </button>
    );
}

export default function LandingFeatures() {
    const rootRef = useRef(null);
    const [noteDone, setNoteDone] = useState(false);
    const [canEdit, setCanEdit] = useState(0);
    const [theme, setTheme] = useState({ ink: 'brand', bg: 'brand' });
    const tileRef = useRef(null), wipeRef = useRef(null);

    const pickTheme = (e, t) => {
        const next = theme.ink === t ? 'brand' : t;
        if (!motionOK()) { setTheme({ ink: next, bg: next }); return; }
        setTheme((cur) => ({ ...cur, ink: next }));
        const tile = tileRef.current, wipe = wipeRef.current;
        const tr = tile.getBoundingClientRect(), s = e.currentTarget.getBoundingClientRect();
        const x = s.left + s.width / 2 - tr.left, y = s.top + s.height / 2 - tr.top;
        const r = Math.hypot(Math.max(x, tr.width - x), Math.max(y, tr.height - y));
        gsap.killTweensOf(wipe);
        wipe.style.background = THEME_BG[next];
        gsap.fromTo(wipe, { clipPath: `circle(0px at ${x}px ${y}px)` }, {
            clipPath: `circle(${r}px at ${x}px ${y}px)`, duration: 0.9, ease: 'expo.inOut',
            onComplete: () => { setTheme({ ink: next, bg: next }); gsap.set(wipe, { clipPath: 'circle(0px at 0px 0px)' }); },
        });
    };

    useLayoutEffect(() => {
        if (!motionOK()) return undefined;
        const root = rootRef.current;
        const ctx = gsap.context(() => {
            gsap.from(root.querySelectorAll('.lf-card'), { y: 70, scale: 0.96, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: root, start: 'top 85%', once: true } });
            gsap.fromTo(root.querySelectorAll('.avatars span'), { scale: 0 }, { scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.12, clearProps: 'transform', scrollTrigger: { trigger: root.querySelector('.f-share'), start: 'top 85%', once: true } });
            // Excel: le righe si accendono una alla volta, poi «3 stops imported»
            const cells = [...root.querySelectorAll('.lf-sheet span:not(.sh)')], chip = root.querySelector('.import-chip');
            const scan = gsap.timeline({ repeat: -1, repeatDelay: 2.4, paused: true });
            scan.set(chip, { autoAlpha: 0, y: 10, scale: 0.9 });
            [0, 1, 2].forEach((r) => {
                const row = cells.slice(r * 3, r * 3 + 3);
                scan.add(() => row.forEach((c) => c.classList.add('is-scan')), 0.3 + r * 0.5)
                    .add(() => row.forEach((c) => c.classList.remove('is-scan')), 0.75 + r * 0.5);
            });
            scan.to(chip, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' }, 1.9).to(chip, { autoAlpha: 0, duration: 0.35 }, 5);
            gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.f-excel'), start: 'top 90%', end: 'bottom 10%', onToggle: (st) => (st.isActive ? scan.play() : scan.pause()) } });
            // inclinazione verso il puntatore
            if (window.matchMedia('(pointer: fine)').matches) root.querySelectorAll('.lf-card').forEach((card) => {
                gsap.set(card, { transformPerspective: 1100 });
                const rx = gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3' }), ry = gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3' });
                card.addEventListener('pointermove', (e) => { const r = card.getBoundingClientRect(), k = Math.min(1, 460 / r.width) * 6; ry(((e.clientX - r.left) / r.width - 0.5) * k); rx(-((e.clientY - r.top) / r.height - 0.5) * k); });
                card.addEventListener('pointerleave', () => { rx(0); ry(0); });
            });
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={rootRef} className="lf">
            <div className="lf-grid">
                <article className="lf-card f-events">
                    <h3>Flights, check-ins, car rentals.</h3>
                    <p>Stops with their own fields, and the deadline in red. You'll know the gate closes at 22:29 before you're running for it.</p>
                    <div className="lf-demo" style={{ display: 'grid', gap: 10, maxWidth: 460 }}>
                        <div className="ag" style={{ '--c': 'var(--cat-transport)' }}><div className="ag-rail"><span className="ag-start">22:59</span></div><div className="ag-body"><span className="ag-kicker">Flight · Departure</span><span className="ag-title">PC3525</span><span className="ag-place">Berlin BER → Bergamo BGY</span><div className="ag-badges"><span className="badge badge-deadline">22:29 Gate closes</span></div></div><img className="ag-ico" src={icoAirplane} alt="" /></div>
                        <div className="ag" style={{ '--c': 'var(--cat-accommodation)' }}><div className="ag-rail"><span className="ag-start">15:00</span></div><div className="ag-body"><span className="ag-kicker">Stay · Check-in</span><span className="ag-title">Garner Hotel Mitte</span><span className="ag-place">Torstraße 1</span></div><img className="ag-ico" src={icoHotel} alt="" /></div>
                    </div>
                </article>
                <article className="lf-card f-status">
                    <h3>Booked or not.</h3>
                    <p>See at a glance what's confirmed and what still needs a ticket.</p>
                    <div className="lf-demo status-pair">
                        <div className="ag ag-sm" style={{ '--c': 'var(--cat-culture)' }}><div className="ag-rail"><span className="ag-start">11:00</span></div><div className="ag-body"><span className="ag-title">Berliner Dom</span><div className="ag-badges"><StatusBadge initial /></div></div><img className="ag-ico" src={icoGate} alt="" /></div>
                        <div className="ag ag-sm" style={{ '--c': 'var(--cat-leisure)' }}><div className="ag-rail"><span className="ag-start">14:00</span></div><div className="ag-body"><span className="ag-title">Spree boat tour</span><div className="ag-badges"><StatusBadge initial={false} /></div></div><img className="ag-ico" src={icoSun} alt="" /></div>
                        <span className="tap">Tap a badge to switch it.</span>
                    </div>
                </article>
                <article className="lf-card f-excel">
                    <h3>Import from Excel.</h3>
                    <p>Already started in a spreadsheet? Bring it in, places included.</p>
                    <div className="lf-demo lf-sheet" aria-hidden="true">
                        <span className="sh">Day</span><span className="sh">Stop</span><span className="sh">Place</span>
                        <span>1</span><span>Brandenburger Tor</span><span>Pariser Platz</span>
                        <span>1</span><span>Reichstag</span><span>Platz der Republik</span>
                        <span>2</span><span>Berliner Dom</span><span>Am Lustgarten</span>
                    </div>
                    <span className="import-chip" aria-hidden="true">{CHECK}3 stops imported</span>
                </article>
                <article className="lf-card f-notes">
                    <h3>Notes and reminders.</h3>
                    <p>The things to remember that aren't a stop.</p>
                    <div className="lf-demo">
                        <div className={`lf-note${noteDone ? ' is-done' : ''}`}>
                            <button
                                type="button" className="note-check" aria-pressed={noteDone} aria-label="Mark as done"
                                onClick={(e) => { const done = !noteDone; setNoteDone(done); if (done) { pop(e.currentTarget); confetti(e.currentTarget); } }}
                            >{CHECK}</button>
                            <b><span className="note-text">Before Friday</span></b>
                            <span><span className="note-text">Book the Reichstag dome. Free, but it fills up.</span></span>
                        </div>
                    </div>
                </article>
                <article className="lf-card f-share">
                    <h3>Plan with whoever's coming.</h3>
                    <p>Share a trip with your travel companions, to view or to edit.</p>
                    <div className="lf-demo people">
                        <div className="avatars" aria-hidden="true"><span style={{ background: 'var(--cat-leisure)' }}>GI</span><span style={{ background: 'var(--cat-transport)' }}>MA</span><span style={{ background: 'var(--cat-food)' }}>LU</span></div>
                        <div className="lf-seg" data-i={canEdit}>
                            <span className="lf-seg-pill" aria-hidden="true" />
                            <button type="button" aria-pressed={canEdit === 0} onClick={() => setCanEdit(0)}>Can edit</button>
                            <button type="button" aria-pressed={canEdit === 1} onClick={() => setCanEdit(1)}>Can view</button>
                        </div>
                    </div>
                </article>
                <article ref={tileRef} className="lf-card f-themes" data-bg={theme.bg} data-ink={theme.ink}>
                    <span ref={wipeRef} className="theme-wipe" aria-hidden="true" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><h3>Dark, light, or Eurica.</h3><p>Three themes. Pick one to try it.</p></div>
                    <div className="themes" role="group" aria-label="Preview a theme">
                        {[['dark', 'Dark', '#6A5AC7', '#262626'], ['light', 'Light', '#6A5AC7', '#DDDDE6'], ['eurica', 'Eurica', '#C6BDFB', '#3A3738']].map(([t, label, a, b]) => (
                            <button key={t} type="button" className={`theme-sw sw-${t}`} aria-pressed={theme.ink === t} onClick={(e) => pickTheme(e, t)}>
                                <i style={{ background: a, width: '70%' }} /><i style={{ background: b }} /><small>{label}</small>
                            </button>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}
