import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormShell from '@/components/ui/FormShell';
import { FormField, TextInput, TextArea } from '@/components/ui/FormField';
import FileUploadBox from '@/components/ui/FileUploadBox';
import SuccessState from '@/components/ui/SuccessState';
import { appendToStorage, makeId } from '@/utils/storage';
import type { Submission } from '@/types';

export default function SubmitProjectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: '', tagline: '', team: '', supervisor: '', githubUrl: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission: Submission = {
      id: makeId('sub'),
      type: 'project',
      submittedBy: form.team || 'Anonymous Team',
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      data: { ...form },
    };
    appendToStorage<Submission>('ieeecs_submissions', [], submission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <SuccessState
          title="Project submitted!"
          description="Thanks for sharing your work. It will appear in the expo once reviewed."
          action={
            <Link to="/projects-expo" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
              Back to Projects Expo
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-14 sm:px-6">
      <FormShell title="Submit Your Project" description="Share your semester project with the whole department." onSubmit={handleSubmit} submitLabel="Submit Project">
        <FormField label="Project Title" required>
          <TextInput required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. CampusNav" />
        </FormField>
        <FormField label="Tagline" required>
          <TextInput required value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="One-line summary" />
        </FormField>
        <FormField label="Team Members" required hint="Comma-separated names">
          <TextInput required value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} placeholder="Ali Hamza, Zainab Iqbal" />
        </FormField>
        <FormField label="Supervisor" required>
          <TextInput required value={form.supervisor} onChange={(e) => setForm({ ...form, supervisor: e.target.value })} placeholder="Dr. Imran Sheikh" />
        </FormField>
        <FormField label="GitHub URL">
          <TextInput value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." />
        </FormField>
        <FormField label="Project Description" required>
          <TextArea required placeholder="Describe the problem, solution, and features..." />
        </FormField>
        <FormField label="Upload Screenshots">
          <FileUploadBox accept="image/*" />
        </FormField>
      </FormShell>
    </div>
  );
}
