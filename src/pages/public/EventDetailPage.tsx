import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Users, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { events } from '@/data/events';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import EmptyState from '@/components/ui/EmptyState';
import Magnetic from '@/components/effects/Magnetic';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventDetailPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Events"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'Not found' }]}
          title="Event not found"
          subtitle="This event may have ended or the link is incorrect."
        />
        <PageSection tone="cream" top>
          <EmptyState
            title="Nothing here"
            action={
              <Link to="/events" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
                Back to Events
              </Link>
            }
          />
        </PageSection>
      </div>
    );
  }

  const seatsLeft = event.capacity - event.registered;
  const percentFull = Math.round((event.registered / event.capacity) * 100);

  const info = [
    { icon: CalendarDays, label: 'Date & Time', value: formatDate(event.date), sub: event.time },
    { icon: MapPin, label: 'Venue', value: event.venue },
    { icon: Users, label: 'Organizers', value: event.organizers.join(', ') },
  ];

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow={event.category}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: event.title }]}
        title={event.title}
        subtitle={event.description}
      />

      <PageSection tone="cream" top>
        {/* banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-black/5 shadow-[0_8px_30px_rgba(10,10,12,0.12)]"
        >
          <img src={event.image} alt={event.title} className="h-64 w-full object-cover sm:h-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-ieee-ink/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="rounded-full bg-ieee-orange px-3 py-1 text-xs font-semibold capitalize text-white">
              {event.category}
            </span>
            {event.featured && (
              <span className="flex items-center gap-1 rounded-full bg-ieee-yellow px-3 py-1 text-xs font-semibold text-ieee-black">
                <Sparkles className="h-3 w-3" /> Featured
              </span>
            )}
          </div>
        </motion.div>

        {/* body */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">About this event</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{event.longDescription}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {info.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                    <Icon className="h-5 w-5 text-ieee-orange" />
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">{c.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{c.value}</p>
                    {c.sub && <p className="text-xs text-slate-500">{c.sub}</p>}
                  </div>
                );
              })}
            </div>

            {event.outcome && (
              <div className="mt-8 rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2 text-ieee-orange">
                  <Trophy className="h-5 w-5" />
                  <h2 className="font-display text-lg font-bold text-slate-900">Event Outcome</h2>
                </div>
                <p className="mt-1 text-sm text-slate-500">{event.outcome.attendees} attendees</p>
                <ul className="mt-4 space-y-3">
                  {event.outcome.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-orange" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* registration sidebar */}
          {event.timing === 'upcoming' && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-[0_8px_30px_rgba(10,10,12,0.08)]">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl font-bold text-slate-900">{seatsLeft}</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">seats left</span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentFull}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-ieee-orange to-ieee-yellow"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {event.registered} / {event.capacity} registered · {percentFull}% full
                </p>

                <Magnetic className="mt-6 block">
                  <Link
                    to={event.registrationOpen ? `/events/${event.id}/register` : '#'}
                    data-cursor="link"
                    className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition ${
                      event.registrationOpen
                        ? 'bg-ieee-orange shadow-[0_10px_30px_rgba(255,108,12,0.3)] hover:bg-ieee-orange-dark'
                        : 'pointer-events-none bg-slate-300'
                    }`}
                  >
                    {event.registrationOpen ? (
                      <>
                        Register Now <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      'Registration Closed'
                    )}
                  </Link>
                </Magnetic>
              </div>
            </div>
          )}
        </div>
      </PageSection>
    </div>
  );
}
