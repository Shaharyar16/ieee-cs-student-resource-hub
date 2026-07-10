import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, FileText, FlagTriangleRight, BookOpen } from 'lucide-react';
import { papers } from '@/data/papers';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeading from '@/components/layout/SectionHeading';
import VerificationBadge from '@/components/ui/VerificationBadge';
import PaperCard from '@/components/cards/PaperCard';
import EmptyState from '@/components/ui/EmptyState';
import Magnetic from '@/components/effects/Magnetic';

export default function PaperDetailPage() {
  const { id } = useParams();
  const paper = papers.find((p) => p.id === id);

  if (!paper) {
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Resources"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Past Papers', to: '/past-papers' }, { label: 'Not found' }]}
          title="Paper not found"
          subtitle="This paper may have been removed or the link is incorrect."
        />
        <PageSection tone="cream" top>
          <EmptyState
            title="Nothing here"
            description="Head back to the archive to find what you need."
            action={
              <Link
                to="/past-papers"
                className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark"
              >
                Back to Past Papers
              </Link>
            }
          />
        </PageSection>
      </div>
    );
  }

  const related = papers.filter((p) => p.courseId === paper.courseId && p.id !== paper.id).slice(0, 3);

  const details = [
    { label: 'Term', value: `${paper.term} ${paper.year}` },
    { label: 'Exam Type', value: paper.examType },
    { label: 'Instructor', value: paper.instructor },
    { label: 'Uploaded By', value: paper.uploadedBy },
    { label: 'Uploaded', value: paper.uploadedDate },
    { label: 'Downloads', value: String(paper.downloads) },
  ];

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow={paper.courseName}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Past Papers', to: '/past-papers' },
          { label: paper.title },
        ]}
        title={paper.title}
        subtitle={`${paper.term} ${paper.year} · ${paper.examType} · ${paper.instructor}`}
      />

      <PageSection tone="cream" top>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-black/5 bg-white shadow-[0_8px_30px_rgba(10,10,12,0.08)]"
          >
            <div className="text-center text-slate-400">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ieee-orange/10 text-ieee-orange">
                <FileText className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <p className="mt-3 text-sm">PDF / image preview</p>
            </div>
          </motion.div>

          {/* meta */}
          <div>
            <VerificationBadge status={paper.verification} />
            <div className="mt-5 flex flex-wrap gap-1.5">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ieee-orange/10 px-2.5 py-1 font-mono text-[11px] text-ieee-orange"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{d.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-800">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3">
              <Magnetic>
                <a
                  href={paper.fileUrl}
                  data-cursor="link"
                  className="flex items-center justify-center gap-2 rounded-xl bg-ieee-orange px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark"
                >
                  <Download className="h-4 w-4" /> Download Paper
                </a>
              </Magnetic>
              <Link
                to={`/courses/${paper.courseId}`}
                data-cursor="link"
                className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
              >
                <BookOpen className="h-4 w-4" /> View Related Course
              </Link>
              <Link
                to="/faq-contact"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-rose-600 transition hover:text-rose-700"
              >
                <FlagTriangleRight className="h-3.5 w-3.5" /> Report an issue with this paper
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <SectionHeading eyebrow="Same Course" title="Related papers" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PaperCard key={p.id} paper={p} />
              ))}
            </div>
          </div>
        )}
      </PageSection>
    </div>
  );
}
