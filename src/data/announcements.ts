import type { Announcement } from '@/types';

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'IEEE CS Workshop registrations are now open',
    summary: 'Join our hands-on "Modern Web Systems" workshop this month.',
    body: 'The IEEE Computer Society Islamabad Branch Chapter is hosting a two-day hands-on workshop covering modern web systems, deployment pipelines, and cloud basics. Seats are limited to 80 participants and registration closes one week before the event.',
    date: '2026-06-20',
    category: 'event',
    pinned: true,
  },
  {
    id: 'ann-2',
    title: 'Past paper contribution drive is live',
    summary: 'Help juniors by uploading verified past papers from your recent exams.',
    body: 'We are running a month-long contribution drive to build a complete past paper archive. Every verified contribution earns a contributor badge on your profile and a shoutout on our Instagram.',
    date: '2026-06-15',
    category: 'academic',
    pinned: true,
  },
  {
    id: 'ann-3',
    title: 'CS Block navigation beta is available',
    summary: 'Try our new interactive navigation guide for the CS building.',
    body: 'Lost between labs and lecture halls? Our new navigation tool lets you pick an entrance and a destination to get a step-by-step visual route across the CS Block.',
    date: '2026-06-10',
    category: 'navigation',
    pinned: true,
  },
  {
    id: 'ann-4',
    title: 'Projects Expo 2026 call for submissions',
    summary: 'Showcase your semester project to the whole department.',
    body: 'The annual Projects Expo is accepting submissions from all batches. Selected projects will be exhibited live and featured on the society website.',
    date: '2026-06-05',
    category: 'projects',
  },
  {
    id: 'ann-5',
    title: 'New executive council elected for FA26',
    summary: 'Meet the new IEEE CS Islamabad Branch leadership team.',
    body: 'Congratulations to the newly elected executive council for the Fall 2026 term. Find the full hierarchy on the About page.',
    date: '2026-05-28',
    category: 'general',
  },
];
