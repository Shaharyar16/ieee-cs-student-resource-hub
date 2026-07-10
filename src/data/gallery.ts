import type { GalleryAlbum } from '@/types';

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'gal-1',
    title: 'TechNova Hackathon 2025',
    date: '2025-08-03',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    description: 'Highlights from our 24-hour flagship hackathon.',
    images: [
      { id: 'gal-1-1', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80', caption: 'Opening ceremony' },
      { id: 'gal-1-2', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80', caption: 'Teams brainstorming' },
      { id: 'gal-1-3', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80', caption: 'Mentors assisting a team' },
      { id: 'gal-1-4', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80', caption: 'Winning team on stage' },
    ],
  },
  {
    id: 'gal-2',
    title: 'Modern Web Systems Workshop',
    date: '2026-07-18',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    description: 'Photos from the two-day workshop.',
    images: [
      { id: 'gal-2-1', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80', caption: 'Day 1 session' },
      { id: 'gal-2-2', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', caption: 'Group activity' },
    ],
  },
  {
    id: 'gal-3',
    title: 'Projects Expo 2025',
    date: '2025-12-05',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    description: 'Student projects on display.',
    images: [
      { id: 'gal-3-1', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80', caption: 'Expo floor' },
      { id: 'gal-3-2', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80', caption: 'Judging panel' },
      { id: 'gal-3-3', url: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?auto=format&fit=crop&w=900&q=80', caption: 'Student demo' },
    ],
  },
];
