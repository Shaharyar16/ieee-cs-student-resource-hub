import { NavLink } from 'react-router-dom';
import Icon, { type IconName } from '@/components/ui/Icon';

const navGroups: { title: string; items: { label: string; to: string; icon: IconName }[] }[] = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', to: '/admin/dashboard', icon: 'grid' }],
  },
  {
    title: 'Content',
    items: [
      { label: 'Events', to: '/admin/events', icon: 'calendar' },
      { label: 'Banners', to: '/admin/banners', icon: 'image' },
      { label: 'Past Papers', to: '/admin/papers', icon: 'file' },
      { label: 'Courses', to: '/admin/courses', icon: 'book' },
      { label: 'Projects', to: '/admin/projects', icon: 'layers' },
      { label: 'Navigation', to: '/admin/navigation', icon: 'compass' },
      { label: 'Hierarchy', to: '/admin/hierarchy', icon: 'building' },
      { label: 'Quick Links', to: '/admin/quick-links', icon: 'link' },
      { label: 'Announcements', to: '/admin/announcements', icon: 'megaphone' },
      { label: 'Gallery', to: '/admin/gallery', icon: 'image' },
      { label: 'FAQ', to: '/admin/faq', icon: 'question' },
      { label: 'Developers', to: '/admin/developers', icon: 'users' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Submissions', to: '/admin/submissions', icon: 'inbox' },
      { label: 'Users', to: '/admin/users', icon: 'user' },
      { label: 'Settings', to: '/admin/settings', icon: 'settings' },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ieee-navy text-sm font-bold text-white">
          CS
        </span>
        <span className="text-sm font-bold text-slate-900">Admin Panel</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {group.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'bg-ieee-orange/10 text-ieee-orange' : 'text-slate-600 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
