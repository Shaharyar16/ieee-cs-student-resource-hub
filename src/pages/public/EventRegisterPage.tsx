import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormShell from '@/components/ui/FormShell';
import { FormField, TextInput, Select } from '@/components/ui/FormField';
import SuccessState from '@/components/ui/SuccessState';
import EmptyState from '@/components/ui/EmptyState';
import { events } from '@/data/events';
import { appendToStorage, makeId } from '@/utils/storage';
import type { Submission } from '@/types';

export default function EventRegisterPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', rollNumber: '', batch: '' });

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <EmptyState title="Event not found" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submission: Submission = {
      id: makeId('sub'),
      type: 'event-registration',
      submittedBy: form.name,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'approved',
      data: { event: event.title, email: form.email, rollNumber: form.rollNumber, batch: form.batch },
    };
    appendToStorage<Submission>('ieeecs_submissions', [], submission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <SuccessState
          title="You're registered!"
          description={`We've saved your spot for "${event.title}". A confirmation has been noted — see you there!`}
          action={
            <Link to="/events" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
              Back to Events
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-14 sm:px-6">
      <FormShell title={`Register: ${event.title}`} description={`${event.date} · ${event.venue}`} onSubmit={handleSubmit} submitLabel="Confirm Registration">
        <FormField label="Full Name" required>
          <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
        </FormField>
        <FormField label="Email" required>
          <TextInput type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.edu" />
        </FormField>
        <FormField label="Roll Number" required>
          <TextInput required value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} placeholder="e.g. 2023-CS-101" />
        </FormField>
        <FormField label="Batch" required>
          <Select value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} required>
            <option value="">Select batch</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </Select>
        </FormField>
      </FormShell>
    </div>
  );
}
