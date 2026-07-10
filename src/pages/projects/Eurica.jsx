// src/pages/projects/Eurica.jsx
import ProjectPage from './ProjectPage.jsx';

import nextHeroImage from '../../../img/romaji/romaji-01.jpg';

// [00] Hero — campagna "Create. Explore. Travel." con wordmark
import imgCover from '../../../img/eurica/eurica-cover.webp';

// [01] Logo — wordmark su sfondo lavanda
import imgLogo from '../../../img/eurica/eurica-logo.png';

// [A] [B] — 800×1000 portrait row
import imgBerlinCard  from '../../../img/eurica/eurica-a-berlin-card.png';
import imgAddActivity from '../../../img/eurica/eurica-b-add-activity.png';

// [C] — 1600×900 landscape, immagine brand/campagna
import imgBrand from '../../../img/eurica/eurica-c-brand.webp';

// [D] [E] — 800×1000 portrait row
import imgIcons   from '../../../img/eurica/eurica-d-icons.png';
import imgDayTabs from '../../../img/eurica/eurica-e-daytabs.png';

// [F] — 1645×980 landscape, dettaglio viaggio Berlin con mappa 3D
import imgTripMapDetail from '../../../img/eurica/eurica-f-tripmap.webp';

// [G] — 1600×900 landscape, dashboard overview con globo interattivo
import imgDashboard from '../../../img/eurica/eurica-g-dashboard.png';

// [H] [I] — 800×1000 portrait row
import imgBoxes      from '../../../img/eurica/eurica-h-boxes.png';
import imgTripHeader from '../../../img/eurica/eurica-i-tripheader.png';

// [L] [M] [N] — iPhone row
import imgMobileTrips  from '../../../img/eurica/eurica-l-mobile-01.png';
import imgMobileDetail from '../../../img/eurica/eurica-m-mobile-02.png';
import imgMobileHome   from '../../../img/eurica/eurica-n-mobile-03.png';

const eurica = {
    name: 'Eurica',
    category: 'UX/UI DESIGN',
    year: '2025',
    heroImage: imgCover,
    description: 'A travel planning web app that transforms itinerary building into a ritual — designed for travelers who find pleasure in the planning itself, not just the destination.',
    keyInfo: {
        client:     'Personal Project',
        timeSpan:   '2025 — Ongoing',
        typeOfWork: 'App Design · Dev',
        kpi:        'User Experience',
    },
    ctaButton: {
        label:  "Prova l'app",
        href:   'https://eurica.it',
        target: '_blank',
    },
    sections: [

        // ── 1. [01] Logo (nessun crop, ratio originale 1600×900) ────────────────
        {
            type: 'natural',
            src:  imgLogo,
            alt:  'Eurica — wordmark su sfondo lavanda',
        },

        // ── 2. Testo sinistra ─────────────────────────────────────────────────
        {
            type: 'text',
            layout: 'left',
            content: 'Eurica è progettata attorno a una tensione deliberata: l\'efficienza dell\'interfaccia digitale che incontra il piacere dell\'organizzazione analogica. Ogni schermata è pensata per chi trova soddisfazione nel costruire un piano perfetto, non solo nel viverlo.',
        },

        // ── 3. Palette + tipografia ────────────────────────────────────────────
        {
            type: 'palette',
            colors: [
                { hex: '#6A5AC7', name: 'Blue Violet'  },
                { hex: '#C6BDFB', name: 'Light Violet' },
                { hex: '#DAFF04', name: 'Sun Glare'    },
                { hex: '#211F20', name: 'Darkest Hour'  },
                { hex: '#F3EFEC', name: 'Cloud Dancer'  },
            ],
            fonts: [
                {
                    name:     'Bricolage Grotesque',
                    weights:  ['Regular 400', 'Bold 700', 'ExtraBold 800'],
                    specimen: 'Il viaggio inizia prima di partire.',
                },
                {
                    name:     'Urbanist',
                    weights:  ['Medium 500', 'SemiBold 600', 'Bold 700'],
                    specimen: 'Pianifica. Esplora. Ricorda.',
                },
            ],
        },

        // ── 4. Testo destra ───────────────────────────────────────────────────
        {
            type: 'text',
            layout: 'right',
            content: 'Il sistema di interazione si basa sulla divulgazione progressiva: i dettagli emergono solo quando sono rilevanti. Drag & drop per riordinare le attività, pill dei giorni per navigare, hover sulle card per accedere alle azioni — senza toolbar permanenti che occupano spazio.',
        },

        // ── 5. [A]+[B] — Berlin card + Add activity (full width, no parallax) ─
        {
            type: 'row',
            images: [
                { src: imgBerlinCard,  alt: 'Eurica — dettaglio viaggio Berlin con lista attività Day 1', aspect: 'portrait' },
                { src: imgAddActivity, alt: 'Eurica — modale "Add activity" con time picker e categorie',  aspect: 'portrait' },
            ],
        },

        // ── 6. [C] — Immagine brand "Create. Explore. Travel." (nessun crop) ──
        {
            type: 'natural',
            src:  imgBrand,
            alt:  'Eurica — visual di campagna "Create. Explore. Travel."',
        },

        // ── 7. [D]+[E] — Icons + Day Tabs (full width, no parallax) ──────────
        {
            type: 'row',
            images: [
                { src: imgIcons,   alt: 'Eurica — libreria icone 3D per le categorie di viaggio', aspect: 'portrait' },
                { src: imgDayTabs, alt: 'Eurica — day tabs e filter chips nella vista itinerario', aspect: 'portrait' },
            ],
        },

        // ── 8. [F] — Berlin trip detail, mappa 3D + pannello location ─────────
        //     Nessun crop: ratio originale 1645×980 (non è un 16:9 esatto)
        {
            type: 'natural',
            src:  imgTripMapDetail,
            alt:  'Eurica — dettaglio viaggio Berlin con mappa 3D e pannello location',
        },

        // ── 9. [G] — Dashboard overview con globo interattivo (nessun crop) ───
        {
            type: 'natural',
            src:  imgDashboard,
            alt:  'Eurica — dashboard con globo interattivo, sidebar e statistiche viaggio',
        },

        // ── 10. [H]+[I] — Boxes + Trip Header (full width, no parallax) ──────
        {
            type: 'row',
            images: [
                { src: imgBoxes,      alt: 'Eurica — componenti UI: note editor, reminders, next trip widget', aspect: 'portrait' },
                { src: imgTripHeader, alt: 'Eurica — trip header con breadcrumb e navigazione contestuale',     aspect: 'portrait' },
            ],
        },

        // ── 11. [L]+[M]+[N] — iPhone row ────────────────────────────────────────
        {
            type: 'iphone-row',
            images: [
                { src: imgMobileTrips,  alt: 'Eurica mobile — All Trips con filtri e trip card' },
                { src: imgMobileDetail, alt: 'Eurica mobile — dettaglio Berlin con mappa 3D' },
                { src: imgMobileHome,   alt: 'Eurica mobile — Home con globo e next trip' },
            ],
        },

    ],
    nextProject: {
        name:      'Romaji',
        path:      '/works/romaji',
        heroImage: nextHeroImage,
    },
};

export default function Eurica() {
    return <ProjectPage project={eurica} />;
}
