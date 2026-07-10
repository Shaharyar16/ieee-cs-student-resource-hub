import { Link, useParams } from 'react-router-dom';
import { events } from '@/data/events';
import EmptyState from '@/components/ui/EmptyState';

export default function EventDetailPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <EmptyState title="Event not found" />
      </div>
    );
  }

  const seatsLeft = event.capacity - event.registered;
  const percentFull = Math.round((event.registered / event.capacity) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="overflow-hidden rounded-3xl">
        <img src={event.image} alt={event.title} className="h-64 w-full object-cover sm:h-80" />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-ieee-blue-light px-3 py-1 text-xs font-semibold capitalize text-ieee-blue">
            {event.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">{event.title}</h1>
          <p className="mt-2 text-slate-600">{event.longDescription}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="text-slate-400">Date & Time</p>
          <p className="mt-1 font-semibold text-slate-800">{event.date}</p>
          <p className="text-slate-600">{event.time}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="text-slate-400">Venue</p>
          <p className="mt-1 font-semibold text-slate-800">{event.venue}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="text-slate-400">Organizers</p>
          <p className="mt-1 font-semibold text-slate-800">{event.organizers.join(', ')}</p>
        </div>
      </div>

      {event.timing === 'upcoming' && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">{event.registered} / {event.capacity} registered</span>
            <span className="text-slate-500">{seatsLeft} seats left</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-ieee-orange" style={{ width: `${percentFull}%` }} />
          </div>
          <Link
            to={event.registrationOpen ? `/events/${event.id}/register` : '#'}
            className={`mt-5 inline-block rounded-lg px-5 py-3 text-sm font-semibold text-white ${
              event.registrationOpen ? 'bg-ieee-orange hover:bg-ieee-orange-dark' : 'pointer-events-none bg-slate-300'
            }`}
          >
            {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
          </Link>
        </div>
      )}

      {event.outcome && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Event Outcome</h2>
          <p className="mt-1 text-sm text-slate-500">{event.outcome.attendees} attendees</p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
            {event.outcome.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
