import { useNavigate } from 'react-router-dom';

interface AdminTopbarProps {
  title: string;
}

export default function AdminTopbar({ title }: AdminTopbarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <h1 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 sm:block">Ayesha Khan (Super Admin)</span>
        <button
          onClick={() => navigate('/admin/login')}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
