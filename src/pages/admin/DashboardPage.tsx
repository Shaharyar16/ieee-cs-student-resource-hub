import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarPlus, FileUp, ClipboardList, Inbox, ArrowUpRight } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminMetricCard from '@/components/admin/AdminMetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { adminAuthService } from '@/services/adminAuthService';
import { useCollection } from '@/hooks/useCollection';
import { papers as papersSeed } from '@/data/papers';
import { courses as coursesSeed } from '@/data/courses';
import { events as eventsSeed } from '@/data/events';
import { projectSeed } from '@/data/projectSeed';
import { submissions as submissionsSeed } from '@/data/submissions';
import type { Paper, Course, EventItem, ProjectPost, Submission } from '@/types';

const quickActions = [
  { label: 'New Event', to: '/portal/events', icon: CalendarPlus },
  { label: 'Add Past Paper', to: '/portal/papers', icon: FileUp },
  { label: 'Build a Form', to: '/portal/forms/new', icon: ClipboardList },
  { label: 'Review Submissions', to: '/portal/submissions', icon: Inbox },
];

export default function DashboardPage() {
  const admin = adminAuthService.getCurrentAdmin();
  const { items: papers } = useCollection<Paper>('papers', papersSeed);
  const { items: courses } = useCollection<Course>('courses', coursesSeed);
  const { items: events } = useCollection<EventItem>('events', eventsSeed);
  const { items: projects } = useCollection<ProjectPost>('projectPosts', projectSeed);
  const { items: submissions } = useCollection<Submission>('submissions', submissionsSeed);
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending').length;

  const overview = [
    { label: 'Projects Expo Entries', value: projects.length, max: 20 },
    { label: 'Verified Papers', value: papers.filter((p) => p.verification === 'verified').length, max: papers.length },
    { label: 'Verified Courses', value: courses.filter((c) => c.verification === 'verified').length, max: courses.length },
  ];

  return (
    <div>
      <AdminTopbar title="Dashboard" subtitle={admin ? `Welcome back, ${admin.name.split(' ')[0]}` : undefined} />
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AdminMetricCard label="Total Papers" value={papers.length} icon="file" accent="orange" delay={0} />
          <AdminMetricCard label="Active Courses" value={courses.length} icon="book" accent="blue" delay={0.05} />
          <AdminMetricCard
            label="Upcoming Events"
            value={events.filter((e) => e.timing === 'upcoming').length}
            icon="calendar"
            accent="emerald"
            delay={0.1}
          />
          <AdminMetricCard label="Pending Submissions" value={pendingSubmissions} icon="inbox" accent="amber" delay={0.15} />
        </div>

        {/* quick actions */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickActions.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              >
                <Link
                  to={a.to}
                  className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-ieee-orange/30 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{a.label}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:text-ieee-orange" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <h3 className="font-display text-base font-bold text-slate-900">Content Overview</h3>
            <div className="mt-4 flex flex-col gap-4 text-sm">
              {overview.map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-slate-600">
                    <span>{row.label}</span>
                    <span className="font-mono text-xs text-slate-400">
                      {row.value}/{row.max}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-ieee-orange to-ieee-yellow"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((row.value / row.max) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-slate-900">Recent Submissions</h3>
              <Link to="/portal/submissions" className="text-xs font-semibold text-ieee-orange hover:underline">
                View all
              </Link>
            </div>
            <ul className="mt-4 flex flex-col gap-1">
              {submissions.slice(0, 5).map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded-xl px-2 py-2 transition hover:bg-cream/60">
                  <div>
                    <p className="text-sm font-medium capitalize text-slate-800">{s.type.replace(/-/g, ' ')}</p>
                    <p className="text-xs text-slate-400">
                      {s.submittedBy} · {s.submittedAt}
                    </p>
                  </div>
                  <StatusBadge status={s.status} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
