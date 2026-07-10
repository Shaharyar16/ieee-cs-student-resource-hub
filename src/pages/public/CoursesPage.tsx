import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PencilLine } from 'lucide-react';
import { courses } from '@/data/courses';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import Magnetic from '@/components/effects/Magnetic';
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
    <div className="relative">
      <PageHero
        compact
        eyebrow="Academics"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Courses' }]}
        title="Course Resources"
        subtitle="Course outlines, weekly syllabus, CDFs, lab manuals and study tips — everything you need to get ahead, in one place."
        meta={[
          { value: `${courses.length}`, label: 'Courses' },
          { value: `${courses.reduce((s, c) => s + c.syllabus.length, 0)}`, label: 'Weeks Mapped' },
        ]}
      >
        <Magnetic>
          <Link
            to="/courses/teachers"
            data-cursor="link"
            className="flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark"
          >
            <Users className="h-4 w-4" /> Teacher Directory
          </Link>
        </Magnetic>
        <Magnetic>
          <Link
            to="/courses/suggest-correction"
            data-cursor="link"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-ieee-orange/50 hover:text-ieee-orange"
          >
            <PencilLine className="h-4 w-4" /> Suggest Correction
          </Link>
        </Magnetic>
      </PageHero>

      <PageSection tone="cream" top>
        <SearchBar placeholder="Search by course code or name..." onSearch={setQuery} size="lg" />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FilterPanel
              groups={filterGroups}
              activeFilters={filters}
              onChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))}
              onReset={() => setFilters({})}
            />
          </div>
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
      </PageSection>
    </div>
  );
}
