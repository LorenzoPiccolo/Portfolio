// src/data/works.js
// Homepage featured works (cards with video)
import project01Video from '../../video/project-01.mp4';
import project02Video from '../../video/project-02.mp4';
import footerImage from '../../img/footer-image.jpg';
import imageFooter02 from '../../img/image-footer-02.jpg';
import buildZeroHero from '../../img/build-zero/build-zero-01.jpg';
import imageFooter05 from '../../img/image-footer-05.jpg';
import portfolioHero from '../../img/portfolio/portfolio-01.jpg';
import atalusHero from '../../img/atalus/atalus-01.jpg';

export const WORKS = [
  {
    id: 'build-zero',
    title: 'Build Zero',
    subtitle: 'UX/UI Design',
    poster: buildZeroHero,
    year: '2024',
    href: '/case-history/build-zero',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'Web Design',
    poster: portfolioHero,
    year: '2025',
    href: '/case-history/portfolio-website',
  },
  {
    id: 'alidays',
    title: 'Alidays',
    subtitle: 'Brand Identity',
    poster: footerImage,
    year: '2024',
    href: '/case-history/alidays',
  },
  {
    id: 'atalus',
    title: 'Atalus',
    subtitle: 'Digital Identity',
    poster: atalusHero,
    year: '2024',
    href: '/case-history/atalus',
  },
];
