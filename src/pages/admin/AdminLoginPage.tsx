import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prototype only — no real authentication yet.
    navigate('/admin/dashboard');
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
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ieee-navy text-lg font-bold text-white">
            CS
          </span>
        </div>
        <h1 className="mt-4 text-center text-xl font-bold text-slate-900">Admin Panel Login</h1>
        <p className="mt-1 text-center text-sm text-slate-500">IEEE CS Student Resource Hub</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@ieeecs.edu"
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
          <button type="submit" className="mt-2 rounded-xl bg-ieee-orange px-5 py-3 font-semibold text-white shadow-sm hover:bg-ieee-orange-dark">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">Prototype login — any credentials will work.</p>
      </motion.div>
    </div>
  );
}
