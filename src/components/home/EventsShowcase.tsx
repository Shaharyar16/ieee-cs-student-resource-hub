import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import type { EventItem } from '@/types';

const categoryLabel: Record<EventItem['category'], string> = {
  workshop: 'Workshop',
  competition: 'Competition',
  seminar: 'Seminar',
  hackathon: 'Hackathon',
};

interface EventsShowcaseProps {
  events: EventItem[];
}

export default function EventsShowcase({ events }: EventsShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getDistance = () => track.scrollWidth - window.innerWidth + 96;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [events]);

  return (
    <section id="events" ref={sectionRef} className="relative overflow-hidden bg-ieee-ink py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-ieee-orange/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-ieee-yellow/10 blur-[120px]" />

      <div className="relative mx-auto flex max-w-7xl items-end justify-between px-5 sm:px-8 lg:px-12">
        <div>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-ieee-orange">
            Don&apos;t Miss Out
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Upcoming Events
          </h2>
        </div>
        <Link
          to="/events"
          data-cursor="link"
          className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-ieee-orange hover:text-ieee-orange sm:flex"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:w-max lg:flex-nowrap lg:overflow-visible lg:pl-12"
      >
        {events.map((event) => {
          const seatsLeft = event.capacity - event.registered;
          return (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              data-cursor="link"
              className="group relative flex h-[380px] w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur transition-colors duration-300 hover:border-ieee-orange/50 sm:w-[340px]"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ieee-ink via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ieee-ink">
                  {categoryLabel[event.category]}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">
                    {event.title}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1.5 font-mono text-xs text-white/50">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" /> {event.venue}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-medium text-ieee-orange">
                    {event.registrationOpen ? `${seatsLeft} seats left` : 'Registration closed'}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ieee-orange" />
                </div>
              </div>
            </Link>
          );
        })}

        <Link
          to="/events"
          data-cursor="link"
          className="flex h-[380px] w-[220px] shrink-0 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/20 text-center transition hover:border-ieee-orange/60 sm:w-[260px]"
        >
          <ArrowRight className="h-6 w-6 text-ieee-orange" />
          <span className="font-display text-sm font-semibold text-white">View All Events</span>
        </Link>
      </div>
    </section>
  );
}
