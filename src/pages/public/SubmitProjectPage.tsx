import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Plus, X, LogIn, UserPlus } from 'lucide-react';
import { projectsService } from '@/services/projectsService';
import { useAuth } from '@/context/AuthContext';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import { FormField, TextInput, TextArea } from '@/components/ui/FormField';
import MultiImageUpload from '@/components/projects/MultiImageUpload';

/** Small add/remove chip input used for creators and tech stack. */
function ChipInput({
  values,
  onChange,
  placeholder,
  tone = 'orange',
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  tone?: 'orange' | 'slate';
}) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft('');
  };
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
      {values.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span
              key={v}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                tone === 'orange' ? 'bg-ieee-orange/10 text-ieee-orange' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {v}
              <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} aria-label={`Remove ${v}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="w-full bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={add}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm transition hover:text-ieee-orange"
          aria-label="Add"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function SubmitProjectPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', tagline: '', description: '', category: '', githubUrl: '', demoUrl: '' });
  const [creators, setCreators] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill the first creator with the signed-in user's name.
  useEffect(() => {
    if (user && creators.length === 0) setCreators([user.name]);
  }, [user, creators.length]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.title.trim() && form.tagline.trim() && form.description.trim() && creators.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !valid) return;
    setError(null);
    setBusy(true);
    try {
      const created = await projectsService.create(
        {
          title: form.title,
          tagline: form.tagline,
          description: form.description,
          category: form.category,
          githubUrl: form.githubUrl,
          demoUrl: form.demoUrl,
          creators,
          techStack,
          screenshots,
        },
        user
      );
      navigate(`/projects-expo/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not publish your project.');
      setBusy(false);
    }
  }

  // --- Auth gate ------------------------------------------------------------
  if (!user) {
    const redirect = encodeURIComponent('/projects-expo/submit');
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Share your work"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects-expo' }, { label: 'Share' }]}
          title="Post a Project"
          subtitle="Sharing a project is tied to your account so people know who built it — log in or create a free account to continue."
        />
        <PageSection tone="cream" top width="narrow">
          <div className="mx-auto max-w-md rounded-3xl border border-black/5 bg-white p-8 text-center shadow-sm">
            <h2 className="font-display text-xl font-bold text-slate-900">Account required</h2>
            <p className="mt-2 text-sm text-slate-600">
              Browsing stays free — but posting, liking and commenting need an account.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to={`/login?redirect=${redirect}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-ieee-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark"
              >
                <LogIn className="h-4 w-4" /> Log in
              </Link>
              <Link
                to={`/signup?redirect=${redirect}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
              >
                <UserPlus className="h-4 w-4" /> Create an account
              </Link>
            </div>
          </div>
        </PageSection>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Share your work"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects-expo' }, { label: 'Share' }]}
        title="Post a Project"
        subtitle="Show the community what you built. It'll appear in the feed instantly for everyone to explore, like and discuss."
      />

      <PageSection tone="cream" top width="narrow">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-2xl rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgba(10,10,12,0.08)] sm:p-8"
        >
          <div className="flex flex-col gap-5">
            <FormField label="Project Title" required>
              <TextInput required value={form.title} onChange={set('title')} placeholder="e.g. CampusNav" />
            </FormField>
            <FormField label="Tagline" required hint="One punchy line about what it does">
              <TextInput required value={form.tagline} onChange={set('tagline')} placeholder="Indoor navigation for the CS block" />
            </FormField>
            <FormField label="Creators" required hint="Add everyone who built it — press Enter after each name">
              <ChipInput values={creators} onChange={setCreators} placeholder="Add a creator's name" />
            </FormField>
            <FormField label="Tech Stack" hint="Press Enter after each technology">
              <ChipInput values={techStack} onChange={setTechStack} placeholder="React, Node.js, PostgreSQL…" tone="slate" />
            </FormField>
            <FormField label="Category">
              <TextInput value={form.category} onChange={set('category')} placeholder="e.g. Web, AI, Mobile" />
            </FormField>
            <FormField label="Project Description" required hint="Problem, solution, features, what you learned…">
              <TextArea
                required
                value={form.description}
                onChange={set('description')}
                className="min-h-40"
                placeholder="Tell the story of your project…"
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="GitHub URL">
                <TextInput value={form.githubUrl} onChange={set('githubUrl')} placeholder="https://github.com/…" />
              </FormField>
              <FormField label="Live Demo URL" hint="Optional hosting link">
                <TextInput value={form.demoUrl} onChange={set('demoUrl')} placeholder="https://your-demo.app" />
              </FormField>
            </div>
            <FormField label="Screenshots" hint="Up to 3 — the first is used as the cover">
              <MultiImageUpload value={screenshots} onChange={setScreenshots} max={3} />
            </FormField>

            {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>}

            <button
              type="submit"
              disabled={busy || !valid}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-ieee-orange px-5 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Publish Project
            </button>
          </div>
        </form>
      </PageSection>
    </div>
  );
}
