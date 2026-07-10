import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormShell from '@/components/ui/FormShell';
import { FormField, TextInput, TextArea, Select } from '@/components/ui/FormField';
import SuccessState from '@/components/ui/SuccessState';
import { courses } from '@/data/courses';
import { appendToStorage, makeId } from '@/utils/storage';
import type { Submission } from '@/types';

export default function RequestPaperPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ course: courses[0].id, details: '', name: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission: Submission = {
      id: makeId('sub'),
      type: 'paper-request',
      submittedBy: form.name || 'Anonymous',
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      data: { course: form.course, details: form.details },
    };
    appendToStorage<Submission>('ieeecs_submissions', [], submission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <SuccessState
          title="Request received!"
          description="We'll try to source this paper from other students and publish it once verified."
          action={
            <Link to="/past-papers" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
              Back to Past Papers
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-14 sm:px-6">
      <FormShell
        title="Request a Missing Paper"
        description="Can't find a paper you need? Let us know and we'll try to track it down."
        onSubmit={handleSubmit}
        submitLabel="Send Request"
      >
        <FormField label="Your Name (optional)">
          <TextInput placeholder="Anonymous" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormField>
        <FormField label="Course" required>
          <Select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.name}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Additional Details" hint="Term, exam type, instructor — anything that helps us find it">
          <TextArea required value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="e.g. Spring 2025 Final, Dr. Imran Sheikh" />
        </FormField>
      </FormShell>
    </div>
  );
}
