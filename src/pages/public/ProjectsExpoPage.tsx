import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
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
    options: [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a).map((y) => ({ label: String(y), value: String(y) })),
  },
];

export default function ProjectsExpoPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tagline.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesYear = !filters.year || String(p.year) === filters.year;
      return matchesQuery && matchesCategory && matchesYear;
    });
  }, [query, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects Expo</h1>
          <p className="mt-1 text-slate-600">Explore student-built projects from every semester.</p>
        </div>
        <Link to="/projects-expo/submit" className="rounded-lg bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
          Submit Project
        </Link>
      </div>

      <div className="mt-8">
        <SearchBar placeholder="Search projects..." onSearch={setQuery} size="lg" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel groups={filterGroups} activeFilters={filters} onChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))} onReset={() => setFilters({})} />
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
    </div>
  );
}
