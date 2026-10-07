// src/pages/projects/portfolio/PortfolioSections.jsx
// Le sezioni su misura della case history del portfolio: poche parole, il sito che si mostra da solo.
// L'identità (logo, colori, caratteri, icone), il testo che si accende allo scroll come in home,
// le tavole grandi. Stile in ../caseHistory.css (prefisso pf-).
import { useEffect, useLayoutEffect, useRef } from 'react';
import DynamicMarquee from '../../../components/DynamicMarquee.jsx';
import { Highlights } from '../sections/common.jsx';
import { gsap } from '../../../utils/gsapConfig.js';

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

// ─── L'identità: il marchio grande, la palette, i due caratteri, le icone a fil di ferro ───
export function PfIdentity({ section, resizeTick }) {
    const ref = useRef(null);
    useFx(ref, (root) => {
        gsap.from(root.querySelectorAll('.pf-tile'), { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: root, start: 'top 85%', once: true } });
        gsap.from(root.querySelectorAll('.pf-sw'), { scaleY: 0.2, transformOrigin: 'bottom', duration: 1.1, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: root, start: 'top 80%', once: true } });
        gsap.fromTo(root.querySelector('.pf-logo img'), { scale: 0.8, rotate: -6 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'center center', scrub: true } });
    }, resizeTick);
    const { logo, palette, typeface: type, icons } = section;
    return (
        <section ref={ref} className="pf-id">
            <div className="pf-tile pf-logo"><img src={logo} alt="The LPZ monogram" /></div>
            <div className="pf-tile pf-pal">
                {palette.map((c) => (
                    <div key={c.hex} className="pf-sw" style={{ background: c.hex, color: c.ink, boxShadow: c.ring ? 'inset 0 0 0 1px #333' : undefined }}>
                        <b>{c.name}</b><span>{c.hex}</span>
                    </div>
                ))}
            </div>
            <div className="pf-tile pf-type">
                <span className="mono">{type.label}</span>
                <div className="pf-aa">Aa</div>
                <p className="pf-spec">{type.specimen}</p>
                <p className="pf-mono">{type.mono}</p>
            </div>
            <div className="pf-tile pf-icons">
                <span className="mono">{icons.label}</span>
                <div className="pf-icons__row">
                    {icons.items.map((ic) => (
                        <figure key={ic.label}><img src={ic.src} alt="" /><figcaption>{ic.label}</figcaption></figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Il testo che si accende parola per parola mentre scorri, come in home ───
export function PfReveal({ section, resizeTick }) {
    const ref = useRef(null);
    useFx(ref, (root) => {
        const words = root.querySelectorAll('.pf-reveal__w');
        gsap.fromTo(words, { opacity: 0.16 }, {
            opacity: 1, ease: 'none', stagger: 0.12,
            scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 45%', scrub: 0.6 },
        });
    }, resizeTick);
    return (
        <section ref={ref} className="pf-reveal">
            <p>
                {section.text.split(' ').map((w, i) => (
                    <span key={i} className={`pf-reveal__w${section.accent?.includes(w) ? ' pf-accent' : ''}`}>{w} </span>
                ))}
            </p>
        </section>
    );
}

// ─── Una tavola grande, che entra leggermente rimpicciolita ───
export function PfImage({ section, resizeTick }) {
    const ref = useRef(null);
    useFx(ref, (root) => {
        gsap.fromTo(root.querySelector('img'), { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'center center', scrub: true } });
    }, resizeTick);
    return (
        <section ref={ref} className="pf-image">
            <div className="frame"><img src={section.src} alt={section.alt} width={section.width} height={section.height} loading="lazy" decoding="async" /></div>
        </section>
    );
}

// ─── Motion: un carosello di animazioni vere, ognuna in loop nella sua cella ───
// Le animazioni sono CSS (prefisso pfm-) e girano solo quando la cella è a schermo.
function Cell({ label, children, className = '' }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        const io = new IntersectionObserver(([e]) => el.classList.toggle('run', e.isIntersecting), { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
        <div ref={ref} className={`pfm ${className}`}>
            <span className="mono pfm__lab">{label}</span>
            {children}
        </div>
    );
}

const CHEVRON = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>;

const DEMOS = {
    // L'apertura: i fotogrammi del ritratto in loop, col marquee sopra
    hero: ({ d }) => (
        <Cell label="Hero · 207 frames" className="pfm-hero">
            <div className="pfm-hero__film" style={{ backgroundImage: `url(${d.strip})` }} />
            <div className="pfm-hero__mq"><DynamicMarquee duration="24s"><span>Web · UI/UX · AI visual ·&nbsp;</span></DynamicMarquee></div>
        </Cell>
    ),
    // Il manifesto che si accende parola per parola
    reveal: ({ d }) => (
        <Cell label="Statement · word by word" className="pfm-reveal">
            <p>{d.text.split(' ').map((w, i) => <span key={i} style={{ animationDelay: `${i * 0.16}s` }}>{w} </span>)}</p>
        </Cell>
    ),
    // Il menu: la pillola si apre sul posto, le voci entrano a scalare
    menu: ({ d }) => (
        <Cell label="Header · menu" className="pfm-menu">
            <div className="pfm-menu__pill">
                <div className="pfm-menu__top">
                    <img src={d.logo} alt="" />
                    <span className="pfm-menu__r">Works<span className="pfm-burger"><i /><i /><i /></span></span>
                </div>
                <div className="pfm-menu__body">
                    <ul>{['Home', 'Works', 'Behance'].map((l, i) => <li key={l} style={{ animationDelay: `${0.9 + i * 0.12}s` }}>{l}</li>)}</ul>
                    <div className="pfm-menu__card" style={{ backgroundImage: `url(${d.card})` }}><span>New</span></div>
                </div>
            </div>
        </Cell>
    ),
    // I bottoni veri del sito: magnetici, con il riempimento arancione
    buttons: ({ d }) => (
        <Cell label="Buttons · try them" className="pfm-buttons">
            <div className="pfm-buttons__row">{d.buttons}</div>
            <span className="mono pfm-hint">Hover</span>
        </Cell>
    ),
    // Le card dei progetti che salgono e si impilano
    stack: ({ d }) => (
        <Cell label="Selected works · stack" className="pfm-stack">
            {d.cards.map((c, i) => (
                <div key={c.title} className="pfm-card" style={{ '--i': i, animationName: `pfm-card${i}` }}>
                    <img src={c.src} alt="" /><span className="pfm-tag">{c.year}</span><b>{c.title}</b>
                </div>
            ))}
        </Cell>
    ),
    // Gli strumenti: si accende la riga che passa a metà
    tools: ({ d }) => (
        <Cell label="Tools · one row at a time" className="pfm-tools">
            <span className="pfm-tools__side">Different tools for<br />the best result</span>
            <ul style={{ '--n': d.tools.length }}>
                {d.tools.map((t, i) => <li key={t} style={{ animationDelay: `${i * 0.8}s` }}>{t}</li>)}
            </ul>
        </Cell>
    ),
    // Works: l'anteprima segue il cursore sulle righe della tabella
    preview: ({ d }) => (
        <Cell label="Works · cursor preview" className="pfm-prev">
            <div className="pfm-prev__table">
                {d.rows.map((r) => <div key={r.title} className="pfm-prev__row"><b>{r.title}</b><span>{r.type}</span><span>{r.year}</span><i>↗</i></div>)}
            </div>
            <div className="pfm-prev__follow">
                <div className="pfm-prev__img">{d.rows.map((r, i) => <img key={r.title} src={r.src} alt="" style={{ animationDelay: `${i * 1.5}s` }} />)}</div>
                <span className="pfm-prev__cursor" />
            </div>
        </Cell>
    ),
};

export function PfMotion({ section }) {
    const items = section.slides.map((s) => {
        const Demo = DEMOS[s.key];
        return { node: <Demo d={section.data} />, bg: '#141414', strong: s.strong, text: s.text };
    });
    return <div className="pf-motion"><Highlights items={items} title={section.title ?? ''} /></div>;
}
