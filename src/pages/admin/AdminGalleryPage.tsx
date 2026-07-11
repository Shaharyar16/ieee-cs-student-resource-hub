import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea, AdminImageField } from '@/components/admin/AdminField';
import { galleryAlbums as seedAlbums } from '@/data/gallery';
import { makeId } from '@/utils/storage';
import type { GalleryAlbum } from '@/types';

const columns: AdminTableColumn<GalleryAlbum>[] = [
  {
    key: 'cover',
    header: 'Cover',
    render: (a) =>
      a.coverImage ? (
        <img src={a.coverImage} alt={a.title} className="h-10 w-14 rounded-lg object-cover" />
      ) : (
        <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">none</div>
      ),
  },
  { key: 'title', header: 'Album', sortValue: (a) => a.title, render: (a) => <span className="font-medium text-slate-900">{a.title}</span> },
  { key: 'date', header: 'Date', sortValue: (a) => a.date, render: (a) => a.date },
  { key: 'photos', header: 'Photos', sortValue: (a) => a.images.length, render: (a) => a.images.length },
];

export default function AdminGalleryPage() {
  return (
    <AdminResourcePage<GalleryAlbum>
      title="Gallery"
      subtitle="Photo albums shown on the Gallery page"
      addLabel="New Album"
      collectionKey="gallery"
      seed={seedAlbums}
      rowKey={(a) => a.id}
      columns={columns}
      searchable={(a) => `${a.title} ${a.description}`}
      validate={(a) => !!a.title.trim()}
      emptyItem={() => ({ id: makeId('gal'), title: '', date: new Date().toISOString().slice(0, 10), coverImage: '', description: '', images: [] })}
      renderView={(a) => (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg font-bold text-slate-900">{a.title}</h3>
          <p className="text-sm text-slate-500">{a.description}</p>
          <div className="grid grid-cols-3 gap-2">
            {a.images.map((img) => (
              <img key={img.id} src={img.url} alt={img.caption} className="h-20 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Cover image">
            <AdminImageField value={draft.coverImage} onChange={(coverImage) => setDraft({ ...draft, coverImage })} />
          </AdminField>
          <AdminField label="Album title" required>
            <AdminInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </AdminField>
          <AdminField label="Date">
            <AdminInput type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
          </AdminField>
          <AdminField label="Description">
            <AdminTextarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </AdminField>
          <p className="rounded-lg bg-cream/70 px-3 py-2 text-xs text-slate-500">
            Individual album photos are managed once the backend upload is connected.
          </p>
        </div>
      )}
    />
  );
}
