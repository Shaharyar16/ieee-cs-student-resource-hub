import { useNavigate } from 'react-router-dom';
import { adminAuthService } from '@/services/adminAuthService';

interface AdminTopbarProps {
  title: string;
}

const roleLabel: Record<string, string> = {
  'super-admin': 'Super Admin',
  editor: 'Editor',
  moderator: 'Moderator',
};

export default function AdminTopbar({ title }: AdminTopbarProps) {
  const navigate = useNavigate();
  const admin = adminAuthService.getCurrentAdmin();

  const logout = () => {
    adminAuthService.logoutAdmin();
    navigate('/portal/login', { replace: true });
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <h1 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
      <div className="flex items-center gap-3">
        {admin && (
          <span className="hidden text-sm text-slate-500 sm:block">
            {admin.name} ({roleLabel[admin.role] ?? admin.role})
          </span>
        )}
        <button
          onClick={logout}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
