import type { HierarchyTerm } from '@/types';

export const hierarchyTerms: HierarchyTerm[] = [
  {
    term: 'FA26',
    members: [
      { id: 'h-1', name: 'Ayesha Khan', role: 'Chairperson', photo: 'https://i.pravatar.cc/200?img=47' },
      { id: 'h-2', name: 'Bilal Ahmed', role: 'Vice Chairperson', photo: 'https://i.pravatar.cc/200?img=13' },
      { id: 'h-3', name: 'Sara Malik', role: 'General Secretary', photo: 'https://i.pravatar.cc/200?img=44' },
      { id: 'h-4', name: 'Usman Riaz', role: 'Treasurer', photo: 'https://i.pravatar.cc/200?img=14' },
      { id: 'h-5', name: 'Zainab Iqbal', role: 'Technical Lead', photo: 'https://i.pravatar.cc/200?img=48' },
      { id: 'h-6', name: 'Hamza Tariq', role: 'Events Lead', photo: 'https://i.pravatar.cc/200?img=17' },
    ],
  },
  {
    term: 'SP26',
    members: [
      { id: 'h-7', name: 'Fatima Noor', role: 'Chairperson', photo: 'https://i.pravatar.cc/200?img=30' },
      { id: 'h-8', name: 'Ali Hamza', role: 'Vice Chairperson', photo: 'https://i.pravatar.cc/200?img=11' },
      { id: 'h-9', name: 'Rida Shah', role: 'General Secretary', photo: 'https://i.pravatar.cc/200?img=33' },
      { id: 'h-10', name: 'Omar Farooq', role: 'Treasurer', photo: 'https://i.pravatar.cc/200?img=20' },
    ],
  },
  {
    term: 'FA25',
    members: [
      { id: 'h-11', name: 'Hina Malik', role: 'Chairperson', photo: 'https://i.pravatar.cc/200?img=25' },
      { id: 'h-12', name: 'Kashif Raza', role: 'Vice Chairperson', photo: 'https://i.pravatar.cc/200?img=22' },
      { id: 'h-13', name: 'Mahnoor Siddiqui', role: 'General Secretary', photo: 'https://i.pravatar.cc/200?img=29' },
    ],
  },
  {
    term: 'FA24',
    members: [
      { id: 'h-14', name: 'Talha Waseem', role: 'Chairperson', photo: 'https://i.pravatar.cc/200?img=8' },
      { id: 'h-15', name: 'Iqra Naveed', role: 'Vice Chairperson', photo: 'https://i.pravatar.cc/200?img=36' },
      { id: 'h-16', name: 'Danish Elahi', role: 'General Secretary', photo: 'https://i.pravatar.cc/200?img=6' },
    ],
  },
];

export const currentHierarchy = hierarchyTerms[0];
