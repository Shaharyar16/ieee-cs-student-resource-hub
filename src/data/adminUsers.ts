import type { AdminUser } from '@/types';

export const adminUsers: AdminUser[] = [
  { id: 'au-1', name: 'Ayesha Khan', email: 'ayesha.khan@ieeecs.edu', role: 'super-admin', lastActive: '2026-06-30' },
  { id: 'au-2', name: 'Bilal Ahmed', email: 'bilal.ahmed@ieeecs.edu', role: 'editor', lastActive: '2026-06-29' },
  { id: 'au-3', name: 'Sara Malik', email: 'sara.malik@ieeecs.edu', role: 'editor', lastActive: '2026-06-28' },
  { id: 'au-4', name: 'Usman Riaz', email: 'usman.riaz@ieeecs.edu', role: 'moderator', lastActive: '2026-06-27' },
];
