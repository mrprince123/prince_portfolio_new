import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface SkillPlanetProps {
  name: string;
  color: string;
  position: [number, number, number];
  size?: number;
  geometryType?: "sphere" | "torus" | "octahedron" | "box" | "cylinder";
  onHover: (name: string | null) => void;
  isHovered: boolean;
}

const SkillPlanet = ({
  name,
  color,
  position,
  size = 0.25,
  geometryType = "sphere",
  onHover,
  isHovered,
}: SkillPlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);

  const moonRef = useRef<THREE.Mesh>(null);

  // Rotate moon around the skill planet
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Auto rotation of planet
    meshRef.current.rotation.y = t * 0.6;

    // Float planet up and down
    meshRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.12;

    // Orbit moon if active
    if (active && moonRef.current) {
      const moonAngle = t * 2.5;
      moonRef.current.position.x = 0.35 * Math.cos(moonAngle);
      moonRef.current.position.z = 0.35 * Math.sin(moonAngle);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setLocalHover(true);
    onHover(name);
  };

  const handlePointerOut = () => {
    setLocalHover(false);
    onHover(null);
  };

  const active = localHover || isHovered;
  const scale = active ? 1.35 : 1;

  return (
    <group position={position}>
      {/* Skill Planet Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={[scale, scale, scale]}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.8 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Tech Moon (Satellite) */}
      {active && (
        <mesh ref={moonRef}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.9} emissive={color} emissiveIntensity={1} />
        </mesh>
      )}

      {/* Emissive point light when active */}
      {active && (
        <pointLight color={color} intensity={1.5} distance={3} decay={2} />
      )}

      {/* Floating HTML label on hover */}
      {active && (
        <Html distanceFactor={6} center>
          <div className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-md border border-primary/20 shadow-lg text-foreground font-mono text-[10px] whitespace-nowrap pointer-events-none transition-all scale-100">
            <span className="font-semibold" style={{ color }}>{name}</span>
          </div>
        </Html>
      )}
    </group>
  );
};

export default SkillPlanet;
