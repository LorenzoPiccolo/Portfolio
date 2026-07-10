// src/pages/projects/Eurica.jsx
import ProjectPage from './ProjectPage.jsx';

import nextHeroImage from '../../../img/romaji/romaji-01.jpg';

// Hero + landscape desktop sections
import imgCover    from '../../../img/eurica/eurica-cover.png';
import imgLogo     from '../../../img/eurica/eurica-logo.png';

// [A] [B] — 800×1000 portrait split
import imgBerlinCard  from '../../../img/eurica/eurica-a-berlin-card.png';
import imgAddActivity from '../../../img/eurica/eurica-b-add-activity.png';

// [C] [D] — 800×1000 portrait split
import imgIcons   from '../../../img/eurica/eurica-c-icons.png';
import imgDayTabs from '../../../img/eurica/eurica-d-sidebar.png';

// [E] — 1600×900 landscape desktop
import imgEOverview from '../../../img/eurica/eurica-e-overview.png';

// [F] [G] — 800×1000 portrait split
import imgBoxes      from '../../../img/eurica/eurica-f-boxes.png';
import imgTripHeader from '../../../img/eurica/eurica-g-map.png';

// [H] [I] [L] — iPhone row
import imgMobileTrips  from '../../../img/eurica/eurica-h-mobile-01.png';
import imgMobileDetail from '../../../img/eurica/eurica-i-mobile-02.png';
import imgMobileHome   from '../../../img/eurica/eurica-l-mobile-03.png';

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
    sections: [

        // ── 1. Logo ───────────────────────────────────────────────────────────
        {
            type: 'desktop',
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

        // ── 6. [C]+[D] — Icons + Day Tabs (full width, no parallax) ──────────
        {
            type: 'row',
            images: [
                { src: imgIcons,   alt: 'Eurica — libreria icone 3D per le categorie di viaggio', aspect: 'portrait' },
                { src: imgDayTabs, alt: 'Eurica — day tabs e filter chips nella vista itinerario', aspect: 'portrait' },
            ],
        },

        // ── 7. [E] — Overview Eurica color theme (1600×900) ───────────────────
        {
            type: 'desktop',
            src:  imgEOverview,
            alt:  'Eurica — overview del color theme con palette e componenti UI',
        },

        // ── 8. [F]+[G] — Boxes + Trip Header (full width, no parallax) ───────
        {
            type: 'row',
            images: [
                { src: imgBoxes,      alt: 'Eurica — componenti UI: note editor, reminders, next trip widget', aspect: 'portrait' },
                { src: imgTripHeader, alt: 'Eurica — trip header con breadcrumb e navigazione contestuale',     aspect: 'portrait' },
            ],
        },

        // ── 9. [H]+[I]+[L] — iPhone row ────────────────────────────────────────
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
