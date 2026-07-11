import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail } from 'lucide-react';
import Magnetic from '@/components/effects/Magnetic';
import { InstagramIcon, LinkedInIcon } from '@/components/ui/SocialIcons';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Past Papers', to: '/past-papers' },
      { label: 'Courses', to: '/courses' },
      { label: 'Events', to: '/events' },
      { label: 'Projects Expo', to: '/projects-expo' },
    ],
  },
  {
    title: 'Society',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Hierarchy', to: '/about/hierarchy' },
      { label: 'Timeline', to: '/about/timeline' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Developers', to: '/developers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contribute', to: '/contribute' },
      { label: 'FAQ & Contact', to: '/faq-contact' },
      { label: 'Quick Links', to: '/quick-links' },
      { label: 'Privacy & Disclaimer', to: '/privacy-disclaimer' },
    ],
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-ieee-orange/40 bg-ieee-orange/10 px-4 py-3 text-sm font-medium text-ieee-orange">
        <Check className="h-4 w-4" /> You&apos;re on the list.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@student.comsats.edu.pk"
        className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-ieee-orange/60 sm:max-w-xs"
      />
      <Magnetic>
        <button
          type="submit"
          data-cursor="link"
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-ieee-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-ieee-orange-dark sm:w-auto"
        >
          Notify Me <ArrowRight className="h-4 w-4" />
        </button>
      </Magnetic>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ieee-ink text-slate-300">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-ieee-orange/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ieee-orange">
              Stay in the loop
            </span>
            <h3 className="mt-3 max-w-md font-display text-2xl font-bold text-white sm:text-3xl">
              Get updates on events, papers &amp; drops.
            </h3>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-10 pt-12 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ieee-orange text-sm font-bold text-white">
                CS
              </span>
              <span className="font-display font-bold text-white">IEEE CS Hub</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              The central place for past papers, courses, events, navigation, and student project
              showcases at COMSATS.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-ieee-orange hover:text-ieee-orange"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-ieee-orange hover:text-ieee-orange"
              >
                <LinkedInIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="mailto:ieeecs.studentbranch@example.edu"
                aria-label="Email us"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-ieee-orange hover:text-ieee-orange"
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-white/80">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-slate-400 transition-colors hover:text-ieee-orange">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 px-4 py-5 text-center font-mono text-[11px] text-slate-500 sm:px-6">
        © {new Date().getFullYear()} IEEE Computer Society Student Branch Chapter. All data on this
        prototype is for demonstration only.
      </div>
    </footer>
  );
}
