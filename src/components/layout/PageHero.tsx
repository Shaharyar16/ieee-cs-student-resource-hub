import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import AnimatedBackground from '@/components/effects/AnimatedBackground';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  /** Small mono uppercase label above the title (e.g. "Resources"). */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Breadcrumb trail; the last item is rendered as the current page. */
  breadcrumb?: Crumb[];
  /** Action buttons / search bar / filters rendered under the subtitle. */
  children?: ReactNode;
  /** Small stat or meta chips shown at the bottom of the hero. */
  meta?: { value: string; label: string }[];
  align?: 'left' | 'center';
  /** Slightly shorter hero for dense listing pages. */
  compact?: boolean;
}

/**
 * The shared page header for every public inner page. Renders the same fixed
 * 3D particle background as the homepage so the whole site reads as one theme,
 * then lays a transparent, dark-on-light hero over it. Page content that
 * follows should sit on a cream/white surface (see PageSection) which scrolls
 * over the persistent 3D field exactly like the homepage does.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  children,
  meta,
  align = 'left',
  compact = false,
}: PageHeroProps) {
  const centered = align === 'center';

  return (
    <>
      <AnimatedBackground />

      <section
        className={`relative overflow-hidden px-5 sm:px-8 lg:px-12 ${
          compact ? 'pt-28 pb-14 sm:pt-32' : 'pt-32 pb-20 sm:pt-36 sm:pb-24'
        }`}
      >
        {/* soft brand glow + fine grid, purely decorative */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-ieee-orange/15 blur-[120px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          }}
        />

        <div className={`relative mx-auto max-w-7xl ${centered ? 'text-center' : ''}`}>
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`mb-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/40 ${
                centered ? 'justify-center' : ''
              }`}
              aria-label="Breadcrumb"
            >
              {breadcrumb.map((crumb, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <Fragment key={`${crumb.label}-${i}`}>
                    {crumb.to && !last ? (
                      <Link
                        to={crumb.to}
                        data-cursor="link"
                        className="transition-colors hover:text-ieee-orange"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={last ? 'text-white/70' : ''}>{crumb.label}</span>
                    )}
                    {!last && <ChevronRight className="h-3 w-3 text-white/25" />}
                  </Fragment>
                );
              })}
            </motion.nav>
          )}

          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-ieee-orange backdrop-blur ${
                centered ? 'mx-auto' : ''
              }`}
            >
              <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-ieee-orange" />
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display font-bold tracking-tight text-cream ${eyebrow ? 'mt-5' : ''}`}
            style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.5rem)', lineHeight: 1.05 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className={`mt-5 max-w-2xl text-base text-white/60 sm:text-lg ${centered ? 'mx-auto' : ''}`}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className={`mt-8 flex flex-wrap items-center gap-3 ${centered ? 'justify-center' : ''}`}
            >
              {children}
            </motion.div>
          )}

          {meta && meta.length > 0 && (
            <motion.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className={`mt-10 flex flex-wrap gap-x-10 gap-y-4 ${centered ? 'justify-center' : ''}`}
            >
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-display text-2xl font-bold text-cream sm:text-3xl">{m.value}</dt>
                  <dd className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {m.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </section>
    </>
  );
}
