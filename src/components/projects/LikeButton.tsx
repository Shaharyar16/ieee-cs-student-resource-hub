import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  active: boolean;
  count: number;
  onToggle: () => void;
  size?: 'sm' | 'md';
}

const PARTICLES = 6;

/** LinkedIn-style animated like: heart pop + radial particle burst + rolling count. */
export default function LikeButton({ active, count, onToggle, size = 'md' }: LikeButtonProps) {
  const [burst, setBurst] = useState(0);

  const handle = () => {
    if (!active) setBurst((b) => b + 1); // burst only on the like (not unlike)
    onToggle();
  };

  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]';

  return (
    <button
      type="button"
      onClick={handle}
      data-cursor="link"
      aria-pressed={active}
      className={`group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
        active ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'
      }`}
    >
      <span className="relative flex items-center justify-center">
        {/* particle burst */}
        {burst > 0 && (
          <span key={burst} className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {Array.from({ length: PARTICLES }).map((_, i) => {
              const angle = (i / PARTICLES) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: Math.cos(angle) * 16, y: Math.sin(angle) * 16, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="absolute h-1.5 w-1.5 rounded-full bg-rose-400"
                />
              );
            })}
          </span>
        )}
        <motion.span animate={{ scale: active ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.35 }}>
          <Heart className={`${iconSize} transition-all ${active ? 'fill-rose-500' : ''}`} />
        </motion.span>
      </span>

      <span className="relative h-5 min-w-[1ch] overflow-hidden text-left tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: active ? 14 : -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: active ? -14 : 14, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
