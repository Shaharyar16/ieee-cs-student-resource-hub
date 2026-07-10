import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, FileText, BookOpen, CalendarDays, Compass, Layers, Users } from 'lucide-react';
import Magnetic from '@/components/effects/Magnetic';

const stats = [
  { value: '500+', label: 'Past Papers' },
  { value: '40+', label: 'Events / Year' },
  { value: '120+', label: 'Projects Shipped' },
];

const modules = [
  { label: 'Past Papers', to: '/past-papers', icon: FileText },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Events', to: '/events', icon: CalendarDays },
  { label: 'Navigation', to: '/navigation', icon: Compass },
  { label: 'Projects', to: '/projects-expo', icon: Layers },
  { label: 'Contribute', to: '/contribute', icon: Users },
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12">
      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-ieee-orange backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-ieee-orange" />
            IEEE Computer Society · COMSATS Student Branch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-6 font-display font-bold tracking-tight text-cream"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.03 }}
          >
            Everything CS students
            <br />
            need, <span className="text-ieee-orange">in one hub.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg lg:mx-0"
          >
            Past papers, course resources, live events, CS Block navigation, and student project
            showcases — organized, verified, and built by your own IEEE CS chapter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Magnetic>
              <Link
                to="/past-papers"
                data-cursor="link"
                className="group flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark"
              >
                Explore Resources
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/events"
                data-cursor="link"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-ieee-orange/50 hover:text-ieee-orange"
              >
                View Events
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.to}
                  to={mod.to}
                  data-cursor="link"
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] text-white/70 backdrop-blur transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                >
                  <Icon className="h-3 w-3" strokeWidth={1.75} />
                  {mod.label}
                </Link>
              );
            })}
          </motion.div>
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-6 lg:hidden"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-xl font-bold text-cream">{s.value}</dt>
                <dd className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-white/40">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative hidden min-h-[420px] lg:block">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute right-0 top-1/2 flex w-56 -translate-y-1/2 flex-col gap-3"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-panel rounded-2xl border-black/5 px-5 py-4 shadow-[0_8px_30px_rgba(10,10,12,0.06)]"
              >
                <div className="font-display text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-500">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="pointer-events-none relative mx-auto mt-10 flex flex-col items-center gap-1 text-white/35"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
