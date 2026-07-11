import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical, Loader2, Save, X, FileStack } from 'lucide-react';
import type { FormField, FormFieldType, FormPage } from '@/types';
import { formsService } from '@/services/formsService';
import { makeId } from '@/utils/storage';
import { fieldTypeMeta, fieldTypeOrder } from '@/components/forms/fieldTypes';
import AdminTopbar from '@/components/admin/AdminTopbar';

const newField = (): FormField => ({ id: makeId('ff'), type: 'short-text', label: '', required: false });
const newPage = (): FormPage => ({ id: makeId('fp'), fields: [newField()] });

export default function FormBuilderPage() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState<FormPage[]>([newPage()]);
  const [loading, setLoading] = useState(editing);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!editing) return;
    let alive = true;
    formsService.get(id!).then((f) => {
      if (!alive) return;
      if (f) {
        setTitle(f.title);
        setDescription(f.description);
        setPages(f.pages.length ? f.pages : [newPage()]);
      }
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [editing, id]);

  // --- immutable nested updates ---
  const patchPage = (pid: string, patch: Partial<FormPage>) =>
    setPages((ps) => ps.map((p) => (p.id === pid ? { ...p, ...patch } : p)));

  const patchField = (pid: string, fid: string, patch: Partial<FormField>) =>
    setPages((ps) =>
      ps.map((p) =>
        p.id === pid ? { ...p, fields: p.fields.map((f) => (f.id === fid ? { ...f, ...patch } : f)) } : p
      )
    );

  const addField = (pid: string) =>
    setPages((ps) => ps.map((p) => (p.id === pid ? { ...p, fields: [...p.fields, newField()] } : p)));

  const removeField = (pid: string, fid: string) =>
    setPages((ps) => ps.map((p) => (p.id === pid ? { ...p, fields: p.fields.filter((f) => f.id !== fid) } : p)));

  const moveField = (pid: string, fid: string, dir: -1 | 1) =>
    setPages((ps) =>
      ps.map((p) => {
        if (p.id !== pid) return p;
        const i = p.fields.findIndex((f) => f.id === fid);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= p.fields.length) return p;
        const fields = [...p.fields];
        [fields[i], fields[j]] = [fields[j], fields[i]];
        return { ...p, fields };
      })
    );

  const setType = (pid: string, fid: string, type: FormFieldType) => {
    const needsOptions = fieldTypeMeta[type].hasOptions;
    setPages((ps) =>
      ps.map((p) =>
        p.id === pid
          ? {
              ...p,
              fields: p.fields.map((f) =>
                f.id === fid
                  ? {
                      ...f,
                      type,
                      options: needsOptions
                        ? f.options?.length
                          ? f.options
                          : [
                              { id: makeId('opt'), label: 'Option 1' },
                              { id: makeId('opt'), label: 'Option 2' },
                            ]
                        : undefined,
                    }
                  : f
              ),
            }
          : p
      )
    );
  };

  const addOption = (pid: string, fid: string) =>
    setPages((ps) =>
      ps.map((p) =>
        p.id === pid
          ? {
              ...p,
              fields: p.fields.map((f) =>
                f.id === fid ? { ...f, options: [...(f.options ?? []), { id: makeId('opt'), label: '' }] } : f
              ),
            }
          : p
      )
    );

  const patchOption = (pid: string, fid: string, oid: string, label: string) =>
    setPages((ps) =>
      ps.map((p) =>
        p.id === pid
          ? {
              ...p,
              fields: p.fields.map((f) =>
                f.id === fid
                  ? { ...f, options: f.options?.map((o) => (o.id === oid ? { ...o, label } : o)) }
                  : f
              ),
            }
          : p
      )
    );

  const removeOption = (pid: string, fid: string, oid: string) =>
    setPages((ps) =>
      ps.map((p) =>
        p.id === pid
          ? { ...p, fields: p.fields.map((f) => (f.id === fid ? { ...f, options: f.options?.filter((o) => o.id !== oid) } : f)) }
          : p
      )
    );

  const addPage = () => setPages((ps) => [...ps, newPage()]);
  const removePage = (pid: string) => setPages((ps) => (ps.length > 1 ? ps.filter((p) => p.id !== pid) : ps));

  async function save() {
    setError(null);
    if (!title.trim()) return setError('Give your form a title.');
    const totalFields = pages.reduce((n, p) => n + p.fields.length, 0);
    if (totalFields === 0) return setError('Add at least one field.');
    if (pages.some((p) => p.fields.some((f) => !f.label.trim()))) return setError('Every field needs a label.');

    setBusy(true);
    try {
      // strip empty options
      const clean = pages.map((p) => ({
        ...p,
        fields: p.fields.map((f) => ({
          ...f,
          options: fieldTypeMeta[f.type].hasOptions
            ? (f.options ?? []).filter((o) => o.label.trim())
            : undefined,
        })),
      }));
      if (editing) await formsService.update(id!, { title, description, pages: clean });
      else await formsService.create({ title, description, pages: clean });
      navigate('/portal/forms');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save the form.');
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <>
        <AdminTopbar title="Form Builder" />
        <div className="p-6">
          <div className="h-96 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminTopbar title={editing ? 'Edit Form' : 'New Form'} />
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
        {/* meta */}
        <div className="rounded-2xl border-l-4 border-l-ieee-orange border border-slate-200 bg-white p-5 shadow-sm">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Form title"
            className="w-full border-none bg-transparent text-xl font-bold text-slate-900 outline-none placeholder:text-slate-300"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Form description (optional)"
            rows={2}
            className="mt-2 w-full resize-y border-none bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-300"
          />
        </div>

        {/* pages */}
        {pages.map((page, pi) => (
          <div key={page.id} className="mt-6">
            {pages.length > 1 && (
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <FileStack className="h-3.5 w-3.5" /> Page {pi + 1} of {pages.length}
                </span>
                <button
                  onClick={() => removePage(page.id)}
                  className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove page
                </button>
              </div>
            )}

            {pages.length > 1 && (
              <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <input
                  value={page.title ?? ''}
                  onChange={(e) => patchPage(page.id, { title: e.target.value })}
                  placeholder="Page heading (optional)"
                  className="w-full border-none bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-300"
                />
                <input
                  value={page.description ?? ''}
                  onChange={(e) => patchPage(page.id, { description: e.target.value })}
                  placeholder="Page description (optional)"
                  className="mt-1 w-full border-none bg-transparent text-sm text-slate-500 outline-none placeholder:text-slate-300"
                />
              </div>
            )}

            <div className="flex flex-col gap-3">
              {page.fields.map((field, fi) => {
                const hasOptions = fieldTypeMeta[field.type].hasOptions;
                return (
                  <div key={field.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-2">
                      <GripVertical className="mt-2 h-4 w-4 shrink-0 text-slate-300" />
                      <div className="flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input
                            value={field.label}
                            onChange={(e) => patchField(page.id, field.id, { label: e.target.value })}
                            placeholder={`Question ${fi + 1}`}
                            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-ieee-orange"
                          />
                          <select
                            value={field.type}
                            onChange={(e) => setType(page.id, field.id, e.target.value as FormFieldType)}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-ieee-orange"
                          >
                            {fieldTypeOrder.map((t) => (
                              <option key={t} value={t}>
                                {fieldTypeMeta[t].label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <input
                          value={field.description ?? ''}
                          onChange={(e) => patchField(page.id, field.id, { description: e.target.value })}
                          placeholder="Helper text (optional)"
                          className="mt-2 w-full rounded-lg border border-transparent bg-transparent px-1 text-xs text-slate-500 outline-none placeholder:text-slate-300 focus:border-slate-200 focus:bg-slate-50"
                        />

                        {hasOptions && (
                          <div className="mt-3 flex flex-col gap-1.5">
                            {(field.options ?? []).map((o, oi) => (
                              <div key={o.id} className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">{oi + 1}.</span>
                                <input
                                  value={o.label}
                                  onChange={(e) => patchOption(page.id, field.id, o.id, e.target.value)}
                                  placeholder={`Option ${oi + 1}`}
                                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm outline-none focus:border-ieee-orange"
                                />
                                <button onClick={() => removeOption(page.id, field.id, o.id)} className="text-slate-300 hover:text-rose-500">
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addOption(page.id, field.id)}
                              className="mt-1 flex w-max items-center gap-1 text-xs font-semibold text-ieee-orange hover:underline"
                            >
                              <Plus className="h-3.5 w-3.5" /> Add option
                            </button>
                          </div>
                        )}

                        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => patchField(page.id, field.id, { required: e.target.checked })}
                              className="accent-ieee-orange"
                            />
                            Required
                          </label>
                          <div className="flex items-center gap-1 text-slate-400">
                            <button onClick={() => moveField(page.id, field.id, -1)} className="rounded p-1 hover:bg-slate-100" aria-label="Move up">
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button onClick={() => moveField(page.id, field.id, 1)} className="rounded p-1 hover:bg-slate-100" aria-label="Move down">
                              <ArrowDown className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeField(page.id, field.id)}
                              className="rounded p-1 hover:bg-rose-50 hover:text-rose-600"
                              aria-label="Remove field"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => addField(page.id)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-500 transition hover:border-ieee-orange hover:text-ieee-orange"
            >
              <Plus className="h-4 w-4" /> Add field
            </button>
          </div>
        ))}

        <button
          onClick={addPage}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-500 transition hover:border-ieee-orange hover:text-ieee-orange"
        >
          <FileStack className="h-4 w-4" /> Add page
        </button>

        {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>}

        <div className="sticky bottom-0 mt-6 flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 py-4">
          <button
            onClick={() => navigate('/portal/forms')}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-300"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ieee-orange-dark disabled:opacity-70"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {editing ? 'Save changes' : 'Create form'}
          </button>
        </div>
      </div>
    </>
  );
}
