import type { ProjectPost, ProjectComment, User } from '@/types';
import { makeId } from '@/utils/storage';
import { readCollection, writeCollection } from '@/services/store';
import { projectSeed } from '@/data/projectSeed';

/**
 * Projects feed backed by the shared "projectPosts" collection, so the public
 * feed and the admin Projects page read/write the exact same data (admin
 * moderation is reflected live). Async + API-shaped for an easy backend swap.
 * Likes/reposts are stored as the set of account ids that performed them.
 */

export const PROJECTS_KEY = 'projectPosts';
const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const readAll = (): ProjectPost[] => readCollection<ProjectPost>(PROJECTS_KEY, projectSeed);
const writeAll = (posts: ProjectPost[]): void => writeCollection(PROJECTS_KEY, posts);

// --- pure helpers usable directly by the UI --------------------------------
export const likeCount = (p: ProjectPost) => p.baseLikes + p.likedBy.length;
export const repostCount = (p: ProjectPost) => p.baseReposts + p.repostedBy.length;
export const commentCount = (p: ProjectPost) => p.comments.length;
export const hasLiked = (p: ProjectPost, userId?: string | null) => !!userId && p.likedBy.includes(userId);
export const hasReposted = (p: ProjectPost, userId?: string | null) => !!userId && p.repostedBy.includes(userId);

export interface CreateProjectInput {
  title: string;
  tagline: string;
  description: string;
  creators: string[];
  techStack: string[];
  screenshots: string[];
  githubUrl?: string;
  demoUrl?: string;
  category?: string;
}

export const projectsService = {
  async list(): Promise<ProjectPost[]> {
    await delay();
    return readAll();
  },

  async get(id: string): Promise<ProjectPost | null> {
    await delay();
    return readAll().find((p) => p.id === id) ?? null;
  },

  async create(input: CreateProjectInput, author: User): Promise<ProjectPost> {
    await delay();
    const post: ProjectPost = {
      id: makeId('proj'),
      title: input.title.trim(),
      tagline: input.tagline.trim(),
      description: input.description.trim(),
      creators: input.creators.map((c) => c.trim()).filter(Boolean),
      techStack: input.techStack.map((t) => t.trim()).filter(Boolean),
      screenshots: input.screenshots.slice(0, 3),
      githubUrl: input.githubUrl?.trim() || undefined,
      demoUrl: input.demoUrl?.trim() || undefined,
      category: input.category?.trim() || undefined,
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      createdAt: new Date().toISOString(),
      baseLikes: 0,
      likedBy: [],
      baseReposts: 0,
      repostedBy: [],
      comments: [],
    };
    writeAll([post, ...readAll()]);
    return post;
  },

  async toggleLike(id: string, userId: string): Promise<ProjectPost> {
    await delay(120);
    const posts = readAll();
    const post = posts.find((p) => p.id === id);
    if (!post) throw new Error('Project not found.');
    post.likedBy = post.likedBy.includes(userId)
      ? post.likedBy.filter((u) => u !== userId)
      : [...post.likedBy, userId];
    writeAll(posts);
    return post;
  },

  async toggleRepost(id: string, userId: string): Promise<ProjectPost> {
    await delay(120);
    const posts = readAll();
    const post = posts.find((p) => p.id === id);
    if (!post) throw new Error('Project not found.');
    post.repostedBy = post.repostedBy.includes(userId)
      ? post.repostedBy.filter((u) => u !== userId)
      : [...post.repostedBy, userId];
    writeAll(posts);
    return post;
  },

  async addComment(id: string, author: User, body: string): Promise<ProjectPost> {
    await delay(150);
    const posts = readAll();
    const post = posts.find((p) => p.id === id);
    if (!post) throw new Error('Project not found.');
    const comment: ProjectComment = {
      id: makeId('cmt'),
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };
    post.comments = [...post.comments, comment];
    writeAll(posts);
    return post;
  },
};
