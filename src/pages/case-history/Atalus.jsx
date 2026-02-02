// src/pages/case-history/Atalus.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/image-footer-04.jpg';
import image1 from '../../../img/footer-image.jpg';
import image2 from '../../../img/project-03.jpg';
import image3 from '../../../img/image-footer-02.jpg';
import image4 from '../../../img/image-footer-03.jpg';
import image5 from '../../../img/image-footer-05.jpg';

const atalus = {
    name: 'Atalus',
    category: 'BRAND IDENTITY',
    year: '2025',
    heroImage: heroImage,
    description: 'A sophisticated brand identity for a luxury service. Every element was designed to convey elegance, trust, and attention to detail.',
    images: [
        { src: image1, alt: 'Logo development' },
        { src: image2, alt: 'Brand applications' },
        { src: image3, alt: 'Visual identity' },
        { src: image4, alt: 'Stationery design' },
        { src: image5, alt: 'Final presentation' },
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
