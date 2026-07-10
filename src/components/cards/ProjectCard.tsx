import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ProjectItem } from '@/types';
import VerificationBadge from '@/components/ui/VerificationBadge';

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Link
        to={`/projects-expo/${project.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
      >
        <div className="h-40 w-full overflow-hidden">
          <img src={project.screenshots[0]} alt={project.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900">{project.title}</h3>
            <VerificationBadge status={project.verification} size="sm" />
          </div>
          <p className="text-sm text-slate-500">{project.tagline}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.techStack.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
