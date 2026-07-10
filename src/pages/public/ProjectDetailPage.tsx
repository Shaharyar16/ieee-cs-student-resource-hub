import { useParams } from 'react-router-dom';
import { projects } from '@/data/projects';
import VerificationBadge from '@/components/ui/VerificationBadge';
import EmptyState from '@/components/ui/EmptyState';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <EmptyState title="Project not found" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="grid gap-2 sm:grid-cols-2">
        {project.screenshots.map((s) => (
          <img key={s} src={s} alt={project.title} className="h-56 w-full rounded-2xl object-cover" />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
          <p className="mt-1 text-slate-600">{project.tagline}</p>
        </div>
        <VerificationBadge status={project.verification} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">Problem</h3>
          <p className="mt-2 text-sm text-slate-600">{project.problem}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">Solution</h3>
          <p className="mt-2 text-sm text-slate-600">{project.solution}</p>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="font-semibold text-slate-900">Key Features</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="font-semibold text-slate-900">Team</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {project.team.map((m) => (
              <li key={m.name}>{m.name} — <span className="text-slate-400">{m.role}</span></li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-medium text-slate-800">Supervisor:</span> {project.supervisor}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Tech Stack</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-semibold text-slate-900">Learnings</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
          {project.learnings.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.demoUrl && (
          <a href={project.demoUrl} className="rounded-lg bg-ieee-orange px-5 py-3 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            View Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-ieee-orange hover:text-ieee-orange">
            View GitHub
          </a>
        )}
      </div>
    </div>
  );
}
