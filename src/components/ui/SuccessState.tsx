import { motion } from 'framer-motion';

interface SuccessStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function SuccessState({
  title = 'Submitted successfully!',
  description = 'Thank you — your submission has been received.',
  action,
}: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-emerald-200 bg-emerald-50 px-8 py-12 text-center shadow-sm"
    >
      <motion.svg
        viewBox="0 0 52 52"
        className="mb-4 h-16 w-16"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M15 27 L23 35 L38 18"
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
      </motion.svg>
      <h3 className="text-xl font-bold text-emerald-800">{title}</h3>
      <p className="mt-2 text-sm text-emerald-700">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
