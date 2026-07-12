import { useState } from 'react';

interface BrandLogoProps {
  /** Tailwind size classes, e.g. "h-9 w-9". */
  className?: string;
}

/**
 * The IEEE CS CUI mark. Renders /brand-logo.png (drop the real logo there); if
 * the file is missing it gracefully falls back to the "CS" badge so nothing
 * ever looks broken.
 */
export default function BrandLogo({ className = 'h-9 w-9' }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`flex items-center justify-center rounded-lg bg-ieee-orange text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,108,12,0.4)] ${className}`}
      >
        CS
      </span>
    );
  }

  // Clip to a circle so a square logo's background corners never show.
  return (
    <img
      src="/brand-logo.png"
      alt="IEEE CS COMSATS University Islamabad"
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
