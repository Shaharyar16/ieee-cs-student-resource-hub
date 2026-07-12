import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  FlaskConical,
  ExternalLink,
  Target,
  Lightbulb,
  CheckCircle2,
  PencilLine,
  GitBranch,
  ArrowRight,
  ClipboardList,
  FileText,
  Download,
} from 'lucide-react';
import { courses as coursesSeed } from '@/data/courses';
import { teachers } from '@/data/teachers';
import { papers as papersSeed } from '@/data/papers';
import { useCollection } from '@/hooks/useCollection';
import type { Course, Paper } from '@/types';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeading from '@/components/layout/SectionHeading';
import VerificationBadge from '@/components/ui/VerificationBadge';
import DownloadButton from '@/components/ui/DownloadButton';
import PaperCard from '@/components/cards/PaperCard';
import EmptyState from '@/components/ui/EmptyState';
import Magnetic from '@/components/effects/Magnetic';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { items: courses } = useCollection<Course>('courses', coursesSeed);
  const { items: papers } = useCollection<Paper>('papers', papersSeed);
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Academics"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: 'Not found' }]}
          title="Course not found"
          subtitle="This course may have been removed or the link is incorrect."
        />
        <PageSection tone="cream" top>
          <EmptyState
            title="Nothing here"
            action={
              <Link to="/courses" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
                Back to Courses
              </Link>
            }
          />
        </PageSection>
      </div>
    );
  }

  const courseTeachers = teachers.filter((t) => course.teacherIds.includes(t.id));
  const verifiedForCourse = papers.filter((p) => p.courseId === course.id && p.verification === 'verified');
  // Real exam papers live in the Past Papers archive and preview here.
  const relatedPapers = verifiedForCourse
    .filter((p) => p.examType === 'Midterm' || p.examType === 'Final')
    .slice(0, 3);
  // Quizzes & assignments aren't past papers — they're course resources.
  const courseResources = verifiedForCourse.filter(
    (p) => p.examType === 'Quiz' || p.examType === 'Assignment'
  );
  const prereqCourses = (course.prerequisites ?? [])
    .map((code) => courses.find((c) => c.code === code))
    .filter((c): c is Course => !!c);
  const requiredFor = courses.filter((c) => (c.prerequisites ?? []).includes(course.code));

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow={course.code}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Courses', to: '/courses' }, { label: course.name }]}
        title={course.name}
        subtitle={course.description}
        meta={[
          ...(course.semester ? [{ value: `${course.semester}`, label: 'Semester' }] : []),
          { value: `${course.creditHours}`, label: 'Credit Hours' },
          { value: `${course.syllabus.length}`, label: 'Weeks' },
          { value: `${relatedPapers.length}`, label: 'Past Papers' },
        ]}
      >
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
          <VerificationBadge status={course.verification} />
        </span>
      </PageHero>

      <PageSection tone="cream" top>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Outcomes */}
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2 text-ieee-orange">
              <Target className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold text-slate-900">Learning Outcomes</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ieee-orange" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2 text-ieee-orange">
              <Lightbulb className="h-5 w-5" />
              <h2 className="font-display text-lg font-bold text-slate-900">Study Tips</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {course.tips.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-orange" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prerequisites & pathway */}
        <div className="mt-6 rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-2 text-ieee-orange">
            <GitBranch className="h-5 w-5" />
            <h2 className="font-display text-lg font-bold text-slate-900">Prerequisites &amp; Pathway</h2>
          </div>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Prerequisites</p>
              {prereqCourses.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {prereqCourses.map((c) => (
                    <Link
                      key={c.id}
                      to={`/courses/${c.id}`}
                      data-cursor="link"
                      className="flex items-center gap-1.5 rounded-full border border-black/10 bg-cream px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                    >
                      <span className="font-mono text-ieee-orange">{c.code}</span> {c.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">No prerequisites — you can take this anytime.</p>
              )}
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Required for</p>
              {requiredFor.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {requiredFor.map((c) => (
                    <Link
                      key={c.id}
                      to={`/courses/${c.id}`}
                      data-cursor="link"
                      className="flex items-center gap-1.5 rounded-full border border-black/10 bg-cream px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                    >
                      <span className="font-mono text-ieee-orange">{c.code}</span> {c.name}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">Not a prerequisite for any listed course.</p>
              )}
            </div>
          </div>
        </div>

        {/* Materials + Links */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
            <h3 className="font-display font-bold text-slate-900">Course Materials</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              <DownloadButton
                url={course.cdfUrl}
                filename={`${course.code}-CDF`}
                label="Download CDF"
                icon={<BookOpen className="h-4 w-4 text-ieee-orange" />}
                className="flex items-center gap-2 rounded-xl border border-black/5 bg-cream px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
              />
              <DownloadButton
                url={course.labManualUrl}
                filename={`${course.code}-Lab-Manual`}
                label="Download Lab Manual"
                icon={<FlaskConical className="h-4 w-4 text-ieee-orange" />}
                className="flex items-center gap-2 rounded-xl border border-black/5 bg-cream px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
              />
            </div>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
            <h3 className="font-display font-bold text-slate-900">Useful Links</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {course.usefulLinks.length === 0 && <p className="text-sm text-slate-500">No links added yet.</p>}
              {course.usefulLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="flex items-center gap-2 rounded-xl border border-black/5 bg-cream px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                >
                  <ExternalLink className="h-4 w-4 text-ieee-orange" /> {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quizzes & assignments — course resources, not past papers */}
        <div className="mt-6 rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-2 text-ieee-orange">
            <ClipboardList className="h-5 w-5" />
            <h2 className="font-display text-lg font-bold text-slate-900">Quizzes &amp; Assignments</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Practice material for this course. Looking for exam papers? See the{' '}
            <Link to="/past-papers" data-cursor="link" className="font-semibold text-ieee-orange hover:underline">
              Past Papers archive
            </Link>
            .
          </p>
          {courseResources.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No quizzes or assignments added yet.</p>
          ) : (
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {courseResources.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-xl border border-black/5 bg-cream px-4 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ieee-orange/10 text-ieee-orange">
                    {r.examType === 'Quiz' ? <FileText className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{r.title}</p>
                    <p className="text-xs text-slate-500">
                      {r.examType} · {r.term} {r.year}
                    </p>
                  </div>
                  <DownloadButton
                    url={r.fileUrl}
                    filename={r.title}
                    label="Download"
                    icon={<Download className="h-4 w-4" />}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </PageSection>

      {/* Syllabus */}
      <PageSection tone="white">
        <SectionHeading eyebrow={`${course.syllabus.length}-Week Plan`} title="Weekly syllabus" flourish />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {course.syllabus.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3, delay: (i % 2) * 0.05 }}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-cream px-5 py-3.5 transition-colors hover:border-ieee-orange/30"
            >
              <span className="flex h-9 w-14 shrink-0 items-center justify-center rounded-lg bg-ieee-orange/10 font-mono text-xs font-bold text-ieee-orange">
                W{w.week}
              </span>
              <span className="text-sm text-slate-700">{w.topic}</span>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Instructors + related */}
      <PageSection tone="cream">
        {courseTeachers.length > 0 && (
          <>
            <SectionHeading eyebrow="Faculty" title="Instructors" />
            <div className="mt-8 flex flex-wrap gap-4">
              {courseTeachers.map((t) => (
                <Link
                  key={t.id}
                  to="/courses/teachers"
                  data-cursor="link"
                  className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img src={t.photo} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.email}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {relatedPapers.length > 0 && (
          <div className="mt-14">
            <SectionHeading eyebrow="Practice" title="Related past papers" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPapers.map((p) => (
                <PaperCard key={p.id} paper={p} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Magnetic>
            <Link
              to="/courses/suggest-correction"
              data-cursor="link"
              className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-ieee-orange/40 hover:text-ieee-orange"
            >
              <PencilLine className="h-4 w-4" /> Suggest a correction for this course
            </Link>
          </Magnetic>
        </div>
      </PageSection>
    </div>
  );
}
