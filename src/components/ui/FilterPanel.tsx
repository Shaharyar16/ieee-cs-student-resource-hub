export interface FilterGroup {
  label: string;
  key: string;
  options: { label: string; value: string }[];
}

interface FilterPanelProps {
  groups: FilterGroup[];
  activeFilters: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onReset?: () => void;
}

export default function FilterPanel({ groups, activeFilters, onChange, onReset }: FilterPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Filters</h3>
        {onReset && (
          <button onClick={onReset} className="text-xs font-medium text-ieee-blue hover:underline">
            Reset
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.key}>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              {group.label}
            </label>
            <select
              value={activeFilters[group.key] ?? ''}
              onChange={(e) => onChange(group.key, e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-ieee-orange focus:ring-2 focus:ring-ieee-orange/20"
            >
              <option value="">All</option>
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
