// src/pages/projects/eurica/EuricaLive.jsx
// «Live»: pezzi veri dell'interfaccia di Eurica, uno alla volta, scelti con un controllo a segmenti.
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../../utils/gsapConfig.js';
import * as LIVE from './liveSnippets.js';

const PANELS = [
    { key: 'agenda', label: 'The day',   title: 'A day, stop by stop.',      text: 'Drag a stop to change the order: times and walking minutes update. Tap the status to go from Planning to Booked.', hint: 'Drag a card' },
    { key: 'live',   label: 'Live Mode', title: 'The trip, while you’re on it.', text: 'On the day, the top card counts down to the next stop. Tap another stop to open it, then go back to now.', hint: 'Tap a stop' },
    { key: 'split',  label: 'Expenses',  title: 'One expense, split fairly.', text: 'Equally, by amount, by percentage or by shares. Leave someone out and it adds up again; until it does, the remainder stays orange.', hint: 'Change an amount' },
    { key: 'search', label: 'Search',    title: 'Search on the map.',         text: 'Type a name or pick Food & drink: places near the stop, with the minutes on foot. Open one and add it to the day.', hint: 'Open the search' },
    { key: 'colour', label: 'Colours',   title: 'Every trip has its colour.', text: 'Ten pastels, each with a name and a precise place in the app: days, categories, accent.', hint: 'Pick a colour' },
];

/** Monta il markup del componente e lo rende interattivo; smonta timer e listener all'uscita. */
function LiveSnippet({ name }) {
    const ref = useRef(null);
    // Il markup si rifà a ogni montaggio: in StrictMode React monta due volte, e il secondo
    // init troverebbe il componente già segnato data-ready (senza i suoi timer).
    useEffect(() => {
        const el = ref.current;
        el.innerHTML = LIVE[name].html;
        const cleanup = LIVE[name].init(el);
        return () => { cleanup(); el.innerHTML = ''; };
    }, [name]);
    return <div ref={ref} className="live__ui" />;
}

export default function EuricaLive() {
    const [active, setActive] = useState('agenda');
    const stageRef = useRef(null);

    const choose = (key) => {
        setActive(key);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        requestAnimationFrame(() => {
            const ui = stageRef.current?.querySelector(`#lv-${key} .live__ui`);
            if (ui) gsap.fromTo(ui, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        });
    };

    return (
        <section className="live">
            <div className="seg">
                <div className="seg__in" role="tablist" aria-label="Eurica components">
                    {PANELS.map((p) => (
                        <button key={p.key} role="tab" id={`lv-t-${p.key}`} aria-controls={`lv-${p.key}`} aria-selected={active === p.key} onClick={() => choose(p.key)}>
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>
            <div ref={stageRef} className="live__stage">
                {PANELS.map((p) => (
                    <div key={p.key} className="live__panel" id={`lv-${p.key}`} role="tabpanel" aria-labelledby={`lv-t-${p.key}`} hidden={active !== p.key}>
                        <div className="live__txt">
                            <h3>{p.title}</h3>
                            <p>{p.text}</p>
                            <span className="live__try mono">Try it · {p.hint}</span>
                        </div>
                        <LiveSnippet name={p.key} />
                    </div>
                ))}
            </div>
        </section>
    );
}
