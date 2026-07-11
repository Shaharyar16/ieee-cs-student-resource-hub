import { FileText, Check, X } from 'lucide-react';
import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminSelect, AdminFileField } from '@/components/admin/AdminField';
import VerificationBadge from '@/components/ui/VerificationBadge';
import { papers as seedPapers } from '@/data/papers';
import { courses } from '@/data/courses';
import { makeId } from '@/utils/storage';
import type { Paper } from '@/types';

const examTypes: Paper['examType'][] = ['Midterm', 'Final', 'Quiz', 'Assignment'];

const columns: AdminTableColumn<Paper>[] = [
  { key: 'title', header: 'Title', sortValue: (p) => p.title, render: (p) => <span className="font-medium text-slate-900">{p.title}</span> },
  { key: 'course', header: 'Course', sortValue: (p) => p.courseName, render: (p) => p.courseName },
  { key: 'term', header: 'Term', sortValue: (p) => p.year, render: (p) => `${p.term} ${p.year}` },
  { key: 'by', header: 'Submitted By', render: (p) => p.uploadedBy },
  { key: 'verification', header: 'Status', render: (p) => <VerificationBadge status={p.verification} size="sm" /> },
];

const isImage = (url: string) => url.startsWith('data:image') || /\.(png|jpe?g|webp|gif)$/i.test(url);
const isPdf = (url: string) => url.startsWith('data:application/pdf') || /\.pdf$/i.test(url);
const hasFile = (url: string) => !!url && url !== '#';

export default function AdminPapersPage() {
  return (
    <AdminResourcePage<Paper>
      title="Past Papers"
      subtitle="Add papers, or open student submissions to inspect the file before approving"
      addLabel="Add Paper"
      collectionKey="papers"
      seed={seedPapers}
      rowKey={(p) => p.id}
      columns={columns}
      searchable={(p) => `${p.title} ${p.courseName} ${p.uploadedBy} ${p.tags.join(' ')}`}
      validate={(p) => !!p.title.trim()}
      extraActions={(p, api) => (
        <>
          {p.verification !== 'verified' && (
            <button
              onClick={() => api.update({ verification: 'verified' })}
              className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <Check className="h-3.5 w-3.5" /> Approve
            </button>
          )}
          {p.verification === 'pending' && (
            <button
              onClick={() => api.update({ verification: 'unverified' })}
              className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <X className="h-3.5 w-3.5" /> Reject
            </button>
          )}
        </>
      )}
      emptyItem={() => ({
        id: makeId('paper'),
        courseId: courses[0].id,
        courseName: courses[0].name,
        title: '',
        term: 'Fall',
        year: new Date().getFullYear(),
        examType: 'Final',
        instructor: '',
        fileUrl: '',
        uploadedBy: 'IEEE CS',
        uploadedDate: new Date().toISOString().slice(0, 10),
        verification: 'verified',
        tags: [],
        downloads: 0,
      })}
      renderView={(p) => (
        <div className="flex flex-col gap-4">
          {/* File preview — the core of the verification engine */}
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-slate-50">
            {hasFile(p.fileUrl) && isPdf(p.fileUrl) ? (
              <iframe title={p.title} src={p.fileUrl} className="h-96 w-full" />
            ) : hasFile(p.fileUrl) && isImage(p.fileUrl) ? (
              <img src={p.fileUrl} alt={p.title} className="max-h-96 w-full object-contain" />
            ) : (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 text-slate-400">
                <FileText className="h-10 w-10" />
                <p className="text-sm">No file uploaded</p>
                {hasFile(p.fileUrl) && !p.fileUrl.startsWith('data:') && (
                  <a href={p.fileUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-ieee-orange hover:underline">
                    Open external file
                  </a>
                )}
              </div>
            )}
          </div>
          {hasFile(p.fileUrl) && (
            <a
              href={p.fileUrl}
              download={`${p.courseName}-${p.examType}-${p.year}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-ieee-orange/40 hover:text-ieee-orange"
            >
              Download file
            </a>
          )}
          <VerificationBadge status={p.verification} />
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-black/5 bg-white p-4 text-sm">
            {[
              ['Course', p.courseName],
              ['Term', `${p.term} ${p.year}`],
              ['Exam Type', p.examType],
              ['Instructor', p.instructor || '—'],
              ['Submitted By', p.uploadedBy],
              ['Downloads', String(p.downloads)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{k}</dt>
                <dd className="mt-0.5 font-medium text-slate-800">{v}</dd>
              </div>
            ))}
          </dl>
          {p.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-ieee-orange/10 px-2.5 py-1 font-mono text-[11px] text-ieee-orange">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Paper file" hint="Upload the actual paper (PDF or image) — this is what students download">
            <AdminFileField value={hasFile(draft.fileUrl) ? draft.fileUrl : ''} onChange={(fileUrl) => setDraft({ ...draft, fileUrl })} />
          </AdminField>
          <AdminField label="Title" required>
            <AdminInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="DSA Final Exam" />
          </AdminField>
          <AdminField label="Course">
            <AdminSelect
              value={draft.courseId}
              onChange={(e) => {
                const c = courses.find((x) => x.id === e.target.value)!;
                setDraft({ ...draft, courseId: c.id, courseName: c.name });
              }}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.name}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
          <div className="grid grid-cols-2 gap-3">
            <AdminField label="Term">
              <AdminInput value={draft.term} onChange={(e) => setDraft({ ...draft, term: e.target.value })} placeholder="Fall" />
            </AdminField>
            <AdminField label="Year">
              <AdminInput type="number" value={draft.year} onChange={(e) => setDraft({ ...draft, year: Number(e.target.value) })} />
            </AdminField>
          </div>
          <AdminField label="Exam type">
            <AdminSelect value={draft.examType} onChange={(e) => setDraft({ ...draft, examType: e.target.value as Paper['examType'] })}>
              {examTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
          <AdminField label="Instructor">
            <AdminInput value={draft.instructor} onChange={(e) => setDraft({ ...draft, instructor: e.target.value })} />
          </AdminField>
          <AdminField label="Tags" hint="Comma-separated">
            <AdminInput
              value={draft.tags.join(', ')}
              onChange={(e) => setDraft({ ...draft, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            />
          </AdminField>
          <AdminField label="Status">
            <AdminSelect value={draft.verification} onChange={(e) => setDraft({ ...draft, verification: e.target.value as Paper['verification'] })}>
              <option value="verified">Verified</option>
              <option value="pending">Pending Review</option>
              <option value="unverified">Unverified</option>
            </AdminSelect>
          </AdminField>
        </div>
      )}
    />
  );
}
