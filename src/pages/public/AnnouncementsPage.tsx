import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { announcements } from '@/data/announcements';

const categoryColors: Record<string, string> = {
  general: 'bg-slate-100 text-slate-700',
  event: 'bg-blue-100 text-blue-700',
  academic: 'bg-emerald-100 text-emerald-700',
  navigation: 'bg-orange-100 text-orange-700',
  projects: 'bg-purple-100 text-purple-700',
};

export default function AnnouncementsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Announcements</h1>
      <p className="mt-2 text-slate-600">Stay up to date with the latest society news.</p>

      <div className="mt-8 flex flex-col gap-4">
        {announcements.map((a, idx) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
          >
            <Link to={`/announcements/${a.id}`} className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-ieee-orange hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${categoryColors[a.category]}`}>{a.category}</span>
                <span className="text-xs text-slate-400">{a.date}</span>
              </div>
              <h3 className="mt-2 font-semibold text-slate-900">{a.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{a.summary}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
