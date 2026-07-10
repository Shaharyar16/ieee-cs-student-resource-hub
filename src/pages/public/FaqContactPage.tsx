import { useState } from 'react';
import { faqs } from '@/data/faqs';
import FAQAccordion from '@/components/cards/FAQAccordion';
import { FormField, TextInput, TextArea, Select } from '@/components/ui/FormField';
import FileUploadBox from '@/components/ui/FileUploadBox';
import SuccessState from '@/components/ui/SuccessState';
import { appendToStorage, makeId } from '@/utils/storage';
import type { FAQ, Submission } from '@/types';
import Icon from '@/components/ui/Icon';

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
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">FAQ & Contact</h1>
      <p className="mt-2 text-slate-600">Find answers or reach out to the IEEE CS team directly.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${activeCategory === 'All' ? 'bg-ieee-orange text-white' : 'border border-slate-200 text-slate-600 hover:border-ieee-orange'}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${activeCategory === c ? 'bg-ieee-orange text-white' : 'border border-slate-200 text-slate-600 hover:border-ieee-orange'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <FAQAccordion faqs={filteredFaqs} />
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
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
                <TextInput type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
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
              <button type="submit" className="mt-2 rounded-xl bg-ieee-orange px-5 py-3 font-semibold text-white shadow-sm hover:bg-ieee-orange-dark">
                Send Message
              </button>
            </form>
          )}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Reach Us Directly</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Icon name="mail" className="h-4 w-4 shrink-0 text-slate-400" /> ieeecs.studentbranch@example.edu
            </li>
            <li className="flex items-center gap-2">
              <Icon name="external-link" className="h-4 w-4 shrink-0 text-slate-400" />
              <a href="https://instagram.com" className="text-ieee-blue hover:underline">Instagram</a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="external-link" className="h-4 w-4 shrink-0 text-slate-400" />
              <a href="https://linkedin.com" className="text-ieee-blue hover:underline">LinkedIn</a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="message" className="h-4 w-4 shrink-0 text-slate-400" />
              <a href="https://whatsapp.com" className="text-ieee-blue hover:underline">WhatsApp Channel</a> (optional)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
