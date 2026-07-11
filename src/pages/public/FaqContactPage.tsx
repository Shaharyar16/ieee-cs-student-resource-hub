import { useState } from 'react';
import { Mail, ArrowUpRight, MessageCircle } from 'lucide-react';
import { faqs as faqsSeed } from '@/data/faqs';
import { useCollection } from '@/hooks/useCollection';
import FAQAccordion from '@/components/cards/FAQAccordion';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import SectionHeading from '@/components/layout/SectionHeading';
import { FormField, TextInput, TextArea, Select } from '@/components/ui/FormField';
import FileUploadBox from '@/components/ui/FileUploadBox';
import SuccessState from '@/components/ui/SuccessState';
import { appendToStorage, makeId } from '@/utils/storage';
import type { FAQ, Submission } from '@/types';

const categories: FAQ['category'][] = [
  'IEEE CS',
  'Past Papers',
  'Courses',
  'Events',
  'Navigation',
  'Projects Expo',
  'Contributions',
  'Technical Issues',
];

export default function FaqContactPage() {
  const { items: faqs } = useCollection<FAQ>('faqs', faqsSeed);
  const [activeCategory, setActiveCategory] = useState<FAQ['category'] | 'All'>('All');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', category: 'IEEE CS', message: '' });

  const filteredFaqs = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission: Submission = {
      id: makeId('sub'),
      type: 'contact',
      submittedBy: form.name,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      data: { email: form.email, category: form.category, message: form.message },
    };
    appendToStorage<Submission>('ieeecs_submissions', [], submission);
    setSubmitted(true);
  };

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Help Center"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'FAQ & Contact' }]}
        title="FAQ & Contact"
        subtitle="Find quick answers to common questions, or reach out to the IEEE CS team directly — we're happy to help."
        meta={[{ value: `${faqs.length}`, label: 'Answered Questions' }]}
      />

      <PageSection tone="cream" top>
        <SectionHeading eyebrow="Common Questions" title="Frequently asked" flourish />

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            data-cursor="link"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              activeCategory === 'All'
                ? 'bg-ieee-orange text-white shadow-[0_6px_20px_rgba(255,108,12,0.3)]'
                : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/50 hover:text-ieee-orange'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              data-cursor="link"
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                activeCategory === c
                  ? 'bg-ieee-orange text-white shadow-[0_6px_20px_rgba(255,108,12,0.3)]'
                  : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/50 hover:text-ieee-orange'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <FAQAccordion faqs={filteredFaqs} />
        </div>
      </PageSection>

      <PageSection tone="white">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-black/5 bg-cream p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">Contact Us</h2>
            {submitted ? (
              <div className="mt-6">
                <SuccessState title="Message sent!" description="We'll get back to you as soon as possible." />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <FormField label="Name" required>
                  <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </FormField>
                <FormField label="Email" required>
                  <TextInput
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </FormField>
                <FormField label="Category" required>
                  <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </FormField>
                <FormField label="Message" required>
                  <TextArea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </FormField>
                <FormField label="Attachment (optional)">
                  <FileUploadBox />
                </FormField>
                <button
                  type="submit"
                  className="mt-2 rounded-xl bg-ieee-orange px-5 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark active:scale-[0.99]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="rounded-3xl border border-black/5 bg-cream p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900">Reach Us Directly</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3">
                <Mail className="h-4 w-4 shrink-0 text-ieee-orange" />
                <span className="text-slate-700">ieeecs.studentbranch@example.edu</span>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                >
                  Instagram
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-ieee-orange" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                >
                  LinkedIn
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-ieee-orange" />
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-ieee-orange" /> WhatsApp Channel
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-ieee-orange" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
