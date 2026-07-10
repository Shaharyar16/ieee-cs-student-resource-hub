import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import AdminEditDrawer from '@/components/admin/AdminEditDrawer';
import ConfirmModal from '@/components/ui/ConfirmModal';
import StatusBadge from '@/components/ui/StatusBadge';
import { events as seedEvents } from '@/data/events';
import type { EventItem } from '@/types';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(seedEvents);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);

  const columns: AdminTableColumn<EventItem>[] = [
    { key: 'title', header: 'Title', render: (e) => <span className="font-medium text-slate-900">{e.title}</span> },
    { key: 'category', header: 'Category', render: (e) => <span className="capitalize">{e.category}</span> },
    { key: 'date', header: 'Date', render: (e) => e.date },
    { key: 'timing', header: 'Status', render: (e) => <StatusBadge status={e.timing === 'upcoming' ? 'pending' : 'approved'} /> },
    { key: 'registered', header: 'Registered', render: (e) => `${e.registered} / ${e.capacity}` },
    {
      key: 'actions',
      header: '',
      render: (e) => (
        <div className="flex gap-2">
          <button onClick={() => setEditing(e)} className="text-xs font-semibold text-ieee-blue hover:underline">Edit</button>
          <button onClick={() => setDeleting(e)} className="text-xs font-semibold text-rose-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Events" />
      <div className="p-4 sm:p-6">
        <AdminTable columns={columns} rows={events} rowKey={(e) => e.id} />
      </div>

      <AdminEditDrawer open={!!editing} title="Edit Event" onClose={() => setEditing(null)}>
        {editing && (
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">Title</span>
              <input defaultValue={editing.title} className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">Venue</span>
              <input defaultValue={editing.venue} className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <p className="text-xs text-slate-400">This is a prototype form — changes are not persisted to a backend yet.</p>
          </div>
        )}
      </AdminEditDrawer>

      <ConfirmModal
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        description="This action cannot be undone in a real system."
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setEvents((evts) => evts.filter((e) => e.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
