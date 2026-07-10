import { Link, useParams } from 'react-router-dom';
import { papers } from '@/data/papers';
import VerificationBadge from '@/components/ui/VerificationBadge';
import PaperCard from '@/components/cards/PaperCard';
import EmptyState from '@/components/ui/EmptyState';
import Icon from '@/components/ui/Icon';

export default function PaperDetailPage() {
  const { id } = useParams();
  const paper = papers.find((p) => p.id === id);

  if (!paper) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <EmptyState title="Paper not found" description="This paper may have been removed." />
      </div>
    );
  }

  const related = papers.filter((p) => p.courseId === paper.courseId && p.id !== paper.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
            <div className="text-center">
              <Icon name="file" className="mx-auto h-10 w-10" />
              <p className="mt-2 text-sm">PDF/Image preview placeholder</p>
            </div>
          </div>
        </div>
        <div>
          <VerificationBadge status={paper.verification} />
          <h1 className="mt-3 text-2xl font-bold text-slate-900">{paper.title}</h1>
          <p className="mt-1 text-slate-600">{paper.courseName}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-400">Term</dt>
              <dd className="font-medium text-slate-800">{paper.term} {paper.year}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Exam Type</dt>
              <dd className="font-medium text-slate-800">{paper.examType}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Instructor</dt>
              <dd className="font-medium text-slate-800">{paper.instructor}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Uploaded By</dt>
              <dd className="font-medium text-slate-800">{paper.uploadedBy}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Downloads</dt>
              <dd className="font-medium text-slate-800">{paper.downloads}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {paper.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">#{tag}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a href={paper.fileUrl} className="rounded-lg bg-ieee-orange px-5 py-3 text-center text-sm font-semibold text-white hover:bg-ieee-orange-dark">
              Download Paper
            </a>
            <Link to={`/courses/${paper.courseId}`} className="rounded-lg border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:border-ieee-orange hover:text-ieee-orange">
              View Related Course
            </Link>
            <Link to="/faq-contact" className="text-center text-sm font-medium text-rose-600 hover:underline">
              Report an issue with this paper
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">Related Papers</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <PaperCard key={p.id} paper={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
