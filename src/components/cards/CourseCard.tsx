import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Course } from '@/types';
import VerificationBadge from '@/components/ui/VerificationBadge';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Link
        to={`/courses/${course.id}`}
        className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-ieee-blue">{course.code}</span>
            <h3 className="mt-0.5 font-semibold text-slate-900">{course.name}</h3>
          </div>
          <VerificationBadge status={course.verification} size="sm" />
        </div>
        <p className="line-clamp-2 text-sm text-slate-500">{course.description}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
          <span>{course.creditHours} credit hours</span>
          <span>{course.department}</span>
        </div>
      </Link>
    </motion.div>
  );
}
