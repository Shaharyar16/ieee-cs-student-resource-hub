# IEEE CS Student Resource Hub — Frontend Prototype

A modern, animated, fully-responsive frontend prototype for a university IEEE Computer Society
Student Branch Chapter. Includes a full public-facing site and a companion admin panel, both
running on dummy JSON data structured to make a future backend swap straightforward.

**Live demo:** https://ieee-cs-student-resource-hub.vercel.app
**Repository:** https://github.com/Muhammad-Ahsan-001/ieee-cs-student-resource-hub

## Tech Stack

- **React 19 + Vite + TypeScript**
- **React Router v7** (data-router / `createBrowserRouter`)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for animation (page transitions, reveals, SVG route drawing, counters, etc.)
- A small hand-rolled SVG icon set (`src/components/ui/Icon.tsx`) — no emoji or external icon
  package is used anywhere in the UI
- Dummy JSON data modules under `src/data`
- Local component state + `localStorage` for form submissions (no real backend)

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

Other scripts:

```bash
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build locally
```

## Project Structure

```
docs/
└── mermaid_diagrams/  # Workflow / sitemap diagrams for the public site and admin panel
src/
├── components/
│   ├── layout/       # PublicLayout, AdminLayout, Footer, HeroSection, QuickLinkGrid, BannerCarousel
│   ├── navigation/    # Header, AnnouncementBar, RouteMap, RouteStepList
│   ├── cards/         # EventCard, PaperCard, CourseCard, TeacherCard, ProjectCard, GalleryAlbumCard,
│   │                   # FAQAccordion, DeveloperCard
│   ├── forms/         # (form field primitives live in components/ui, reused across all forms)
│   ├── admin/         # AdminSidebar, AdminTopbar, AdminMetricCard, AdminTable, AdminEditDrawer
│   └── ui/            # StatusBadge, VerificationBadge, SearchBar, FilterPanel, FormShell, FormField,
│                       # FileUploadBox, Stepper, EmptyState, ConfirmModal, SuccessState, Icon
├── data/              # Dummy data: announcements, banners, events, papers, courses, teachers,
│                       # routes, destinations, projects, hierarchy, timeline, quickLinks, faqs,
│                       # gallery, submissions, adminUsers, developers
├── pages/
│   ├── public/        # All public-facing pages (incl. DevelopersPage)
│   └── admin/          # All admin panel pages (incl. AdminDevelopersPage)
├── routes/            # React Router route tree (routes/index.tsx)
├── types/              # Shared TypeScript domain types (mirrors a future API response shape)
└── utils/              # storage.ts (localStorage helpers), search.ts (global search index)
```

## What Was Built

**Public site**
- Home page with animated announcement ticker, hero, quick links grid, banner carousel,
  upcoming events preview, academic resources preview, navigation preview, projects expo
  preview, and about preview.
- About, Hierarchy (with semester selector, FA24→FA26 archive), Timeline.
- Past Papers: browse with search/filters, detail page, contribute form, request-missing form.
- Courses: browse with search/filters, detail page (syllabus, CDF, lab manual, outcomes, tips),
  teacher directory (no ratings), suggest-correction form.
- Events: tabbed listing (Upcoming/Previous/Featured/Workshops/Competitions/Seminars/Hackathons),
  detail page with outcome sections for past events, registration form.
- Navigation: 4-step stepper (entrance → destination type → destination → animated SVG route)
  with estimated walking time and step list, plus a report-wrong-route form.
- Projects Expo: browse with filters, detail page (problem/solution/features/team/tech/demo),
  submit-project form.
- Quick Links (7 categories), Announcements (list + detail), Gallery (albums + detail grids),
  Contribute hub, FAQ & Contact (categorized FAQ + contact form), global Search, Privacy &
  Disclaimer.
- Developers page (`/developers`, linked from the footer) — cards for each site contributor
  with photo, position in the society, contribution summary, bio, skills, and contact/portfolio/
  GitHub/LinkedIn links.
- Every form ends in an animated `SuccessState` and (where relevant) persists to `localStorage`.

**Admin panel**
- Login (prototype-only, no real auth), Dashboard with animated metric counters and
  progress bars, and CRUD-style management pages for Events, Banners, Past Papers (with
  verify action), Courses, Projects (with approve action), Navigation/Destinations, Hierarchy
  (per-semester), Submissions (approve/reject workflow reading from both seed + localStorage
  data), Quick Links, Announcements, Gallery, FAQ, Users, Developers (full add/edit/delete —
  the only admin page with fully wired local CRUD, as a reference for wiring the rest), and
  Settings.

**Animation**
Framer Motion powers page transitions, header nav hover/underline, the ticker marquee, hero
reveal, card hover-lift, scroll-triggered section reveals, search result stagger, the SVG route
draw + pulsing markers on the navigation map, form success checkmarks, admin metric counters,
dashboard progress-bar fade-ins, and modal/drawer slide-ins. All animations respect
`prefers-reduced-motion` via a global CSS override in `src/index.css`.

## Workflow Diagrams

Visual references for how the site and admin panel are structured and how users move through
them, kept in [`docs/mermaid_diagrams/`](docs/mermaid_diagrams).

### Public Website Sitemap / Information Architecture
[docs/mermaid_diagrams/Public Website Sitemap  Information Architecture.png](<docs/mermaid_diagrams/Public Website Sitemap  Information Architecture.png>)

### Public Website Primary User Flow — Landing Page to Conversion
[docs/mermaid_diagrams/Public Website Primary User Flow — Landing Page to Conversion.png](<docs/mermaid_diagrams/Public Website Primary User Flow — Landing Page to Conversion.png>)

### Admin Panel Sitemap / Information Architecture
[docs/mermaid_diagrams/Admin Panel Sitemap  Information Architecture.png](<docs/mermaid_diagrams/Admin Panel Sitemap  Information Architecture.png>)

### Admin Panel Primary User Flow — Logged Out vs Logged In
[docs/mermaid_diagrams/Admin Panel Primary User Flow — Logged Out vs Logged In.png](<docs/mermaid_diagrams/Admin Panel Primary User Flow — Logged Out vs Logged In.png>)

### Combined Public-to-Admin Content Moderation Flow
[docs/mermaid_diagrams/Combined Public-to-Admin Content Moderation Flow.png](<docs/mermaid_diagrams/Combined Public-to-Admin Content Moderation Flow.png>)

### Developers Page Flow — Public and Admin
[docs/mermaid_diagrams/Developers Page Flow — Public and Admin.png](<docs/mermaid_diagrams/Developers Page Flow — Public and Admin.png>)

## Connecting a Real Backend Later

The data layer was deliberately kept thin so it can be swapped without touching components:

1. Each file in `src/data/*.ts` exports typed arrays matching the interfaces in `src/types/index.ts`.
   Replace these exports with `fetch`/API calls (e.g. React Query or SWR) returning the same shapes.
2. Form submissions currently call `appendToStorage` from `src/utils/storage.ts`. Swap this for a
   `POST` to your submissions endpoint; the `Submission` type already models `status`
   (pending/approved/rejected) for a moderation workflow.
3. `src/utils/search.ts` builds an in-memory index from the dummy data — replace with a real
   search endpoint (e.g. Postgres full-text search or an external search service) and keep the
   same `SearchResult` shape.
4. Admin pages currently mutate local React state as a stand-in for real writes (verify/approve/
   delete). Wire these buttons to real mutation endpoints and add optimistic updates or refetching.
5. `AdminLoginPage` has no real authentication — add a real auth provider (JWT/session) and guard
   `/admin/*` routes with a route guard component.
6. Image URLs currently point to Unsplash/pravatar placeholders — swap for uploaded assets once
   file upload storage (e.g. S3) is wired to `FileUploadBox`.
