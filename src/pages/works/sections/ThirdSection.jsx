// src/pages/works/sections/ThirdSection.jsx
import CaseHistoryCard from '../../../components/CaseHistoryCard.jsx';
import project03 from '../../../../img/project-03.jpg';
import imageFooter02 from '../../../../img/image-footer-02.jpg';
import imageFooter03 from '../../../../img/image-footer-03.jpg';
import imageFooter04 from '../../../../img/image-footer-04.jpg';
import imageFooter05 from '../../../../img/image-footer-05.jpg';
import footerImage from '../../../../img/footer-image.jpg';
import gradientImage from '../../../../img/gradient.png';

const CASE_HISTORY_CARDS = [
  {
    id: 'build-zero',
    title: 'Build Zero',
    type: 'UX/UI',
    image: project03,
    size: 'md',
    className: 'lg:row-start-1 lg:col-start-1',
    year: '2024',
    href: '/build-zero.html',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    type: 'Web Design',
    image: imageFooter02,
    size: 'sm',
    className: 'lg:row-start-1 lg:col-start-7',
    year: '2025',
    href: '/portfolio-website.html',
  },
  {
    id: 'alidays',
    title: 'Alidays',
    type: 'Brand Identity',
    image: footerImage,
    size: 'sm',
    className: 'lg:row-start-1 lg:col-start-10',
    year: '2024',
    href: '/alidays.html',
  },
  {
    id: 'redi-website',
    title: 'Redi Website',
    type: 'Web Development',
    image: imageFooter05,
    size: 'lg',
    className: 'lg:row-start-2 lg:col-start-3 lg:self-center',
    year: '2025',
    href: '/redi-website.html',
  },
  {
    id: 'romaji',
    title: 'Romaji',
    type: 'Magazine',
    image: imageFooter03,
    size: 'sm',
    className: 'lg:row-start-3 lg:col-start-1',
    year: '2024',
    href: '/romaji.html',
  },
  {
    id: 'atalus',
    title: 'Atalus',
    type: 'Brand Identity',
    image: imageFooter04,
    size: 'sm',
    className: 'lg:row-start-3 lg:col-start-4',
    year: '2025',
    href: '/atalus.html',
  },
  {
    id: 'reborn',
    title: 'Reborn',
    type: 'Vinyl',
    image: gradientImage,
    size: 'md',
    className: 'lg:row-start-3 lg:col-start-7',
    year: '2023',
    href: '/reborn.html',
  },
];

export default function WorksThirdSection() {
  return (
    <section className="relative isolate w-screen bg-dark px-6 pb-32 text-light">
      <div className="mx-auto flex w-full flex-col gap-12">
        <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-12 lg:gap-6 lg:gap-y-[104px]">
          {CASE_HISTORY_CARDS.map((card) => (
            <CaseHistoryCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
