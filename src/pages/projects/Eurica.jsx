// src/pages/projects/Eurica.jsx
// Case history — Eurica, travel planning web app
import ProjectPage from './ProjectPage.jsx';
import EuricaTripsGrid    from './eurica/EuricaTripsGrid.jsx';
import EuricaSchedulePanel from './eurica/EuricaSchedulePanel.jsx';

import nextHeroImage from '../../../img/romaji/romaji-01.jpg';

// ── Hero: stylised gradient image (will be swapped for real screenshot) ──────
const heroImage = 'https://placehold.co/1440x810/211F20/C6BDFB?text=Eurica';

// ── Design System preview image ───────────────────────────────────────────────
const screenDS = 'https://placehold.co/1440x810/0A0A0A/5B8BFF?text=Design+System';

const eurica = {
    name: 'Eurica',
    category: 'UX/UI DESIGN',
    year: '2025',
    heroImage,
    description: 'A travel planning web app that transforms itinerary building into a ritual — designed for travelers who find pleasure in the planning itself, not just the destination.',
    keyInfo: {
        client:     'Personal Project',
        timeSpan:   '2025 — Ongoing',
        typeOfWork: 'App Design · Dev',
        kpi:        'User Experience',
    },
    sections: [

        // ── 1. All Trips — interactive grid ──────────────────────────────────
        {
            type: 'live-ui',
            content: <EuricaTripsGrid />,
        },

        // ── 2. Brand identity — palette + typography ──────────────────────────
        {
            type: 'palette',
            colors: [
                { hex: '#6A5AC7', name: 'Blue Violet'    },
                { hex: '#C6BDFB', name: 'Light Violet'   },
                { hex: '#DAFF04', name: 'Sun Glare'      },
                { hex: '#211F20', name: 'Darkest Hour'   },
                { hex: '#F3EFEC', name: 'Cloud Dancer'   },
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

        // ── 3. Narrative — design approach ───────────────────────────────────
        {
            type: 'text',
            layout: 'right',
            content: 'Eurica è progettata attorno a una tensione deliberata: l\'efficienza digitale dell\'interfaccia che incontra il piacere fisico dell\'organizzazione analogica. Ogni schermata è pensata per chi trova soddisfazione nel costruire un piano perfetto, non solo nel viverlo.',
        },

        // ── 4. Trip detail — interactive schedule panel ───────────────────────
        {
            type: 'live-ui',
            content: <EuricaSchedulePanel />,
        },

        // ── 5. Narrative — interaction model ─────────────────────────────────
        {
            type: 'text',
            layout: 'left',
            content: 'Il sistema di interazione si basa sulla divulgazione progressiva: i dettagli emergono solo quando sono rilevanti. Drag & drop per riordinare le attività, click sulle pill dei giorni per navigare, hover sulle card per accedere alle azioni — senza toolbar permanenti che occupano spazio.',
        },

        // ── 6. Design System preview ──────────────────────────────────────────
        {
            type: 'desktop',
            src: screenDS,
            alt: 'Eurica — Design system overview: tokens, componenti, icone',
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
