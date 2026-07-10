import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene3D from './Scene3D';

/**
 * Fixed, full-viewport cinematic 3D backdrop for the homepage: a drifting
 * particle field + wireframe core that parallaxes with the cursor and
 * dollies with scroll depth. Pointer/scroll are tracked on `window` (not the
 * canvas) so the canvas can stay pointer-events-none and never block clicks.
 */
export default function AnimatedBackground() {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    function onMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#1E1A14]">
      {!reduceMotion && (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 9], fov: 55 }}
        >
          <Suspense fallback={null}>
            <Scene3D pointer={pointer} scroll={scroll} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
