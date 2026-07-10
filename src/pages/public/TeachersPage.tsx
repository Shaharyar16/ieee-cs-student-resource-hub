import { useState } from 'react';
import { teachers } from '@/data/teachers';
import SearchBar from '@/components/ui/SearchBar';
import TeacherCard from '@/components/cards/TeacherCard';
import EmptyState from '@/components/ui/EmptyState';

export default function TeachersPage() {
  const [query, setQuery] = useState('');
  const filtered = teachers.filter(
    (t) =>
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.department.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Teacher Directory</h1>
      <p className="mt-2 text-slate-600">
        Find contact information and assigned courses for faculty members. We do not publish ratings or
        reviews here.
      </p>
      <div className="mt-6">
        <SearchBar placeholder="Search by name or department..." onSearch={setQuery} size="lg" />
      </div>
      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No teachers found" />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>
      )}
    </div>
  );
}
