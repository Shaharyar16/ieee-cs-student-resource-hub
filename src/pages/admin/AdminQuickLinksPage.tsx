import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { quickLinks as seedLinks } from '@/data/quickLinks';
import type { QuickLink } from '@/types';

export default function AdminQuickLinksPage() {
  const [links, setLinks] = useState<QuickLink[]>(seedLinks);
  const [deleting, setDeleting] = useState<QuickLink | null>(null);

  const columns: AdminTableColumn<QuickLink>[] = [
    { key: 'label', header: 'Label', render: (l) => <span className="font-medium text-slate-900">{l.label}</span> },
    { key: 'category', header: 'Category', render: (l) => l.category },
    { key: 'url', header: 'URL', render: (l) => <span className="text-ieee-blue">{l.url}</span> },
    {
      key: 'actions',
      header: '',
      render: (l) => (
        <button onClick={() => setDeleting(l)} className="text-xs font-semibold text-rose-600 hover:underline">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Quick Links" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + Add Link
          </button>
        </div>
        <AdminTable columns={columns} rows={links} rowKey={(l) => l.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title={`Delete "${deleting?.label}"?`}
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setLinks((ls) => ls.filter((l) => l.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
