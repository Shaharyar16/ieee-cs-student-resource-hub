import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import VerificationBadge from '@/components/ui/VerificationBadge';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { papers as seedPapers } from '@/data/papers';
import type { Paper } from '@/types';

export default function AdminPapersPage() {
  const [papers, setPapers] = useState<Paper[]>(seedPapers);
  const [deleting, setDeleting] = useState<Paper | null>(null);

  const setVerification = (id: string, verification: Paper['verification']) => {
    setPapers((ps) => ps.map((p) => (p.id === id ? { ...p, verification } : p)));
  };

  const columns: AdminTableColumn<Paper>[] = [
    { key: 'title', header: 'Title', render: (p) => <span className="font-medium text-slate-900">{p.title}</span> },
    { key: 'course', header: 'Course', render: (p) => p.courseName },
    { key: 'term', header: 'Term', render: (p) => `${p.term} ${p.year}` },
    { key: 'verification', header: 'Verification', render: (p) => <VerificationBadge status={p.verification} size="sm" /> },
    {
      key: 'actions',
      header: '',
      render: (p) => (
        <div className="flex flex-wrap gap-2">
          {p.verification !== 'verified' && (
            <button onClick={() => setVerification(p.id, 'verified')} className="text-xs font-semibold text-emerald-600 hover:underline">
              Verify
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
      <AdminTopbar title="Past Papers" />
      <div className="p-4 sm:p-6">
        <AdminTable columns={columns} rows={papers} rowKey={(p) => p.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title={`Delete "${deleting?.title}"?`}
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setPapers((ps) => ps.filter((p) => p.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
