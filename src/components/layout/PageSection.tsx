import type { ReactNode } from 'react';

interface PageSectionProps {
  children: ReactNode;
  /** Surface color. cream = warm panel, white = crisp, plain = transparent. */
  tone?: 'cream' | 'white' | 'plain';
  /**
   * Marks the first content section after the hero: rounds the top corners and
   * pulls it up so it rises over the dark 3D hero like a sheet, matching the
   * homepage's cream sections scrolling over the particle field.
   */
  top?: boolean;
  id?: string;
  className?: string;
  /** Extra classes for the inner max-width container. */
  containerClassName?: string;
  /** Constrain the inner container width. */
  width?: 'default' | 'narrow' | 'wide';
}

const toneClass: Record<NonNullable<PageSectionProps['tone']>, string> = {
  cream: 'bg-cream',
  white: 'bg-white',
  plain: '',
};

const widthClass: Record<NonNullable<PageSectionProps['width']>, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-[88rem]',
};

export default function PageSection({
  children,
  tone = 'white',
  top = false,
  id,
  className = '',
  containerClassName = '',
  width = 'default',
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={`relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12 ${toneClass[tone]} ${
        top ? 'z-10 -mt-8 rounded-t-[2.25rem] border-t border-black/5 shadow-[0_-20px_60px_rgba(10,10,12,0.25)] sm:-mt-10 sm:rounded-t-[2.75rem]' : ''
      } ${className}`}
    >
      <div className={`relative mx-auto ${widthClass[width]} ${containerClassName}`}>{children}</div>
    </section>
  );
}
