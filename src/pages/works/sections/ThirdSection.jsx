// src/pages/works/sections/ThirdSection.jsx
import CaseHistoryCard from '../../../components/CaseHistoryCard.jsx';

const CASE_HISTORY_CARDS = [
  {
    id: 'build-zero',
    title: 'Build Zero',
    type: 'UX/UI',
    image: '../../../../img/project-03.jpg',
    size: 'md',
    className: 'lg:row-start-1 lg:col-start-1',
    year: '2024',
  },
  {
    id: 'romaji',
    title: 'Romaji',
    type: 'Magazine',
    image: '../../../../img/image-footer-02.jpg',
    size: 'sm',
    className: 'lg:row-start-1 lg:col-start-7',
    year: '2024',
  },
  {
    id: 'atalus',
    title: 'Atalus',
    type: 'Brand Identity',
    image: '../../../../img/image-footer-03.jpg',
    size: 'sm',
    className: 'lg:row-start-1 lg:col-start-10',
    year: '2025',
  },
  {
    id: 'reborn',
    title: 'Reborn',
    type: 'Vinyl',
    image: '../../../../img/image-footer-04.jpg',
    size: 'lg',
    className: 'lg:row-start-2 lg:col-start-3 lg:self-center',
    year: '2023',
  },
  {
    id: 'more-than-me',
    title: 'MoreThanMe',
    type: 'Merchandising',
    image: '../../../../img/image-footer-05.jpg',
    size: 'sm',
    className: 'lg:row-start-3 lg:col-start-1',
    year: '2025',
  },
  {
    id: 'yep',
    title: 'Yep',
    type: 'Logo',
    image: '../../../../img/footer-image.jpg',
    size: 'sm',
    className: 'lg:row-start-3 lg:col-start-4',
    year: '2024',
  },
  {
    id: 'feb-care',
    title: 'FEB Care',
    type: 'Catalog',
    image: '../../../../img/gradient.png',
    size: 'md',
    className: 'lg:row-start-3 lg:col-start-7',
    year: '2025',
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
