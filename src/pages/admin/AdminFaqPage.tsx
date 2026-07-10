import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { faqs as seedFaqs } from '@/data/faqs';
import type { FAQ } from '@/types';

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(seedFaqs);
  const [deleting, setDeleting] = useState<FAQ | null>(null);

  const columns: AdminTableColumn<FAQ>[] = [
    { key: 'question', header: 'Question', render: (f) => <span className="font-medium text-slate-900">{f.question}</span> },
    { key: 'category', header: 'Category', render: (f) => f.category },
    {
      key: 'actions',
      header: '',
      render: (f) => (
        <button onClick={() => setDeleting(f)} className="text-xs font-semibold text-rose-600 hover:underline">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="FAQ Management" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + New FAQ
          </button>
        </div>
        <AdminTable columns={columns} rows={faqs} rowKey={(f) => f.id} />
      </div>
      <ConfirmModal
        open={!!deleting}
        title="Delete this FAQ?"
        danger
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setFaqs((fs) => fs.filter((f) => f.id !== deleting?.id));
          setDeleting(null);
        }}
      />
    </div>
  );
}
