// src/pages/case-history/Atalus.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/atalus/atalus-01.jpg';
import image2 from '../../../img/atalus/atalus-02.jpg';
import image3 from '../../../img/atalus/atalus-03.jpg';
import image4 from '../../../img/atalus/atalus-04.jpg';
import image5 from '../../../img/atalus/atalus-05.jpg';
import image6 from '../../../img/atalus/atalus-06.jpg';

const atalus = {
    name: 'Atalus',
    category: 'BRAND IDENTITY',
    year: '2025',
    heroImage: heroImage,
    description: 'A sophisticated brand identity for a luxury service. Every element was designed to convey elegance, trust, and attention to detail.',
    images: [
        { src: image2, alt: 'Brand applications' },
        { src: image3, alt: 'Visual identity' },
        { src: image4, alt: 'Stationery design' },
        { src: image5, alt: 'Final presentation' },
        { src: image6, alt: 'Detail view' },
    ],
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The identity system includes a refined color palette, custom typography selections, and a comprehensive set of brand guidelines for consistent application.',
        },
    ],
};

export default function Atalus() {
    return <CaseHistoryPage project={atalus} />;
}
