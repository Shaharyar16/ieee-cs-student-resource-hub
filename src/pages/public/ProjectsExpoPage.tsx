import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Search, SlidersHorizontal, X } from 'lucide-react';
import type { ProjectPost } from '@/types';
import { projectsService, likeCount, commentCount, repostCount } from '@/services/projectsService';
import { useAuth } from '@/context/AuthContext';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import Magnetic from '@/components/effects/Magnetic';
import ProjectPostCard from '@/components/projects/ProjectPostCard';
import EmptyState from '@/components/ui/EmptyState';

type SortKey = 'latest' | 'likes' | 'discussed' | 'reposts';
type TimeKey = 'all' | 'week' | 'month' | 'year';

const sorts: { key: SortKey; label: string }[] = [
  { key: 'latest', label: 'Latest' },
  { key: 'likes', label: 'Most liked' },
  { key: 'discussed', label: 'Most discussed' },
  { key: 'reposts', label: 'Most reposted' },
];

const times: { key: TimeKey; label: string }[] = [
  { key: 'all', label: 'All time' },
  { key: 'week', label: 'This week' },
  { key: 'month', label: 'This month' },
  { key: 'year', label: 'This year' },
];

const timeWindow: Record<TimeKey, number> = {
  all: Infinity,
  week: 7 * 864e5,
  month: 30 * 864e5,
  year: 365 * 864e5,
};

export default function ProjectsExpoPage() {
  const { ensureAuth } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<ProjectPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('latest');
  const [time, setTime] = useState<TimeKey>('all');
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    projectsService.list().then((data) => {
      if (alive) {
        setProjects(data);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const allTech = useMemo(
    () => [...new Set(projects.flatMap((p) => p.techStack))].sort((a, b) => a.localeCompare(b)),
    [projects]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = Date.now();
    const filtered = projects.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.creators.some((c) => c.toLowerCase().includes(q)) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      const matchesTech = techs.length === 0 || techs.some((t) => p.techStack.includes(t));
      const matchesTime = now - new Date(p.createdAt).getTime() <= timeWindow[time];
      return matchesQuery && matchesTech && matchesTime;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (sort) {
        case 'likes':
          return likeCount(b) - likeCount(a);
        case 'discussed':
          return commentCount(b) - commentCount(a);
        case 'reposts':
          return repostCount(b) - repostCount(a);
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    return sorted;
  }, [projects, query, techs, time, sort]);

  const patch = (updated: ProjectPost) =>
    setProjects((list) => list.map((p) => (p.id === updated.id ? updated : p)));

  const shareProject = () => {
    if (ensureAuth(() => navigate('/projects-expo/submit'), 'Log in to share a project.')) {
      navigate('/projects-expo/submit');
    }
  };

  const toggleTech = (t: string) =>
    setTechs((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Projects Community"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
        title="Build. Share. Get feedback."
        subtitle="A feed of student-built projects. Post yours, explore what others are shipping, and show some love — like, comment, and repost the work you rate."
        meta={[
          { value: `${projects.length}`, label: 'Projects' },
          { value: `${projects.reduce((s, p) => s + likeCount(p), 0)}`, label: 'Total Likes' },
        ]}
      >
        <Magnetic>
          <button
            type="button"
            onClick={shareProject}
            data-cursor="link"
            className="group flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark"
          >
            <Rocket className="h-4 w-4" /> Share a Project
          </button>
        </Magnetic>
      </PageHero>

      <PageSection tone="cream" top width="wide">
        <div className="mx-auto max-w-3xl">
          {/* controls */}
          <div className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-cream px-4">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tech, or people…"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* sort segmented */}
              <div className="flex flex-wrap gap-1 rounded-full bg-cream p-1">
                {sorts.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSort(s.key)}
                    data-cursor="link"
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      sort === s.key ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {sort === s.key && (
                      <motion.span
                        layoutId="proj-sort"
                        className="absolute inset-0 rounded-full bg-ieee-orange"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      />
                    )}
                    <span className="relative">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* time */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value as TimeKey)}
                  className="rounded-full border border-black/10 bg-cream px-3 py-1.5 text-xs font-semibold text-slate-600 outline-none focus:border-ieee-orange"
                >
                  {times.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* tech chips */}
            {allTech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {allTech.map((t) => {
                  const active = techs.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTech(t)}
                      data-cursor="link"
                      className={`rounded-full border px-3 py-1 font-mono text-[11px] transition ${
                        active
                          ? 'border-ieee-orange bg-ieee-orange/10 text-ieee-orange'
                          : 'border-black/10 bg-white text-slate-500 hover:border-ieee-orange/40'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
                {techs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setTechs([])}
                    className="rounded-full px-3 py-1 font-mono text-[11px] text-slate-400 hover:text-rose-500"
                  >
                    clear
                  </button>
                )}
              </div>
            )}
          </div>

          {/* feed */}
          <div className="mt-6 flex flex-col gap-6">
            {loading ? (
              [0, 1, 2].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-3xl border border-black/5 bg-white" />
              ))
            ) : visible.length === 0 ? (
              <EmptyState
                title="No projects match your filters"
                description="Try clearing filters or be the first to share one."
              />
            ) : (
              visible.map((p) => <ProjectPostCard key={p.id} project={p} onChange={patch} />)
            )}
          </div>
        </div>
      </PageSection>
    </div>
  );
}
