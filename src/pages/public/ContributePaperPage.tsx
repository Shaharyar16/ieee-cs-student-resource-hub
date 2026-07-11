import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import FormShell from '@/components/ui/FormShell';
import { FormField, TextInput, Select } from '@/components/ui/FormField';
import FileUploadBox from '@/components/ui/FileUploadBox';
import SuccessState from '@/components/ui/SuccessState';
import { courses } from '@/data/courses';
import { papersService } from '@/services/papersService';
import type { Paper } from '@/types';

export default function ContributePaperPage() {
  const [created, setCreated] = useState<Paper | null>(null);
  const [form, setForm] = useState({
    course: courses[0].id,
    title: '',
    term: '',
    examType: 'Final' as Paper['examType'],
    instructor: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const course = courses.find((c) => c.id === form.course) ?? courses[0];
    const yearMatch = form.term.match(/(20\d{2})/);
    const year = yearMatch ? Number(yearMatch[1]) : new Date().getFullYear();
    const term = form.term.replace(/\s*20\d{2}\s*/, ' ').trim() || 'Term';
    const paper = await papersService.contribute({
      courseId: course.id,
      courseName: course.name,
      title: form.title.trim() || `${course.name} ${form.examType}`,
      term,
      year,
      examType: form.examType,
      instructor: form.instructor,
      contributorName: form.name,
      tags: [],
    });
    setCreated(paper);
  };

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Give Back"
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Past Papers', to: '/past-papers' },
          { label: 'Contribute' },
        ]}
        title="Contribute a Past Paper"
        subtitle="Help your juniors by sharing a past exam paper. Add your name and we'll credit you as the contributor on the paper — or stay anonymous, your call."
      />

      <PageSection tone="cream" top>
        {created ? (
          <SuccessState
            title="Paper submitted for review!"
            description={`Thanks${
              created.uploadedBy && created.uploadedBy !== 'Anonymous' ? `, ${created.uploadedBy}` : ''
            }! It's now pending moderator review — you can already see it credited to you.`}
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to={`/past-papers/${created.id}`}
                  className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark"
                >
                  View your paper
                </Link>
                <Link
                  to="/past-papers"
                  className="rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-ieee-orange/40 hover:text-ieee-orange"
                >
                  Back to Past Papers
                </Link>
              </div>
            }
          />
        ) : (
          <FormShell onSubmit={handleSubmit} submitLabel="Submit Paper">
            <FormField label="Contributor Name" hint="Shown on the paper as “Contributed by”. Leave blank to stay Anonymous.">
              <TextInput
                placeholder="Your name (optional)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
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
            <FormField label="Paper Title" hint="Optional — we'll auto-name it from the course and exam type">
              <TextInput
                placeholder="e.g. DSA Final Exam"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </FormField>
            <FormField label="Term" required hint="e.g. Fall 2026">
              <TextInput
                required
                value={form.term}
                onChange={(e) => setForm({ ...form, term: e.target.value })}
                placeholder="Fall 2026"
              />
            </FormField>
            <FormField label="Exam Type" required>
              <Select
                value={form.examType}
                onChange={(e) => setForm({ ...form, examType: e.target.value as Paper['examType'] })}
              >
                <option>Midterm</option>
                <option>Final</option>
                <option>Quiz</option>
                <option>Assignment</option>
              </Select>
            </FormField>
            <FormField label="Instructor" hint="Optional">
              <TextInput
                placeholder="e.g. Dr. Imran Sheikh"
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
              />
            </FormField>
            <FormField label="Upload Paper" required>
              <FileUploadBox accept=".pdf,.jpg,.png" />
            </FormField>
          </FormShell>
        )}
      </PageSection>
    </div>
  );
}
