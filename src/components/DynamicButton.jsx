// src/components/DynamicButton.jsx
import { forwardRef } from 'react';

import arrowIcon from '../../img/icons/arrow.svg';

const baseBtnClasses =
  'relative flex items-center gap-4 rounded-full border border-[#484848] bg-dark/70 backdrop-blur-lg pl-4 pr-1 py-1 text-light transition-colors duration-300';

const iconWrapClasses =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-300';

const labelClasses = 'text-16 leading-none tracking-[0.02em]';

const DynamicButton = forwardRef(function DynamicButton(
  { label, icon = arrowIcon, className = '', iconClassName = '', ...props },
  ref,
) {
  const buttonClasses = `${baseBtnClasses}${className ? ` ${className}` : ''}`;
  const iconClasses = `${iconWrapClasses}${iconClassName ? ` ${iconClassName}` : ''}`;

  return (
    <button ref={ref} type="button" className={buttonClasses} {...props}>
      <span className={labelClasses}>{label}</span>
      <span className={iconClasses}>
        <img src={icon} alt="" className="h-5 w-5" />
      </span>
    </button>
  );
});

export default DynamicButton;
