import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import VerificationBadge from '@/components/ui/VerificationBadge';
import AdminEditDrawer from '@/components/admin/AdminEditDrawer';
import { courses as seedCourses } from '@/data/courses';
import type { Course } from '@/types';

export default function AdminCoursesPage() {
  const [courses] = useState<Course[]>(seedCourses);
  const [editing, setEditing] = useState<Course | null>(null);

  const columns: AdminTableColumn<Course>[] = [
    { key: 'code', header: 'Code', render: (c) => <span className="font-semibold text-ieee-blue">{c.code}</span> },
    { key: 'name', header: 'Name', render: (c) => c.name },
    { key: 'credits', header: 'Credits', render: (c) => c.creditHours },
    { key: 'verification', header: 'Verification', render: (c) => <VerificationBadge status={c.verification} size="sm" /> },
    {
      key: 'actions',
      header: '',
      render: (c) => (
        <button onClick={() => setEditing(c)} className="text-xs font-semibold text-ieee-blue hover:underline">
          Edit
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminTopbar title="Courses" />
      <div className="p-4 sm:p-6">
        <AdminTable columns={columns} rows={courses} rowKey={(c) => c.id} />
      </div>
      <AdminEditDrawer open={!!editing} title="Edit Course" onClose={() => setEditing(null)}>
        {editing && (
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">Course Name</span>
              <input defaultValue={editing.name} className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">CDF URL</span>
              <input defaultValue={editing.cdfUrl} className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">Lab Manual URL</span>
              <input defaultValue={editing.labManualUrl} className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
          </div>
        )}
      </AdminEditDrawer>
    </div>
  );
}
