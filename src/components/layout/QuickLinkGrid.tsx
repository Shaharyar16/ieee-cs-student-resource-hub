import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowUpRight,
  FileText,
  BookOpen,
  Mail,
  CalendarDays,
  Compass,
  LayoutGrid,
  HeartHandshake,
  type LucideIcon,
} from 'lucide-react';

interface QuickLinkItem {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
  wide?: boolean;
}

const items: QuickLinkItem[] = [
  { label: 'Past Papers', description: 'Verified midterms, finals & quizzes across every course.', to: '/past-papers', icon: FileText, wide: true },
  { label: 'Courses', description: 'Course description forms, lab manuals & study resources.', to: '/courses', icon: BookOpen },
  { label: 'Teacher Emails', description: 'Direct contact details for faculty across the department.', to: '/courses/teachers', icon: Mail },
  { label: 'Upcoming Events', description: 'Workshops, hackathons & seminars this semester.', to: '/events', icon: CalendarDays, wide: true },
  { label: 'CS Block Navigation', description: 'Step-by-step indoor routes to any room or lab.', to: '/navigation', icon: Compass },
  { label: 'Project Showcase', description: 'Browse and submit student-built projects & open source.', to: '/projects-expo', icon: LayoutGrid },
  { label: 'Contribute Resources', description: 'Upload a paper, report an issue, or help other students.', to: '/contribute', icon: HeartHandshake },
];

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function QuickLinkGrid() {
  return (
    <section id="quick-links" className="relative overflow-hidden bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <svg
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-6 w-full text-ieee-ink/[0.08]"
        aria-hidden="true"
      >
        <path d="M0,0 Q100,26 200,0 L200,0 L0,0 Z" fill="currentColor" />
      </svg>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewBox="0 0 120 16"
            className="mx-auto h-4 w-28"
            aria-hidden="true"
          >
            <motion.path
              d="M2,14 Q60,-4 118,14"
              fill="none"
              stroke="#ff6c0c"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </motion.svg>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-ieee-orange">
            Core Resources
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything, organized.
          </h2>
          <p className="mt-3 text-slate-600">
            Jump straight to the resources students reach for most — no digging through group chats.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={groupVariants}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} variants={cardVariants} className={item.wide ? 'lg:col-span-2' : ''}>
                <Link
                  to={item.to}
                  data-cursor="link"
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ieee-orange/30 hover:shadow-lg"
                >
                  <Icon
                    className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 text-ieee-orange/[0.05] transition-transform duration-500 group-hover:scale-110 group-hover:text-ieee-orange/[0.08]"
                    strokeWidth={1}
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-300">{String(i + 1).padStart(2, '0')}</span>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ieee-orange" />
                    </span>
                  </div>
                  <div className="relative mt-6">
                    <h3 className="font-display text-base font-semibold text-slate-900">{item.label}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
