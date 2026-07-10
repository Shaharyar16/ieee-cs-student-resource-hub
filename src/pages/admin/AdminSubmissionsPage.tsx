import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { submissions as seedSubmissions } from '@/data/submissions';
import { loadFromStorage } from '@/utils/storage';
import type { Submission } from '@/types';

export default function AdminSubmissionsPage() {
  const localSubmissions = loadFromStorage<Submission>('ieeecs_submissions', []);
  const [submissions, setSubmissions] = useState<Submission[]>([...localSubmissions, ...seedSubmissions]);
  const [filter, setFilter] = useState<'all' | Submission['type']>('all');

  const setStatus = (id: string, status: Submission['status']) => {
    setSubmissions((subs) => subs.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const filtered = filter === 'all' ? submissions : submissions.filter((s) => s.type === filter);
  const types = [...new Set(submissions.map((s) => s.type))];

  const columns: AdminTableColumn<Submission>[] = [
    { key: 'type', header: 'Type', render: (s) => <span className="capitalize">{s.type.replace('-', ' ')}</span> },
    { key: 'submittedBy', header: 'Submitted By', render: (s) => s.submittedBy },
    { key: 'submittedAt', header: 'Date', render: (s) => s.submittedAt },
    { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} /> },
    {
      key: 'actions',
      header: '',
      render: (s) => (
        <div className="flex gap-2">
          {s.status !== 'approved' && (
            <button onClick={() => setStatus(s.id, 'approved')} className="text-xs font-semibold text-emerald-600 hover:underline">
              Approve
            </button>
          )}
          {s.status !== 'rejected' && (
            <button onClick={() => setStatus(s.id, 'rejected')} className="text-xs font-semibold text-rose-600 hover:underline">
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Submissions" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <button onClick={() => setFilter('all')} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${filter === 'all' ? 'bg-ieee-orange text-white' : 'border border-slate-200 text-slate-600'}`}>
            All
          </button>
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${filter === t ? 'bg-ieee-orange text-white' : 'border border-slate-200 text-slate-600'}`}>
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
        <AdminTable columns={columns} rows={filtered} rowKey={(s) => s.id} emptyMessage="No submissions of this type yet." />
      </div>
    </div>
  );
}
