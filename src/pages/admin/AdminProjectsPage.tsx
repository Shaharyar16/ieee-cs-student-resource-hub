import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea } from '@/components/admin/AdminField';
import MultiImageUpload from '@/components/projects/MultiImageUpload';
import { projectSeed } from '@/data/projectSeed';
import { PROJECTS_KEY, likeCount, commentCount, repostCount } from '@/services/projectsService';
import { makeId } from '@/utils/storage';
import type { ProjectPost } from '@/types';

const columns: AdminTableColumn<ProjectPost>[] = [
  { key: 'title', header: 'Title', sortValue: (p) => p.title, render: (p) => <span className="font-medium text-slate-900">{p.title}</span> },
  { key: 'author', header: 'Posted By', sortValue: (p) => p.authorName, render: (p) => p.authorName },
  { key: 'category', header: 'Category', sortValue: (p) => p.category ?? '', render: (p) => p.category ?? '—' },
  { key: 'likes', header: 'Likes', sortValue: (p) => likeCount(p), render: (p) => likeCount(p) },
  { key: 'comments', header: 'Comments', sortValue: (p) => commentCount(p), render: (p) => commentCount(p) },
];

export default function AdminProjectsPage() {
  return (
    <AdminResourcePage<ProjectPost>
      title="Projects"
      subtitle="Moderate the student projects feed — add, edit or remove posts (no verification needed)"
      addLabel="Add Project"
      collectionKey={PROJECTS_KEY}
      seed={projectSeed}
      rowKey={(p) => p.id}
      columns={columns}
      searchable={(p) => `${p.title} ${p.authorName} ${p.creators.join(' ')} ${p.techStack.join(' ')}`}
      validate={(p) => !!p.title.trim() && !!p.tagline.trim()}
      emptyItem={() => ({
        id: makeId('proj'),
        title: '',
        tagline: '',
        description: '',
        creators: [],
        techStack: [],
        screenshots: [],
        category: '',
        authorId: null,
        authorName: 'IEEE CS',
        authorAvatar: '',
        createdAt: new Date().toISOString(),
        baseLikes: 0,
        likedBy: [],
        baseReposts: 0,
        repostedBy: [],
        comments: [],
      })}
      renderView={(p) => (
        <div className="flex flex-col gap-4">
          {p.screenshots[0] && <img src={p.screenshots[0]} alt={p.title} className="w-full rounded-xl border border-black/5 object-cover" />}
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">{p.title}</h3>
            <p className="text-sm text-slate-500">{p.tagline}</p>
          </div>
          <p className="whitespace-pre-wrap text-sm text-slate-600">{p.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <span key={t} className="rounded-full bg-cream px-2.5 py-1 font-mono text-[11px] text-slate-600">
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Built by:</span> {p.creators.join(', ') || p.authorName}
          </p>
          <div className="flex gap-4 border-t border-black/5 pt-3 text-sm text-slate-500">
            <span>{likeCount(p)} likes</span>
            <span>{commentCount(p)} comments</span>
            <span>{repostCount(p)} reposts</span>
          </div>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Screenshots" hint="Up to 3 — first is the cover">
            <MultiImageUpload value={draft.screenshots} onChange={(screenshots) => setDraft({ ...draft, screenshots })} max={3} />
          </AdminField>
          <AdminField label="Title" required>
            <AdminInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </AdminField>
          <AdminField label="Tagline" required>
            <AdminInput value={draft.tagline} onChange={(e) => setDraft({ ...draft, tagline: e.target.value })} />
          </AdminField>
          <AdminField label="Creators / members" hint="Comma-separated names">
            <AdminInput
              value={draft.creators.join(', ')}
              onChange={(e) => setDraft({ ...draft, creators: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            />
          </AdminField>
          <AdminField label="Tech stack" hint="Comma-separated">
            <AdminInput
              value={draft.techStack.join(', ')}
              onChange={(e) => setDraft({ ...draft, techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            />
          </AdminField>
          <AdminField label="Category">
            <AdminInput value={draft.category ?? ''} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
          </AdminField>
          <div className="grid grid-cols-2 gap-3">
            <AdminField label="GitHub URL">
              <AdminInput value={draft.githubUrl ?? ''} onChange={(e) => setDraft({ ...draft, githubUrl: e.target.value })} />
            </AdminField>
            <AdminField label="Demo URL">
              <AdminInput value={draft.demoUrl ?? ''} onChange={(e) => setDraft({ ...draft, demoUrl: e.target.value })} />
            </AdminField>
          </div>
          <AdminField label="Description">
            <AdminTextarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="min-h-32" />
          </AdminField>
        </div>
      )}
    />
  );
}
