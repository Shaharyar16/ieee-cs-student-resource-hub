import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
}

export default function FormShell({ title, description, children, onSubmit, submitLabel = 'Submit' }: FormShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
        {children}
        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-ieee-orange px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-ieee-orange-dark active:scale-[0.99]"
        >
          {submitLabel}
        </button>
      </form>
    </motion.div>
  );
}
