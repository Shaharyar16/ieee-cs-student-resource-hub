import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BarChart3, ListOrdered, Inbox } from 'lucide-react';
import type { FormDef, FormField, FormResponse } from '@/types';
import { formsService } from '@/services/formsService';
import { fieldTypeMeta } from '@/components/forms/fieldTypes';
import AdminTopbar from '@/components/admin/AdminTopbar';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

function answerText(v: FormResponse['answers'][string]): string {
  return Array.isArray(v) ? v.join(', ') : v;
}

export default function FormResponsesPage() {
  const { id } = useParams();
  const [form, setForm] = useState<FormDef | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'summary' | 'individual'>('summary');

  useEffect(() => {
    let alive = true;
    (async () => {
      const [f, r] = await Promise.all([formsService.get(id ?? ''), formsService.listResponses(id ?? '')]);
      if (!alive) return;
      setForm(f);
      setResponses(r);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const fields = useMemo<FormField[]>(() => (form ? form.pages.flatMap((p) => p.fields) : []), [form]);

  if (loading) {
    return (
      <>
        <AdminTopbar title="Responses" />
        <div className="p-6">
          <div className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        </div>
      </>
    );
  }

  if (!form) {
    return (
      <>
        <AdminTopbar title="Responses" />
        <div className="p-6">
          <p className="text-sm text-slate-500">Form not found.</p>
          <Link to="/portal/forms" className="mt-3 inline-block text-sm font-semibold text-ieee-orange">
            Back to Forms
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminTopbar title={`${form.title} · Responses`} />
      <div className="p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link to="/portal/forms" className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ieee-orange">
            <ArrowLeft className="h-4 w-4" /> All forms
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">{responses.length} responses</span>
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
              <button
                onClick={() => setView('summary')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  view === 'summary' ? 'bg-ieee-orange text-white' : 'text-slate-500'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" /> Summary
              </button>
              <button
                onClick={() => setView('individual')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  view === 'individual' ? 'bg-ieee-orange text-white' : 'text-slate-500'
                }`}
              >
                <ListOrdered className="h-3.5 w-3.5" /> Individual
              </button>
            </div>
          </div>
        </div>

        {responses.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Inbox className="h-10 w-10 text-slate-300" />
            <p className="mt-3 font-semibold text-slate-700">No responses yet</p>
            <p className="mt-1 text-sm text-slate-500">Responses will appear here as students submit the form.</p>
          </div>
        ) : view === 'summary' ? (
          <div className="flex flex-col gap-4">
            {fields.map((field) => {
              const values = responses.map((r) => r.answers[field.id]).filter((v) => v != null && answerText(v) !== '');
              const isChoice = fieldTypeMeta[field.type].hasOptions;
              return (
                <div key={field.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{field.label}</h3>
                  <p className="text-xs text-slate-400">{values.length} answered</p>

                  {isChoice ? (
                    <div className="mt-4 flex flex-col gap-2.5">
                      {(field.options ?? []).map((o) => {
                        const count = responses.filter((r) => {
                          const v = r.answers[field.id];
                          return Array.isArray(v) ? v.includes(o.label) : v === o.label;
                        }).length;
                        const pct = responses.length ? Math.round((count / responses.length) * 100) : 0;
                        return (
                          <div key={o.id}>
                            <div className="flex items-center justify-between text-sm text-slate-600">
                              <span>{o.label}</span>
                              <span className="font-mono text-xs text-slate-400">
                                {count} · {pct}%
                              </span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-ieee-orange" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : field.type === 'image' ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {values.map((v, i) => (
                        <img key={i} src={answerText(v)} alt="Response" className="h-24 w-24 rounded-lg border border-slate-200 object-cover" />
                      ))}
                    </div>
                  ) : (
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {values.map((v, i) => (
                        <li key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                          {answerText(v)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {responses.map((r, i) => (
              <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-semibold text-slate-700">
                    Response #{responses.length - i}
                    {r.submittedBy ? ` · ${r.submittedBy}` : ''}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{formatDate(r.submittedAt)}</span>
                </div>
                <dl className="flex flex-col gap-3">
                  {fields.map((field) => {
                    const v = r.answers[field.id];
                    return (
                      <div key={field.id}>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{field.label}</dt>
                        <dd className="mt-0.5 text-sm text-slate-700">
                          {v == null || answerText(v) === '' ? (
                            <span className="text-slate-300">—</span>
                          ) : field.type === 'image' ? (
                            <img src={answerText(v)} alt="Response" className="mt-1 h-24 rounded-lg border border-slate-200 object-cover" />
                          ) : (
                            answerText(v)
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
