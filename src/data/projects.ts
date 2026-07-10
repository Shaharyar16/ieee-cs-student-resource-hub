import type { ProjectItem } from '@/types';

export const projects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'CampusNav — Indoor Navigation App',
    tagline: 'Helping students find rooms and labs inside the CS building',
    problem:
      'New students frequently get lost inside the CS building trying to locate labs and faculty offices.',
    solution:
      'A mobile-friendly indoor navigation web app that provides step-by-step visual directions from any entrance to any destination.',
    features: [
      'Entrance and destination-type based route selection',
      'Animated SVG route rendering',
      'Estimated walking time calculation',
      'Report wrong route feedback loop',
    ],
    team: [
      { name: 'Ali Hamza', role: 'Frontend Lead' },
      { name: 'Zainab Iqbal', role: 'Backend Developer' },
      { name: 'Bilal Ahmed', role: 'UI/UX Designer' },
    ],
    supervisor: 'Dr. Imran Sheikh',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    screenshots: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?auto=format&fit=crop&w=900&q=80',
    ],
    demoUrl: '#',
    githubUrl: '#',
    learnings: [
      'Handling SVG animation performance on low-end devices',
      'Designing intuitive multi-step forms',
    ],
    category: 'Mobile & Web',
    year: 2026,
    verification: 'verified',
  },
  {
    id: 'proj-2',
    title: 'PaperVault — Smart Past Paper Archive',
    tagline: 'A searchable, tagged archive of past exam papers',
    problem:
      'Past papers were scattered across group chats and drives, hard to search or verify.',
    solution:
      'A centralized web archive with tagging, verification badges, and course-based filtering.',
    features: ['Full-text search', 'Tag-based filters', 'Contributor verification workflow'],
    team: [
      { name: 'Fatima Noor', role: 'Full Stack Developer' },
      { name: 'Hamza Tariq', role: 'Backend Developer' },
    ],
    supervisor: 'Dr. Nadia Farooq',
    techStack: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    screenshots: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    ],
    demoUrl: '#',
    githubUrl: '#',
    learnings: ['Designing an efficient tagging and search schema'],
    category: 'Web Platforms',
    year: 2025,
    verification: 'verified',
  },
  {
    id: 'proj-3',
    title: 'StudyBuddy — AI Study Planner',
    tagline: 'Personalized study schedules generated with AI',
    problem: 'Students struggle to plan effective revision schedules before exams.',
    solution:
      'An AI-assisted planner that generates a personalized weekly revision schedule based on course load and exam dates.',
    features: ['AI-generated schedules', 'Progress tracking', 'Reminder notifications'],
    team: [
      { name: 'Sara Malik', role: 'ML Engineer' },
      { name: 'Usman Riaz', role: 'Frontend Developer' },
    ],
    supervisor: 'Dr. Fahad Aslam',
    techStack: ['Python', 'FastAPI', 'React'],
    screenshots: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=80',
    ],
    githubUrl: '#',
    learnings: ['Fine-tuning prompt strategies for scheduling logic'],
    category: 'Artificial Intelligence',
    year: 2026,
    verification: 'pending',
  },
  {
    id: 'proj-4',
    title: 'EcoTrack — Campus Sustainability Dashboard',
    tagline: 'Visualizing campus energy and waste metrics',
    problem: 'The university lacked visibility into building-level energy and waste data.',
    solution: 'A dashboard aggregating sensor data into actionable sustainability insights.',
    features: ['Real-time charts', 'Building comparison view', 'Monthly reports export'],
    team: [{ name: 'Ayesha Khan', role: 'Data Engineer' }],
    supervisor: 'Dr. Nadia Farooq',
    techStack: ['Vue.js', 'D3.js', 'Firebase'],
    screenshots: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80',
    ],
    githubUrl: '#',
    learnings: ['Working with time-series data visualization at scale'],
    category: 'Data & Visualization',
    year: 2025,
    verification: 'verified',
  },
];
