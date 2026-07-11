import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { adminAuthService } from '@/services/adminAuthService';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await adminAuthService.loginAdmin(form.email, form.password);
      navigate('/portal/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ieee-blue-light px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
      >
        <div className="flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ieee-navy text-white">
            <ShieldCheck className="h-6 w-6" />
          </span>
        </div>
        <h1 className="mt-4 text-center text-xl font-bold text-slate-900">Team Portal</h1>
        <p className="mt-1 text-center text-sm text-slate-500">IEEE CS · Authorized team members only</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Team Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@ieeecs.edu"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-ieee-orange focus:ring-2 focus:ring-ieee-orange/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-ieee-orange focus:ring-2 focus:ring-ieee-orange/20"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ieee-orange px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-ieee-orange-dark disabled:opacity-70"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">
          Prototype: any team email + password <span className="font-mono text-slate-500">ieeecs</span>
        </p>
      </motion.div>
    </div>
  );
}
