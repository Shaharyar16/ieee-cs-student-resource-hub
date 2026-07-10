import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { adminUsers as seedUsers } from '@/data/adminUsers';
import type { AdminUser } from '@/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(seedUsers);
  const [deleting, setDeleting] = useState<AdminUser | null>(null);

  const columns: AdminTableColumn<AdminUser>[] = [
    { key: 'name', header: 'Name', render: (u) => <span className="font-medium text-slate-900">{u.name}</span> },
    { key: 'email', header: 'Email', render: (u) => u.email },
    { key: 'role', header: 'Role', render: (u) => <span className="capitalize">{u.role.replace('-', ' ')}</span> },
    { key: 'lastActive', header: 'Last Active', render: (u) => u.lastActive },
    {
      key: 'actions',
      header: '',
      render: (u) => (
        <button onClick={() => setDeleting(u)} className="text-xs font-semibold text-rose-600 hover:underline">
          Remove
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Admin Users" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + Invite Admin
          </button>
        </div>
        <AdminTable columns={columns} rows={users} rowKey={(u) => u.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title={`Remove ${deleting?.name}?`}
        description="They will lose access to the admin panel."
        danger
        confirmLabel="Remove"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setUsers((us) => us.filter((u) => u.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
