import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { galleryAlbums as seedAlbums } from '@/data/gallery';
import type { GalleryAlbum } from '@/types';

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(seedAlbums);
  const [deleting, setDeleting] = useState<GalleryAlbum | null>(null);

  const columns: AdminTableColumn<GalleryAlbum>[] = [
    {
      key: 'cover',
      header: 'Cover',
      render: (a) => <img src={a.coverImage} alt={a.title} className="h-10 w-14 rounded object-cover" />,
    },
    { key: 'title', header: 'Album', render: (a) => <span className="font-medium text-slate-900">{a.title}</span> },
    { key: 'date', header: 'Date', render: (a) => a.date },
    { key: 'photos', header: 'Photos', render: (a) => a.images.length },
    {
      key: 'actions',
      header: '',
      render: (a) => (
        <button onClick={() => setDeleting(a)} className="text-xs font-semibold text-rose-600 hover:underline">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Gallery" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + New Album
          </button>
        </div>
        <AdminTable columns={columns} rows={albums} rowKey={(a) => a.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setAlbums((as) => as.filter((a) => a.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
