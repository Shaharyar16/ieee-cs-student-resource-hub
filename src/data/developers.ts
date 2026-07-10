import type { Developer } from '@/types';

export const developers: Developer[] = [
  {
    id: 'dev-1',
    name: 'Hamza Ahsan',
    role: 'Lead Developer & Project Maintainer',
    photo: 'https://i.pravatar.cc/300?img=68',
    contribution: 'Architected the resource hub, built the public site and admin panel, and led the overall product design.',
    bio: 'Full-stack developer focused on building clean, fast, and accessible tools for student communities.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Product Design'],
    links: {
      portfolio: 'https://example.dev',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'hamza.ahsan@example.edu',
    },
  },
  {
    id: 'dev-2',
    name: 'Zainab Iqbal',
    role: 'Frontend Developer',
    photo: 'https://i.pravatar.cc/300?img=48',
    contribution: 'Built the Past Papers and Courses modules, including search, filters, and detail pages.',
    bio: 'Enjoys crafting smooth UI interactions and making data-heavy pages easy to browse.',
    skills: ['React', 'Framer Motion', 'UI/UX'],
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'dev-3',
    name: 'Bilal Ahmed',
    role: 'UI/UX Designer',
    photo: 'https://i.pravatar.cc/300?img=13',
    contribution: 'Designed the visual system, color palette, and component library used across the hub.',
    bio: 'Designer with a soft spot for clean academic-tech interfaces and accessible color systems.',
    skills: ['Figma', 'Design Systems', 'Accessibility'],
    links: {
      portfolio: 'https://example.design',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'dev-4',
    name: 'Usman Riaz',
    role: 'Backend & Data Developer',
    photo: 'https://i.pravatar.cc/300?img=14',
    contribution: 'Structured the dummy data layer and defined the shapes that will map to the future API.',
    bio: 'Interested in backend architecture, data modeling, and developer tooling.',
    skills: ['Node.js', 'PostgreSQL', 'API Design'],
    links: {
      github: 'https://github.com',
      email: 'usman.riaz@example.edu',
    },
  },
  {
    id: 'dev-5',
    name: 'Sara Malik',
    role: 'QA & Content Coordinator',
    photo: 'https://i.pravatar.cc/300?img=44',
    contribution: 'Tested every form and flow across the site and coordinated the dummy content for events and papers.',
    bio: 'Detail-oriented tester who loves catching edge cases before users do.',
    skills: ['QA Testing', 'Content Strategy'],
    links: {
      linkedin: 'https://linkedin.com',
      email: 'sara.malik@example.edu',
    },
  },
];
