import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { hierarchyTerms } from '@/data/hierarchy';

export default function AdminHierarchyPage() {
  const [selectedTerm, setSelectedTerm] = useState(hierarchyTerms[0].term);
  const selected = hierarchyTerms.find((t) => t.term === selectedTerm) ?? hierarchyTerms[0];

  return (
    <div>
      <AdminTopbar title="Hierarchy Management" />
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {hierarchyTerms.map((t) => (
              <button
                key={t.term}
                onClick={() => setSelectedTerm(t.term)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  selectedTerm === t.term ? 'bg-ieee-orange text-white' : 'border border-slate-200 text-slate-600'
                }`}
              >
                {t.term}
              </button>
            ))}
          </div>
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + Add Member
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {selected.members.map((m) => (
            <div key={m.id} className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <img src={m.photo} alt={m.name} className="h-14 w-14 rounded-full object-cover" />
              <p className="text-sm font-semibold text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">{m.role}</p>
              <div className="flex gap-2 text-xs">
                <button className="font-semibold text-ieee-blue hover:underline">Edit</button>
                <button className="font-semibold text-rose-600 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
