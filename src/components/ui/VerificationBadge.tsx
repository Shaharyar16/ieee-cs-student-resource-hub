import type { VerificationStatus } from '@/types';
import Icon, { type IconName } from '@/components/ui/Icon';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
}

const config: Record<VerificationStatus, { label: string; icon: IconName; className: string }> = {
  verified: {
    label: 'Verified',
    icon: 'check',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-300',
  },
  pending: {
    label: 'Pending Review',
    icon: 'clock',
    className: 'bg-amber-50 text-amber-700 border-amber-300',
  },
  unverified: {
    label: 'Unverified',
    icon: 'alert',
    className: 'bg-slate-100 text-slate-600 border-slate-300',
  },
};

export default function VerificationBadge({ status, size = 'md' }: VerificationBadgeProps) {
  const c = config[status];
  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold ${sizeClass} ${c.className}`}
    >
      <Icon name={c.icon} className={iconSize} />
      {c.label}
    </span>
  );
}
