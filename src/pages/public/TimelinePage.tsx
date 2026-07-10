import { motion } from 'framer-motion';
import { timeline } from '@/data/timeline';

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Chapter Timeline</h1>
      <p className="mt-2 text-slate-600">Key milestones in our society's journey.</p>

      <div className="relative mt-10 border-l-2 border-slate-200 pl-8">
        {timeline.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative mb-10 last:mb-0"
          >
            <span className="absolute -left-[38px] flex h-5 w-5 items-center justify-center rounded-full bg-ieee-orange ring-4 ring-white" />
            <p className="text-xs font-semibold uppercase tracking-wide text-ieee-blue">{event.date}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
