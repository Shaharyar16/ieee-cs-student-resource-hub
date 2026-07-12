import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminSelect, AdminFileField } from '@/components/admin/AdminField';
import { dateSheets as seedDateSheets, currentTerm } from '@/data/dateSheets';
import { makeId } from '@/utils/storage';
import { PROGRAMS, type DateSheet, type Program } from '@/types';

const columns: AdminTableColumn<DateSheet>[] = [
  { key: 'title', header: 'Title', sortValue: (d) => d.title, render: (d) => <span className="font-medium text-slate-900">{d.title}</span> },
  { key: 'program', header: 'Program', sortValue: (d) => d.program, render: (d) => <span className="text-xs font-semibold text-ieee-orange">{d.program}</span> },
  { key: 'semester', header: 'Semester', sortValue: (d) => d.semester, render: (d) => `Sem ${d.semester}` },
  { key: 'term', header: 'Term', sortValue: (d) => `${d.year}${d.term}`, render: (d) => `${d.term} ${d.year}` },
  { key: 'file', header: 'File', render: (d) => (d.fileUrl && d.fileUrl !== '#' ? '✓ Uploaded' : '—') },
];

export default function AdminDateSheetsPage() {
  return (
    <AdminResourcePage<DateSheet>
      title="Date Sheets"
      subtitle="Upload exam date sheets per program and semester"
      addLabel="Add Date Sheet"
      collectionKey="dateSheets"
      seed={seedDateSheets}
      rowKey={(d) => d.id}
      columns={columns}
      searchable={(d) => `${d.title} ${d.program} ${d.term} ${d.year}`}
      validate={(d) => !!d.title.trim() && !!d.fileUrl && d.fileUrl !== '#'}
      emptyItem={() => ({
        id: makeId('ds'),
        title: '',
        program: 'Computer Science',
        semester: 1,
        term: currentTerm.term,
        year: currentTerm.year,
        fileUrl: '',
        uploadedDate: new Date().toISOString().slice(0, 10),
      })}
      renderView={(d) => (
        <div className="flex flex-col gap-3">
          {d.fileUrl && d.fileUrl !== '#' && (
            <img src={d.fileUrl} alt={d.title} className="w-full rounded-xl border border-black/5 object-contain" />
          )}
          <p className="font-semibold text-slate-900">{d.title}</p>
          <p className="text-sm text-slate-500">
            {d.program} · Semester {d.semester} · {d.term} {d.year}
          </p>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Date sheet file" required hint="PDF or image — this is what students download">
            <AdminFileField value={draft.fileUrl && draft.fileUrl !== '#' ? draft.fileUrl : ''} onChange={(fileUrl) => setDraft({ ...draft, fileUrl })} />
          </AdminField>
          <AdminField label="Title" required>
            <AdminInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="CS Semester 3 Final — Fall 2026" />
          </AdminField>
          <AdminField label="Program" required>
            <AdminSelect value={draft.program} onChange={(e) => setDraft({ ...draft, program: e.target.value as Program })}>
              {PROGRAMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
          <div className="grid grid-cols-3 gap-3">
            <AdminField label="Semester">
              <AdminInput type="number" min={1} max={8} value={draft.semester} onChange={(e) => setDraft({ ...draft, semester: Number(e.target.value) })} />
            </AdminField>
            <AdminField label="Term">
              <AdminInput value={draft.term} onChange={(e) => setDraft({ ...draft, term: e.target.value })} placeholder="Fall" />
            </AdminField>
            <AdminField label="Year">
              <AdminInput type="number" value={draft.year} onChange={(e) => setDraft({ ...draft, year: Number(e.target.value) })} />
            </AdminField>
          </div>
        </div>
      )}
    />
  );
}
