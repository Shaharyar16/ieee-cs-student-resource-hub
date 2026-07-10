import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormShell from '@/components/ui/FormShell';
import { FormField, TextInput, TextArea, Select } from '@/components/ui/FormField';
import SuccessState from '@/components/ui/SuccessState';
import { courses } from '@/data/courses';
import { appendToStorage, makeId } from '@/utils/storage';
import type { Submission } from '@/types';

export default function SuggestCorrectionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ course: courses[0].id, field: 'Syllabus', details: '', name: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission: Submission = {
      id: makeId('sub'),
      type: 'course-correction',
      submittedBy: form.name || 'Anonymous',
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      data: { course: form.course, field: form.field, details: form.details },
    };
    appendToStorage<Submission>('ieeecs_submissions', [], submission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <SuccessState
          title="Correction submitted!"
          description="Thanks for helping keep our course data accurate. Our team will review this shortly."
          action={
            <Link to="/courses" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
              Back to Courses
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-14 sm:px-6">
      <FormShell
        title="Suggest a Course Correction"
        description="Spotted outdated or incorrect course information? Let us know."
        onSubmit={handleSubmit}
        submitLabel="Submit Correction"
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
        <FormField label="Field to Correct" required>
          <Select value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })}>
            <option>Syllabus</option>
            <option>CDF Link</option>
            <option>Lab Manual Link</option>
            <option>Instructor Info</option>
            <option>Other</option>
          </Select>
        </FormField>
        <FormField label="Correction Details" required>
          <TextArea required value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Describe what needs to be corrected..." />
        </FormField>
      </FormShell>
    </div>
  );
}
