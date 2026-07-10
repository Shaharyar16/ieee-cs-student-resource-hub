import { motion } from 'framer-motion';
import type { Teacher } from '@/types';
import Icon from '@/components/ui/Icon';

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
    >
      <img src={teacher.photo} alt={teacher.name} className="h-20 w-20 rounded-full object-cover" />
      <div>
        <h3 className="font-semibold text-slate-900">{teacher.name}</h3>
        <p className="text-sm text-slate-500">{teacher.designation}</p>
        <p className="text-xs text-slate-400">{teacher.department}</p>
      </div>
      <div className="w-full border-t border-slate-100 pt-3 text-left text-sm text-slate-600">
        <p className="flex items-center gap-1.5 truncate">
          <Icon name="mail" className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {teacher.email}
        </p>
        <p className="mt-1 flex items-center gap-1.5">
          <Icon name="building" className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {teacher.office}
        </p>
      </div>
    </motion.div>
  );
}
