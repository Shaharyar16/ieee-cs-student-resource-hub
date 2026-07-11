import type { Paper } from '@/types';
import { papers as seedPapers } from '@/data/papers';
import { readCollection, writeCollection } from '@/services/store';
import { makeId } from '@/utils/storage';

/**
 * Past papers live in the shared "papers" collection so the admin panel, the
 * public archive, and student contributions all read/write the same source.
 * Admin edits + verification are instantly reflected on the site. Async +
 * API-shaped for an easy backend swap later.
 */

const KEY = 'papers';
const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

const all = (): Paper[] => readCollection<Paper>(KEY, seedPapers);

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
  fileUrl?: string;
}

export const papersService = {
  async list(): Promise<Paper[]> {
    await delay();
    return all();
  },

  async get(id: string): Promise<Paper | null> {
    await delay();
    return all().find((p) => p.id === id) ?? null;
  },

  /** Student contribution — enters as pending for the admin verification queue. */
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
      fileUrl: input.fileUrl || '#',
      uploadedBy: input.contributorName.trim() || 'Anonymous',
      uploadedDate: new Date().toISOString().slice(0, 10),
      verification: 'pending',
      tags: input.tags,
      downloads: 0,
    };
    writeCollection(KEY, [paper, ...all()]);
    return paper;
  },
};
