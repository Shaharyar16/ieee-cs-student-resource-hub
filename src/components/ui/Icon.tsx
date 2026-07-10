export type IconName =
  | 'search'
  | 'close'
  | 'menu'
  | 'check'
  | 'alert'
  | 'arrow-left'
  | 'arrow-right'
  | 'external-link'
  | 'building'
  | 'classroom'
  | 'lab'
  | 'faculty'
  | 'department'
  | 'seminar'
  | 'washroom'
  | 'stairs'
  | 'notice'
  | 'pin'
  | 'door'
  | 'calendar'
  | 'clock'
  | 'mail'
  | 'folder'
  | 'image'
  | 'question'
  | 'inbox'
  | 'user'
  | 'users'
  | 'settings'
  | 'megaphone'
  | 'book'
  | 'flask'
  | 'link'
  | 'layers'
  | 'upload'
  | 'file'
  | 'grid'
  | 'compass'
  | 'message'
  | 'chart'
  | 'shield';

interface IconProps {
  name: IconName;
  className?: string;
}

const paths: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </>
  ),
  'external-link': (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
    </>
  ),
  classroom: (
    <>
      <path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M15 4v5h5" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  lab: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  faculty: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </>
  ),
  department: (
    <>
      <rect x="3" y="10" width="7" height="10" rx="1" />
      <rect x="14" y="6" width="7" height="14" rx="1" />
      <path d="M6 14h1M6 17h1M17 10h1M17 13h1M17 16h1" />
    </>
  ),
  seminar: (
    <>
      <path d="M3 20 12 4l9 16Z" />
      <path d="M8 20v-5h8v5" />
    </>
  ),
  washroom: (
    <>
      <circle cx="8" cy="5" r="2" />
      <path d="M5 20v-6l-1.5-4.5A1 1 0 0 1 4.5 8h7a1 1 0 0 1 1 1.5L11 14v6" />
      <circle cx="17" cy="5" r="2" />
      <path d="M17 8v12M14 12h6" />
    </>
  ),
  stairs: (
    <>
      <path d="M4 20v-4h4v-4h4v-4h4V4h4" />
    </>
  ),
  notice: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  door: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M14 12h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6 8 7 8-7" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.75" />
      <path d="m21 16-5.5-5.5L4 20" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.9" />
      <path d="M12 17h.01" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 12h4l1.5 3h5L16 12h4" />
      <rect x="3" y="5" width="18" height="14" rx="2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.5 20c0-3.3 3-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M16 14.5c2.4.4 4.5 2.3 4.5 5.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.64 8.6a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.24a1.7 1.7 0 0 0 1-1.55V2.6a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 15 4.24a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 9c.1.6.5 1.14 1 1.4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l2 5h2l-1-5h4l6 4V6l-6 4H6a2 2 0 0 0-2 2Z" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.5 14h9" />
    </>
  ),
  link: (
    <>
      <path d="M9 15l6-6" />
      <path d="M11 6.5 12.5 5a3.5 3.5 0 1 1 5 5l-1.5 1.5" />
      <path d="M13 17.5 11.5 19a3.5 3.5 0 1 1-5-5l1.5-1.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-1.7 5.2-5.2 1.7 1.7-5.2 5.2-1.7Z" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 4.5 3.4 7.9 8 9 4.6-1.1 8-4.5 8-9V6Z" />,
};

export default function Icon({ name, className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
