import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { projects as seedProjects } from '@/data/projects';
import type { ProjectItem } from '@/types';

const columns: AdminTableColumn<ProjectItem>[] = [
  { key: 'title', header: 'Title', sortValue: (p) => p.title, render: (p) => <span className="font-medium text-slate-900">{p.title}</span> },
  { key: 'tagline', header: 'Tagline', render: (p) => <span className="line-clamp-1 max-w-xs text-slate-500">{p.tagline}</span> },
  { key: 'category', header: 'Category', sortValue: (p) => p.category, render: (p) => p.category },
  { key: 'year', header: 'Year', sortValue: (p) => p.year, render: (p) => p.year },
];

export default function AdminProjectsPage() {
  return (
    <AdminResourcePage<ProjectItem>
      title="Projects"
      subtitle="Student-submitted projects — review and remove if needed"
      addLabel=""
      collectionKey="projectsExpo"
      addable={false}
      editable={false}
      seed={seedProjects}
      rowKey={(p) => p.id}
      columns={columns}
      searchable={(p) => `${p.title} ${p.tagline} ${p.category} ${p.techStack.join(' ')}`}
      emptyItem={() => seedProjects[0]}
      renderForm={() => null}
      renderView={(p) => (
        <div className="flex flex-col gap-4">
          {p.screenshots.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {p.screenshots.map((s) => (
                <img key={s} src={s} alt={p.title} className="h-28 w-full rounded-xl border border-black/5 object-cover" />
              ))}
            </div>
          )}
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">{p.title}</h3>
            <p className="text-sm text-slate-500">{p.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <span key={t} className="rounded-full bg-ieee-orange/10 px-2.5 py-1 font-mono text-[11px] text-ieee-orange">
                {t}
              </span>
            ))}
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Problem</p>
            <p className="mt-1 text-sm text-slate-600">{p.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Solution</p>
            <p className="mt-1 text-sm text-slate-600">{p.solution}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Team</p>
            <p className="mt-1 text-sm text-slate-600">{p.team.map((m) => `${m.name} (${m.role})`).join(', ')}</p>
          </div>
        </div>
      )}
    />
  );
}
