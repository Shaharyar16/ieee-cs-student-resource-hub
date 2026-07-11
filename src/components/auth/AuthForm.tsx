import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import type { LoginInput, SignupInput } from '@/services/authService';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onModeChange: (m: 'login' | 'signup') => void;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  onSuccess?: () => void;
}

function Field({
  icon,
  ...props
}: { icon: ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group relative flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition-all focus-within:border-ieee-orange focus-within:ring-2 focus-within:ring-ieee-orange/20">
      <span className="text-slate-400 transition-colors group-focus-within:text-ieee-orange">{icon}</span>
      <input
        {...props}
        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}

export default function AuthForm({ mode, onModeChange, login, signup, onSuccess }: AuthFormProps) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'signup') {
        await signup({ name: form.name, email: form.email, password: form.password });
      } else {
        await login({ email: form.email, password: form.password });
      }
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {mode === 'signup' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Field
              icon={<UserIcon className="h-4 w-4" />}
              type="text"
              placeholder="Full name"
              autoComplete="name"
              required
              value={form.name}
              onChange={set('name')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Field
        icon={<Mail className="h-4 w-4" />}
        type="email"
        placeholder="you@student.comsats.edu.pk"
        autoComplete="email"
        required
        value={form.email}
        onChange={set('email')}
      />
      <Field
        icon={<Lock className="h-4 w-4" />}
        type="password"
        placeholder={mode === 'signup' ? 'Create a password (min 6 chars)' : 'Password'}
        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        required
        value={form.password}
        onChange={set('password')}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={busy}
        data-cursor="link"
        className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-ieee-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.32)] transition hover:bg-ieee-orange-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        {mode === 'signup' ? 'Create account' : 'Log in'}
      </button>

      <p className="text-center text-sm text-slate-500">
        {mode === 'signup' ? 'Already have an account?' : 'New here?'}{' '}
        <button
          type="button"
          onClick={() => {
            setError(null);
            onModeChange(mode === 'signup' ? 'login' : 'signup');
          }}
          className="font-semibold text-ieee-orange hover:underline"
        >
          {mode === 'signup' ? 'Log in' : 'Create an account'}
        </button>
      </p>
    </form>
  );
}
