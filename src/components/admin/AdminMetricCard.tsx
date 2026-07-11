import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon, { type IconName } from '@/components/ui/Icon';

interface AdminMetricCardProps {
  label: string;
  value: number;
  icon: IconName;
  suffix?: string;
  accent?: 'orange' | 'blue' | 'emerald' | 'amber';
  delay?: number;
}

const accentClasses: Record<string, string> = {
  orange: 'bg-ieee-orange/10 text-ieee-orange',
  blue: 'bg-sky-100 text-sky-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
};

export default function AdminMetricCard({ label, value, icon, suffix = '', accent = 'orange', delay = 0 }: AdminMetricCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 24;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      current += increment;
      setCount(Math.min(Math.round(current), value));
      if (step >= steps) clearInterval(timer);
    }, 22);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-[0_8px_30px_rgba(10,10,12,0.05)]"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-ieee-orange/[0.04] blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-slate-900">
        {count}
        {suffix}
      </p>
    </motion.div>
  );
}
