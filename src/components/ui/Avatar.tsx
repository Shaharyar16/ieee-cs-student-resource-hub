interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
};

// Deterministic warm gradient from the name so each person keeps a stable color.
const gradients = [
  'from-ieee-orange to-ieee-yellow',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-orange-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-orange-600',
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        className={`${sizeMap[size]} shrink-0 rounded-full object-cover ring-2 ring-white ${className}`}
      />
    );
  }
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradient = gradients[hash % gradients.length];
  return (
    <span
      aria-hidden="true"
      className={`${sizeMap[size]} inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-bold text-white ring-2 ring-white ${className}`}
    >
      {initials(name)}
    </span>
  );
}
