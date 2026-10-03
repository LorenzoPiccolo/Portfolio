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
import imgScreensOverview from '../../../img/build-zero/build-zero-c-screens-overview.webp';

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
    description: 'iOS app for LEGO® Build Zero, an environmental awareness day in Piazza Duomo, Milan. Digital tickets, a news feed and an AR scanner that turns real images into 3D LEGO models.',
    keyInfo: {
        client:     'LEGO® / Build Zero',
        timeSpan:   '2024',
        typeOfWork: 'UX/UI Design, iOS App',
        kpi:        'AR Experience',
    },
    overview: {
        title: 'An app for a LEGO® day in Milan.',
        lede: 'iOS app for LEGO® Build Zero, an environmental awareness day in Piazza Duomo: digital tickets, a news feed and an AR scanner that turns real images into 3D LEGO models.',
        specs: [['Client', 'LEGO® / Build Zero'], ['Year', '2024'], ['Role', 'UX/UI design, iOS app'], ['Focus', 'AR experience']],
    },

    sections: [

        // ── 1. [01] Logo (nessun crop, ratio originale 1600×900) ────────────────
        {
            type: 'natural',
            src:  imgLogo,
            alt:  'Build Zero — wordmark su sfondo giallo',
            width: 1600, height: 900,
        },

        // ── 2. Testo sinistra ─────────────────────────────────────────────────
        {
            type: 'text',
            layout: 'left',
            content: 'A LEGO® event about environmental sustainability, held in Piazza Duomo, Milan. The app was the single way into the experience: buying tickets, news about endangered animals and an AR scanner to build LEGO models in augmented reality.',
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
            content: 'The main challenge: making a complex AR experience easy for all ages while keeping the LEGO brand identity. The result is an interface that plays with the brand colours, the geometry of the bricks and the simplicity of native iOS interactions.',
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
            width: 1600, height: 900,
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
            width: 1600, height: 1350,
        },

        // ── 9. [C] — Panoramica schermate app (nessun crop) ────────────────────
        {
            type: 'natural',
            src:  imgScreensOverview,
            alt:  'Build Zero — panoramica delle schermate dell\'app',
            width: 1600, height: 900,
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
