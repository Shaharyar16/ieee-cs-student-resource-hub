import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileSearch,
  ArrowLeft,
  ChevronRight,
  PencilLine,
  GraduationCap,
} from 'lucide-react';
import type { Paper, Course } from '@/types';
import { papers as seedPapers } from '@/data/papers';
import { courses as coursesSeed } from '@/data/courses';
import { useCollection } from '@/hooks/useCollection';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import Magnetic from '@/components/effects/Magnetic';
import SearchBar from '@/components/ui/SearchBar';
import PaperCard from '@/components/cards/PaperCard';
import EmptyState from '@/components/ui/EmptyState';

/**
 * The archive only holds real exam papers. Quizzes and assignments are course
 * material, not past papers — they live on each course's detail page instead.
 */
type ExamCategory = 'Midterm' | 'Final';

const CATEGORIES: {
  value: ExamCategory;
  label: string;
  blurb: string;
  icon: typeof PencilLine;
}[] = [
  {
    value: 'Midterm',
    label: 'Mid Terms',
    blurb: 'Mid-semester exam papers for this course.',
    icon: PencilLine,
  },
  {
    value: 'Final',
    label: 'Terminals',
    blurb: 'Final / terminal exam papers for this course.',
    icon: GraduationCap,
  },
];

export default function PastPapersPage() {
  const { items: papers } = useCollection<Paper>('papers', seedPapers);
  const { items: courses } = useCollection<Course>('courses', coursesSeed);
  const [query, setQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [category, setCategory] = useState<ExamCategory | null>(null);

  // Only moderator-verified exam papers are shown publicly. Quizzes/assignments
  // are deliberately excluded here — they belong to the course, not the archive.
  const examPapers = useMemo(
    () =>
      papers.filter(
        (p) =>
          p.verification === 'verified' &&
          (p.examType === 'Midterm' || p.examType === 'Final')
      ),
    [papers]
  );

  // Courses that actually have exam papers, so a student never hits a dead end.
  const coursesWithPapers = useMemo(
    () => courses.filter((c) => examPapers.some((p) => p.courseId === c.id)),
    [courses, examPapers]
  );

  const visibleCourses = useMemo(() => {
    if (!query) return coursesWithPapers;
    const q = query.toLowerCase();
    return coursesWithPapers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [coursesWithPapers, query]);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? null;

  const countFor = (courseId: string, cat: ExamCategory) =>
    examPapers.filter((p) => p.courseId === courseId && p.examType === cat).length;

  const coursePapers = useMemo(() => {
    if (!selectedCourseId || !category) return [];
    return examPapers.filter(
      (p) => p.courseId === selectedCourseId && p.examType === category
    );
  }, [examPapers, selectedCourseId, category]);

  const totalDownloads = examPapers.reduce((sum, p) => sum + p.downloads, 0);

  const resetToCourses = () => {
    setSelectedCourseId(null);
    setCategory(null);
  };

  const step = !selectedCourseId ? 1 : !category ? 2 : 3;

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Resources"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Past Papers' }]}
        title="Past Papers Archive"
        subtitle="Pick a course, choose Mid Terms or Terminals, and get straight to verified exam papers — no digging through group chats."
        meta={[
          { value: `${examPapers.length}`, label: 'Papers' },
          { value: `${coursesWithPapers.length}`, label: 'Courses' },
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
        {/* Breadcrumb trail across the three steps */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-500">
          <button
            type="button"
            onClick={resetToCourses}
            data-cursor="link"
            className={`transition hover:text-ieee-orange ${step === 1 ? 'font-bold text-ieee-orange' : ''}`}
          >
            Courses
          </button>
          {selectedCourse && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <button
                type="button"
                onClick={() => setCategory(null)}
                data-cursor="link"
                className={`transition hover:text-ieee-orange ${step === 2 ? 'font-bold text-ieee-orange' : ''}`}
              >
                {selectedCourse.code}
              </button>
            </>
          )}
          {category && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-bold text-ieee-orange">
                {CATEGORIES.find((c) => c.value === category)?.label}
              </span>
            </>
          )}
        </nav>

        <AnimatePresence mode="wait">
          {/* STEP 1 — pick a course */}
          {step === 1 && (
            <motion.div
              key="step-courses"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <SearchBar
                placeholder="Search by course code or name..."
                onSearch={setQuery}
                size="lg"
              />
              <p className="mb-4 mt-8 font-mono text-xs uppercase tracking-wider text-slate-500">
                Step 1 · Choose a course
              </p>
              {visibleCourses.length === 0 ? (
                <EmptyState
                  title="No courses found"
                  description="No verified exam papers match your search yet."
                />
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleCourses.map((course, idx) => {
                    const total =
                      countFor(course.id, 'Midterm') + countFor(course.id, 'Final');
                    return (
                      <motion.button
                        key={course.id}
                        type="button"
                        onClick={() => setSelectedCourseId(course.id)}
                        data-cursor="link"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.03 }}
                        whileHover={{ y: -4 }}
                        className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-ieee-orange/40 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wide text-ieee-blue">
                              {course.code}
                            </span>
                            <h3 className="mt-0.5 font-semibold text-slate-900">{course.name}</h3>
                          </div>
                          <span className="shrink-0 rounded-full bg-ieee-orange/10 px-2.5 py-1 text-[11px] font-semibold text-ieee-orange">
                            {total} {total === 1 ? 'paper' : 'papers'}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-sm text-slate-500">{course.description}</p>
                        <div className="mt-auto flex items-center justify-between text-xs font-semibold text-slate-400 transition group-hover:text-ieee-orange">
                          <span>Choose exam type</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2 — pick Mid Terms or Terminals */}
          {step === 2 && selectedCourse && (
            <motion.div
              key="step-category"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={resetToCourses}
                data-cursor="link"
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-ieee-orange"
              >
                <ArrowLeft className="h-4 w-4" /> All courses
              </button>
              <div className="mb-2">
                <span className="font-mono text-xs uppercase tracking-wide text-ieee-blue">
                  {selectedCourse.code}
                </span>
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  {selectedCourse.name}
                </h2>
              </div>
              <p className="mb-8 font-mono text-xs uppercase tracking-wider text-slate-500">
                Step 2 · Which papers do you need?
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {CATEGORIES.map((cat) => {
                  const count = countFor(selectedCourse.id, cat.value);
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.value}
                      type="button"
                      disabled={count === 0}
                      onClick={() => setCategory(cat.value)}
                      data-cursor="link"
                      whileHover={count > 0 ? { y: -4 } : undefined}
                      className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-ieee-orange/40 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:shadow-sm"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ieee-orange/10 text-ieee-orange transition group-hover:bg-ieee-orange group-hover:text-white">
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-slate-900">{cat.label}</h3>
                        <p className="mt-1 text-sm text-slate-500">{cat.blurb}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2 text-sm font-semibold text-slate-400 transition group-hover:text-ieee-orange">
                        <span>
                          {count} {count === 1 ? 'paper' : 'papers'}
                        </span>
                        {count > 0 && <ChevronRight className="h-4 w-4" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3 — the papers */}
          {step === 3 && selectedCourse && category && (
            <motion.div
              key="step-papers"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setCategory(null)}
                data-cursor="link"
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-ieee-orange"
              >
                <ArrowLeft className="h-4 w-4" /> Exam types
              </button>
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wide text-ieee-blue">
                  {selectedCourse.code} · {CATEGORIES.find((c) => c.value === category)?.label}
                </span>
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  {selectedCourse.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {coursePapers.length} {coursePapers.length === 1 ? 'paper' : 'papers'}
                </p>
              </div>
              {coursePapers.length === 0 ? (
                <EmptyState
                  title="No papers here yet"
                  description="Nobody has contributed papers for this exam type yet."
                  action={
                    <Link
                      to="/past-papers/contribute"
                      className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark"
                    >
                      Contribute one
                    </Link>
                  }
                />
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {coursePapers.map((paper, idx) => (
                    <motion.div
                      key={paper.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
                    >
                      <PaperCard paper={paper} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </PageSection>
    </div>
  );
}
