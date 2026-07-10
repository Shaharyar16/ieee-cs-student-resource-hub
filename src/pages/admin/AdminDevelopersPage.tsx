import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import AdminEditDrawer from '@/components/admin/AdminEditDrawer';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { FormField, TextInput, TextArea } from '@/components/ui/FormField';
import { developers as seedDevelopers } from '@/data/developers';
import { makeId } from '@/utils/storage';
import type { Developer } from '@/types';

const emptyDeveloper: Developer = {
  id: '',
  name: '',
  role: '',
  photo: 'https://i.pravatar.cc/300',
  contribution: '',
  bio: '',
  skills: [],
  links: {},
};

export default function AdminDevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>(seedDevelopers);
  const [editing, setEditing] = useState<Developer | null>(null);
  const [deleting, setDeleting] = useState<Developer | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({ ...emptyDeveloper, id: makeId('dev') });
    setIsNew(true);
  };

  const openEdit = (dev: Developer) => {
    setEditing(dev);
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    setDevelopers((devs) => {
      const exists = devs.some((d) => d.id === editing.id);
      if (exists) return devs.map((d) => (d.id === editing.id ? editing : d));
      return [...devs, editing];
    });
    setEditing(null);
  };

  const columns: AdminTableColumn<Developer>[] = [
    {
      key: 'photo',
      header: '',
      render: (d) => <img src={d.photo} alt={d.name} className="h-10 w-10 rounded-full object-cover" />,
    },
    { key: 'name', header: 'Name', render: (d) => <span className="font-medium text-slate-900">{d.name}</span> },
    { key: 'role', header: 'Position', render: (d) => d.role },
    { key: 'contribution', header: 'Contribution', render: (d) => <span className="line-clamp-1 max-w-xs text-slate-500">{d.contribution}</span> },
    {
      key: 'actions',
      header: '',
      render: (d) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(d)} className="text-xs font-semibold text-ieee-blue hover:underline">
            Edit
          </button>
          <button onClick={() => setDeleting(d)} className="text-xs font-semibold text-rose-600 hover:underline">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Developers" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button onClick={openNew} className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + Add Developer
          </button>
        </div>
        <AdminTable columns={columns} rows={developers} rowKey={(d) => d.id} emptyMessage="No developers added yet." />
      </div>

      <AdminEditDrawer
        open={!!editing}
        title={isNew ? 'Add Developer' : 'Edit Developer'}
        onClose={() => setEditing(null)}
        footer={
          <button onClick={handleSave} className="w-full rounded-lg bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            Save Developer
          </button>
        }
      >
        {editing && (
          <div className="flex flex-col gap-4">
            <FormField label="Name" required>
              <TextInput value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </FormField>
            <FormField label="Position in Society" required hint="e.g. Lead Developer, UI/UX Designer">
              <TextInput value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
            </FormField>
            <FormField label="Photo URL">
              <TextInput value={editing.photo} onChange={(e) => setEditing({ ...editing, photo: e.target.value })} />
            </FormField>
            <FormField label="Contribution" required hint="What did they build or work on?">
              <TextArea value={editing.contribution} onChange={(e) => setEditing({ ...editing, contribution: e.target.value })} />
            </FormField>
            <FormField label="Short Bio">
              <TextArea value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
            </FormField>
            <FormField label="Skills" hint="Comma-separated">
              <TextInput
                value={editing.skills.join(', ')}
                onChange={(e) =>
                  setEditing({ ...editing, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                }
              />
            </FormField>
            <FormField label="Portfolio URL">
              <TextInput value={editing.links.portfolio ?? ''} onChange={(e) => setEditing({ ...editing, links: { ...editing.links, portfolio: e.target.value } })} />
            </FormField>
            <FormField label="GitHub URL">
              <TextInput value={editing.links.github ?? ''} onChange={(e) => setEditing({ ...editing, links: { ...editing.links, github: e.target.value } })} />
            </FormField>
            <FormField label="LinkedIn URL">
              <TextInput value={editing.links.linkedin ?? ''} onChange={(e) => setEditing({ ...editing, links: { ...editing.links, linkedin: e.target.value } })} />
            </FormField>
            <FormField label="Contact Email">
              <TextInput value={editing.links.email ?? ''} onChange={(e) => setEditing({ ...editing, links: { ...editing.links, email: e.target.value } })} />
            </FormField>
          </div>
        )}
      </AdminEditDrawer>

      <ConfirmModal
        open={!!deleting}
        title={`Remove ${deleting?.name}?`}
        description="They will no longer be shown on the public Developers page."
        danger
        confirmLabel="Remove"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setDevelopers((devs) => devs.filter((d) => d.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
