import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import VerificationBadge from '@/components/ui/VerificationBadge';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { projects as seedProjects } from '@/data/projects';
import type { ProjectItem } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(seedProjects);
  const [deleting, setDeleting] = useState<ProjectItem | null>(null);

  const setVerification = (id: string, verification: ProjectItem['verification']) => {
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, verification } : p)));
  };

  const columns: AdminTableColumn<ProjectItem>[] = [
    { key: 'title', header: 'Title', render: (p) => <span className="font-medium text-slate-900">{p.title}</span> },
    { key: 'category', header: 'Category', render: (p) => p.category },
    { key: 'year', header: 'Year', render: (p) => p.year },
    { key: 'verification', header: 'Verification', render: (p) => <VerificationBadge status={p.verification} size="sm" /> },
    {
      key: 'actions',
      header: '',
      render: (p) => (
        <div className="flex flex-wrap gap-2">
          {p.verification !== 'verified' && (
            <button onClick={() => setVerification(p.id, 'verified')} className="text-xs font-semibold text-emerald-600 hover:underline">
              Approve
            </button>
          )}
          <button onClick={() => setDeleting(p)} className="text-xs font-semibold text-rose-600 hover:underline">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Projects Expo" />
      <div className="p-4 sm:p-6">
        <AdminTable columns={columns} rows={projects} rowKey={(p) => p.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setProjects((ps) => ps.filter((p) => p.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
