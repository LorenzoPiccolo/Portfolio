// src/pages/projects/Eurica.jsx
import ProjectPage from './ProjectPage.jsx';

import nextHeroImage from '../../../img/romaji/romaji-01.jpg';

// Hero + brand
import imgCover    from '../../../img/eurica/eurica-cover.png';
import imgLogo     from '../../../img/eurica/eurica-logo.png';
import imgOverview from '../../../img/eurica/eurica-overview.png';

// Components / UI details (portrait)
import imgMap        from '../../../img/eurica/eurica-g-map.png';
import imgBerlinCard from '../../../img/eurica/eurica-a-berlin-card.png';
import imgAddActivity from '../../../img/eurica/eurica-b-add-activity.png';
import imgIcons      from '../../../img/eurica/eurica-c-icons.png';
import imgSidebar    from '../../../img/eurica/eurica-d-sidebar.png';
import imgBoxes      from '../../../img/eurica/eurica-f-boxes.png';

// Mobile screens (iphone-row)
import imgMobile01 from '../../../img/eurica/eurica-h-mobile-01.png';
import imgMobile02 from '../../../img/eurica/eurica-i-mobile-02.png';
import imgMobile03 from '../../../img/eurica/eurica-l-mobile-03.png';

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

        // ── 1. Logo / brand mark ──────────────────────────────────────────────
        {
            type: 'desktop',
            src:  imgLogo,
            alt:  'Eurica — wordmark su sfondo lavanda',
        },

        // ── 2. Testo — visione progettuale ────────────────────────────────────
        {
            type: 'text',
            layout: 'left',
            content: 'Eurica è progettata attorno a una tensione deliberata: l\'efficienza dell\'interfaccia digitale che incontra il piacere dell\'organizzazione analogica. Ogni schermata è pensata per chi trova soddisfazione nel costruire un piano perfetto, non solo nel viverlo.',
        },

        // ── 3. Dashboard overview ─────────────────────────────────────────────
        {
            type: 'desktop',
            src:  imgOverview,
            alt:  'Eurica — dashboard con globo interattivo, sidebar e statistiche viaggio',
        },

        // ── 4. Palette + tipografia ───────────────────────────────────────────
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

        // ── 5. Testo — modello di interazione ─────────────────────────────────
        {
            type: 'text',
            layout: 'right',
            content: 'Il sistema di interazione si basa sulla divulgazione progressiva: i dettagli emergono solo quando sono rilevanti. Drag & drop per riordinare le attività, pill dei giorni per navigare, hover sulle card per accedere alle azioni — senza toolbar permanenti che occupano spazio.',
        },

        // ── 6. Gallery — mappa 3D + dettaglio viaggio + modale ───────────────
        {
            type: 'gallery',
            images: [
                { src: imgMap,        alt: 'Eurica — mappa Mapbox 3D Berlin con pin attività',    aspect: 'portrait' },
                { src: imgBerlinCard, alt: 'Eurica — card viaggio Berlin con lista attività Day 1', aspect: 'portrait' },
                { src: imgAddActivity, alt: 'Eurica — modale "Add activity" con time picker e categorie', aspect: 'portrait' },
            ],
        },

        // ── 7. Gallery — icone 3D + sidebar + componenti ─────────────────────
        {
            type: 'gallery',
            images: [
                { src: imgIcons,   alt: 'Eurica — libreria icone 3D per le categorie di viaggio', aspect: 'portrait'  },
                { src: imgSidebar, alt: 'Eurica — sidebar con navigazione e lista trip',           aspect: 'portrait'  },
                { src: imgBoxes,   alt: 'Eurica — componenti UI: note editor, reminders, next trip widget', aspect: 'portrait' },
            ],
        },

        // ── 8. iPhone row — app mobile ────────────────────────────────────────
        {
            type: 'iphone-row',
            images: [
                { src: imgMobile03, alt: 'Eurica mobile — Home con globo e next trip' },
                { src: imgMobile01, alt: 'Eurica mobile — All Trips con filtri e trip card' },
                { src: imgMobile02, alt: 'Eurica mobile — dettaglio Berlin con mappa 3D' },
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
