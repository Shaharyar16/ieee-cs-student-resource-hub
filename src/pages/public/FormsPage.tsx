import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, ArrowRight, FileText } from 'lucide-react';
import type { FormDef } from '@/types';
import { formsService } from '@/services/formsService';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import EmptyState from '@/components/ui/EmptyState';

function fieldCount(form: FormDef) {
  return form.pages.reduce((n, p) => n + p.fields.length, 0);
}

export default function FormsPage() {
  const [forms, setForms] = useState<FormDef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    formsService.listOpen().then((data) => {
      if (alive) {
        setForms(data);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Forms"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Forms' }]}
        title="Open Forms"
        subtitle="Registrations, feedback, sign-ups and surveys from the IEEE CS team — fill out whatever's open, right here."
        meta={[{ value: `${forms.length}`, label: forms.length === 1 ? 'Open Form' : 'Open Forms' }]}
      />

      <PageSection tone="cream" top width="narrow">
        {loading ? (
          <div className="flex flex-col gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-3xl border border-black/5 bg-white" />
            ))}
          </div>
        ) : forms.length === 0 ? (
          <EmptyState icon="inbox" title="No open forms right now" description="Check back soon — new forms show up here." />
        ) : (
          <div className="flex flex-col gap-5">
            {forms.map((form, i) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/forms/${form.id}`}
                  data-cursor="link"
                  className="group flex items-center gap-5 rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ieee-orange/30 hover:shadow-lg"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ieee-orange/10 text-ieee-orange">
                    <ClipboardList className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold text-slate-900">{form.title}</h3>
                    {form.description && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{form.description}</p>}
                    <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-slate-400">
                      <FileText className="h-3.5 w-3.5" /> {fieldCount(form)} fields
                      {form.pages.length > 1 && ` · ${form.pages.length} pages`}
                    </p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1.5 rounded-xl bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-ieee-orange-dark sm:flex">
                    Fill out <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </PageSection>
    </div>
  );
}
