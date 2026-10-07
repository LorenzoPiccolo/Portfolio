// src/pages/projects/BuildZero.jsx
// Build Zero: l'app della tesi (2024) ridisegnata da capo nel 2026. Concept personale, non di LEGO:
// niente loghi LEGO, «LEGO®» solo come aggettivo, nota «Fair Play» in fondo, render IA dichiarati.
// Le schermate vengono dal file Figma del progetto (prototipo, a 2x); stand e mini-box dalla tesi.
// Le sezioni su misura sono in ./buildzero/BuildZeroSections.jsx.
import ProjectPage from './ProjectPage.jsx';
import { BzHeroStage, Duo } from './buildzero/BuildZeroSections.jsx';

import nextHeroImage from '../../../img/portfolio/portfolio-01.jpg';

import bear       from '../../../img/build-zero-2026/bear-complete.webp';
import koala      from '../../../img/build-zero-2026/koala.webp';
import miniBox    from '../../../img/build-zero-2026/mini-box.webp';
import stand      from '../../../img/build-zero-2026/stand.webp';

import oldBuy     from '../../../img/build-zero-2026/old-buy.webp';
import oldTickets from '../../../img/build-zero-2026/old-tickets.webp';
import oldScanner from '../../../img/build-zero-2026/old-scanner.webp';

import boardPersonas  from '../../../img/build-zero-2026/site-personas.webp';
import boardJourney   from '../../../img/build-zero-2026/site-journey.webp';
import boardBenchmark from '../../../img/build-zero-2026/site-benchmark.webp';
import boardIa        from '../../../img/build-zero-2026/site-ia.webp';
import boardWire      from '../../../img/build-zero-2026/site-wire.webp';

// Home nelle quattro fasi
import h1 from '../../../img/build-zero-2026/s-h1.webp';
import h2 from '../../../img/build-zero-2026/s-h2.webp';
import h3 from '../../../img/build-zero-2026/s-h3.webp';
import h6 from '../../../img/build-zero-2026/s-h6.webp';
// Acquisto
import f201 from '../../../img/build-zero-2026/s-f2-01.webp';
import f203 from '../../../img/build-zero-2026/s-f2-03.webp';
import f204 from '../../../img/build-zero-2026/s-f2-04.webp';
import f205 from '../../../img/build-zero-2026/s-f2-05.webp';
import f206 from '../../../img/build-zero-2026/s-f2-06.webp';
import f208 from '../../../img/build-zero-2026/s-f2-08.webp';
// Scansione, coda, costruzione
import f301 from '../../../img/build-zero-2026/s-f3-01.webp';
import f305 from '../../../img/build-zero-2026/s-f3-05.webp';
import f401 from '../../../img/build-zero-2026/s-f4-01.webp';
import f402 from '../../../img/build-zero-2026/s-f4-02.webp';
import f404 from '../../../img/build-zero-2026/s-f4-04.webp';
import f405 from '../../../img/build-zero-2026/s-f4-05.webp';
import f407 from '../../../img/build-zero-2026/s-f4-07.webp';
// Dopo l'evento
import f601 from '../../../img/build-zero-2026/s-f6-01.webp';
import f602 from '../../../img/build-zero-2026/s-f6-02.webp';
import f603 from '../../../img/build-zero-2026/s-f6-03.webp';
import f604 from '../../../img/build-zero-2026/s-f6-04.webp';
import f605 from '../../../img/build-zero-2026/s-f6-05.webp';

// Colori dal design system dell'app
const Y = '#FFD600', PLAY = '#DAEBFB', NIGHT = '#011C58', PARTY = '#53138E', INK = '#141414';

const fmt = (n) => n.toLocaleString('en-US');

const buildZero = {
    name: 'Build Zero',
    category: 'UX/UI DESIGN · IOS APP',
    year: '2024 — 2026',
    theme: 'buildzero',
    marqueeMark: <span className="bz-mark" aria-hidden="true" />,
    heroStage: (
        <BzHeroStage
            bear={bear}
            phones={[h1, h2, h6]}
            title={<>One bear.<br />2,000 builders.</>}
            note="An unofficial concept · Milan, a day that never happened"
            label="A polar bear made of bricks on yellow, next to three screens of the app"
        />
    ),

    overview: {
        eyebrow: 'Build Zero · unofficial concept',
        title: 'Thousands of hands. One polar bear.',
        lede: <>An iOS app for a travelling building event I imagined around LEGO® bricks. Every visitor buys a mini-box of 20 bricks, and together they build a giant endangered animal. <strong>The app takes a family from the ticket to the moment their bricks click into place</strong>, and keeps the memory after.</>,
        specs: [['Role', 'UX/UI design, end to end'], ['Timeline', 'Thesis 2024, redesign 2026'], ['Platform', 'iOS 26 · iPhone 17 Pro'], ['Status', 'Personal concept, not commissioned']],
        legal: <><b>A fan concept, not a LEGO project.</b> Build Zero is a personal, non-commercial project I made for my degree and redesigned for my portfolio. It is not affiliated with, sponsored, authorized or endorsed by the LEGO Group. The event, the numbers and the partners in the screens are invented.</>,
    },

    highlights: [
        { bg: PLAY,      node: <Duo shots={[[f201, 'Event detail'], [f205, 'Check and pay']]} />,              strong: 'Tickets in under a minute.', text: 'Apple Pay first, with a grown-up gate before any payment.' },
        { bg: INK,       node: <Duo shots={[[f301, 'Scanning the mini-box'], [f305, 'Your bricks go here']]} />, strong: 'Scan the box, see your spot.', text: 'The four digits on the side of the box tell the app where your bricks go on the bear.' },
        { bg: Y,         node: <Duo shots={[[f401, 'Virtual queue'], [f404, 'It’s your turn']]} />,            strong: 'No standing in line.', text: 'A virtual queue calls you when it’s your turn, with a quiz and AR while you wait.' },
        { bg: '#f4f4f4', node: <Duo shots={[[f405, 'Build mode'], [f402, 'Climate quiz']]} />,                 strong: 'Build mode, like LEGO Builder.', text: 'One step per screen, the parts you need and a 3D view you turn with a finger.' },
        { bg: PARTY,     node: <Duo shots={[[f407, 'Your bricks are in the bear'], [f603, 'The bear is finished']]} />, strong: 'Your bricks, in the bear.', text: 'A keepsake with your builder number, then the day the whole bear is finished.' },
    ],

    sections: [
        // ── L'evento ──
        { type: 'chapter', id: 'event', nav: 'Event', eyebrow: 'The event', title: 'A stand shaped like a brick.', lede: <>The app lives inside an event I designed for my 2024 thesis. <strong>Ten by ten metres, one circular route</strong>, and a giant animal built in the middle by everyone who walks in.</> },
        {
            type: 'bz-event',
            stand: { src: stand, alt: 'Isometric illustration of the Build Zero stand: yellow brick walls, the ticket desk, the scan zone, the mini-box counter, the polar bear in the middle and recycling bins at the exit' },
            box: { label: 'The mini-box', src: miniBox, alt: 'The yellow mini-box with code 0264 printed on its side', text: '100 × 60 × 40 mm, in four colours. Inside, 20 bricks. On the side, the code the app reads to know where those bricks go.' },
            route: { label: 'The route', steps: [['Tickets', 'at the desk or in the app'], ['Scan zone,', 'the app comes out'], ['Mini-box', 'counter, one per builder'], ['The bear,', 'in the middle'], ['Recycle', 'the box on the way out']] },
            caption: 'Stand and packaging from my 2024 thesis. Logos removed for this page.',
        },

        // ── Il restyling ──
        { type: 'chapter', id: 'redesign', nav: 'Redesign', eyebrow: 'The redesign', title: 'Same app, redesigned from scratch.', lede: <>The 2024 app was part of my thesis. In 2026 I went back to the app alone and rebuilt it, <strong>starting from the people at the stand instead of the screens</strong>. Same event, same idea, a new product.</> },
        {
            type: 'bz-redesign',
            cards: [
                { kicker: '2024 · original', title: 'The thesis app', text: 'One piece of a bigger project with the stand and the packaging. Tickets, news and an AR scanner, in Italian.' },
                { kicker: '2026 · redesign', title: 'A product on its own', text: 'New research, flows and design system. 46 screens that follow a family through the whole day.' },
            ],
            pairs: [
                { key: 'buy', label: 'Buying',
                    before: { src: oldBuy, title: 'One screen, PayPal and a login.', text: 'Quantity, price and payment on the ticket itself. To pay you had to sign in to PayPal.' },
                    after:  { src: f205, title: 'Three steps, Apple Pay first.', text: 'How many builders, their nicknames, then pay. No account, and the donation is spelled out.' } },
                { key: 'tickets', label: 'Tickets',
                    before: { src: oldTickets, title: 'A grid of tickets.', text: 'Colourful, but every ticket looked like the next one and the QR was small.' },
                    after:  { src: f208, title: 'One builder, one ticket.', text: 'Each builder has a name and a minifigure. The QR opens at full brightness and works offline.' } },
                { key: 'scan', label: 'Scanning',
                    before: { src: oldScanner, title: 'An AR scanner.', text: 'Point at an image and see a 3D LEGO model. A nice moment, but not the job of the day.' },
                    after:  { src: f301, title: 'Scan the box code.', text: 'The four digits on the mini-box tell the app whose box it is and where the bricks go.' } },
            ],
            hint: 'Drag the yellow line. Left, the 2024 screen. Right, the same step after the redesign.',
            lists: [
                { title: 'What the original missed', items: ['Building together, the heart of the event, was only the last screen.', 'The queue stayed with the staff.', 'After the event there was nothing.', 'No difference between who pays and who builds.'] },
                { title: 'What the redesign does', items: ['The bear is always one tap away, live.', 'A virtual queue with a notification.', 'A memory, the finished bear and the next city.', 'Builders with a nickname and a minifigure. The grown-up holds the wallet.'] },
            ],
        },

        // ── Ricerca ──
        { type: 'chapter', id: 'research', nav: 'Research', eyebrow: 'Research', title: 'Two users, one phone.', lede: <>A child who builds and a grown-up who pays, at a busy stand with weak signal. <strong>Proto-personas, a journey map, a benchmark of six apps, the architecture and 40 lo-fi wireframes.</strong></> },
        {
            type: 'bz-boards',
            boards: [
                { src: boardPersonas,  alt: 'Four proto-personas: Leo the builder, Giulia the parent, Marco the adult fan, Sara the crew', strong: 'Proto-personas.', text: 'Two primary users on one phone: Leo builds, Giulia pays.' },
                { src: boardJourney,   alt: 'Journey map with a mood curve across eight moments', strong: 'Journey map.', text: 'Eight moments, two lows to fix and one high to protect.' },
                { src: boardBenchmark, alt: 'Benchmark of six apps', strong: 'Benchmark.', text: 'One idea from each of six apps.' },
                { src: boardIa,        alt: 'Information architecture: Home, Scan, Tickets', strong: 'Architecture.', text: 'Three tabs, and a Home that changes with the day.' },
                { src: boardWire,      alt: 'Three lo-fi wireframes next to the final screens', strong: 'Wireframes.', text: '40 grey screens first, then the real thing.' },
            ],
        },
        {
            type: 'bz-moments',
            moments: [
                { kicker: 'Critical moment · entrance', title: 'The QR won’t load.', text: 'Hundreds of phones on the same square, weak signal at the gate.', answer: 'The ticket works offline and lives in Apple Wallet.' },
                { kicker: 'Critical moment · box code', title: 'Wrong code, tiny print.', text: 'A child reads four digits on the side of a box while the queue moves.', answer: 'Scan it, or type it, with errors that say where to look.' },
                { kicker: 'Critical moment · waiting', title: 'Kids get bored.', text: 'Nobody knows how long the wait is, so families stand in line.', answer: 'A virtual queue with a notification, a quiz and AR meanwhile.' },
            ],
            truth: { kicker: 'The moment of truth', quote: '“Your bricks go here.”' },
        },
        { type: 'chapter', small: true, eyebrow: 'Principles', title: 'Five rules for every screen.' },
        {
            type: 'bz-rules',
            rules: [
                { title: 'Picture first', text: 'Every step reads from the image. Text confirms.' },
                { title: 'One next step', text: 'The Home shows one main action at a time.' },
                { title: 'Works offline', text: 'Tickets, codes and steps are already on the phone.' },
                { title: 'Grown-ups hold the wallet', text: 'The adult pays, the child builds. One phone, two roles.' },
                { title: 'The bear is the hero', text: 'The shared build is always one tap away.' },
            ],
        },

        // ── Il test e le quattro fasi ──
        { type: 'chapter', id: 'worlds', nav: 'Four worlds', eyebrow: 'Usability test', title: 'Everything worked. The phases looked the same.', lede: <>I tested the clickable prototype with real people. They bought, scanned and built without help. But before the ticket, after buying, on the day and after the event, <strong>the Home looked identical</strong>. A day out has to feel like one. So each phase got its own world.</> },
        {
            type: 'bz-worlds',
            worlds: [
                { kicker: 'before',    bg: PLAY,  ink: INK,    src: h1, alt: 'Home before the ticket', title: 'The bear you will build.', text: 'Builder blue, calm. The chip counts the tickets sold, so even waiting shows progress.' },
                { kicker: 'waiting',   bg: NIGHT, ink: '#fff', src: h2, alt: 'Home with tickets ready', title: 'Twelve days to go.', text: 'Night blue, like the evening before. The hero is the countdown and your tickets, one per builder. A two-minute story each week keeps you coming back.' },
                { kicker: 'event day', bg: Y,     ink: INK,    src: h3, alt: 'Home on event day', title: 'It’s build day!', text: 'Full LEGO yellow, the loudest Home. The bear goes up live, and the card shows the next of four steps.' },
                { kicker: 'after',     bg: PARTY, ink: '#fff', src: h6, alt: 'Home after the event', title: 'Your bricks are in the bear.', text: 'Build Together purple. Your memory first, then the bear still growing, then the next city.' },
            ],
        },

        // ── L'orso ──
        { type: 'chapter', id: 'bear', eyebrow: 'The hero', title: 'Every ticket brings the bear to life.', lede: <>The bear is on every screen that matters. Before the event it shows the tickets sold. On the day it shows the build. <strong>At the end it shows where your bricks are.</strong></> },
        {
            type: 'bz-bear',
            src: bear, total: 2000, start: 1248,
            messages: {
                zero: 'Tickets go on sale. The bear is waiting for its first brick.',
                going: (v) => `The bear is still going up. €${fmt(Math.round(v * 4.99))} from tickets so far, and LEGO matches every one.`,
                full: 'The bear is finished. Leo’s and Emma’s bricks glow on the left ear. €9,980 from tickets, doubled by LEGO: €19,960 for Climate Action Network.',
            },
            caption: 'AI-generated render of a brick sculpture (Magnific, Nano Banana 2), art-directed by me. Not a LEGO product.',
        },

        // ── Flussi ──
        { type: 'chapter', id: 'flows', nav: 'Flows', eyebrow: 'Key flows', title: 'One day, from ticket to memory.' },
        {
            type: 'bz-flows',
            flows: [
                { title: 'Buy in under a minute', text: 'A grown-up gate before any payment. Builders get a nickname and a minifigure, never a real name.',
                    steps: [[f201, 'Event detail'], [f203, 'How many builders'], [f204, 'Nicknames, no data'], [f205, 'Check and pay'], [f206, 'You’re in'], [f208, 'Ticket, offline']] },
                { title: 'Scan, wait, build', text: 'The four digits on the box tell the app where your bricks go. Then the app calls you when it’s your turn.',
                    steps: [[f301, 'Scan the box'], [f305, 'Your bricks go here'], [f401, 'Virtual queue'], [f402, 'Quiz while you wait'], [f405, 'Build mode'], [f407, 'Your bricks are in']] },
                { title: 'After the event', text: 'A certificate to share, the live bear, the finished bear and the next city. A reason to keep the app.',
                    steps: [[f601, 'Your memory'], [f602, 'The live bear'], [f603, 'Finished'], [f604, 'Next stop: Rome'], [f605, 'Climate story']] },
            ],
        },

        // ── Sistema ──
        { type: 'chapter', id: 'system', nav: 'System', eyebrow: 'The system', title: 'LEGO, but modern.', lede: <>The language of LEGO Builder for the app and LEGO Insiders for tickets and payment. <strong>Bricks with a 4-point dark edge, generous radii, and colour that lives in the content, not in the chrome.</strong></> },
        {
            type: 'bz-system',
            palette: [
                { name: 'LEGO yellow',    hex: '#FFD600', ink: INK },
                { name: 'Builder blue',   hex: '#DAEBFB', ink: INK },
                { name: 'Night blue',     hex: '#011C58', ink: '#fff' },
                { name: 'Build Together', hex: '#53138E', ink: '#fff' },
                { name: 'Insiders green', hex: '#006835', ink: '#fff' },
                { name: 'White brick',    hex: '#FFFFFF', ink: INK, ring: true },
            ],
            typeface: { label: 'Type · Inter', big: ['Build', 'together'], note: 'Display Black, titles Bold, body Regular. 17 text styles.' },
            tags: [
                { label: 'Live', bg: '#00B23B', ink: '#fff' },
                { label: 'New', bg: Y, ink: INK },
                { label: 'Polar bear', bg: '#005AD2', ink: '#fff' },
                { label: 'Checked in', bg: '#ddf5e3', ink: '#00852b' },
            ],
            ill: {
                label: 'Illustrations · one animal per city',
                main: { src: bear, alt: 'Polar bear, Milan' },
                small: [{ src: koala, alt: 'Koala, Rome' }, { src: miniBox, alt: 'The mini-box' }],
                text: 'Polar bear for Milan, koala for Rome. The mini-box carries 20 bricks and a four-digit code.',
            },
        },

        // ── Risultati ──
        { type: 'chapter', id: 'outcome', eyebrow: 'Outcome', title: 'Designed to hit.' },
        {
            type: 'bz-metrics',
            metrics: [['< 20 min', 'from the entrance to building'], ['< 60 s', 'to buy, with Apple Pay'], ['> 90%', 'box codes that end with the piece placed'], ['> 50%', 'tickets bought in the app before the day'], ['> 30%', 'visitors who reopen the app after the event']],
            caption: 'Design targets from the brief, not measured results. What’s next: a second test on the four worlds, the crew’s touchpoint and a pitch to the LEGO Group.',
        },

        { type: 'outro', title: 'Next stop, Rome.', lede: 'If you work at the LEGO Group and like the idea, I would love to talk.' },
        {
            type: 'bz-legal',
            lines: [
                'LEGO® is a trademark of the LEGO Group of companies, which does not sponsor, authorize or endorse this site.',
                'Build Zero is a personal, non-commercial design concept. The event, its partners, prices and figures are fictional. LEGO Builder, LEGO Insiders and LEGO Play are mentioned only as design references. Bear, koala and brick images are AI-generated renders.',
            ],
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
