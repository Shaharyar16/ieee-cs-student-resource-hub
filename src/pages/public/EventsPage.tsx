import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { events } from '@/data/events';
import EventCard from '@/components/cards/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import type { EventCategory, EventTiming } from '@/types';

type TabKey = EventTiming | 'featured' | EventCategory;

const tabs: { key: TabKey; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'previous', label: 'Previous' },
  { key: 'featured', label: 'Featured' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'competition', label: 'Competitions' },
  { key: 'seminar', label: 'Seminars' },
  { key: 'hackathon', label: 'Hackathons' },
];

export default function EventsPage() {
  const [tab, setTab] = useState<TabKey>('upcoming');

  const filtered = useMemo(() => {
    if (tab === 'upcoming' || tab === 'previous') return events.filter((e) => e.timing === tab);
    if (tab === 'featured') return events.filter((e) => e.featured);
    return events.filter((e) => e.category === tab);
  }, [tab]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Events</h1>
      <p className="mt-2 text-slate-600">Workshops, competitions, seminars, and hackathons run by IEEE CS.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.key ? 'text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-ieee-orange'
            }`}
          >
            {tab === t.key && (
              <motion.span layoutId="event-tab-bg" className="absolute inset-0 rounded-full bg-ieee-orange" transition={{ duration: 0.25 }} />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState title="No events in this category" description="Check back soon for updates." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
