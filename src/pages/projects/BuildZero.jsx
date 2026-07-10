// src/pages/projects/BuildZero.jsx
import ProjectPage from './ProjectPage.jsx';

import nextHeroImage from '../../../img/portfolio/portfolio-01.jpg';

// [00] Hero — iPhone con biglietto digitale + icona app, su sfondo scuro
import imgCover from '../../../img/build-zero/build-zero-cover.png';

// [01] Logo — wordmark "build zero" su sfondo giallo
import imgLogo from '../../../img/build-zero/build-zero-logo.png';

// [A] [B] — 800×1000 portrait row
import imgTicketsCloseup from '../../../img/build-zero/build-zero-a-tickets-closeup.png';
import imgArResult       from '../../../img/build-zero/build-zero-b-ar-result.png';

// [C] — 1600×900 landscape, panoramica schermate app
import imgScreensOverview from '../../../img/build-zero/build-zero-c-screens-overview.png';

// [D] [E] [F] — iPhone row (430×984)
import imgTicketsList from '../../../img/build-zero/build-zero-d-tickets-list.png';
import imgBuyTicket    from '../../../img/build-zero/build-zero-e-buy-ticket.png';
import imgScanner      from '../../../img/build-zero/build-zero-f-scanner.png';

// [G] — 1600×1350 landscape, user flow completo
import imgFlow from '../../../img/build-zero/build-zero-g-flow.png';

// [H] — 1600×900 landscape, wireframes
import imgWireframes from '../../../img/build-zero/build-zero-h-wireframes.png';

const buildZero = {
    name: 'Build Zero',
    category: 'UX/UI DESIGN',
    year: '2024',
    heroImage: imgCover,
    description: 'App mobile iOS per l\'evento LEGO® Build Zero — una giornata di sensibilizzazione ambientale in Piazza Duomo, Milano. L\'app combina ticketing digitale, news feed e uno scanner AR che trasforma immagini reali in modelli 3D LEGO.',
    keyInfo: {
        client:     'LEGO® / Build Zero',
        timeSpan:   '2024',
        typeOfWork: 'UX/UI Design, iOS App',
        kpi:        'AR Experience',
    },
    sections: [

        // ── 1. [01] Logo (nessun crop, ratio originale 1600×900) ────────────────
        {
            type: 'natural',
            src:  imgLogo,
            alt:  'Build Zero — wordmark su sfondo giallo',
        },

        // ── 2. Testo sinistra ─────────────────────────────────────────────────
        {
            type: 'text',
            layout: 'left',
            content: 'Un evento LEGO® dedicato alla sostenibilità ambientale, tenutosi in Piazza Duomo a Milano. L\'app era il punto di accesso unico all\'esperienza: acquisto biglietti, notizie sugli animali in pericolo e uno scanner AR per costruire modelli LEGO in realtà aumentata.',
        },

        // ── 3. Palette (colori estratti dagli asset reali dell'app) ────────────
        {
            type: 'palette',
            colors: [
                { hex: '#FFDE57', name: 'Zero Yellow' },
                { hex: '#006EBF', name: 'Ice Blue'     },
                { hex: '#00B04E', name: 'Arctic Green' },
                { hex: '#000000', name: 'Deep Black'   },
            ],
        },

        // ── 4. Testo destra ───────────────────────────────────────────────────
        {
            type: 'text',
            layout: 'right',
            content: 'La sfida principale: rendere un\'esperienza AR complessa accessibile a tutte le età, mantenendo la brand identity LEGO. Il risultato è un\'interfaccia che gioca con i colori del brand, la geometria dei mattoncini e la semplicità delle interazioni iOS native.',
        },

        // ── 5. [A]+[B] — Tickets close-up + AR result (full width, no parallax) ─
        {
            type: 'row',
            images: [
                { src: imgTicketsCloseup, alt: 'Build Zero — tre biglietti digitali con QR code',        aspect: 'portrait' },
                { src: imgArResult,       alt: 'Build Zero — risultato scanner AR: modello 3D orso polare', aspect: 'portrait' },
            ],
        },

        // ── 6. [H] — Wireframes (nessun crop) ────────────────────────────────
        {
            type: 'natural',
            src:  imgWireframes,
            alt:  'Build Zero — wireframes dello scanner e della lista biglietti',
        },

        // ── 7. [D]+[E]+[F] — iPhone row ──────────────────────────────────────
        {
            type: 'iphone-row',
            images: [
                { src: imgTicketsList, alt: 'Build Zero mobile — lista biglietti acquistati' },
                { src: imgBuyTicket,   alt: 'Build Zero mobile — acquisto biglietto'         },
                { src: imgScanner,     alt: 'Build Zero mobile — scanner AR'                 },
            ],
        },

        // ── 8. [G] — User flow completo (nessun crop) ───────────────────────────
        {
            type: 'natural',
            src:  imgFlow,
            alt:  'Build Zero — user flow completo e architettura schermate',
        },

        // ── 9. [C] — Panoramica schermate app (nessun crop) ────────────────────
        {
            type: 'natural',
            src:  imgScreensOverview,
            alt:  'Build Zero — panoramica delle schermate dell\'app',
        },

    ],
    nextProject: {
        name:      'Portfolio Website',
        path:      '/works/portfolio-website',
        heroImage: nextHeroImage,
    },
};

export default function BuildZero() {
    return <ProjectPage project={buildZero} />;
}
