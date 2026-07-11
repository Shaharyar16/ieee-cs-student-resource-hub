import type { ReactNode } from 'react';

interface DownloadButtonProps {
  url?: string;
  filename?: string;
  label: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

/** A file is "available" when it's a real uploaded URL/data-URL (not a '#' placeholder). */
export function hasFile(url?: string): boolean {
  return !!url && url.trim() !== '' && url.trim() !== '#';
}

/**
 * Downloads the file when one is actually uploaded; otherwise renders a clearly
 * disabled control so no button ever points to nothing.
 */
export default function DownloadButton({ url, filename, label, icon, className = '', onClick }: DownloadButtonProps) {
  if (hasFile(url)) {
    return (
      <a
        href={url}
        download={filename ?? true}
        target="_blank"
        rel="noreferrer"
        data-cursor="link"
        onClick={onClick}
        className={className}
      >
        {icon}
        {label}
      </a>
    );
  }
  return (
    <span
      aria-disabled="true"
      title="Not uploaded yet"
      className={`${className} pointer-events-none cursor-not-allowed opacity-50`}
    >
      {icon}
      {label}
      <span className="ml-1 text-[11px] font-normal opacity-80">· not uploaded</span>
    </span>
  );
}
