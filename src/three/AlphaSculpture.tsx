import { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GOLD = '#f5a623';
const GOLD_BRIGHT = '#ffcf5c';
const BLUE = '#3fc8ff';

export const SERVICE_GLYPH_LABELS = [
  'Web Development',
  'App Development',
  'Automation',
  'Model Training',
  'RAG Systems',
  'MLOps',
] as const;

/** Wraps a glyph and smoothly grows/shrinks it in when it becomes the active one. */
function Glyph({ active, children }: { active: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = active ? 1 : 0;
    const s = THREE.MathUtils.damp(ref.current.scale.x, target, 7, delta);
    ref.current.scale.set(s, s, s);
    ref.current.rotation.y += delta * 0.4;
  });
  return (
    <group ref={ref} scale={0}>
      {children}
    </group>
  );
}

/* --- the six domain glyphs --- */

function WebGlyph() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.7, 1.15, 0.05]} />
        <meshStandardMaterial color="#0e1626" emissive={BLUE} emissiveIntensity={0.3} metalness={0.6} roughness={0.3} wireframe />
      </mesh>
      <mesh position={[0, 0.42, 0.04]}>
        <boxGeometry args={[1.5, 0.09, 0.02]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} />
      </mesh>
      {[-0.68, -0.56, -0.44].map((x, i) => (
        <mesh key={i} position={[x, 0.42, 0.045]}>
          <circleGeometry args={[0.03, 12]} />
          <meshBasicMaterial color={GOLD_BRIGHT} />
        </mesh>
      ))}
      <mesh position={[0, -0.1, 0.04]}>
        <boxGeometry args={[1.1, 0.06, 0.015]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.32, 0.04]}>
        <boxGeometry args={[0.8, 0.06, 0.015]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function AppGlyph() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.78, 1.5, 0.14]} />
        <meshStandardMaterial color="#0e1626" emissive={GOLD} emissiveIntensity={0.25} metalness={0.6} roughness={0.3} wireframe />
      </mesh>
      <mesh position={[0, 0.64, 0.08]}>
        <boxGeometry args={[0.22, 0.035, 0.01]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.6, 0.08]}>
        <circleGeometry args={[0.07, 24]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.6} />
      </mesh>
      {[0.28, 0.02, -0.24].map((y, i) => (
        <mesh key={i} position={[0, y, 0.08]}>
          <boxGeometry args={[0.5, 0.09, 0.012]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function PythonGlyph() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 12, 48]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.4} metalness={0.75} roughness={0.2} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2.6, Math.PI / 5]}>
        <torusGeometry args={[0.6, 0.05, 12, 48]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.4} metalness={0.75} roughness={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#0e0e0e" emissive={GOLD_BRIGHT} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ModelGlyph() {
  const nodePositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.72, 0);
    const pos = geo.attributes.position;
    const pts: [number, number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        pts.push([x, y, z]);
      }
    }
    return pts;
  }, []);

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color="#0e0e0e" emissive={BLUE} emissiveIntensity={0.3} wireframe metalness={0.9} roughness={0.15} />
      </mesh>
      {nodePositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function RagGlyph() {
  return (
    <group>
      <mesh position={[-0.1, -0.4, -0.12]} rotation={[-Math.PI / 2.3, 0, 0]}>
        <planeGeometry args={[0.85, 1.1]} />
        <meshStandardMaterial color="#0e1626" emissive={GOLD} emissiveIntensity={0.15} side={THREE.DoubleSide} wireframe />
      </mesh>
      {[0.18, 0.02, -0.14].map((z, i) => (
        <mesh key={i} position={[-0.1, -0.4 + z * 0.35, -0.1]} rotation={[-Math.PI / 2.3, 0, 0]}>
          <planeGeometry args={[0.55, 0.05]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[0.08, 0.22, 0.12]}>
        <torusGeometry args={[0.32, 0.045, 12, 40]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.45} metalness={0.75} roughness={0.2} />
      </mesh>
      <mesh position={[0.36, -0.1, 0.12]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.045, 0.045, 0.46, 10]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.45} metalness={0.75} roughness={0.2} />
      </mesh>
    </group>
  );
}

function MlopsGlyph() {
  return (
    <group scale={0.62}>
      <mesh>
        <torusKnotGeometry args={[0.62, 0.15, 128, 16, 2, 3]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.35} metalness={0.75} roughness={0.25} />
      </mesh>
    </group>
  );
}

function AmbientRings() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 2.3, 0, Math.sin(a) * 2.3));
    }
    return pts;
  }, []);

  const lineA = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geom, new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.16 }));
  }, [points]);

  const lineB = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geom, new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.1 }));
  }, [points]);

  const groupA = useRef<THREE.Group>(null);
  const groupB = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupA.current) groupA.current.rotation.x = 0.35 + Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    if (groupB.current) groupB.current.rotation.x = -0.5 + Math.cos(state.clock.elapsedTime * 0.08) * 0.12;
  });

  return (
    <>
      <group ref={groupA}>
        <primitive object={lineA} />
      </group>
      <group ref={groupB} rotation={[0, Math.PI / 3, 0]}>
        <primitive object={lineB} />
      </group>
    </>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useMemo(() => {
    const handler = (e: PointerEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.3, 0.03);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.18, 0.03);
    }
  });

  return (
    <group ref={group} scale={Math.min(viewport.width, 8) / 7 + 0.6}>
      {children}
    </group>
  );
}

interface Props {
  /** Index into SERVICE_GLYPH_LABELS — which domain glyph is currently shown. */
  active: number;
}

export default function AlphaSculpture({ active }: Props) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 3, 4]} intensity={20} color={GOLD_BRIGHT} distance={14} decay={2} />
      <pointLight position={[-4, -2, -3]} intensity={14} color={BLUE} distance={14} decay={2} />

      <Rig>
        <AmbientRings />
        <Glyph active={active === 0}><WebGlyph /></Glyph>
        <Glyph active={active === 1}><AppGlyph /></Glyph>
        <Glyph active={active === 2}><PythonGlyph /></Glyph>
        <Glyph active={active === 3}><ModelGlyph /></Glyph>
        <Glyph active={active === 4}><RagGlyph /></Glyph>
        <Glyph active={active === 5}><MlopsGlyph /></Glyph>
      </Rig>
    </>
  );
}