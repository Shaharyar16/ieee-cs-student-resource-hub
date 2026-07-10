import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSearch } from 'lucide-react';
import { papers } from '@/data/papers';
import { courses } from '@/data/courses';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import Magnetic from '@/components/effects/Magnetic';
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
    options: [...new Set(papers.map((p) => p.year))]
      .sort((a, b) => b - a)
      .map((y) => ({ label: String(y), value: String(y) })),
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

  const verifiedCount = papers.filter((p) => p.verification === 'verified').length;
  const totalDownloads = papers.reduce((sum, p) => sum + p.downloads, 0);

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Resources"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Past Papers' }]}
        title="Past Papers Archive"
        subtitle="Browse student-contributed and moderator-verified exam papers across every course — no digging through group chats."
        meta={[
          { value: `${papers.length}`, label: 'Papers' },
          { value: `${verifiedCount}`, label: 'Verified' },
          { value: totalDownloads.toLocaleString(), label: 'Downloads' },
        ]}
      >
        <Magnetic>
          <Link
            to="/past-papers/contribute"
            data-cursor="link"
            className="group flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark"
          >
            <Upload className="h-4 w-4" /> Contribute Paper
          </Link>
        </Magnetic>
        <Magnetic>
          <Link
            to="/past-papers/request"
            data-cursor="link"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-ieee-orange/50 hover:text-ieee-orange"
          >
            <FileSearch className="h-4 w-4" /> Request Paper
          </Link>
        </Magnetic>
      </PageHero>

      <PageSection tone="cream" top>
        <SearchBar placeholder="Search by course, title, or tag..." onSearch={setQuery} size="lg" />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FilterPanel
              groups={filterGroups}
              activeFilters={filters}
              onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
              onReset={() => setFilters({})}
            />
          </div>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">
              {filtered.length} {filtered.length === 1 ? 'paper' : 'papers'}
            </p>
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
      </PageSection>
    </div>
  );
}
