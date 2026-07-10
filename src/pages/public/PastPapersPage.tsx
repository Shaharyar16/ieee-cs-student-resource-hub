import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { papers } from '@/data/papers';
import { courses } from '@/data/courses';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel, { type FilterGroup } from '@/components/ui/FilterPanel';
import PaperCard from '@/components/cards/PaperCard';
import EmptyState from '@/components/ui/EmptyState';

const filterGroups: FilterGroup[] = [
  {
    label: 'Course',
    key: 'courseId',
    options: courses.map((c) => ({ label: c.code, value: c.id })),
  },
  {
    label: 'Exam Type',
    key: 'examType',
    options: ['Midterm', 'Final', 'Quiz', 'Assignment'].map((v) => ({ label: v, value: v })),
  },
  {
    label: 'Year',
    key: 'year',
    options: [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a).map((y) => ({ label: String(y), value: String(y) })),
  },
];

export default function PastPapersPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return papers.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.courseName.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCourse = !filters.courseId || p.courseId === filters.courseId;
      const matchesExam = !filters.examType || p.examType === filters.examType;
      const matchesYear = !filters.year || String(p.year) === filters.year;
      return matchesQuery && matchesCourse && matchesExam && matchesYear;
    });
  }, [query, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Past Papers Archive</h1>
          <p className="mt-1 text-slate-600">Browse student-contributed and verified exam papers.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/past-papers/contribute" className="rounded-lg bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            Contribute Paper
          </Link>
          <Link to="/past-papers/request" className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-ieee-orange hover:text-ieee-orange">
            Request Paper
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <SearchBar placeholder="Search by course, title, or tag..." onSearch={setQuery} size="lg" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel
          groups={filterGroups}
          activeFilters={filters}
          onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
          onReset={() => setFilters({})}
        />
        <div>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <EmptyState title="No papers found" description="Try adjusting your search or filters." />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((paper, idx) => (
                  <motion.div
                    key={paper.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                  >
                    <PaperCard paper={paper} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
