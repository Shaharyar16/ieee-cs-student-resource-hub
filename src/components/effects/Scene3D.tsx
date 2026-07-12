import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Pointer {
  x: number;
  y: number;
}

function makeSpherePositions(count: number, minRadius: number, maxRadius: number, zPush: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = minRadius + Math.random() * (maxRadius - minRadius);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi) - zPush;
  }
  return arr;
}

function ParticleShell({
  pointer,
  count,
  radius,
  size,
  color,
  opacity,
  speed,
}: {
  pointer: MutableRefObject<Pointer>;
  count: number;
  radius: [number, number];
  size: number;
  color: string;
  opacity: number;
  speed: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => makeSpherePositions(count, radius[0], radius[1], 5), [count, radius]);

  useFrame((_, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * speed;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, pointer.current.y * 0.18, 0.02);
    p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, pointer.current.x * 0.08, 0.02);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={opacity} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function OrbCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x += delta * 0.035;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <icosahedronGeometry args={[1.7, 1]} />
      <meshBasicMaterial color="#ff6c0c" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

/** Cursor + scroll-reactive camera dolly/parallax. */
function CameraRig({ pointer, scroll }: { pointer: MutableRefObject<Pointer>; scroll: MutableRefObject<number> }) {
  useFrame((state) => {
    const { camera } = state;
    const targetX = pointer.current.x * 1.2;
    const targetY = -pointer.current.y * 0.7;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 9 - scroll.current * 3.5, 0.05);
    camera.lookAt(0, 0, -3);
  });
  return null;
}

/** Full-page drifting particle constellation + wireframe core, cursor/scroll reactive. */
export default function Scene3D({ pointer, scroll }: { pointer: MutableRefObject<Pointer>; scroll: MutableRefObject<number> }) {
  return (
    <>
      <ParticleShell pointer={pointer} count={440} radius={[3, 9]} size={0.05} color="#f5ead9" opacity={0.42} speed={0.02} />
      <ParticleShell pointer={pointer} count={80} radius={[2.5, 7]} size={0.07} color="#ff6c0c" opacity={0.6} speed={-0.03} />
      <OrbCore />
      <CameraRig pointer={pointer} scroll={scroll} />
    </>
  );
}
