import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import type { ReactNode } from 'react';
import { adminAuthService } from '@/services/adminAuthService';
import Avatar from '@/components/ui/Avatar';

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  /** Optional primary action (e.g. an "Add" button) shown on the right. */
  action?: ReactNode;
}

const roleLabel: Record<string, string> = {
  'super-admin': 'Super Admin',
  editor: 'Editor',
  moderator: 'Moderator',
};

export default function AdminTopbar({ title, subtitle, action }: AdminTopbarProps) {
  const navigate = useNavigate();
  const admin = adminAuthService.getCurrentAdmin();

  const logout = () => {
    adminAuthService.logoutAdmin();
    navigate('/portal/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-black/5 bg-white/85 px-4 py-3.5 backdrop-blur-xl sm:px-6">
      <div className="min-w-0">
        <h1 className="truncate font-display text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
        {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {action}
        {admin && (
          <div className="hidden items-center gap-2.5 rounded-full border border-black/5 bg-cream/60 py-1 pl-1 pr-3 sm:flex">
            <Avatar name={admin.name} size="sm" />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-slate-800">{admin.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ieee-orange">
                {roleLabel[admin.role] ?? admin.role}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
          aria-label="Log out"
        >
          <LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}
