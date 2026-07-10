import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Paper } from '@/types';
import VerificationBadge from '@/components/ui/VerificationBadge';

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Link
        to={`/past-papers/${paper.id}`}
        className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900">{paper.title}</h3>
            <p className="text-sm text-slate-500">{paper.courseName}</p>
          </div>
          <VerificationBadge status={paper.verification} size="sm" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {paper.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
          <span>{paper.term} {paper.year} · {paper.examType}</span>
          <span>{paper.downloads} downloads</span>
        </div>
      </Link>
    </motion.div>
  );
}
