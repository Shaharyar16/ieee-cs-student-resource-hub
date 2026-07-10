import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Upload } from 'lucide-react';
import type { ProjectItem } from '@/types';
import VerificationBadge from '@/components/ui/VerificationBadge';
import Magnetic from '@/components/effects/Magnetic';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="relative overflow-hidden bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <svg
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-6 w-full text-ieee-ink/[0.08]"
        aria-hidden="true"
      >
        <path d="M0,0 Q100,26 200,0 L200,0 L0,0 Z" fill="currentColor" />
      </svg>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewBox="0 0 120 16"
              className="h-4 w-28"
              aria-hidden="true"
            >
              <motion.path d="M2,14 Q60,-4 118,14" fill="none" stroke="#ff6c0c" strokeWidth={2.5} strokeLinecap="round" />
            </motion.svg>
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-ieee-orange">
              Built By Students
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Project Showcase
            </h2>
            <p className="mt-3 max-w-lg text-slate-600">
              A portfolio of what the chapter has shipped — AI, web platforms, and open-source tools
              built by fellow students.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Magnetic>
              <Link
                to="/projects-expo/submit"
                data-cursor="link"
                className="flex items-center gap-1.5 rounded-xl bg-ieee-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark"
              >
                <Upload className="h-4 w-4" /> Submit Project
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/projects-expo"
                data-cursor="link"
                className="flex items-center gap-1.5 rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
              >
                Browse All
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Link
              to={`/projects-expo/${featured.id}`}
              data-cursor="link"
              className="group grid overflow-hidden rounded-3xl border border-black/5 bg-ieee-ink text-white shadow-xl md:grid-cols-2"
            >
              <div className="relative h-64 overflow-hidden md:h-full">
                <img
                  src={featured.screenshots[0]}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ieee-ink/80 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ieee-orange">
                    Featured · {featured.category}
                  </span>
                  <VerificationBadge status={featured.verification} size="sm" />
                </div>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{featured.title}</h3>
                <p className="text-white/60">{featured.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {featured.techStack.map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ieee-orange">
                  View case study{' '}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                to={`/projects-expo/${project.id}`}
                data-cursor="link"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={project.screenshots[0]}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-slate-900">{project.title}</h3>
                    <VerificationBadge status={project.verification} size="sm" />
                  </div>
                  <p className="text-sm text-slate-500">{project.tagline}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.githubUrl && <Code2 className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
