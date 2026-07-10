import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon, { type IconName } from '@/components/ui/Icon';

interface AdminMetricCardProps {
  label: string;
  value: number;
  icon: IconName;
  suffix?: string;
  accent?: 'orange' | 'blue' | 'emerald' | 'amber';
}

const accentClasses: Record<string, string> = {
  orange: 'bg-ieee-orange/10 text-ieee-orange',
  blue: 'bg-ieee-blue/10 text-ieee-blue',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
};

export default function AdminMetricCard({ label, value, icon, suffix = '', accent = 'orange' }: AdminMetricCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      current += increment;
      setCount(Math.min(Math.round(current), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${accentClasses[accent]}`}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900">
        {count}
        {suffix}
      </p>
    </motion.div>
  );
}
