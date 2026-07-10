import type { Banner } from '@/types';

export const banners: Banner[] = [
  {
    id: 'ban-1',
    title: 'TechNova 2026 — Gold Sponsor Spotlight',
    subtitle: 'Powered by our sponsor DevWorks Systems',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'View Sponsor',
    ctaLink: '/events/evt-1',
    type: 'sponsor',
  },
  {
    id: 'ban-2',
    title: 'Modern Web Systems Workshop',
    subtitle: 'Two-day hands-on session — seats filling fast',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'Register Now',
    ctaLink: '/events/evt-1/register',
    type: 'workshop',
  },
  {
    id: 'ban-3',
    title: 'IEEE CS Student Branch — New Council Announced',
    subtitle: 'Meet the FA26 executive team',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'Meet the Team',
    ctaLink: '/about/hierarchy',
    type: 'announcement',
  },
  {
    id: 'ban-4',
    title: 'Partnered with Cloudline for Student Credits',
    subtitle: 'Get free cloud credits for your semester project',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'Learn More',
    ctaLink: '/quick-links',
    type: 'partner',
  },
  {
    id: 'ban-5',
    title: 'Past Paper Contribution Campaign',
    subtitle: 'Upload a paper, earn a contributor badge',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'Contribute Now',
    ctaLink: '/past-papers/contribute',
    type: 'campaign',
  },
];
