import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/ui/SearchBar';
import EmptyState from '@/components/ui/EmptyState';
import { search } from '@/utils/search';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const results = search(query);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Search</h1>
      <p className="mt-2 text-slate-600">Search across past papers, courses, events, projects, and more.</p>

      <div className="mt-6">
        <SearchBar placeholder="Try 'DSA', 'hackathon', or 'Lab 3'..." onSearch={setQuery} initialValue={query} size="lg" />
      </div>

      <div className="mt-8">
        {!query ? (
          <EmptyState icon="search" title="Start typing to search" description="Results across the entire resource hub will appear here." />
        ) : results.length === 0 ? (
          <EmptyState title="No results found" description={`Nothing matched "${query}".`} />
        ) : (
          <AnimatePresence>
            <div className="flex flex-col gap-3">
              {results.map((r, idx) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="rounded-full bg-ieee-blue-light px-2.5 py-0.5 text-xs font-semibold text-ieee-blue">
                        {r.type}
                      </span>
                      <h3 className="mt-2 font-semibold text-slate-900">{r.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{r.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {r.tags.map((t) => (
                          <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">#{t}</span>
                        ))}
                      </div>
                    </div>
                    <Link to={r.link} className="shrink-0 rounded-lg bg-ieee-orange px-3 py-1.5 text-xs font-semibold text-white hover:bg-ieee-orange-dark">
                      Open
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
