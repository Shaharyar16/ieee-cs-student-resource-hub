// Shared domain types. These mirror the shape a future REST/GraphQL API would return,
// so swapping dummy JSON for real fetch calls should not require changing consumers.

export type VerificationStatus = 'verified' | 'unverified' | 'pending';

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  body: string;
  date: string;
  category: 'general' | 'event' | 'academic' | 'navigation' | 'projects';
  pinned?: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaLabel: string;
  ctaLink: string;
  type: 'sponsor' | 'workshop' | 'announcement' | 'partner' | 'campaign';
}

export type EventCategory = 'workshop' | 'competition' | 'seminar' | 'hackathon';
export type EventTiming = 'upcoming' | 'previous' | 'featured';

export interface EventOutcome {
  attendees: number;
  highlights: string[];
  gallery?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  venue: string;
  category: EventCategory;
  timing: EventTiming;
  featured?: boolean;
  registrationOpen: boolean;
  capacity: number;
  registered: number;
  image: string;
  organizers: string[];
  outcome?: EventOutcome;
}

export interface Paper {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  term: string;
  year: number;
  examType: 'Midterm' | 'Final' | 'Quiz' | 'Assignment';
  instructor: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedDate: string;
  verification: VerificationStatus;
  tags: string[];
  downloads: number;
}

export interface WeeklyTopic {
  week: number;
  topic: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  creditHours: number;
  department: string;
  description: string;
  outcomes: string[];
  syllabus: WeeklyTopic[];
  cdfUrl?: string;
  labManualUrl?: string;
  teacherIds: string[];
  usefulLinks: { label: string; url: string }[];
  tips: string[];
  verification: VerificationStatus;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  office: string;
  courses: string[];
  photo: string;
}

export interface RouteEntrance {
  id: string;
  name: string;
  description: string;
}

export interface DestinationType {
  id: string;
  label: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  typeId: string;
  floor: string;
  description: string;
}

export interface RouteStep {
  order: number;
  instruction: string;
}

export interface RouteInfo {
  id: string;
  entranceId: string;
  destinationId: string;
  steps: RouteStep[];
  estimatedTimeMinutes: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
  team: { name: string; role: string }[];
  supervisor: string;
  techStack: string[];
  screenshots: string[];
  demoUrl?: string;
  githubUrl?: string;
  learnings: string[];
  category: string;
  year: number;
  verification: VerificationStatus;
}

export interface HierarchyMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  email?: string;
  linkedin?: string;
}

export interface HierarchyTerm {
  term: string;
  members: HierarchyMember[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface QuickLink {
  id: string;
  label: string;
  url: string;
  category:
    | 'University Portals'
    | 'Academic Resources'
    | 'Society Links'
    | 'Forms'
    | 'Event Links'
    | 'Past Paper Links'
    | 'Student Help';
  icon?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category:
    | 'IEEE CS'
    | 'Past Papers'
    | 'Courses'
    | 'Events'
    | 'Navigation'
    | 'Projects Expo'
    | 'Contributions'
    | 'Technical Issues';
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  description: string;
  images: GalleryImage[];
}

export type SubmissionType =
  | 'paper'
  | 'course-correction'
  | 'project'
  | 'navigation-report'
  | 'event-photos'
  | 'feedback'
  | 'sponsorship'
  | 'paper-request'
  | 'event-registration'
  | 'contact';

export interface Submission {
  id: string;
  type: SubmissionType;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  data: Record<string, string>;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'editor' | 'moderator';
  lastActive: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  link: string;
}

export interface DeveloperLinks {
  portfolio?: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface Developer {
  id: string;
  name: string;
  role: string;
  photo: string;
  contribution: string;
  bio: string;
  skills: string[];
  links: DeveloperLinks;
}
