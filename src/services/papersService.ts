import type { Paper } from '@/types';
import { papers as seedPapers } from '@/data/papers';
import { readJSON, writeJSON, makeId } from '@/utils/storage';

/**
 * Past papers = seeded archive + student contributions persisted in
 * localStorage. Async + API-shaped so it swaps to a real backend later without
 * touching the pages. Contributed papers appear first (newest) and carry the
 * contributor's name so it can be shown on the paper.
 */

const KEY = 'ieeecs_contributed_papers';
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

const contributed = (): Paper[] => readJSON<Paper[]>(KEY, []);

export interface ContributePaperInput {
  courseId: string;
  courseName: string;
  title: string;
  term: string;
  year: number;
  examType: Paper['examType'];
  instructor: string;
  contributorName: string;
  tags: string[];
}

export const papersService = {
  async list(): Promise<Paper[]> {
    await delay();
    return [...contributed(), ...seedPapers];
  },

  async get(id: string): Promise<Paper | null> {
    await delay();
    return [...contributed(), ...seedPapers].find((p) => p.id === id) ?? null;
  },

  async contribute(input: ContributePaperInput): Promise<Paper> {
    await delay();
    const paper: Paper = {
      id: makeId('paper'),
      courseId: input.courseId,
      courseName: input.courseName,
      title: input.title.trim(),
      term: input.term.trim(),
      year: input.year,
      examType: input.examType,
      instructor: input.instructor.trim() || 'Not specified',
      fileUrl: '#',
      uploadedBy: input.contributorName.trim() || 'Anonymous',
      uploadedDate: new Date().toISOString().slice(0, 10),
      verification: 'pending',
      tags: input.tags,
      downloads: 0,
    };
    writeJSON(KEY, [paper, ...contributed()]);
    return paper;
  },
};
