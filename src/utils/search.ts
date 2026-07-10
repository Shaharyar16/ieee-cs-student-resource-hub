import type { SearchResult } from '@/types';
import { papers } from '@/data/papers';
import { courses } from '@/data/courses';
import { events } from '@/data/events';
import { projects } from '@/data/projects';
import { announcements } from '@/data/announcements';
import { faqs } from '@/data/faqs';
import { destinations } from '@/data/destinations';
import { teachers } from '@/data/teachers';
import { quickLinks } from '@/data/quickLinks';

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  papers.forEach((p) =>
    results.push({
      id: p.id,
      title: p.title,
      type: 'Past Paper',
      description: `${p.courseName} — ${p.term} ${p.year} ${p.examType}`,
      tags: p.tags,
      link: `/past-papers/${p.id}`,
    })
  );

  courses.forEach((c) =>
    results.push({
      id: c.id,
      title: `${c.code} — ${c.name}`,
      type: 'Course',
      description: c.description,
      tags: [c.department],
      link: `/courses/${c.id}`,
    })
  );

  events.forEach((e) =>
    results.push({
      id: e.id,
      title: e.title,
      type: 'Event',
      description: e.description,
      tags: [e.category, e.timing],
      link: `/events/${e.id}`,
    })
  );

  projects.forEach((p) =>
    results.push({
      id: p.id,
      title: p.title,
      type: 'Project',
      description: p.tagline,
      tags: p.techStack,
      link: `/projects-expo/${p.id}`,
    })
  );

  announcements.forEach((a) =>
    results.push({
      id: a.id,
      title: a.title,
      type: 'Announcement',
      description: a.summary,
      tags: [a.category],
      link: `/announcements/${a.id}`,
    })
  );

  faqs.forEach((f) =>
    results.push({
      id: f.id,
      title: f.question,
      type: 'FAQ',
      description: f.answer,
      tags: [f.category],
      link: `/faq-contact`,
    })
  );

  destinations.forEach((d) =>
    results.push({
      id: d.id,
      title: d.name,
      type: 'Room / Lab',
      description: `${d.floor} — ${d.description}`,
      tags: [d.floor],
      link: `/navigation`,
    })
  );

  teachers.forEach((t) =>
    results.push({
      id: t.id,
      title: t.name,
      type: 'Teacher',
      description: `${t.designation}, ${t.department}`,
      tags: [t.department],
      link: `/courses/teachers`,
    })
  );

  quickLinks.forEach((q) =>
    results.push({
      id: q.id,
      title: q.label,
      type: 'Quick Link',
      description: q.category,
      tags: [q.category],
      link: q.url.startsWith('/') ? q.url : '/quick-links',
    })
  );

  return results;
}

const searchIndex = buildIndex();

export function search(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
