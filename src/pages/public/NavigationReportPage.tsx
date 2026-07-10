import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormShell from '@/components/ui/FormShell';
import { FormField, TextInput, TextArea } from '@/components/ui/FormField';
import SuccessState from '@/components/ui/SuccessState';
import { appendToStorage, makeId } from '@/utils/storage';
import type { Submission } from '@/types';

export default function NavigationReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ route: '', issue: '', name: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission: Submission = {
      id: makeId('sub'),
      type: 'navigation-report',
      submittedBy: form.name || 'Anonymous',
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      data: { route: form.route, issue: form.issue },
    };
    appendToStorage<Submission>('ieeecs_submissions', [], submission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <SuccessState
          title="Thanks for the report!"
          description="Our navigation team will review and correct the route shortly."
          action={
            <Link to="/navigation" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
              Back to Navigation
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-14 sm:px-6">
      <FormShell title="Report a Wrong Route" description="Help us keep the navigation guide accurate." onSubmit={handleSubmit} submitLabel="Submit Report">
        <FormField label="Your Name (optional)">
          <TextInput placeholder="Anonymous" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormField>
        <FormField label="Which route?" required hint="e.g. Entrance 2 to Lab 3">
          <TextInput required value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} placeholder="Entrance 2 to Lab 3" />
        </FormField>
        <FormField label="What's wrong with it?" required>
          <TextArea required value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} placeholder="Describe the issue..." />
        </FormField>
      </FormShell>
    </div>
  );
}
