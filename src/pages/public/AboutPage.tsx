import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { currentHierarchy } from '@/data/hierarchy';
import Icon from '@/components/ui/Icon';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="text-xs font-semibold uppercase tracking-wide text-ieee-orange">About Us</span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">IEEE Computer Society</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          IEEE Computer Society (IEEE CS) is the world's leading membership organization dedicated to
          computer science and technology. It provides technical resources, conferences, publications, and
          career development opportunities to computing professionals and students worldwide.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <h2 className="text-xl font-bold text-slate-900">Our Student Branch Chapter</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Our chapter brings IEEE CS's global resources directly to students on campus. We organize
          workshops, hackathons, seminars, and a project showcase every semester, while maintaining this
          resource hub for past papers, course material, and campus navigation help — all built and
          maintained by student volunteers.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          to="/about/hierarchy"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange hover:shadow-md"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
            <Icon name="building" className="h-5 w-5" />
          </span>
          <h3 className="mt-2 font-semibold text-slate-900">Leadership Hierarchy</h3>
          <p className="mt-1 text-sm text-slate-500">Meet our current and previous executive councils.</p>
        </Link>
        <Link
          to="/about/timeline"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange hover:shadow-md"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
            <Icon name="clock" className="h-5 w-5" />
          </span>
          <h3 className="mt-2 font-semibold text-slate-900">Chapter Timeline</h3>
          <p className="mt-1 text-sm text-slate-500">A history of our chapter's key milestones.</p>
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Current Executive Council ({currentHierarchy.term})</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {currentHierarchy.members.map((m) => (
            <div key={m.id} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <img src={m.photo} alt={m.name} className="h-16 w-16 rounded-full object-cover" />
              <p className="mt-2 text-sm font-semibold text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/events" className="rounded-lg bg-ieee-orange px-5 py-3 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
          Explore Events
        </Link>
        <Link to="/contribute" className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-ieee-orange hover:text-ieee-orange">
          Get Involved
        </Link>
      </div>
    </div>
  );
}
