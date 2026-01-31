// src/pages/case-history/Alidays.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/footer-image.jpg';
import image1 from '../../../img/image-footer-03.jpg';
import image2 from '../../../img/image-footer-04.jpg';

const alidays = {
    name: 'Alidays',
    category: 'BRAND IDENTITY',
    year: '2024',
    heroImage: heroImage,
    description: 'A complete brand identity system designed to capture the essence of travel and discovery. From logo to touchpoints, every element tells a cohesive story.',
    images: [
        { src: image1, alt: 'Brand elements', rounded: true },
        { src: image2, alt: 'Applications', rounded: false },
    ],
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The brand strategy was developed through deep market analysis and collaborative workshops, resulting in a distinctive visual language that resonates with travelers.',
        },
    ],
};

export default function Alidays() {
    return <CaseHistoryPage project={alidays} />;
}
