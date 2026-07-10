import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Target, Lightbulb, Sparkles, GraduationCap, Users2 } from 'lucide-react';
import { projects } from '@/data/projects';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import VerificationBadge from '@/components/ui/VerificationBadge';
import EmptyState from '@/components/ui/EmptyState';
import Magnetic from '@/components/effects/Magnetic';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Projects Expo"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects Expo', to: '/projects-expo' }, { label: 'Not found' }]}
          title="Project not found"
          subtitle="This project may have been removed or the link is incorrect."
        />
        <PageSection tone="cream" top>
          <EmptyState
            title="Nothing here"
            action={
              <Link to="/projects-expo" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
                Back to Projects Expo
              </Link>
            }
          />
        </PageSection>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow={project.category}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Projects Expo', to: '/projects-expo' },
          { label: project.title },
        ]}
        title={project.title}
        subtitle={project.tagline}
        meta={[
          { value: `${project.year}`, label: 'Year' },
          { value: `${project.team.length}`, label: 'Team Size' },
          { value: `${project.techStack.length}`, label: 'Technologies' },
        ]}
      >
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
          <VerificationBadge status={project.verification} />
        </span>
      </PageHero>

      <PageSection tone="cream" top>
        {/* screenshots */}
        <div className="grid gap-4 sm:grid-cols-2">
          {project.screenshots.map((s, i) => (
            <motion.img
              key={s}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              src={s}
              alt={project.title}
              loading="lazy"
              className="h-60 w-full rounded-3xl border border-black/5 object-cover shadow-[0_8px_30px_rgba(10,10,12,0.1)]"
            />
          ))}
        </div>

        {/* problem / solution */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2 text-ieee-orange">
              <Target className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold text-slate-900">Problem</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.problem}</p>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2 text-ieee-orange">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold text-slate-900">Solution</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.solution}</p>
          </div>
        </div>

        {/* features */}
        <div className="mt-6 rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-2 text-ieee-orange">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-display text-lg font-bold text-slate-900">Key Features</h3>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.features.map((f) => (
              <div key={f} className="flex gap-3 rounded-xl bg-cream px-4 py-3 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-orange" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* team + tech */}
      <PageSection tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-black/5 bg-cream p-7 shadow-sm">
            <div className="flex items-center gap-2 text-ieee-orange">
              <Users2 className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold text-slate-900">Team</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {project.team.map((m) => (
                <li key={m.name} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800">{m.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ieee-orange">{m.role}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 border-t border-black/5 pt-4 text-sm text-slate-600">
              <GraduationCap className="h-4 w-4 text-ieee-orange" />
              <span className="font-medium text-slate-800">Supervisor:</span> {project.supervisor}
            </p>
          </div>

          <div className="rounded-3xl border border-black/5 bg-cream p-7 shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-900">Tech Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ieee-orange/20 bg-ieee-orange/10 px-3 py-1.5 font-mono text-xs text-ieee-orange"
                >
                  {t}
                </span>
              ))}
            </div>

            <h3 className="mt-7 font-display text-lg font-bold text-slate-900">Learnings</h3>
            <ul className="mt-4 space-y-2.5">
              {project.learnings.map((l) => (
                <li key={l} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-orange" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {project.demoUrl && (
            <Magnetic>
              <a
                href={project.demoUrl}
                data-cursor="link"
                className="flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark"
              >
                <ExternalLink className="h-4 w-4" /> View Demo
              </a>
            </Magnetic>
          )}
          {project.githubUrl && (
            <Magnetic>
              <a
                href={project.githubUrl}
                data-cursor="link"
                className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
              >
                <Code2 className="h-4 w-4" /> View GitHub
              </a>
            </Magnetic>
          )}
        </div>
      </PageSection>
    </div>
  );
}
