import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pin, ArrowUpRight } from 'lucide-react';
import { announcements } from '@/data/announcements';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';

const categoryColors: Record<string, string> = {
  general: 'bg-slate-100 text-slate-700',
  event: 'bg-blue-100 text-blue-700',
  academic: 'bg-emerald-100 text-emerald-700',
  navigation: 'bg-orange-100 text-orange-700',
  projects: 'bg-purple-100 text-purple-700',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AnnouncementsPage() {
  const ordered = [...announcements].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="News"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Announcements' }]}
        title="Announcements"
        subtitle="Stay up to date with the latest society news — events, drives, releases and chapter updates."
        meta={[
          { value: `${announcements.length}`, label: 'Posts' },
          { value: `${announcements.filter((a) => a.pinned).length}`, label: 'Pinned' },
        ]}
      />

      <PageSection tone="cream" top width="narrow">
        <div className="flex flex-col gap-4">
          {ordered.map((a, idx) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <Link
                to={`/announcements/${a.id}`}
                data-cursor="link"
                className="group block rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ieee-orange/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${categoryColors[a.category]}`}
                    >
                      {a.category}
                    </span>
                    {a.pinned && (
                      <span className="flex items-center gap-1 rounded-full bg-ieee-orange/10 px-2.5 py-0.5 text-xs font-semibold text-ieee-orange">
                        <Pin className="h-3 w-3" /> Pinned
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
                    {formatDate(a.date)}
                  </span>
                </div>
                <h3 className="mt-3 flex items-center gap-1.5 font-display text-lg font-bold text-slate-900">
                  {a.title}
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ieee-orange" />
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">{a.summary}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
