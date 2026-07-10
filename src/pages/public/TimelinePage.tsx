import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import { timeline } from '@/data/timeline';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const founded = new Date(timeline[0].date).getFullYear();

export default function TimelinePage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Our Journey"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Timeline' }]}
        title="Chapter Timeline"
        subtitle="Key milestones in our society's journey — from a 20-member founding to the resource hub you're using now."
        meta={[
          { value: String(founded), label: 'Founded' },
          { value: `${timeline.length}`, label: 'Milestones' },
        ]}
      />

      <PageSection tone="cream" top width="narrow">
        <div className="relative pl-10 sm:pl-14">
          {/* rail */}
          <div className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-ieee-orange via-slate-300 to-transparent sm:left-[17px]" />

          {timeline.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              className="relative mb-8 last:mb-0"
            >
              {/* node */}
              <span className="absolute -left-10 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-ieee-orange text-white shadow-[0_4px_14px_rgba(255,108,12,0.4)] ring-4 ring-cream sm:-left-14">
                <Flag className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>

              <div className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ieee-orange/30 hover:shadow-lg">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ieee-orange">
                  {formatDate(event.date)}
                </span>
                <h3 className="mt-1.5 font-display text-lg font-bold text-slate-900">{event.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
