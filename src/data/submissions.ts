import type { Submission } from '@/types';

export const submissions: Submission[] = [
  {
    id: 'sub-1',
    type: 'paper',
    submittedBy: 'Ali Hamza',
    submittedAt: '2026-06-25',
    status: 'pending',
    data: { course: 'CS-301', term: 'Spring 2026', examType: 'Final' },
  },
  {
    id: 'sub-2',
    type: 'course-correction',
    submittedBy: 'Zainab Iqbal',
    submittedAt: '2026-06-24',
    status: 'pending',
    data: { course: 'CS-405', field: 'Lab Manual URL' },
  },
  {
    id: 'sub-3',
    type: 'navigation-report',
    submittedBy: 'Bilal Ahmed',
    submittedAt: '2026-06-22',
    status: 'approved',
    data: { route: 'Entrance 2 to Lab 3', issue: 'Stairs direction unclear' },
  },
  {
    id: 'sub-4',
    type: 'project',
    submittedBy: 'Sara Malik',
    submittedAt: '2026-06-20',
    status: 'pending',
    data: { title: 'StudyBuddy AI Planner' },
  },
  {
    id: 'sub-5',
    type: 'sponsorship',
    submittedBy: 'DevWorks Systems',
    submittedAt: '2026-06-18',
    status: 'approved',
    data: { organization: 'DevWorks Systems', tier: 'Gold' },
  },
  {
    id: 'sub-6',
    type: 'feedback',
    submittedBy: 'Anonymous',
    submittedAt: '2026-06-15',
    status: 'rejected',
    data: { topic: 'Site suggestion', message: 'Add dark mode' },
  },
];
