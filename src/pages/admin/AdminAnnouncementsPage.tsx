import { Pin } from 'lucide-react';
import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea, AdminSelect } from '@/components/admin/AdminField';
import { announcements as seedAnnouncements } from '@/data/announcements';
import { makeId } from '@/utils/storage';
import type { Announcement } from '@/types';

const categories: Announcement['category'][] = ['general', 'event', 'academic', 'navigation', 'projects'];

const columns: AdminTableColumn<Announcement>[] = [
  { key: 'title', header: 'Title', sortValue: (a) => a.title, render: (a) => <span className="font-medium text-slate-900">{a.title}</span> },
  { key: 'category', header: 'Category', sortValue: (a) => a.category, render: (a) => <span className="capitalize">{a.category}</span> },
  { key: 'date', header: 'Date', sortValue: (a) => a.date, render: (a) => a.date },
  {
    key: 'pinned',
    header: 'Pinned',
    render: (a) =>
      a.pinned ? (
        <span className="inline-flex items-center gap-1 text-ieee-orange">
          <Pin className="h-3.5 w-3.5" /> Yes
        </span>
      ) : (
        <span className="text-slate-400">No</span>
      ),
  },
];

export default function AdminAnnouncementsPage() {
  return (
    <AdminResourcePage<Announcement>
      title="Announcements"
      subtitle="Posts shown on the Announcements page"
      addLabel="New Announcement"
      collectionKey="announcements"
      seed={seedAnnouncements}
      rowKey={(a) => a.id}
      columns={columns}
      searchable={(a) => `${a.title} ${a.summary} ${a.category}`}
      validate={(a) => !!a.title.trim() && !!a.summary.trim()}
      emptyItem={() => ({
        id: makeId('ann'),
        title: '',
        summary: '',
        body: '',
        date: new Date().toISOString().slice(0, 10),
        category: 'general',
        pinned: false,
      })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Title" required>
            <AdminInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </AdminField>
          <AdminField label="Summary" required hint="Shown in the list">
            <AdminInput value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
          </AdminField>
          <AdminField label="Body">
            <AdminTextarea value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
          </AdminField>
          <div className="grid grid-cols-2 gap-3">
            <AdminField label="Category">
              <AdminSelect value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as Announcement['category'] })}>
                {categories.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Date">
              <AdminInput type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
            </AdminField>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={!!draft.pinned} onChange={(e) => setDraft({ ...draft, pinned: e.target.checked })} className="accent-ieee-orange" />
            Pin to top
          </label>
        </div>
      )}
    />
  );
}
