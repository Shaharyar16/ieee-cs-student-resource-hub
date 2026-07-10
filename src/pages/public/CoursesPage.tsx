import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '@/data/courses';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel, { type FilterGroup } from '@/components/ui/FilterPanel';
import CourseCard from '@/components/cards/CourseCard';
import EmptyState from '@/components/ui/EmptyState';

const filterGroups: FilterGroup[] = [
  {
    label: 'Credit Hours',
    key: 'creditHours',
    options: [...new Set(courses.map((c) => c.creditHours))].map((v) => ({ label: `${v} CH`, value: String(v) })),
  },
];

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.toLowerCase().includes(query.toLowerCase());
      const matchesCredit = !filters.creditHours || String(c.creditHours) === filters.creditHours;
      return matchesQuery && matchesCredit;
    });
  }, [query, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
          <p className="mt-1 text-slate-600">Browse course outlines, syllabus, and resources.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/courses/teachers" className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-ieee-orange hover:text-ieee-orange">
            Teacher Directory
          </Link>
          <Link to="/courses/suggest-correction" className="rounded-lg bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            Suggest Correction
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <SearchBar placeholder="Search by course code or name..." onSearch={setQuery} size="lg" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel groups={filterGroups} activeFilters={filters} onChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))} onReset={() => setFilters({})} />
        {filtered.length === 0 ? (
          <EmptyState title="No courses found" description="Try a different search term." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
