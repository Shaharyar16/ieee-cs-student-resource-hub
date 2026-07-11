import type { DateSheet } from '@/types';

/** The term the hub currently treats as "this semester". */
export const currentTerm = { term: 'Fall', year: 2026 };

const sample = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80';

export const dateSheets: DateSheet[] = [
  { id: 'ds-1', title: 'Semester 1 Final — Fall 2026', semester: 1, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-01' },
  { id: 'ds-2', title: 'Semester 2 Final — Fall 2026', semester: 2, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-01' },
  // Semester 3 only has last term's sheet uploaded — the page falls back to it.
  { id: 'ds-3', title: 'Semester 3 Final — Spring 2026', semester: 3, term: 'Spring', year: 2026, fileUrl: sample, uploadedDate: '2026-01-20' },
  { id: 'ds-5', title: 'Semester 5 Final — Fall 2026', semester: 5, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-02' },
  { id: 'ds-7', title: 'Semester 7 Final — Fall 2026', semester: 7, term: 'Fall', year: 2026, fileUrl: sample, uploadedDate: '2026-06-03' },
];
