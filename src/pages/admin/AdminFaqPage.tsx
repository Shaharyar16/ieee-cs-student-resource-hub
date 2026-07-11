import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea, AdminSelect } from '@/components/admin/AdminField';
import { faqs as seedFaqs } from '@/data/faqs';
import { makeId } from '@/utils/storage';
import type { FAQ } from '@/types';

const categories: FAQ['category'][] = [
  'IEEE CS',
  'Past Papers',
  'Courses',
  'Events',
  'Navigation',
  'Projects Expo',
  'Contributions',
  'Technical Issues',
];

const columns: AdminTableColumn<FAQ>[] = [
  { key: 'question', header: 'Question', sortValue: (f) => f.question, render: (f) => <span className="font-medium text-slate-900">{f.question}</span> },
  {
    key: 'category',
    header: 'Category',
    sortValue: (f) => f.category,
    render: (f) => <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{f.category}</span>,
  },
];

export default function AdminFaqPage() {
  return (
    <AdminResourcePage<FAQ>
      title="FAQ Management"
      subtitle="Questions shown on the FAQ & Contact page"
      addLabel="New FAQ"
      collectionKey="faqs"
      seed={seedFaqs}
      rowKey={(f) => f.id}
      reorderable
      columns={columns}
      searchable={(f) => `${f.question} ${f.answer} ${f.category}`}
      validate={(f) => !!f.question.trim() && !!f.answer.trim()}
      emptyItem={() => ({ id: makeId('faq'), question: '', answer: '', category: 'IEEE CS' })}
      renderView={(f) => (
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Question</p>
            <p className="mt-1 font-semibold text-slate-900">{f.question}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Answer</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.answer}</p>
          </div>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Question" required>
            <AdminInput value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} />
          </AdminField>
          <AdminField label="Answer" required>
            <AdminTextarea value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} />
          </AdminField>
          <AdminField label="Category">
            <AdminSelect value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as FAQ['category'] })}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
        </div>
      )}
    />
  );
}
