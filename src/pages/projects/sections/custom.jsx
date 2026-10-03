// src/pages/projects/sections/custom.jsx
// Le sezioni su misura delle case history. Ogni progetto le sceglie nei suoi `sections`.
// Le animazioni allo scroll usano GSAP + ScrollTrigger (Lenis li tiene allineati, vedi renderApp.jsx).
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../utils/gsapConfig.js';
import { scheduleScrollRefresh } from './LegacySections.jsx';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => window.matchMedia('(min-width: 801px)').matches;
const STICK = 140; // header del sito + barra di sezione: dove si fermano le sezioni sticky

/** Effetti GSAP chiusi nel contesto della sezione; si rifanno quando cambia la larghezza. */
function useScrollFx(ref, build, resizeTick) {
    useLayoutEffect(() => {
        if (!ref.current || reduceMotion()) return undefined;
        const ctx = gsap.context(() => build(ref.current), ref);
        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resizeTick]);
}

const Img = (p) => <img onLoad={scheduleScrollRefresh} draggable="false" {...p} />;

// ─── Tour delle schermate: la sezione si ferma e le schermate si danno il cambio ───
export function ScreenTour({ section, resizeTick }) {
    const ref = useRef(null);
    const [step, setStep] = useState(0);
    const steps = section.steps;
    useScrollFx(ref, (root) => {
        if (!isDesktop()) return;
        const shots = root.querySelectorAll('.tour__screen img');
        const bar = root.querySelector('[data-tour-bar]');
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: `top top+=${STICK}`, end: 'bottom bottom', scrub: 0.6,
            onUpdate: (self) => {
                setStep(Math.min(shots.length - 1, Math.floor(self.progress * shots.length * 0.999)));
                bar.style.transform = `scaleX(${self.progress})`;
            } } });
        for (let i = 1; i < shots.length; i++) {
            tl.fromTo(shots[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 1 }, i - 0.5);
            tl.fromTo(shots[i - 1], { scale: 1 }, { scale: 0.94, ease: 'power2.inOut', duration: 1 }, i - 0.5);
        }
        tl.to({}, { duration: 0.5 });
    }, resizeTick);
    return (
        <section ref={ref} className="tour">
            <div className="tour__stick">
                <div className="tour__steps">
                    <div className="tour__count mono"><span>{step + 1}</span><span>/ {steps.length}</span><span className="tour__bar"><i data-tour-bar /></span></div>
                    {steps.map((s, i) => (
                        <div key={i} className={`step${i === step ? ' on' : ''}`}>
                            <Img className="shot" src={s.src} alt="" width={s.width} height={s.height} />
                            <h3>{s.title}</h3><p>{s.text}</p>
                        </div>
                    ))}
                </div>
                <div className="tour__screen">
                    {steps.map((s, i) => <Img key={i} src={s.src} alt={s.alt} width={s.width} height={s.height} />)}
                </div>
            </div>
        </section>
    );
}

// ─── Telefoni su una fascia colorata, a velocità diverse ───
export function PhoneRow({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        root.querySelectorAll('.phone').forEach((ph, i) => {
            const s = [12, 7, 3][i] ?? 4;
            gsap.fromTo(ph, { yPercent: s }, { yPercent: -s, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
    }, resizeTick);
    return (
        <section ref={ref} className="phones" style={section.color ? { background: section.color } : undefined}>
            <div className="phones__row">
                {section.images.map((im, i) => (
                    <div className="phone" key={i}><Img src={im.src} alt={im.alt} width={im.width} height={im.height} /></div>
                ))}
            </div>
        </section>
    );
}

// ─── Griglia del marchio: un'immagine larga, poi una 16:9 e una 4:5 alla stessa altezza ───
export function BrandGrid({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        root.querySelectorAll('.frame.px > img').forEach((img) => {
            gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
    }, resizeTick);
    const [wide, land, tall] = section.images;
    return (
        <section ref={ref} className="media brandgrid">
            <figure className="bg-wide"><div className="frame px"><Img src={wide.src} alt={wide.alt} /></div></figure>
            <figure><div className="frame px"><Img src={land.src} alt={land.alt} /></div><figcaption className="cap mono"><span>{land.caption}</span><span>{land.note}</span></figcaption></figure>
            <figure className="bg-tall"><div className="frame px"><Img src={tall.src} alt={tall.alt} /></div><figcaption className="cap mono"><span>{tall.caption}</span><span>{tall.note}</span></figcaption></figure>
        </section>
    );
}

// ─── Sistema di un'app: palette, carattere, categorie, icone ───
export function AppSystem({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        gsap.from(root.querySelectorAll('.tile'), { y: 60, scale: 0.97, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: root, start: 'top 85%', once: true } });
        gsap.from(root.querySelectorAll('[data-icons] img'), { scale: 0.4, opacity: 0, duration: 0.7, ease: 'back.out(1.8)', stagger: 0.05, scrollTrigger: { trigger: root.querySelector('[data-icons]'), start: 'top 85%', once: true } });
    }, resizeTick);
    return (
        <section ref={ref} className="bento">
            <div className="tile t-pal">
                {section.palette.map((c) => (
                    <div key={c.hex} className="sw" style={{ background: c.hex, color: c.ink, border: c.border ? '1px solid #333' : undefined }}>{c.name}<span>{c.hex}</span></div>
                ))}
            </div>
            <div className="tile t-type">
                <span className="mono">Typography</span>
                <div className="big">Aa</div>
                <div><p>{section.specimen}</p><small>{section.fonts}</small></div>
            </div>
            <div className="tile t-cats">
                <span className="mono">Stop categories</span>
                {section.categories.map((c) => (
                    <div key={c.name} className="cat" style={{ '--c': c.hex }}><img src={c.icon} alt="" width="128" height="128" /><b>{c.name}</b><span>{c.label} · {c.hex}</span></div>
                ))}
            </div>
            <div className="tile t-icons">
                <span className="mono">3D icons</span>
                <div className="icons" data-icons>
                    {section.icons.map((ic) => <img key={ic.src} src={ic.src} alt={ic.alt} width="128" height="128" />)}
                </div>
            </div>
        </section>
    );
}

// ─── Fasce colore: entrano allungandosi, si aprono al passaggio del mouse ───
export function ColorBands({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        gsap.from(root.querySelectorAll('.band'), { scaleX: 0.12, duration: 1.1, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: root, start: 'top 85%', once: true } });
    }, resizeTick);
    return (
        <section ref={ref} className="bands">
            {section.colors.map((c) => (
                <div key={c.hex} className="band" style={{ background: c.hex, color: c.ink, border: c.border ? '1px solid #2a2440' : undefined }}><b>{c.name}</b><span>{c.hex}</span></div>
            ))}
        </section>
    );
}

// ─── Da tutto schermo a card: le parole del payoff entrano, poi l'immagine si stringe ───
export function ShrinkPayoff({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        const frame = root.querySelector('.frame'), img = frame.querySelector('img'), words = root.querySelectorAll('.shrink__words span');
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
        tl.fromTo(img, { scale: 1.3 }, { scale: 1.05, ease: 'none', duration: 2 }, 0);
        words.forEach((w, i) => tl.fromTo(w, { yPercent: 60, opacity: 0.1 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.2 + i * 0.45));
        tl.to(root.querySelector('.shrink__words'), { opacity: 0, duration: 0.4 }, 2)
            .fromTo(frame, { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: 'inset(14% 10% 14% 10% round 28px)', ease: 'power2.inOut', duration: 1.2 }, 2)
            .to(root.querySelector('.shrink__stick'), { backgroundColor: '#181818', duration: 1.2 }, 2)
            .to(img, { scale: 1, duration: 1.2 }, 2);
    }, resizeTick);
    return (
        <section ref={ref} className="shrink" style={{ '--deep': section.deep }}>
            <div className="shrink__stick">
                <div className="frame"><Img src={section.src} alt={section.alt} /></div>
                <div className="shrink__words">{section.words.map((w, i) => <span key={i} style={i === 1 && section.accent ? { color: section.accent } : undefined}>{w}</span>)}</div>
            </div>
        </section>
    );
}

// ─── Copertina su carta: testata, uscita e prezzo fanno la griglia ───
export function PaperCover({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        gsap.from(root.querySelector('.cover__jp'), { yPercent: -18, opacity: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 75%', once: true } });
        gsap.from(root.querySelector('.cover .frame'), { rotate: -4, y: 50, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 75%', once: true } });
        const img = root.querySelector('.frame.px > img');
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, resizeTick);
    return (
        <section ref={ref} className="paper">
            <div className="cover">
                <div className="cover__jp" aria-hidden="true">{section.vertical}</div>
                <div className="cover__mid">
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                    <div className="folio mono">{section.folio.map((f) => <span key={f}>{f}</span>)}</div>
                </div>
                <div className="frame px"><Img src={section.src} alt={section.alt} /></div>
            </div>
        </section>
    );
}

// ─── Foto a tutta larghezza con un carattere giapponese che sale ───
export function Bleed({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        gsap.fromTo(root.querySelector('img'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo(root.querySelector('.bleed__ma'), { yPercent: -30 }, { yPercent: -70, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, resizeTick);
    return (
        <section style={{ marginTop: 'var(--pad)' }}>
            <div ref={ref} className="bleed">
                <Img src={section.src} alt={section.alt} />
                <div className="bleed__ma" aria-hidden="true">{section.glyph}</div>
            </div>
        </section>
    );
}

// ─── Citazione che entra riga per riga ───
export function Quote({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        gsap.from(root.querySelectorAll('.ln > span'), { yPercent: 105, duration: 1.1, ease: 'power4.out', stagger: 0.12, scrollTrigger: { trigger: root, start: 'top 75%', once: true } });
    }, resizeTick);
    return (
        <section ref={ref} className="quote" id={section.id}>
            {section.glyph && <div className="quote__ma" aria-hidden="true">{section.glyph}</div>}
            <figure style={{ margin: 0 }}>
                <blockquote>{section.lines.map((l, i) => <span key={i} className="ln"><span>{l}</span></span>)}</blockquote>
                {section.caption && <figcaption className="mono">{section.caption}</figcaption>}
            </figure>
        </section>
    );
}

// ─── Il disco esce dalla busta e gira ───
export function VinylSleeve({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        const out = () => (isDesktop() ? { x: 58, y: 0 } : { x: 0, y: 52 });
        gsap.timeline({ scrollTrigger: { trigger: root, start: `top top+=${STICK}`, end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true } })
            .fromTo(root.querySelector('.disc'), { xPercent: 0, yPercent: 0, rotation: 0 }, { xPercent: () => out().x, yPercent: () => out().y, rotation: 540, ease: 'power1.inOut' }, 0)
            .fromTo(root.querySelector('.disc__sheen'), { xPercent: 0, yPercent: 0 }, { xPercent: () => out().x, yPercent: () => out().y, ease: 'power1.inOut' }, 0)
            .fromTo(root.querySelector('.sleeve__cover'), { xPercent: 0, yPercent: 0 }, { xPercent: () => (isDesktop() ? -30 : 0), yPercent: () => (isDesktop() ? 0 : -22), ease: 'power1.inOut' }, 0);
    }, resizeTick);
    return (
        <section ref={ref} className="sleeve">
            <div className="sleeve__stick">
                <div className="sleeve__stage">
                    <div className="disc"><div className="disc__label"><div><b>{section.label.title}</b>{section.label.artist}<br />{section.label.year}</div></div></div>
                    <div className="disc__sheen" />
                    <div className="sleeve__cover"><Img src={section.src} alt={section.alt} /></div>
                </div>
            </div>
        </section>
    );
}

// ─── Retro con la lente e la tracklist vera accanto ───
export function BackCover({ section }) {
    const wrapRef = useRef(null);
    const lensRef = useRef(null);
    const ZOOM = 2.6;
    const onMove = (e) => {
        const w = wrapRef.current, lens = lensRef.current, img = w.querySelector('img');
        const r = w.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        Object.assign(lens.style, {
            left: `${x}px`, top: `${y}px`, backgroundImage: `url(${img.currentSrc || img.src})`,
            backgroundSize: `${r.width * ZOOM}px ${r.height * ZOOM}px`,
            backgroundPosition: `${-(x * ZOOM - 110)}px ${-(y * ZOOM - 110)}px`,
        });
    };
    return (
        <section className="backcover" id={section.id}>
            <div ref={wrapRef} className="loupe-wrap" onMouseMove={onMove}>
                <Img src={section.src} alt={section.alt} />
                <div ref={lensRef} className="loupe" />
            </div>
            <div className="tracks">
                {section.sides.map((side) => (
                    <div key={side.name}>
                        <span className="mono">{side.name}</span>
                        <ol>{side.tracks.map((t, i) => <li key={t}><span>{String(side.start + i).padStart(2, '0')}</span>{t}</li>)}</ol>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Un sito intero che scorre in un browser e in un telefono ───
export function PageScroll({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        root.querySelectorAll('[data-ps-img]').forEach((img) => {
            gsap.fromTo(img, { y: 0 }, { y: () => -(img.offsetHeight - img.parentNode.clientHeight), ease: 'none',
                scrollTrigger: { trigger: root, start: `top top+=${STICK}`, end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true } });
        });
        gsap.from(root.querySelector('.ps__phone'), { y: 120, rotate: 6, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: root, start: 'top 70%', once: true } });
    }, resizeTick);
    return (
        <section ref={ref} className="ps">
            <div className="ps__stick">
                <div className="ps__stage">
                    <div className="ps__browser">
                        <div className="ps__chrome"><i /><i /><i /><span>{section.url}</span></div>
                        <div className="ps__vp"><Img data-ps-img src={section.desktop.src} alt={section.desktop.alt} width={section.desktop.width} height={section.desktop.height} /></div>
                    </div>
                    <div className="ps__phone"><div className="ps__vp ps__vp--m"><Img data-ps-img src={section.mobile.src} alt={section.mobile.alt} width={section.mobile.width} height={section.mobile.height} /></div></div>
                </div>
            </div>
        </section>
    );
}

// ─── Stessa pagina su computer, tablet e telefono, con un controllo a segmenti ───
export function DeviceSwitch({ section }) {
    const [dev, setDev] = useState(section.devices[0].key);
    return (
        <section className="rs">
            <div className="seg">
                <div className="seg__in" role="tablist" aria-label="Screen">
                    {section.devices.map((d) => (
                        <button key={d.key} role="tab" aria-selected={dev === d.key} onClick={() => setDev(d.key)}>{d.label}</button>
                    ))}
                </div>
            </div>
            <div className="rs__stage">
                {section.devices.map((d) => (
                    <div key={d.key} className={`dev dev--${d.key}${dev === d.key ? ' on' : ''}`}>
                        <Img src={d.src} alt={d.alt} width={d.width} height={d.height} />
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Il sistema di un sito: titolo nel suo carattere, palette con l'uso, bottoni veri ───
export function SiteSystem({ section, resizeTick }) {
    const ref = useRef(null);
    useScrollFx(ref, (root) => {
        gsap.from(root.children, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: root, start: 'top 85%', once: true } });
    }, resizeTick);
    return (
        <section ref={ref} className="hsys">
            <div className="hsys__type"><span className="mono">{section.typeLabel}</span><p>{section.specimen[0]}<br />{section.specimen[1]}</p><small>{section.typeNote}</small></div>
            <div className="hsys__pal">
                {section.palette.map((c) => (
                    <div key={c.hex} style={{ background: c.hex, color: c.ink, boxShadow: c.ring ? 'inset 0 0 0 1px #3A3637' : undefined }}><b>{c.name}</b><span>{c.hex} · {c.role}</span></div>
                ))}
            </div>
            <div className="hsys__btns">
                <span className="mono">Buttons</span>
                {section.buttons}
            </div>
        </section>
    );
}

// Tiene la pagina allineata quando le immagini grandi arrivano tardi
export function useRefreshOnMount() {
    useEffect(() => {
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(raf);
    }, []);
}
