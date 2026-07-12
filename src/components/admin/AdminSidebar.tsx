import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Icon from '@/components/ui/Icon';
import BrandLogo from '@/components/ui/BrandLogo';
import { adminNavGroups as navGroups } from '@/components/admin/adminNav';

export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 bg-ieee-ink lg:flex">
      <div className="flex items-center gap-2.5 border-b border-white/5 px-5 py-4">
        <BrandLogo className="h-9 w-9" />
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-white">Team Portal</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">IEEE CS Admin</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="mb-1.5 px-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/25">
              {group.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-ieee-orange' : 'text-white/55 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="admin-nav-active"
                          className="absolute inset-0 rounded-xl bg-ieee-orange/15"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <Icon name={item.icon} className="relative h-4 w-4" />
                      <span className="relative">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <Link
        to="/"
        className="flex items-center justify-between border-t border-white/5 px-5 py-4 text-xs font-medium text-white/40 transition hover:text-ieee-orange"
      >
        View live site
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </aside>
  );
}
