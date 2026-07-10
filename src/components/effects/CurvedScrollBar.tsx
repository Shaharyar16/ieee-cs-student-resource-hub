import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin curved progress indicator that sits right at the top edge of the
 * viewport (above the floating header) and draws itself in as the page
 * scrolls, using framer-motion's pathLength (0-1, no manual dasharray math).
 */
export default function CurvedScrollBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-4">
      <svg
        viewBox="0 0 1440 16"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          d="M0,13 Q720,-1 1440,13"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M0,13 Q720,-1 1440,13"
          fill="none"
          stroke="#ff6c0c"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress }}
        />
      </svg>
    </div>
  );
}
