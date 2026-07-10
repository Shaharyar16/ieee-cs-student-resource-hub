import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { banners as seedBanners } from '@/data/banners';
import type { Banner } from '@/types';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(seedBanners);
  const [deleting, setDeleting] = useState<Banner | null>(null);

  const columns: AdminTableColumn<Banner>[] = [
    {
      key: 'preview',
      header: 'Preview',
      render: (b) => <img src={b.image} alt={b.title} className="h-10 w-16 rounded object-cover" />,
    },
    { key: 'title', header: 'Title', render: (b) => <span className="font-medium text-slate-900">{b.title}</span> },
    { key: 'type', header: 'Type', render: (b) => <span className="capitalize">{b.type}</span> },
    { key: 'cta', header: 'CTA', render: (b) => b.ctaLabel },
    {
      key: 'actions',
      header: '',
      render: (b) => (
        <button onClick={() => setDeleting(b)} className="text-xs font-semibold text-rose-600 hover:underline">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Banners" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + Add Banner
          </button>
        </div>
        <AdminTable columns={columns} rows={banners} rowKey={(b) => b.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title={`Delete banner "${deleting?.title}"?`}
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setBanners((bs) => bs.filter((b) => b.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
