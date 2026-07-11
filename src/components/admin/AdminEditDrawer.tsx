import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AdminEditDrawerProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AdminEditDrawer({ open, title, subtitle, onClose, children, footer }: AdminEditDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ieee-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-black/5 bg-[#faf8f3] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
                {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-black/5 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
            {footer && <div className="border-t border-black/5 bg-white px-5 py-4">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
