import { Link, useParams } from 'react-router-dom';
import { courses } from '@/data/courses';
import { teachers } from '@/data/teachers';
import { papers } from '@/data/papers';
import VerificationBadge from '@/components/ui/VerificationBadge';
import PaperCard from '@/components/cards/PaperCard';
import EmptyState from '@/components/ui/EmptyState';
import Icon from '@/components/ui/Icon';

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <EmptyState title="Course not found" />
      </div>
    );
  }

  const courseTeachers = teachers.filter((t) => course.teacherIds.includes(t.id));
  const relatedPapers = papers.filter((p) => p.courseId === course.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-ieee-blue">{course.code}</span>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{course.name}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">{course.description}</p>
        </div>
        <VerificationBadge status={course.verification} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-slate-400">Credit Hours</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{course.creditHours}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-slate-400">Department</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{course.department}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-xs text-slate-400">Weeks</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{course.syllabus.length}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Learning Outcomes</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
          {course.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Weekly Syllabus</h2>
        <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {course.syllabus.map((w) => (
            <div key={w.week} className="flex gap-4 px-5 py-3 text-sm">
              <span className="w-16 shrink-0 font-semibold text-ieee-blue">Week {w.week}</span>
              <span className="text-slate-600">{w.topic}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">Course Materials</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {course.cdfUrl && (
              <a href={course.cdfUrl} className="flex items-center gap-1.5 font-medium text-ieee-orange hover:underline">
                <Icon name="book" className="h-4 w-4 shrink-0" /> Download CDF
              </a>
            )}
            {course.labManualUrl && (
              <a href={course.labManualUrl} className="flex items-center gap-1.5 font-medium text-ieee-orange hover:underline">
                <Icon name="flask" className="h-4 w-4 shrink-0" /> Download Lab Manual
              </a>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">Useful Links</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {course.usefulLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-medium text-ieee-orange hover:underline">
                <Icon name="link" className="h-4 w-4 shrink-0" /> {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {courseTeachers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">Instructors</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {courseTeachers.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <img src={t.photo} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Study Tips</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
          {course.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      {relatedPapers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">Related Past Papers</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {relatedPapers.map((p) => (
              <PaperCard key={p.id} paper={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <Link to="/courses/suggest-correction" className="inline-block rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-ieee-orange hover:text-ieee-orange">
          Suggest a Correction for this Course
        </Link>
      </div>
    </div>
  );
}
