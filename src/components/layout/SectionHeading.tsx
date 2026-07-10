import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Show the hand-drawn orange underline flourish above the eyebrow. */
  flourish?: boolean;
}

/**
 * Consistent in-page section header (mono eyebrow + display title + optional
 * animated orange curve), mirroring the homepage section headings so every
 * page's sections read as the same family.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  flourish = false,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {flourish && (
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewBox="0 0 120 16"
          className={`h-4 w-28 ${centered ? 'mx-auto' : ''}`}
          aria-hidden="true"
        >
          <motion.path d="M2,14 Q60,-4 118,14" fill="none" stroke="#ff6c0c" strokeWidth={2.5} strokeLinecap="round" />
        </motion.svg>
      )}
      {eyebrow && (
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-ieee-orange">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-slate-600">{description}</p>}
    </motion.div>
  );
}
