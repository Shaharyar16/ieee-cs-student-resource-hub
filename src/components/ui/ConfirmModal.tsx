import { AnimatePresence, motion } from 'framer-motion';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ieee-ink/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-black/5 bg-white p-6 shadow-2xl"
          >
            <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
            {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-black/5"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                  danger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-ieee-orange hover:bg-ieee-orange-dark'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
