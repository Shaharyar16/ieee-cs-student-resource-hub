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
import { downscaleImage } from '@/utils/image';
import type { Paper } from '@/types';

function toDataUrl(file: File): Promise<string> {
  if (file.type.startsWith('image/')) return downscaleImage(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('read failed'));
    reader.readAsDataURL(file);
  });
}

export default function ContributePaperPage() {
  const [created, setCreated] = useState<Paper | null>(null);
  const [file, setFile] = useState<File | null>(null);
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
    const fileUrl = file ? await toDataUrl(file) : undefined;
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
      fileUrl,
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
        subtitle="Help your juniors by sharing a past exam paper. Every submission is reviewed by our team and appears in the archive once it's verified."
      />

      <PageSection tone="cream" top>
        {created ? (
          <SuccessState
            title="Paper submitted for review!"
            description={`Thanks${
              created.uploadedBy && created.uploadedBy !== 'Anonymous' ? `, ${created.uploadedBy}` : ''
            }! It's now in the review queue — once a moderator verifies it, it'll appear in the archive as “Verified by IEEE CS”.`}
            action={
              <Link
                to="/past-papers"
                className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark"
              >
                Back to Past Papers
              </Link>
            }
          />
        ) : (
          <FormShell onSubmit={handleSubmit} submitLabel="Submit Paper">
            <FormField label="Your Name" hint="Optional — kept private, for our records only.">
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
              <FileUploadBox accept=".pdf,.jpg,.png" onFileSelect={setFile} />
            </FormField>
          </FormShell>
        )}
      </PageSection>
    </div>
  );
}
