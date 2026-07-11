import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Check, X } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import AdminEditDrawer from '@/components/admin/AdminEditDrawer';
import StatusBadge from '@/components/ui/StatusBadge';
import { submissions as seedSubmissions } from '@/data/submissions';
import { useStore } from '@/hooks/useCollection';
import { loadFromStorage } from '@/utils/storage';
import type { Submission } from '@/types';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useStore<Submission>('submissions', seedSubmissions);
  const [filter, setFilter] = useState<'all' | Submission['type']>('all');
  const [viewing, setViewing] = useState<Submission | null>(null);

  // Pull in any submissions posted through public forms (they append to a
  // separate key) so approve/reject decisions persist in the store.
  useEffect(() => {
    const incoming = loadFromStorage<Submission>('ieeecs_submissions', []);
    const existing = new Set(submissions.map((s) => s.id));
    const fresh = incoming.filter((s) => !existing.has(s.id));
    if (fresh.length) setSubmissions([...fresh, ...submissions]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStatus = (id: string, status: Submission['status']) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status } : s)));
    setViewing((v) => (v && v.id === id ? { ...v, status } : v));
  };

  const filtered = filter === 'all' ? submissions : submissions.filter((s) => s.type === filter);
  const types = [...new Set(submissions.map((s) => s.type))];
  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  const columns: AdminTableColumn<Submission>[] = [
    { key: 'type', header: 'Type', sortValue: (s) => s.type, render: (s) => <span className="font-medium capitalize text-slate-900">{s.type.replace(/-/g, ' ')}</span> },
    { key: 'submittedBy', header: 'Submitted By', sortValue: (s) => s.submittedBy, render: (s) => s.submittedBy },
    { key: 'submittedAt', header: 'Date', sortValue: (s) => s.submittedAt, render: (s) => s.submittedAt },
    { key: 'status', header: 'Status', render: (s) => <StatusBadge status={s.status} /> },
    {
      key: '__actions',
      header: '',
      align: 'right',
      render: (s) => (
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <button
            onClick={() => setViewing(s)}
            className="flex items-center gap-1 rounded-lg border border-black/5 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
          >
            <Eye className="h-3.5 w-3.5" /> View
          </button>
          {s.status !== 'approved' && (
            <button
              onClick={() => setStatus(s.id, 'approved')}
              className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <Check className="h-3.5 w-3.5" /> Approve
            </button>
          )}
          {s.status !== 'rejected' && (
            <button
              onClick={() => setStatus(s.id, 'rejected')}
              className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <X className="h-3.5 w-3.5" /> Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Submissions" subtitle={`${pendingCount} pending review`} />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === 'all' ? 'bg-ieee-orange text-white shadow-sm' : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/40'
            }`}
          >
            All
          </button>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                filter === t ? 'bg-ieee-orange text-white shadow-sm' : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/40'
              }`}
            >
              {t.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
        <AdminTable
          columns={columns}
          rows={filtered}
          rowKey={(s) => s.id}
          searchable={(s) => `${s.type} ${s.submittedBy}`}
          emptyMessage="No submissions of this type yet."
        />
      </div>

      <AdminEditDrawer open={!!viewing} title="Submission Details" onClose={() => setViewing(null)}>
        {viewing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-ieee-orange">
                {viewing.type.replace(/-/g, ' ')}
              </span>
              <StatusBadge status={viewing.status} />
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Submitted By</p>
              <p className="mt-0.5 font-semibold text-slate-800">{viewing.submittedBy}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">Date</p>
              <p className="mt-0.5 text-sm text-slate-700">{viewing.submittedAt}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-4">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">Submitted Data</p>
              <dl className="flex flex-col gap-3">
                {Object.entries(viewing.data).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold capitalize text-slate-500">{k.replace(/([A-Z])/g, ' $1')}</dt>
                    <dd className="mt-0.5 text-sm text-slate-800">{v || <span className="text-slate-300">—</span>}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex gap-2">
              {viewing.status !== 'approved' && (
                <button
                  onClick={() => setStatus(viewing.id, 'approved')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Check className="h-4 w-4" /> Approve
                </button>
              )}
              {viewing.status !== 'rejected' && (
                <button
                  onClick={() => setStatus(viewing.id, 'rejected')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  <X className="h-4 w-4" /> Reject
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AdminEditDrawer>
    </div>
  );
}
