import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Menu, X } from 'lucide-react';
import Magnetic from '@/components/effects/Magnetic';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Past Papers', to: '/past-papers' },
  { label: 'Courses', to: '/courses' },
  { label: 'Events', to: '/events' },
  { label: 'Navigation', to: '/navigation' },
  { label: 'Projects', to: '/projects-expo' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <header
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-black/5 bg-white/95 px-4 py-2.5 backdrop-blur-xl transition-shadow duration-300 sm:px-5 ${
          scrolled ? 'shadow-[0_8px_30px_rgba(10,10,12,0.12)]' : 'shadow-[0_4px_16px_rgba(10,10,12,0.06)]'
        }`}
      >
        <Link to="/" data-cursor="link" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ieee-orange text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,108,12,0.4)]">
            CS
          </span>
          <span className="font-display text-sm font-bold tracking-tight text-slate-900">
            IEEE CS Hub
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              data-cursor="link"
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-ieee-orange' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-ieee-orange"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Magnetic>
            <Link
              to="/search"
              data-cursor="link"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-black/5 hover:text-ieee-orange"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={2} />
            </Link>
          </Magnetic>
          <Magnetic className="hidden sm:block">
            <Link
              to="/admin/login"
              data-cursor="link"
              className="flex items-center gap-1.5 rounded-full bg-ieee-ink px-3.5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-black"
            >
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
              Admin
            </Link>
          </Magnetic>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-black/5 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl glass-panel border border-black/5 lg:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-sm font-semibold ${
                      isActive ? 'text-ieee-orange' : 'text-slate-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-1.5 rounded-lg bg-ieee-ink px-3 py-3 text-sm font-semibold text-white"
              >
                <ShieldCheck className="h-4 w-4" /> Admin Portal
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
