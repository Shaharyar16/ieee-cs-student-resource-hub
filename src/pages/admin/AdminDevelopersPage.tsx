import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea, AdminImageField } from '@/components/admin/AdminField';
import Avatar from '@/components/ui/Avatar';
import { developers as seedDevelopers } from '@/data/developers';
import { makeId } from '@/utils/storage';
import type { Developer } from '@/types';

const columns: AdminTableColumn<Developer>[] = [
  {
    key: 'name',
    header: 'Name',
    sortValue: (d) => d.name,
    render: (d) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={d.name} src={d.photo} size="sm" />
        <span className="font-medium text-slate-900">{d.name}</span>
      </div>
    ),
  },
  { key: 'role', header: 'Position', sortValue: (d) => d.role, render: (d) => d.role },
  { key: 'contribution', header: 'Contribution', render: (d) => <span className="line-clamp-1 max-w-xs text-slate-500">{d.contribution}</span> },
];

export default function AdminDevelopersPage() {
  return (
    <AdminResourcePage<Developer>
      title="Developers"
      subtitle="The team shown on the public Developers page"
      addLabel="Add Developer"
      collectionKey="developers"
      seed={seedDevelopers}
      rowKey={(d) => d.id}
      columns={columns}
      searchable={(d) => `${d.name} ${d.role} ${d.skills.join(' ')}`}
      validate={(d) => !!d.name.trim() && !!d.role.trim()}
      emptyItem={() => ({ id: makeId('dev'), name: '', role: '', photo: '', contribution: '', bio: '', skills: [], links: {} })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Photo" hint="Upload an image (no external link needed)">
            <AdminImageField value={draft.photo} onChange={(photo) => setDraft({ ...draft, photo })} />
          </AdminField>
          <AdminField label="Name" required>
            <AdminInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </AdminField>
          <AdminField label="Position in society" required hint="e.g. Lead Developer, UI/UX Designer">
            <AdminInput value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
          </AdminField>
          <AdminField label="Contribution" required>
            <AdminTextarea value={draft.contribution} onChange={(e) => setDraft({ ...draft, contribution: e.target.value })} />
          </AdminField>
          <AdminField label="Short bio">
            <AdminTextarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
          </AdminField>
          <AdminField label="Skills" hint="Comma-separated">
            <AdminInput
              value={draft.skills.join(', ')}
              onChange={(e) => setDraft({ ...draft, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            />
          </AdminField>
          <AdminField label="Portfolio URL">
            <AdminInput value={draft.links.portfolio ?? ''} onChange={(e) => setDraft({ ...draft, links: { ...draft.links, portfolio: e.target.value } })} />
          </AdminField>
          <AdminField label="GitHub URL">
            <AdminInput value={draft.links.github ?? ''} onChange={(e) => setDraft({ ...draft, links: { ...draft.links, github: e.target.value } })} />
          </AdminField>
          <AdminField label="LinkedIn URL">
            <AdminInput value={draft.links.linkedin ?? ''} onChange={(e) => setDraft({ ...draft, links: { ...draft.links, linkedin: e.target.value } })} />
          </AdminField>
          <AdminField label="Contact email">
            <AdminInput value={draft.links.email ?? ''} onChange={(e) => setDraft({ ...draft, links: { ...draft.links, email: e.target.value } })} />
          </AdminField>
        </div>
      )}
    />
  );
}
