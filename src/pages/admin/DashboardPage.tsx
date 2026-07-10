import { motion } from 'framer-motion';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminMetricCard from '@/components/admin/AdminMetricCard';
import { papers } from '@/data/papers';
import { courses } from '@/data/courses';
import { events } from '@/data/events';
import { projects } from '@/data/projects';
import { submissions } from '@/data/submissions';

export default function DashboardPage() {
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div>
      <AdminTopbar title="Dashboard" />
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AdminMetricCard label="Total Papers" value={papers.length} icon="file" accent="orange" />
          <AdminMetricCard label="Active Courses" value={courses.length} icon="book" accent="blue" />
          <AdminMetricCard label="Upcoming Events" value={events.filter((e) => e.timing === 'upcoming').length} icon="calendar" accent="emerald" />
          <AdminMetricCard label="Pending Submissions" value={pendingSubmissions} icon="inbox" accent="amber" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900">Content Overview</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {[
                { label: 'Projects Expo Entries', value: projects.length, max: 20 },
                { label: 'Verified Papers', value: papers.filter((p) => p.verification === 'verified').length, max: papers.length },
                { label: 'Verified Courses', value: courses.filter((c) => c.verification === 'verified').length, max: courses.length },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-slate-600">
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-ieee-orange"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((row.value / row.max) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900">Recent Submissions</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {submissions.slice(0, 5).map((s) => (
                <li key={s.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                  <div>
                    <p className="font-medium text-slate-800 capitalize">{s.type.replace('-', ' ')}</p>
                    <p className="text-xs text-slate-400">{s.submittedBy} · {s.submittedAt}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">{s.status}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
