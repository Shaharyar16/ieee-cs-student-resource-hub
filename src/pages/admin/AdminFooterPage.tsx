import { useState } from 'react';
import { Plus, ArrowUp, ArrowDown, Trash2, GripVertical, Info } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import FooterPreview from '@/components/admin/FooterPreview';
import { AdminField, AdminInput } from '@/components/admin/AdminField';
import { useCollection } from '@/hooks/useCollection';
import { footerLinks as footerLinksSeed, footerColumns } from '@/data/footerLinks';
import { makeId } from '@/utils/storage';
import type { FooterColumn, FooterLinkItem } from '@/types';

export default function AdminFooterPage() {
  const { items, update, setAll, add, remove } = useCollection<FooterLinkItem>('footerLinks', footerLinksSeed);
  const [draft, setDraft] = useState<{ label: string; to: string; column: FooterColumn }>({
    label: '',
    to: '',
    column: 'Explore',
  });
  const [error, setError] = useState<string | null>(null);

  const enabled = items.filter((l) => l.enabled);

  /** Reorder a link within its own column. */
  const move = (id: string, dir: -1 | 1) => {
    const item = items.find((l) => l.id === id);
    if (!item) return;
    const sameCol = items.map((it, idx) => ({ it, idx })).filter((x) => x.it.column === item.column);
    const pos = sameCol.findIndex((x) => x.it.id === id);
    const npos = pos + dir;
    if (npos < 0 || npos >= sameCol.length) return;
    const a = sameCol[pos].idx;
    const b = sameCol[npos].idx;
    const next = [...items];
    [next[a], next[b]] = [next[b], next[a]];
    setAll(next);
  };

  const addLink = () => {
    setError(null);
    const label = draft.label.trim();
    let to = draft.to.trim();
    if (!label) return setError('Give the link a label.');
    if (!to) return setError('Add the path the link points to.');
    if (!to.startsWith('/') && !to.startsWith('http')) to = `/${to}`;
    add({ id: makeId('fl'), label, to, column: draft.column, enabled: true });
    setDraft({ label: '', to: '', column: draft.column });
  };

  return (
    <div>
      <AdminTopbar title="Footer" subtitle="Choose which links show in each footer column, and their order" />
      <div className="p-4 sm:p-6">
        {/* Live replica */}
        <FooterPreview links={enabled} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Link manager, grouped by column */}
          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-slate-900">Footer Links</h3>
              <span className="font-mono text-[11px] text-slate-400">{enabled.length} shown</span>
            </div>
            <p className="mb-4 flex items-start gap-2 rounded-xl bg-cream/70 px-3 py-2 text-xs text-slate-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ieee-orange" />
              Toggle links on/off and reorder them within a column with the arrows. Changes show on the
              live footer instantly.
            </p>

            <div className="flex flex-col gap-5">
              {footerColumns.map((col) => {
                const colLinks = items.filter((l) => l.column === col);
                return (
                  <div key={col}>
                    <h4 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {col}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {colLinks.map((l, i) => (
                        <li
                          key={l.id}
                          className={`flex items-center gap-2 rounded-xl border p-2.5 transition ${
                            l.enabled ? 'border-ieee-orange/30 bg-ieee-orange/[0.04]' : 'border-black/5 bg-white'
                          }`}
                        >
                          <GripVertical className="h-4 w-4 shrink-0 text-slate-300" />
                          <div className="min-w-0 flex-1">
                            <p className={`truncate text-sm font-semibold ${l.enabled ? 'text-slate-900' : 'text-slate-500'}`}>
                              {l.label}
                            </p>
                            <p className="truncate font-mono text-[11px] text-slate-400">{l.to}</p>
                          </div>

                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              onClick={() => move(l.id, -1)}
                              disabled={i === 0}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/5 text-slate-500 transition hover:border-ieee-orange/40 hover:text-ieee-orange disabled:opacity-30"
                              aria-label="Move up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => move(l.id, 1)}
                              disabled={i === colLinks.length - 1}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/5 text-slate-500 transition hover:border-ieee-orange/40 hover:text-ieee-orange disabled:opacity-30"
                              aria-label="Move down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>

                            {/* toggle */}
                            <button
                              onClick={() => update(l.id, { enabled: !l.enabled })}
                              className={`relative ml-1 h-6 w-11 shrink-0 rounded-full transition-colors ${
                                l.enabled ? 'bg-ieee-orange' : 'bg-slate-300'
                              }`}
                              aria-label={l.enabled ? 'Hide from footer' : 'Show in footer'}
                            >
                              <span
                                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                                  l.enabled ? 'left-[22px]' : 'left-0.5'
                                }`}
                              />
                            </button>

                            <button
                              onClick={() => remove(l.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/5 text-slate-400 transition hover:border-rose-300 hover:text-rose-600"
                              aria-label="Delete link"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </li>
                      ))}
                      {colLinks.length === 0 && (
                        <li className="rounded-xl border border-dashed border-black/10 px-3 py-2 text-xs italic text-slate-400">
                          No links in this column yet.
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add link */}
          <div className="h-max rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
            <h3 className="font-display text-base font-bold text-slate-900">Add a Link</h3>
            <p className="mt-1 text-xs text-slate-500">Point it at any page and pick a column.</p>
            <div className="mt-4 flex flex-col gap-3">
              <AdminField label="Label">
                <AdminInput
                  value={draft.label}
                  onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                  placeholder="Alumni"
                />
              </AdminField>
              <AdminField label="Path" hint="e.g. /about or /forms/123">
                <AdminInput value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} placeholder="/about" />
              </AdminField>
              <AdminField label="Column">
                <select
                  value={draft.column}
                  onChange={(e) => setDraft({ ...draft, column: e.target.value as FooterColumn })}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-ieee-orange/60"
                >
                  {footerColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </AdminField>
              {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</p>}
              <button
                onClick={addLink}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ieee-orange-dark"
              >
                <Plus className="h-4 w-4" /> Add to Footer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
