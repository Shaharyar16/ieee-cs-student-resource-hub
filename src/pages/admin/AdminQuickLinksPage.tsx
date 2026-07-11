import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminSelect } from '@/components/admin/AdminField';
import { quickLinks as seedLinks } from '@/data/quickLinks';
import { makeId } from '@/utils/storage';
import type { QuickLink } from '@/types';

const categories: QuickLink['category'][] = [
  'University Portals',
  'Academic Resources',
  'Society Links',
  'Forms',
  'Event Links',
  'Past Paper Links',
  'Student Help',
];

const columns: AdminTableColumn<QuickLink>[] = [
  { key: 'label', header: 'Label', sortValue: (l) => l.label, render: (l) => <span className="font-medium text-slate-900">{l.label}</span> },
  { key: 'category', header: 'Category', sortValue: (l) => l.category, render: (l) => <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{l.category}</span> },
  { key: 'url', header: 'URL', render: (l) => <span className="font-mono text-xs text-slate-500">{l.url}</span> },
];

export default function AdminQuickLinksPage() {
  return (
    <AdminResourcePage<QuickLink>
      title="Quick Links"
      subtitle="Links shown on the Quick Links page"
      addLabel="Add Link"
      collectionKey="quickLinks"
      seed={seedLinks}
      rowKey={(l) => l.id}
      reorderable
      columns={columns}
      searchable={(l) => `${l.label} ${l.category} ${l.url}`}
      validate={(l) => !!l.label.trim() && !!l.url.trim()}
      emptyItem={() => ({ id: makeId('ql'), label: '', url: '', category: 'University Portals' })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Label" required>
            <AdminInput value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
          </AdminField>
          <AdminField label="URL" required hint="Internal (/courses) or external (https://…)">
            <AdminInput value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
          </AdminField>
          <AdminField label="Category">
            <AdminSelect value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as QuickLink['category'] })}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
        </div>
      )}
    />
  );
}
