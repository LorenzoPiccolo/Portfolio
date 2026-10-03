// src/pages/projects/EuricaHome.jsx
// La home page di eurica.it (landing.html del repo di Eurica). Schermate vere della landing,
// fotografate in locale con Chrome; l'apertura è rifatta dal vivo in ./eurica/LandingHero.jsx.
import ProjectPage from './ProjectPage.jsx';
import nextHeroImage from '../../../img/romaji/romaji-01.jpg';
import shotHero     from '../../../img/eurica-home/d-hero.webp';
import shotForYou   from '../../../img/eurica-home/d-foryou.webp';
import shotWhy      from '../../../img/eurica-home/d-why.webp';
import shotTools    from '../../../img/eurica-home/d-tools.webp';
import shotFeatures from '../../../img/eurica-home/d-features.webp';
import shotHow      from '../../../img/eurica-home/d-how.webp';
import shotEnd      from '../../../img/eurica-home/d-end.webp';
import fullDesktop  from '../../../img/eurica-home/d-full.webp';
import fullMobile   from '../../../img/eurica-home/m-full.webp';
import heroTablet   from '../../../img/eurica-home/t-hero.webp';
import heroMobile   from '../../../img/eurica-home/m-hero.webp';

const D = { width: 2400, height: 1500 };
const ARROW = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

const euricaHome = {
    name: 'Eurica Home',
    category: 'WEB DESIGN',
    year: '2026',
    theme: 'home',
    hue: '#C6BDFB',
    heroImage: shotHero,
    heroAlt: 'The eurica.it home page: Plan every day. Then just go.',
    ctaButton: { label: 'Visit eurica.it', href: 'https://eurica.it', target: '_blank' },

    overview: {
        title: 'A home page you can try before signing up.',
        lede: 'The eurica.it home page explains the app with real pieces of the interface: you drag them, tick them, switch them. I designed and built it.',
        specs: [['Client', 'Personal project'], ['Year', '2026'], ['Role', 'Web design & development'], ['Stack', 'HTML, CSS, GSAP']],
    },

    highlights: [
        { src: shotForYou,   ...D, alt: 'The “For people who enjoy the planning part” section', strong: 'For people who enjoy the planning.', text: 'A grid of tiles: a map that draws itself, icons, a photo, the word Free.' },
        { src: shotWhy,      ...D, alt: 'The “Spreadsheets, notes, forty open tabs” section', strong: 'First, the chaos.', text: 'Tabs, spreadsheets and emails that gather into a single trip as you scroll.' },
        { src: shotTools,    ...D, alt: 'The tools section', strong: 'The tools.', text: 'Five items with a view that changes beside them. The timeline really drags.' },
        { src: shotFeatures, ...D, alt: 'The features grid', strong: 'The features.', text: 'Cards you can touch: the badge switches, the reminder ticks, the theme changes.' },
        { src: shotHow,      ...D, alt: 'The “Three steps. Then pack.” section', strong: 'Three steps.', text: 'The dotted line draws itself and a plane flies along it. Below, the cities scroll and change direction with you.' },
        { src: shotEnd,      ...D, alt: 'The ending: The trip starts before you leave', strong: 'The ending.', text: 'Floating 3D icons and the only lime button on the page.' },
    ],

    sections: [
        { type: 'chapter', id: 'live', nav: 'Live', eyebrow: 'Live', title: 'The real opening.', lede: <>A day in Rome on the phone, four pieces of the app around it. <strong>Drag the cards, tick the reminders, hover the ticket.</strong></> },
        { type: 'landing-hero' },

        { type: 'chapter', id: 'page', nav: 'Page', eyebrow: 'The page', title: 'Seven sections, one story.', lede: <>From the promise to the first trip: who it’s for, why it exists, the tools, the features, the three steps. <strong>Scroll and the page scrolls with you.</strong></> },
        {
            type: 'pagescroll', url: 'eurica.it',
            desktop: { src: fullDesktop, width: 1440, height: 7304, alt: 'The whole eurica.it home page on desktop' },
            mobile:  { src: fullMobile,  width: 600,  height: 13138, alt: 'The whole eurica.it home page on a phone' },
        },

        { type: 'chapter', id: 'screens', nav: 'Screens', eyebrow: 'Every screen', title: 'Same opening, three screens.', lede: 'The stage measures what’s left of the screen. On the phone, the ticket and the walking minutes stay.' },
        {
            type: 'devices',
            devices: [
                { key: 'd', label: 'Desktop', src: shotHero,   width: 2400, height: 1500, alt: 'The opening on desktop' },
                { key: 't', label: 'Tablet',  src: heroTablet, width: 1200, height: 1718, alt: 'The opening on a tablet' },
                { key: 'm', label: 'Phone',   src: heroMobile, width: 780,  height: 1688, alt: 'The opening on a phone' },
            ],
        },

        { type: 'chapter', id: 'system', nav: 'System', eyebrow: 'The system', title: 'Bricolage, violet and a single lime.', lede: 'Headlines in Bricolage Grotesque Regular, body in Urbanist. Sun Glare lime is used once per composition: on this page it’s the final button.' },
        {
            type: 'sitesystem',
            typeLabel: 'Bricolage Grotesque · 400',
            specimen: ['Plan every day.', 'Then just go.'],
            typeNote: 'Urbanist for body text, 400 · 600 · 700 · 800',
            palette: [
                { name: 'Cloud Dancer', hex: '#F3EFEC', ink: '#211F20', role: 'background' },
                { name: 'Paper',        hex: '#FAF7F4', ink: '#211F20', role: 'cards' },
                { name: 'Darkest Hour', hex: '#211F20', ink: '#F3EFEC', role: 'dark sections', ring: true },
                { name: 'Blue Violet',  hex: '#6A5AC7', ink: '#F3EFEC', role: 'accent' },
                { name: 'Light Violet', hex: '#C6BDFB', ink: '#211F20', role: 'buttons' },
                { name: 'Sun Glare',    hex: '#DAFF04', ink: '#141213', role: 'one per page' },
            ],
            buttons: (
                <>
                    <div><a className="lh-btn lh-btn-lilac" href="https://eurica.it" target="_blank" rel="noopener noreferrer">Start planning <span className="arrow" aria-hidden="true">{ARROW}</span></a></div>
                    <div><a className="lh-btn lh-btn-sun" href="https://eurica.it" target="_blank" rel="noopener noreferrer">Start planning</a></div>
                    <div><a className="lh-btn lh-btn-line" href="https://eurica.it" target="_blank" rel="noopener noreferrer">Try the app</a></div>
                </>
            ),
        },

        { type: 'outro', title: 'Live at eurica.it.', lede: 'It changes with the app.', cta: { label: 'Visit the site', href: 'https://eurica.it', color: '#C6BDFB' } },
    ],

    nextProject: {
        name:      'Romaji',
        path:      '/works/romaji',
        heroImage: nextHeroImage,
    },
};

export default function EuricaHome() {
    return <ProjectPage project={euricaHome} />;
}
