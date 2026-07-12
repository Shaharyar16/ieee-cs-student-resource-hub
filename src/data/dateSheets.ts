import type { DateSheet } from '@/types';

/** The term the hub currently treats as "this semester". */
export const currentTerm = { term: 'Fall', year: 2026 };

const sample = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80';

export const dateSheets: DateSheet[] = [
  { id: 'ds-cs-1', title: 'CS Semester 1 Final — Fall 2026', program: 'Computer Science', semester: 1, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-01' },
  { id: 'ds-cs-3', title: 'CS Semester 3 Final — Fall 2026', program: 'Computer Science', semester: 3, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-02' },
  { id: 'ds-cs-5', title: 'CS Semester 5 Final — Fall 2026', program: 'Computer Science', semester: 5, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-02' },
  // SE sem 3 only has last term's sheet — the page falls back to it.
  { id: 'ds-se-3', title: 'SE Semester 3 Final — Spring 2026', program: 'Software Engineering', semester: 3, term: 'Spring', year: 2026, fileUrl: sample, uploadedDate: '2026-01-20' },
  { id: 'ds-se-1', title: 'SE Semester 1 Final — Fall 2026', program: 'Software Engineering', semester: 1, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-01' },
  { id: 'ds-ai-1', title: 'AI Semester 1 Final — Fall 2026', program: 'Artificial Intelligence', semester: 1, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-03' },
  { id: 'ds-ds-1', title: 'DS Semester 1 Final — Fall 2026', program: 'Data Science', semester: 1, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-03' },
  { id: 'ds-cy-1', title: 'Cyber Semester 1 Final — Fall 2026', program: 'Cyber Security', semester: 1, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-03' },
];
