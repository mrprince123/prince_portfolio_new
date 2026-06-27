import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface GlowOrbProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
  intensity?: number;
  speed?: number;
}

const GlowOrb = ({
  position = [0, 0, 0],
  color = "#00f0ff",
  size = 0.3,
  intensity = 2,
  speed = 1,
}: GlowOrbProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={intensity}
            transparent
            opacity={0.8}
            toneMapped={false}
          />
        </mesh>
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[size * 2, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>
        <pointLight color={color} intensity={intensity * 0.5} distance={5} />
      </group>
    </Float>
  );
};

export default GlowOrb;
