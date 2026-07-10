import { Link } from 'react-router-dom';
import { Home, Search, Compass } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import Magnetic from '@/components/effects/Magnetic';

const popular = [
  { label: 'Past Papers', to: '/past-papers' },
  { label: 'Courses', to: '/courses' },
  { label: 'Events', to: '/events' },
  { label: 'Navigation', to: '/navigation' },
  { label: 'Projects Expo', to: '/projects-expo' },
  { label: 'Quick Links', to: '/quick-links' },
];

export default function NotFoundPage() {
  return (
    <div className="relative">
      <PageHero
        align="center"
        eyebrow="Error 404"
        title={
          <>
            <span className="text-ieee-orange">404.</span> This page took a wrong turn.
          </>
        }
        subtitle="The page you're looking for doesn't exist or may have moved. Let's get you back on track."
      >
        <Magnetic>
          <Link
            to="/"
            data-cursor="link"
            className="flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Magnetic>
        <Magnetic>
          <Link
            to="/search"
            data-cursor="link"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-ieee-orange/50 hover:text-ieee-orange"
          >
            <Search className="h-4 w-4" /> Search the Hub
          </Link>
        </Magnetic>
      </PageHero>

      <PageSection tone="cream" top width="narrow">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ieee-orange/10 text-ieee-orange">
            <Compass className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900">Popular destinations</h2>
          <p className="mt-1 text-sm text-slate-600">Maybe you were looking for one of these.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {popular.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                data-cursor="link"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </PageSection>
    </div>
  );
}
