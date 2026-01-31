// src/pages/case-history/ExampleProject.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

// Using existing images as placeholders
import heroImage from '../../../img/image-footer-05.jpg';
import image1 from '../../../img/image-footer-02.jpg';
import image2 from '../../../img/image-footer-03.jpg';
import image3 from '../../../img/project-03.jpg';

const exampleProject = {
    // Basic info
    name: 'Nome progetto',
    category: 'WEBSITE',
    year: '2025',

    // Hero image (full width, 100svh)
    heroImage: heroImage,

    // Main description (50% width, right aligned, Urbanist 40px)
    description: 'A creative exploration of digital experiences through innovative design and seamless user interactions. This project showcases the intersection of art and technology.',

    // Image sections (100svh each)
    // Set rounded: true for 24px border radius with 24px padding
    images: [
        { src: image1, alt: 'Project detail 1', rounded: true },
        { src: image2, alt: 'Project detail 2', rounded: false },
    ],

    // Additional content sections
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The design process involved extensive research, prototyping, and iterative refinement. We focused on creating an intuitive experience that delights users at every touchpoint.',
        },
        {
            type: 'image',
            content: {
                src: image3,
                alt: 'Final design',
                rounded: true,
            },
        },
    ],
};

export default function ExampleProject() {
    return <CaseHistoryPage project={exampleProject} />;
}
