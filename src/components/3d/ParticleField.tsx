import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
  speed?: number;
}

const ParticleField = ({
  count = 500,
  size = 0.015,
  color = "#00f0ff",
  spread = 20,
  speed = 0.2,
}: ParticleFieldProps) => {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      opacities[i] = Math.random() * 0.5 + 0.1;
      speeds[i] = Math.random() * speed + 0.05;
    }

    return { positions, opacities, speeds };
  }, [count, spread, speed]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += particles.speeds[i] * 0.005;
      positions[i3] += Math.sin(time * 0.3 + i) * 0.001;

      // Wrap particles
      if (positions[i3 + 1] > spread / 2) {
        positions[i3 + 1] = -spread / 2;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;
