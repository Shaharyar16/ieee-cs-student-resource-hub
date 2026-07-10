import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hierarchyTerms } from '@/data/hierarchy';

export default function HierarchyPage() {
  const [selectedTerm, setSelectedTerm] = useState(hierarchyTerms[0].term);
  const selected = hierarchyTerms.find((t) => t.term === selectedTerm) ?? hierarchyTerms[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Leadership Hierarchy</h1>
      <p className="mt-2 text-slate-600">Meet the students who lead IEEE CS Student Branch each semester.</p>

      {/* Visual hierarchy tree for the current term */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-center text-lg font-semibold text-slate-800">Organizational Structure — {hierarchyTerms[0].term}</h2>
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="rounded-xl bg-ieee-navy px-5 py-3 text-sm font-semibold text-white">
            {hierarchyTerms[0].members[0].name} — {hierarchyTerms[0].members[0].role}
          </div>
          <div className="h-6 w-0.5 bg-slate-300" />
          <div className="flex flex-wrap justify-center gap-4">
            {hierarchyTerms[0].members.slice(1, 3).map((m) => (
              <div key={m.id} className="rounded-xl bg-ieee-blue px-4 py-2.5 text-sm font-medium text-white">
                {m.name} — {m.role}
              </div>
            ))}
          </div>
          <div className="h-6 w-0.5 bg-slate-300" />
          <div className="flex flex-wrap justify-center gap-4">
            {hierarchyTerms[0].members.slice(3).map((m) => (
              <div key={m.id} className="rounded-xl bg-ieee-orange/90 px-4 py-2 text-xs font-medium text-white">
                {m.name} — {m.role}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semester selector */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">Council Archive</h2>
        <div className="flex flex-wrap gap-2">
          {hierarchyTerms.map((t) => (
            <button
              key={t.term}
              onClick={() => setSelectedTerm(t.term)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                selectedTerm === t.term ? 'bg-ieee-orange text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-ieee-orange'
              }`}
            >
              {t.term}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTerm}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3"
        >
          {selected.members.map((m) => (
            <div key={m.id} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <img src={m.photo} alt={m.name} className="h-16 w-16 rounded-full object-cover" />
              <p className="mt-2 text-sm font-semibold text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">{m.role}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
