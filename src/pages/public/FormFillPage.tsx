import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react';
import type { FormDef, FormAnswer } from '@/types';
import { formsService } from '@/services/formsService';
import { useAuth } from '@/context/AuthContext';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import EmptyState from '@/components/ui/EmptyState';
import SuccessState from '@/components/ui/SuccessState';
import FormFieldInput from '@/components/forms/FormFieldInput';

function isEmpty(v: FormAnswer | undefined) {
  if (v == null) return true;
  if (Array.isArray(v)) return v.length === 0;
  return v.trim() === '';
}

export default function FormFillPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState<FormDef | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, FormAnswer>>({});
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    formsService.get(id ?? '').then((f) => {
      if (alive) {
        setForm(f);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [id]);

  const fieldLabels = useMemo(() => {
    const map: Record<string, string> = {};
    form?.pages.forEach((p) => p.fields.forEach((f) => (map[f.id] = f.label)));
    return map;
  }, [form]);

  if (loading) {
    return (
      <div className="relative">
        <PageHero compact eyebrow="Forms" title="Loading…" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Forms', to: '/forms' }, { label: '…' }]} />
        <PageSection tone="cream" top width="narrow">
          <div className="h-96 animate-pulse rounded-3xl border border-black/5 bg-white" />
        </PageSection>
      </div>
    );
  }

  if (!form || form.status !== 'open') {
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Forms"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Forms', to: '/forms' }, { label: 'Unavailable' }]}
          title="Form unavailable"
          subtitle="This form may have been closed or removed."
        />
        <PageSection tone="cream" top width="narrow">
          <EmptyState
            title="Not open"
            action={
              <Link to="/forms" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
                Back to Forms
              </Link>
            }
          />
        </PageSection>
      </div>
    );
  }

  const pages = form.pages;
  const current = pages[page];
  const isLast = page === pages.length - 1;
  const progress = Math.round(((page + 1) / pages.length) * 100);

  const set = (fieldId: string) => (value: FormAnswer) => {
    setAnswers((a) => ({ ...a, [fieldId]: value }));
    setErrors((e) => {
      if (!e.has(fieldId)) return e;
      const next = new Set(e);
      next.delete(fieldId);
      return next;
    });
  };

  const validatePage = () => {
    const missing = current.fields.filter((f) => f.required && isEmpty(answers[f.id]));
    setErrors(new Set(missing.map((f) => f.id)));
    return missing.length === 0;
  };

  const next = () => {
    if (!validatePage()) return;
    setPage((p) => Math.min(p + 1, pages.length - 1));
  };
  const back = () => setPage((p) => Math.max(p - 1, 0));

  const submit = async () => {
    if (!validatePage()) return;
    setBusy(true);
    try {
      await formsService.submitResponse(form.id, answers, fieldLabels, user?.name);
      setDone(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Form"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Forms', to: '/forms' }, { label: form.title }]}
        title={form.title}
        subtitle={form.description}
      />

      <PageSection tone="cream" top width="narrow">
        {done ? (
          <SuccessState
            title="Response submitted!"
            description="Thanks — your response has been recorded. The IEEE CS team will see it."
            action={
              <Link to="/forms" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
                Back to Forms
              </Link>
            }
          />
        ) : (
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgba(10,10,12,0.08)] sm:p-8">
            {/* progress */}
            {pages.length > 1 && (
              <div className="mb-6">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-slate-400">
                  <span>
                    Page {page + 1} of {pages.length}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-ieee-orange"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                {current.title && <h2 className="font-display text-xl font-bold text-slate-900">{current.title}</h2>}
                {current.description && <p className="mt-1 text-sm text-slate-600">{current.description}</p>}

                <div className={`flex flex-col gap-6 ${current.title || current.description ? 'mt-6' : ''}`}>
                  {current.fields.map((field) => (
                    <div key={field.id}>
                      <label className="text-sm font-semibold text-slate-800">
                        {field.label}
                        {field.required && <span className="ml-0.5 text-ieee-orange">*</span>}
                      </label>
                      {field.description && <p className="mb-2 mt-0.5 text-xs text-slate-500">{field.description}</p>}
                      <div className={field.description ? '' : 'mt-2'}>
                        <FormFieldInput field={field} value={answers[field.id]} onChange={set(field.id)} error={errors.has(field.id)} />
                      </div>
                      {errors.has(field.id) && <p className="mt-1.5 text-xs font-medium text-rose-600">This field is required.</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* nav */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={back}
                disabled={page === 0}
                className="flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {isLast ? (
                <button
                  type="button"
                  onClick={submit}
                  disabled={busy}
                  data-cursor="link"
                  className="flex items-center gap-2 rounded-xl bg-ieee-orange px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark disabled:opacity-70"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  data-cursor="link"
                  className="flex items-center gap-1.5 rounded-xl bg-ieee-orange px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </PageSection>
    </div>
  );
}
