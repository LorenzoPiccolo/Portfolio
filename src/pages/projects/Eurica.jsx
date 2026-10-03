// src/pages/projects/Eurica.jsx
// Le schermate dell'app sono vere e attuali (ottobre 2026): fatte con il frontend dell'app contro un
// finto server con il viaggio di prova di Siviglia, senza Supabase. Logo, campagna e visual sono quelli di sempre.
import ProjectPage from './ProjectPage.jsx';
import nextHeroImage from '../../../img/eurica-home/kamakura-preview.webp';

// Marchio
import imgCover   from '../../../img/eurica/eurica-cover.webp';
import imgLogo    from '../../../img/eurica/eurica-logo.png';
import imgBrand   from '../../../img/eurica/eurica-c-brand.webp';
import imgPreview from '../../../img/eurica/eurica-preview.webp';

// Schermate dell'app (computer 2400×1500, telefono 780×1688)
import shotHome     from '../../../img/eurica/app/d1-home.webp';
import shotTrips    from '../../../img/eurica/app/d2-all-trips.webp';
import shotMap      from '../../../img/eurica/app/d3-trip-map.webp';
import shotCalendar from '../../../img/eurica/app/d4-calendar.webp';
import shotTable    from '../../../img/eurica/app/d4b-table.webp';
import shotStop     from '../../../img/eurica/app/d5-stop-card.webp';
import shotExpenses from '../../../img/eurica/app/d6-expenses-trip.webp';
import shotYear     from '../../../img/eurica/app/d10-your-year.webp';
import shotPassport from '../../../img/eurica/app/d11-passport.webp';
import phoneHome    from '../../../img/eurica/app/m9-home.webp';
import phoneDay     from '../../../img/eurica/app/m8-trip-day.webp';
import phoneLive    from '../../../img/eurica/app/m10-live.webp';

// Icone 3D dell'app
import icoAirplane  from '../../../img/eurica/icons/airplane.webp';
import icoGiralda   from '../../../img/eurica/icons/giralda.webp';
import icoPasta     from '../../../img/eurica/icons/pasta.webp';
import icoSunHat    from '../../../img/eurica/icons/sun-hat.webp';
import icoHotel     from '../../../img/eurica/icons/hotel-bed.webp';
import icoColosseum from '../../../img/eurica/icons/colosseum.webp';
import icoGate      from '../../../img/eurica/icons/brandenburg-gate.webp';
import icoEiffel    from '../../../img/eurica/icons/eiffel-tower.webp';
import icoSagrada   from '../../../img/eurica/icons/sagrada-familia.webp';
import icoBoarding  from '../../../img/eurica/icons/boarding-pass.webp';
import icoSuitcase  from '../../../img/eurica/icons/suitcase.webp';
import icoMetro     from '../../../img/eurica/icons/metro.webp';
import icoCamera    from '../../../img/eurica/icons/camera.webp';
import icoRestaurant from '../../../img/eurica/icons/restaurant.webp';
import icoGelato    from '../../../img/eurica/icons/ice-cream-bar.webp';
import icoSunglasses from '../../../img/eurica/icons/sunglasses.webp';
import icoCompass   from '../../../img/eurica/icons/compass.webp';

const D = { width: 2400, height: 1500 };
const M = { width: 780, height: 1688 };

const eurica = {
    name: 'Eurica',
    category: 'UX/UI DESIGN',
    year: '2025',
    theme: 'eurica',
    hue: '#C6BDFB',
    heroImage: imgCover,
    heroAlt: 'Eurica wordmark over a mountain lake',
    ctaButton: { label: 'Try the app', href: 'https://eurica.it', target: '_blank' },

    overview: {
        title: 'The trip, planned in one place.',
        lede: 'Eurica keeps each day’s stops, the map and the people coming with you together. I designed it and built it.',
        specs: [['Client', 'Personal project'], ['Year', '2025 – ongoing'], ['Role', 'Design & development'], ['Platform', 'Web, desktop & phone']],
    },

    highlights: [
        { src: shotHome,     alt: 'Eurica home during a trip to Seville', ...D, strong: 'The home knows where you are.', text: 'During a trip it tells you what day it is, what’s next and which tickets are missing.' },
        { src: shotTrips,    alt: 'All trips', ...D, strong: 'Every trip has its colour.', text: 'And a 3D icon of the city, from the Giralda to the Colosseum.' },
        { src: shotExpenses, alt: 'Shared trip expenses', ...D, strong: 'Expenses split themselves.', text: 'Who paid, who owes what, and one button to settle up.' },
        { src: shotYear,     alt: 'Your year in travel', ...D, strong: 'Your year of travel.', text: 'Days away, countries, categories and how much you spent.' },
        { src: shotPassport, alt: 'The passport profile', ...D, strong: 'Your profile is a passport.', text: 'Stamped with the cities you’ve been to.' },
    ],

    sections: [
        { type: 'chapter', id: 'brand', nav: 'Brand', eyebrow: 'The brand', title: 'Create. Explore. Travel.', lede: 'A soft wordmark, violet as the home colour and lime used once per screen.' },
        {
            type: 'brandgrid',
            images: [
                { src: imgLogo, alt: 'Eurica wordmark in lime on violet' },
                { src: imgBrand, alt: 'Campaign visual: Create. Explore. Travel.', caption: 'Campaign', note: 'Create. Explore. Travel.' },
                { src: imgPreview, alt: 'Eurica vertical visual', caption: 'Social', note: '4:5' },
            ],
        },

        { type: 'chapter', id: 'screens', nav: 'Screens', eyebrow: 'The screens', title: 'One trip, four ways to look at it.' },
        {
            type: 'tour',
            steps: [
                { src: shotMap,      ...D, alt: 'Seville, day 3 with the 3D map', title: 'The day, on the map', text: 'Stops in order on the left, the walking route on the 3D map on the right, with the minutes between one stop and the next.' },
                { src: shotCalendar, ...D, alt: 'The calendar, one column per day', title: 'The calendar', text: 'One column per day. Stops drag from one day to another and the colour tells the category.' },
                { src: shotTable,    ...D, alt: 'The trip as a table', title: 'The table', text: 'The whole trip in rows: times, category, place and status. For people who plan like in a spreadsheet.' },
                { src: shotStop,     ...D, alt: 'The Plaza de España place card', title: 'The place card', text: 'Photo, time, address, ticket and the stop’s expense, in one panel.' },
            ],
        },

        { type: 'chapter', id: 'live', nav: 'Live', eyebrow: 'Live', title: 'Not a screenshot.', lede: <>These pieces of Eurica work. <strong>Tap, drag, change.</strong></> },
        { type: 'eurica-live' },

        { type: 'chapter', id: 'phone', eyebrow: 'On the phone', title: 'In your pocket, while you walk.', lede: <>On the phone the map sits on top and the trip slides up from the bottom. <strong>Live Mode</strong> tells you when to leave for the next stop.</> },
        {
            type: 'phones', color: '#6A5AC7',
            images: [
                { src: phoneHome, ...M, alt: 'Eurica on the phone: the home during a trip' },
                { src: phoneDay,  ...M, alt: 'Eurica on the phone: day 2 in Seville' },
                { src: phoneLive, ...M, alt: 'Live Mode: leave in 16 minutes for Mercado de Triana' },
            ],
        },

        { type: 'chapter', id: 'system', nav: 'System', eyebrow: 'The system', title: 'Violet, lime and plenty of space.', lede: 'Two typefaces, five colours and a set of 3D icons for the stop categories.' },
        {
            type: 'appsystem',
            palette: [
                { name: 'Blue Violet',  hex: '#6A5AC7', ink: '#fff' },
                { name: 'Light Violet', hex: '#C6BDFB', ink: '#211F20' },
                { name: 'Sun Glare',    hex: '#DAFF04', ink: '#211F20' },
                { name: 'Darkest Hour', hex: '#211F20', ink: '#F3EFEC', border: true },
                { name: 'Cloud Dancer', hex: '#F3EFEC', ink: '#211F20' },
            ],
            specimen: 'The trip starts before you leave.',
            fonts: 'Bricolage Grotesque · Urbanist',
            categories: [
                { name: 'Transport',     label: 'Sky',    hex: '#8FCBF0', icon: icoAirplane },
                { name: 'Culture',       label: 'Violet', hex: '#C6BDFB', icon: icoGiralda },
                { name: 'Food',          label: 'Lime',   hex: '#D5EE6E', icon: icoPasta },
                { name: 'Leisure',       label: 'Peach',  hex: '#F6A98C', icon: icoSunHat },
                { name: 'Accommodation', label: 'Honey',  hex: '#F3C969', icon: icoHotel },
            ],
            icons: [
                { src: icoColosseum, alt: 'Colosseum' }, { src: icoGate, alt: 'Brandenburg Gate' }, { src: icoEiffel, alt: 'Eiffel Tower' }, { src: icoSagrada, alt: 'Sagrada Família' },
                { src: icoBoarding, alt: 'Boarding pass' }, { src: icoSuitcase, alt: 'Suitcase' }, { src: icoMetro, alt: 'Metro' }, { src: icoCamera, alt: 'Camera' },
                { src: icoRestaurant, alt: 'Restaurant' }, { src: icoGelato, alt: 'Ice cream' }, { src: icoSunglasses, alt: 'Sunglasses' }, { src: icoCompass, alt: 'Compass' },
            ],
        },
        {
            type: 'copy',
            items: [
                { strong: 'No rush.', text: 'Planning is slow work, and many people like it that way. A stop’s details show up when you click it, not before.' },
                { strong: 'Learn by using it.', text: 'New accounts start with a complete sample trip inside, with stops, map and notes.' },
            ],
        },

        { type: 'chapter', id: 'features', nav: 'Features', eyebrow: 'Everything else', title: 'What a trip needs. Nothing more.', lede: <>The same components as Eurica’s landing page. <strong>Try them.</strong></> },
        { type: 'landing-features' },

        { type: 'outro', title: 'Eurica is live.', lede: 'And I’m still building it.', cta: { label: 'Open eurica.it', href: 'https://eurica.it', color: '#DAFF04' } },
    ],

    nextProject: {
        name:      'Eurica Home',
        path:      '/works/eurica-home',
        heroImage: nextHeroImage,
    },
};

export default function Eurica() {
    return <ProjectPage project={eurica} />;
}
