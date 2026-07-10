import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormShell from '@/components/ui/FormShell';
import { FormField, TextInput, Select } from '@/components/ui/FormField';
import FileUploadBox from '@/components/ui/FileUploadBox';
import SuccessState from '@/components/ui/SuccessState';
import { courses } from '@/data/courses';
import { appendToStorage, makeId } from '@/utils/storage';
import type { Submission } from '@/types';

export default function ContributePaperPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ course: courses[0].id, term: '', examType: 'Final', name: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission: Submission = {
      id: makeId('sub'),
      type: 'paper',
      submittedBy: form.name || 'Anonymous',
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      data: { course: form.course, term: form.term, examType: form.examType },
    };
    appendToStorage<Submission>('ieeecs_submissions', [], submission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <SuccessState
          title="Paper submitted for review!"
          description="Thank you for contributing. Our moderators will verify and publish it shortly."
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
        title="Contribute a Past Paper"
        description="Help your juniors by sharing a past exam paper. Submissions are reviewed before publishing."
        onSubmit={handleSubmit}
        submitLabel="Submit Paper"
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
        <FormField label="Term" required hint="e.g. Fall 2026">
          <TextInput required value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} placeholder="Fall 2026" />
        </FormField>
        <FormField label="Exam Type" required>
          <Select value={form.examType} onChange={(e) => setForm({ ...form, examType: e.target.value })}>
            <option>Midterm</option>
            <option>Final</option>
            <option>Quiz</option>
            <option>Assignment</option>
          </Select>
        </FormField>
        <FormField label="Upload Paper" required>
          <FileUploadBox accept=".pdf,.jpg,.png" />
        </FormField>
      </FormShell>
    </div>
  );
}
