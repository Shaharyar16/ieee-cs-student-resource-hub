import { motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="flex w-full items-center">
      {steps.map((step, idx) => {
        const isDone = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isDone || isActive ? '#ff6c0c' : '#e2e8f0',
                  color: isDone || isActive ? '#fff' : '#64748b',
                  scale: isActive ? 1.1 : 1,
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shadow-sm"
              >
                {isDone ? <Icon name="check" className="h-4 w-4" /> : idx + 1}
              </motion.div>
              <span className={`hidden text-center text-xs font-medium sm:block ${isActive ? 'text-ieee-orange' : 'text-slate-500'}`}>
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="mx-2 h-0.5 flex-1 bg-slate-200">
                <motion.div
                  className="h-0.5 bg-ieee-orange"
                  initial={{ width: 0 }}
                  animate={{ width: isDone ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
