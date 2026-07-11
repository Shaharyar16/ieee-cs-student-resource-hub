import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminSelect, AdminImageField } from '@/components/admin/AdminField';
import { banners as seedBanners } from '@/data/banners';
import { makeId } from '@/utils/storage';
import type { Banner } from '@/types';

const types: Banner['type'][] = ['sponsor', 'workshop', 'announcement', 'partner', 'campaign'];

const columns: AdminTableColumn<Banner>[] = [
  {
    key: 'preview',
    header: 'Preview',
    render: (b) =>
      b.image ? (
        <img src={b.image} alt={b.title} className="h-10 w-16 rounded-lg object-cover" />
      ) : (
        <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">none</div>
      ),
  },
  { key: 'title', header: 'Title', sortValue: (b) => b.title, render: (b) => <span className="font-medium text-slate-900">{b.title}</span> },
  { key: 'type', header: 'Type', sortValue: (b) => b.type, render: (b) => <span className="capitalize">{b.type}</span> },
  { key: 'cta', header: 'CTA', render: (b) => b.ctaLabel },
];

export default function AdminBannersPage() {
  return (
    <AdminResourcePage<Banner>
      title="Banners"
      subtitle="Homepage & campaign banners"
      addLabel="Add Banner"
      collectionKey="banners"
      seed={seedBanners}
      rowKey={(b) => b.id}
      columns={columns}
      searchable={(b) => `${b.title} ${b.type} ${b.ctaLabel}`}
      validate={(b) => !!b.title.trim()}
      emptyItem={() => ({
        id: makeId('ban'),
        title: '',
        subtitle: '',
        image: '',
        ctaLabel: '',
        ctaLink: '',
        type: 'announcement',
      })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Banner image">
            <AdminImageField value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
          </AdminField>
          <AdminField label="Title" required>
            <AdminInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </AdminField>
          <AdminField label="Subtitle">
            <AdminInput value={draft.subtitle ?? ''} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} />
          </AdminField>
          <AdminField label="Type">
            <AdminSelect value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as Banner['type'] })}>
              {types.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
          <AdminField label="CTA label">
            <AdminInput value={draft.ctaLabel} onChange={(e) => setDraft({ ...draft, ctaLabel: e.target.value })} placeholder="Learn more" />
          </AdminField>
          <AdminField label="CTA link">
            <AdminInput value={draft.ctaLink} onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })} placeholder="/events" />
          </AdminField>
        </div>
      )}
    />
  );
}
