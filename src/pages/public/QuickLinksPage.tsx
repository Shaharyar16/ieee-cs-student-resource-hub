import { quickLinks } from '@/data/quickLinks';
import type { QuickLink } from '@/types';
import Icon from '@/components/ui/Icon';

const categories: QuickLink['category'][] = [
  'University Portals',
  'Academic Resources',
  'Society Links',
  'Forms',
  'Event Links',
  'Past Paper Links',
  'Student Help',
];

export default function QuickLinksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Quick Links</h1>
      <p className="mt-2 text-slate-600">All the important links, organized by category.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((cat) => {
          const links = quickLinks.filter((l) => l.category === cat);
          if (links.length === 0) return null;
          return (
            <div key={cat} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">{cat}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-ieee-blue hover:underline"
                    >
                      <Icon name="link" className="h-4 w-4 shrink-0" /> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
