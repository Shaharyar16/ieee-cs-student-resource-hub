import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea, AdminSelect, AdminFileField } from '@/components/admin/AdminField';
import VerificationBadge from '@/components/ui/VerificationBadge';
import { courses as seedCourses } from '@/data/courses';
import { makeId } from '@/utils/storage';
import type { Course } from '@/types';

const columns: AdminTableColumn<Course>[] = [
  { key: 'code', header: 'Code', sortValue: (c) => c.code, render: (c) => <span className="font-mono text-xs font-semibold text-ieee-orange">{c.code}</span> },
  { key: 'name', header: 'Name', sortValue: (c) => c.name, render: (c) => <span className="font-medium text-slate-900">{c.name}</span> },
  { key: 'semester', header: 'Semester', sortValue: (c) => c.semester ?? 0, render: (c) => (c.semester ? `Sem ${c.semester}` : '—') },
  { key: 'creditHours', header: 'Credits', sortValue: (c) => c.creditHours, render: (c) => c.creditHours },
  { key: 'verification', header: 'Status', render: (c) => <VerificationBadge status={c.verification} size="sm" /> },
];

export default function AdminCoursesPage() {
  return (
    <AdminResourcePage<Course>
      title="Courses"
      subtitle="Course outlines shown on the Courses page"
      addLabel="Add Course"
      collectionKey="courses"
      seed={seedCourses}
      rowKey={(c) => c.id}
      columns={columns}
      searchable={(c) => `${c.code} ${c.name} ${c.department}`}
      validate={(c) => !!c.code.trim() && !!c.name.trim()}
      emptyItem={() => ({
        id: makeId('c'),
        code: '',
        name: '',
        creditHours: 3,
        semester: 1,
        prerequisites: [],
        department: 'Computer Science',
        description: '',
        outcomes: [],
        syllabus: [],
        cdfUrl: '#',
        labManualUrl: '#',
        teacherIds: [],
        usefulLinks: [],
        tips: [],
        verification: 'verified',
      })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <AdminField label="Course code" required>
              <AdminInput value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value })} placeholder="CS-301" />
            </AdminField>
            <AdminField label="Semester">
              <AdminInput
                type="number"
                min={1}
                max={8}
                value={draft.semester ?? ''}
                onChange={(e) => setDraft({ ...draft, semester: e.target.value ? Number(e.target.value) : undefined })}
              />
            </AdminField>
            <AdminField label="Credits">
              <AdminInput type="number" value={draft.creditHours} onChange={(e) => setDraft({ ...draft, creditHours: Number(e.target.value) })} />
            </AdminField>
          </div>
          <AdminField label="Course name" required>
            <AdminInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </AdminField>
          <AdminField label="Department">
            <AdminInput value={draft.department} onChange={(e) => setDraft({ ...draft, department: e.target.value })} />
          </AdminField>
          <AdminField label="Prerequisites" hint="Course codes, comma-separated (e.g. CS-210, CS-301)">
            <AdminInput
              value={(draft.prerequisites ?? []).join(', ')}
              onChange={(e) => setDraft({ ...draft, prerequisites: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            />
          </AdminField>
          <AdminField label="Description">
            <AdminTextarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </AdminField>
          <AdminField label="Outcomes" hint="One per line">
            <AdminTextarea
              value={draft.outcomes.join('\n')}
              onChange={(e) => setDraft({ ...draft, outcomes: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })}
            />
          </AdminField>
          <AdminField label="CDF file" hint="Uploaded file becomes the student download">
            <AdminFileField value={draft.cdfUrl ?? ''} onChange={(cdfUrl) => setDraft({ ...draft, cdfUrl })} />
          </AdminField>
          <AdminField label="Lab manual file">
            <AdminFileField value={draft.labManualUrl ?? ''} onChange={(labManualUrl) => setDraft({ ...draft, labManualUrl })} />
          </AdminField>
          <AdminField label="Status">
            <AdminSelect value={draft.verification} onChange={(e) => setDraft({ ...draft, verification: e.target.value as Course['verification'] })}>
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
