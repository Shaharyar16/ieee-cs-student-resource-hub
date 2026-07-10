import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SearchBar from '@/components/ui/SearchBar';
import EmptyState from '@/components/ui/EmptyState';
import { search } from '@/utils/search';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const results = search(query);

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Find Anything"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
        title="Search the Hub"
        subtitle="Search across past papers, courses, events, projects and more — everything in one box."
      >
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl bg-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <SearchBar
              placeholder="Try 'DSA', 'hackathon', or 'Lab 3'..."
              onSearch={setQuery}
              initialValue={query}
              size="lg"
            />
          </div>
        </div>
      </PageHero>

      <PageSection tone="cream" top width="narrow">
        {!query ? (
          <EmptyState
            icon="search"
            title="Start typing to search"
            description="Results across the entire resource hub will appear here."
          />
        ) : results.length === 0 ? (
          <EmptyState title="No results found" description={`Nothing matched "${query}".`} />
        ) : (
          <>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">
              {results.length} {results.length === 1 ? 'result' : 'results'} for “{query}”
            </p>
            <AnimatePresence>
              <div className="flex flex-col gap-3">
                {results.map((r, idx) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                  >
                    <Link
                      to={r.link}
                      data-cursor="link"
                      className="group flex items-start justify-between gap-3 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ieee-orange/30 hover:shadow-md"
                    >
                      <div>
                        <span className="rounded-full bg-ieee-orange/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ieee-orange">
                          {r.type}
                        </span>
                        <h3 className="mt-2 font-display font-semibold text-slate-900">{r.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{r.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {r.tags.map((t) => (
                            <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-ieee-orange" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}
      </PageSection>
    </div>
  );
}
