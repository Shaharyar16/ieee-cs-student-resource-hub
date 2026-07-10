import { motion } from 'framer-motion';
import type { RouteStep } from '@/types';

interface RouteStepListProps {
  steps: RouteStep[];
  estimatedTimeMinutes: number;
}

export default function RouteStepList({ steps, estimatedTimeMinutes }: RouteStepListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Step-by-step directions</h3>
        <span className="rounded-full bg-ieee-blue-light px-3 py-1 text-xs font-semibold text-ieee-blue">
          ⏱ ~{estimatedTimeMinutes} min walk
        </span>
      </div>
      <ol className="flex flex-col gap-3">
        {steps.map((step, idx) => (
          <motion.li
            key={step.order}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ieee-orange text-xs font-bold text-white">
              {step.order}
            </span>
            <p className="text-sm text-slate-700">{step.instruction}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
