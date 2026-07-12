import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeading from '@/components/layout/SectionHeading';
import { hierarchyTerms as seedTerms } from '@/data/hierarchy';
import { useStore } from '@/hooks/useCollection';
import type { HierarchyTerm } from '@/types';

function MemberChip({
  name,
  role,
  photo,
  tone,
}: {
  name: string;
  role: string;
  photo: string;
  tone: 'lead' | 'exec' | 'core';
}) {
  const ring =
    tone === 'lead'
      ? 'ring-ieee-orange'
      : tone === 'exec'
        ? 'ring-ieee-orange/50'
        : 'ring-white';
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm">
      <img src={photo} alt={name} loading="lazy" className={`h-11 w-11 rounded-full object-cover ring-2 ${ring}`} />
      <div className="pr-1">
        <p className="text-sm font-semibold leading-tight text-slate-900">{name}</p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-ieee-orange">{role}</p>
      </div>
    </div>
  );
}

export default function HierarchyPage() {
  const [terms] = useStore<HierarchyTerm>('hierarchyTerms', seedTerms);
  const current = terms[0];
  const [selectedTerm, setSelectedTerm] = useState(seedTerms[0].term);
  const selected = terms.find((t) => t.term === selectedTerm) ?? terms[0];

  const chair = current.members[0];
  const secondTier = current.members.slice(1, 3);
  const leads = current.members.slice(3);

  return (
    <div className="relative">
      <PageHero
        eyebrow="Leadership"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Hierarchy' }]}
        title="Leadership Hierarchy"
        subtitle="The students who lead the IEEE CS Islamabad Branch each semester — and everyone who came before them."
        meta={[
          { value: String(terms.length), label: 'Councils Archived' },
          { value: String(current.members.length), label: `Members · ${current.term}` },
        ]}
      />

      {/* Org tree */}
      <PageSection tone="cream" top>
        <SectionHeading
          align="center"
          flourish
          eyebrow={`Organizational Structure · ${current.term}`}
          title="How the council is organized."
        />
        <div className="relative mt-14 flex flex-col items-center">
          {/* Chair */}
          <MemberChip name={chair.name} role={chair.role} photo={chair.photo} tone="lead" />
          <div className="h-8 w-px bg-gradient-to-b from-ieee-orange/60 to-slate-300" />

          {/* Second tier */}
          <div className="flex flex-wrap justify-center gap-5">
            {secondTier.map((m) => (
              <MemberChip key={m.id} name={m.name} role={m.role} photo={m.photo} tone="exec" />
            ))}
          </div>
          {leads.length > 0 && <div className="h-8 w-px bg-gradient-to-b from-slate-300 to-slate-200" />}

          {/* Leads */}
          {leads.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {leads.map((m) => (
                <MemberChip key={m.id} name={m.name} role={m.role} photo={m.photo} tone="core" />
              ))}
            </div>
          )}
        </div>
      </PageSection>

      {/* Archive */}
      <PageSection tone="white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading eyebrow="Council Archive" title="Every term, remembered." />
          <div className="flex flex-wrap gap-2">
            {terms.map((t) => (
              <button
                key={t.term}
                type="button"
                onClick={() => setSelectedTerm(t.term)}
                data-cursor="link"
                className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide transition ${
                  selectedTerm === t.term
                    ? 'bg-ieee-orange text-white shadow-[0_6px_20px_rgba(255,108,12,0.3)]'
                    : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/50 hover:text-ieee-orange'
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
          >
            {selected.members.map((m) => (
              <div
                key={m.id}
                className="group flex flex-col items-center rounded-2xl border border-black/5 bg-cream p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-white transition-transform duration-300 group-hover:scale-105"
                />
                <p className="mt-3 text-sm font-semibold text-slate-900">{m.name}</p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-ieee-orange">{m.role}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </PageSection>
    </div>
  );
}
