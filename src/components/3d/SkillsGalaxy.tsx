import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SkillPlanet from "./SkillPlanet";

interface SkillsGalaxyProps {
  onHoverSkill: (name: string | null) => void;
  hoveredSkillName: string | null;
}

const skillsList = [
  // Inner Ring (Frontend Core)
  { name: "React", color: "#61DAFB", ring: 1, angle: 0, geo: "sphere" as const },
  { name: "Node.js", color: "#339933", ring: 1, angle: (2 * Math.PI) / 3, geo: "sphere" as const },
  { name: "TypeScript", color: "#3178C6", ring: 1, angle: (4 * Math.PI) / 3, geo: "sphere" as const },

  // Middle Ring (Frameworks & Deployment)
  { name: "Next.js", color: "#8b5cf6", ring: 2, angle: 0, geo: "sphere" as const },
  { name: "Docker", color: "#2496ED", ring: 2, angle: Math.PI / 2, geo: "sphere" as const },
  { name: "AWS", color: "#FF9900", ring: 2, angle: Math.PI, geo: "sphere" as const },
  { name: "PostgreSQL", color: "#4169E1", ring: 2, angle: (3 * Math.PI) / 2, geo: "sphere" as const },

  // Outer Ring (Database & Tools)
  { name: "MongoDB", color: "#47A248", ring: 3, angle: 0, geo: "sphere" as const },
  { name: "Tailwind CSS", color: "#06B6D4", ring: 3, angle: (2 * Math.PI) / 5, geo: "sphere" as const },
  { name: "GraphQL", color: "#E10098", ring: 3, angle: (4 * Math.PI) / 5, geo: "sphere" as const },
  { name: "Redis", color: "#DC382D", ring: 3, angle: (6 * Math.PI) / 5, geo: "sphere" as const },
  { name: "Express.js", color: "#a78bfa", ring: 3, angle: (8 * Math.PI) / 5, geo: "sphere" as const },
];

const SkillsAsteroidBelt = ({ radius, count = 120, color = "#64748b" }: { radius: number; count?: number; color?: string }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds, angles } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const ang = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count + (Math.random() - 0.5) * 0.1;
      const r = radius + (Math.random() - 0.5) * 0.15;
      const height = (Math.random() - 0.5) * 0.08;

      pos[i * 3] = r * Math.cos(angle);
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = r * Math.sin(angle);

      spd[i] = 0.1 + Math.random() * 0.15;
      ang[i] = angle;
    }

    return { positions: pos, speeds: spd, angles: ang };
  }, [radius, count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = angles[i] + t * speeds[i] * 0.08;
      const r = radius + Math.sin(t * 0.2 + i) * 0.01; // subtle wave
      posArray[i3] = r * Math.cos(angle);
      posArray[i3 + 2] = r * Math.sin(angle);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
};

const SkillsGalaxy = ({ onHoverSkill, hoveredSkillName }: SkillsGalaxyProps) => {
  const galaxyRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  // Define radius distances for each ring
  const ringRadii = [1.6, 2.9, 4.2];

  const planets = useMemo(() => {
    return skillsList.map((skill) => {
      const radius = ringRadii[skill.ring - 1];
      const x = radius * Math.cos(skill.angle);
      const z = radius * Math.sin(skill.angle);
      return {
        ...skill,
        position: [x, 0, z] as [number, number, number],
      };
    });
  }, []);

  // Galaxy self-rotation matching the system
  useFrame((state) => {
    if (!galaxyRef.current) return;
    const t = state.clock.elapsedTime;
    galaxyRef.current.rotation.y = t * 0.04;

    if (sunRef.current) {
      sunRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={false}
      />

      <group ref={galaxyRef} rotation={[Math.PI / 8, 0, 0]}>
        
        {/* ─── CENTRAL SUN CORE (Core Competency) ─── */}
        <mesh ref={sunRef}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshBasicMaterial
            color="#a855f7"
          />
        </mesh>
        <pointLight color="#a855f7" intensity={2.5} distance={10} decay={1.5} />

        {/* Orbit Rings visualization */}
        {ringRadii.map((radius, idx) => (
          <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
            <meshBasicMaterial
              color="#a78bfa"
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Dotted Asteroid Belts in between skill layers */}
        <SkillsAsteroidBelt radius={2.2} count={100} color="#c084fc" />
        <SkillsAsteroidBelt radius={3.5} count={140} color="#818cf8" />

        {/* Skill Planets */}
        {planets.map((planet) => (
          <SkillPlanet
            key={planet.name}
            name={planet.name}
            color={planet.color}
            position={planet.position}
            geometryType={planet.geo}
            onHover={onHoverSkill}
            isHovered={hoveredSkillName === planet.name}
          />
        ))}
      </group>
    </>
  );
};

export default SkillsGalaxy;
