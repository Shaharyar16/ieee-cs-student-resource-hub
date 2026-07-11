import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, BarChart3, Eye, EyeOff, Trash2, ClipboardList } from 'lucide-react';
import type { FormDef } from '@/types';
import { formsService } from '@/services/formsService';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminFormsPage() {
  const [forms, setForms] = useState<FormDef[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () =>
    formsService.listAll().then((data) => {
      setForms(data);
      setLoading(false);
    });

  useEffect(() => {
    refresh();
  }, []);

  const toggle = async (form: FormDef) => {
    await formsService.setStatus(form.id, form.status === 'open' ? 'disabled' : 'open');
    refresh();
  };

  const remove = async (form: FormDef) => {
    if (!window.confirm(`Delete "${form.title}"? Its responses stay in the database but the form is removed.`)) return;
    await formsService.remove(form.id);
    refresh();
  };

  const fieldCount = (f: FormDef) => f.pages.reduce((n, p) => n + p.fields.length, 0);

  return (
    <>
      <AdminTopbar title="Forms" />
      <div className="p-4 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">Create forms for students to fill — responses collect here.</p>
          <Link
            to="/portal/forms/new"
            className="flex items-center gap-1.5 rounded-lg bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ieee-orange-dark"
          >
            <Plus className="h-4 w-4" /> New Form
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {forms.map((form) => (
              <div
                key={form.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                  <ClipboardList className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{form.title}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        form.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {form.status === 'open' ? 'Open' : 'Disabled'}
                    </span>
                    {form.isDefault && (
                      <span className="rounded-full bg-ieee-orange/10 px-2 py-0.5 text-[11px] font-semibold text-ieee-orange">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-slate-500">{form.description || 'No description'}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-slate-400">
                    {fieldCount(form)} fields · {form.pages.length} {form.pages.length === 1 ? 'page' : 'pages'} ·{' '}
                    {formsService.responseCount(form.id)} responses
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={`/portal/forms/${form.id}/responses`}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-ieee-orange hover:text-ieee-orange"
                  >
                    <BarChart3 className="h-3.5 w-3.5" /> Responses
                  </Link>
                  <Link
                    to={`/portal/forms/${form.id}/edit`}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-ieee-orange hover:text-ieee-orange"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                  <button
                    onClick={() => toggle(form)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
                  >
                    {form.status === 'open' ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {form.status === 'open' ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => remove(form)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-rose-300 hover:text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
