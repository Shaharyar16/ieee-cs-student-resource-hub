import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminSelect } from '@/components/admin/AdminField';
import Avatar from '@/components/ui/Avatar';
import { adminUsers as seedUsers } from '@/data/adminUsers';
import { makeId } from '@/utils/storage';
import type { AdminUser } from '@/types';

const roles: AdminUser['role'][] = ['super-admin', 'editor', 'moderator'];

const columns: AdminTableColumn<AdminUser>[] = [
  {
    key: 'name',
    header: 'Name',
    sortValue: (u) => u.name,
    render: (u) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={u.name} size="sm" />
        <span className="font-medium text-slate-900">{u.name}</span>
      </div>
    ),
  },
  { key: 'email', header: 'Email', sortValue: (u) => u.email, render: (u) => u.email },
  {
    key: 'role',
    header: 'Role',
    sortValue: (u) => u.role,
    render: (u) => (
      <span className="rounded-full bg-ieee-orange/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-ieee-orange">
        {u.role.replace('-', ' ')}
      </span>
    ),
  },
  { key: 'lastActive', header: 'Last Active', sortValue: (u) => u.lastActive, render: (u) => u.lastActive },
];

export default function AdminUsersPage() {
  return (
    <AdminResourcePage<AdminUser>
      title="Admin Users"
      subtitle="Team members with portal access"
      addLabel="Invite Admin"
      collectionKey="adminUsers"
      seed={seedUsers}
      rowKey={(u) => u.id}
      columns={columns}
      searchable={(u) => `${u.name} ${u.email} ${u.role}`}
      validate={(u) => !!u.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email)}
      emptyItem={() => ({
        id: makeId('au'),
        name: '',
        email: '',
        role: 'moderator',
        lastActive: new Date().toISOString().slice(0, 10),
      })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Full name" required>
            <AdminInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </AdminField>
          <AdminField label="Team email" required>
            <AdminInput type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="name@ieeecs.edu" />
          </AdminField>
          <AdminField label="Role">
            <AdminSelect value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value as AdminUser['role'] })}>
              {roles.map((r) => (
                <option key={r} value={r} className="capitalize">
                  {r.replace('-', ' ')}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
          <p className="rounded-lg bg-cream/70 px-3 py-2 text-xs text-slate-500">
            In production this sends an invite email. For now the account is added to the list.
          </p>
        </div>
      )}
    />
  );
}
