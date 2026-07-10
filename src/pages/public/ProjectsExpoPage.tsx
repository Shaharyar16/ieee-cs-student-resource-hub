import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { projects } from '@/data/projects';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import Magnetic from '@/components/effects/Magnetic';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel, { type FilterGroup } from '@/components/ui/FilterPanel';
import ProjectCard from '@/components/cards/ProjectCard';
import EmptyState from '@/components/ui/EmptyState';

const filterGroups: FilterGroup[] = [
  {
    label: 'Category',
    key: 'category',
    options: [...new Set(projects.map((p) => p.category))].map((c) => ({ label: c, value: c })),
  },
  {
    label: 'Year',
    key: 'year',
    options: [...new Set(projects.map((p) => p.year))]
      .sort((a, b) => b - a)
      .map((y) => ({ label: String(y), value: String(y) })),
  },
];

export default function ProjectsExpoPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesYear = !filters.year || String(p.year) === filters.year;
      return matchesQuery && matchesCategory && matchesYear;
    });
  }, [query, filters]);

  const categories = new Set(projects.map((p) => p.category)).size;

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Student Work"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects Expo' }]}
        title="Projects Expo"
        subtitle="Explore student-built projects from every semester — from indoor navigation apps to AI study planners. Built by students, showcased for everyone."
        meta={[
          { value: `${projects.length}`, label: 'Projects' },
          { value: `${categories}`, label: 'Categories' },
        ]}
      >
        <Magnetic>
          <Link
            to="/projects-expo/submit"
            data-cursor="link"
            className="group flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark"
          >
            <Rocket className="h-4 w-4" /> Submit Project
          </Link>
        </Magnetic>
      </PageHero>

      <PageSection tone="cream" top>
        <SearchBar placeholder="Search projects..." onSearch={setQuery} size="lg" />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FilterPanel
              groups={filterGroups}
              activeFilters={filters}
              onChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))}
              onReset={() => setFilters({})}
            />
          </div>
          {filtered.length === 0 ? (
            <EmptyState title="No projects found" />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </PageSection>
    </div>
  );
}
