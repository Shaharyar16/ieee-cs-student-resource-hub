import { Link, useParams } from 'react-router-dom';
import { announcements } from '@/data/announcements';
import EmptyState from '@/components/ui/EmptyState';
import Icon from '@/components/ui/Icon';

export default function AnnouncementDetailPage() {
  const { id } = useParams();
  const announcement = announcements.find((a) => a.id === id);

  if (!announcement) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <EmptyState title="Announcement not found" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link to="/announcements" className="inline-flex items-center gap-1.5 text-sm font-medium text-ieee-blue hover:underline">
        <Icon name="arrow-left" className="h-4 w-4" /> All Announcements
      </Link>
      <span className="mt-4 inline-block rounded-full bg-ieee-blue-light px-3 py-1 text-xs font-semibold capitalize text-ieee-blue">
        {announcement.category}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{announcement.title}</h1>
      <p className="mt-1 text-sm text-slate-400">{announcement.date}</p>
      <p className="mt-6 leading-relaxed text-slate-600">{announcement.body}</p>
    </div>
  );
}
