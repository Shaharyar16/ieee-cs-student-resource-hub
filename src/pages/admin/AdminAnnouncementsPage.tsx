import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Icon from '@/components/ui/Icon';
import { announcements as seedAnnouncements } from '@/data/announcements';
import type { Announcement } from '@/types';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(seedAnnouncements);
  const [deleting, setDeleting] = useState<Announcement | null>(null);

  const columns: AdminTableColumn<Announcement>[] = [
    { key: 'title', header: 'Title', render: (a) => <span className="font-medium text-slate-900">{a.title}</span> },
    { key: 'category', header: 'Category', render: (a) => <span className="capitalize">{a.category}</span> },
    { key: 'date', header: 'Date', render: (a) => a.date },
    {
      key: 'pinned',
      header: 'Pinned',
      render: (a) =>
        a.pinned ? (
          <span className="inline-flex items-center gap-1 text-ieee-orange-dark">
            <Icon name="pin" className="h-3.5 w-3.5" /> Yes
          </span>
        ) : (
          'No'
        ),
    },
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
      <AdminTopbar title="Announcements" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + New Announcement
          </button>
        </div>
        <AdminTable columns={columns} rows={announcements} rowKey={(a) => a.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setAnnouncements((as) => as.filter((a) => a.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
