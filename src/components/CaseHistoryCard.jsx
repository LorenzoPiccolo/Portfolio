// src/components/CaseHistoryCard.jsx
const SIZE_CLASS = {
  lg: 'lg:col-span-8',
  md: 'lg:col-span-6',
  sm: 'lg:col-span-3',
};

export default function CaseHistoryCard({
  id,
  title,
  year,
  type,
  image,
  alt,
  size = 'md',
  className = '',
  href,
  target,
  rel,
}) {
  const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.md;
  const computedHref = href ?? (id ? `#${id}` : '#');
  const computedRel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);
  const titleClasses =
    'text-16 leading-tight transition-transform duration-300 group-hover:translate-y-[-24px]';

  return (
    <article
      className={`col-span-full lg:self-start ${sizeClass} ${className}`}
      {...(id ? { id } : {})}
    >
      <a
        href={computedHref}
        {...(target ? { target } : {})}
        {...(computedRel ? { rel: computedRel } : {})}
        className="group flex h-full flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded-[16px]"
      >
        <div className="relative overflow-hidden rounded-[16px] border border-light/10 bg-gray850">
          <div className="absolute left-2 top-2 z-10 rounded-full bg-dark/70 px-5 py-1.5 backdrop-blur-lg">
            <h6 className="text-14 text-light">{year}</h6>
          </div>
          <figure className="aspect-[3/2] w-full">
            <img
              src={image}
              alt={alt ?? title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              draggable="false"
            />
          </figure>
        </div>

        <div className="flex items-center justify-between text-light">
          <div className="flex h-[20px] flex-col gap-1 overflow-hidden">
            <span className={titleClasses}>{title}</span>
            <span className={titleClasses}>{title}</span>
          </div>
          <span className="text-14 text-gray400 transition-colors duration-300 group-hover:text-light">
            {type}
          </span>
        </div>
      </a>
    </article>
  );
}
