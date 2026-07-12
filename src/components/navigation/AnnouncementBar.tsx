import { Link } from 'react-router-dom';
import { announcements as announcementsSeed } from '@/data/announcements';
import { useCollection } from '@/hooks/useCollection';
import type { Announcement } from '@/types';

export default function AnnouncementBar() {
  const { items: announcements } = useCollection<Announcement>('announcements', announcementsSeed);

  // Prefer pinned announcements, fall back to the latest — these drive the ticker live.
  const pinned = announcements.filter((a) => a.pinned);
  const source = (pinned.length ? pinned : announcements).slice(0, 6);
  if (source.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly.
  const items = [...source, ...source];

  return (
    <div className="overflow-hidden bg-ieee-ink py-2 text-white">
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap font-mono text-[11px] uppercase tracking-wider">
        {items.map((a, idx) => (
          <Link
            key={`${a.id}-${idx}`}
            to={`/announcements/${a.id}`}
            className="flex items-center gap-2 text-slate-300 transition-colors hover:text-ieee-orange"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ieee-orange" />
            {a.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
