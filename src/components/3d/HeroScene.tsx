import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/ui/theme-provider";
import SolarSystemScene from "./SolarSystemScene";
import ParticleField from "./ParticleField";
import GlowOrb from "./GlowOrb";

const HeroScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const { theme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useFrame(() => {
    if (!groupRef.current) return;
    // Mouse parallax on whole scene
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.05,
      0.05
    );
  });

  const nodeColor = isDark ? "#eab308" : "#f59e0b"; // Sun yellow
  const orbColor2 = isDark ? "#3b82f6" : "#60a5fa"; // Earth blue
  const orbColor3 = isDark ? "#8b5cf6" : "#a78bfa";
  const fogColor = isDark ? "#050505" : "#f8f9fc";

  return (
    <>
      {/* Background stars (only in dark mode) */}
      {isDark && (
        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={0.4}
        />
      )}

      {/* Main scene group with mouse parallax */}
      <group ref={groupRef}>
        {/* Orbiting Solar System */}
        <SolarSystemScene />

        {/* Decorative glow orbs */}
        <GlowOrb position={[-4, 2, -3]} color={nodeColor} size={0.15} intensity={1.5} />
        <GlowOrb position={[4.5, -1.5, -4]} color={orbColor2} size={0.2} intensity={1} />
        <GlowOrb position={[-3, -3, -2]} color={orbColor3} size={0.12} intensity={1.2} />

        {/* Ambient particles */}
        <ParticleField count={200} size={0.01} spread={16} speed={0.08} color={nodeColor} />
      </group>

      {/* Dynamic lights */}
      <ambientLight intensity={isDark ? 0.08 : 0.4} />
      <pointLight position={[6, 6, 6]} intensity={isDark ? 0.5 : 0.6} color={nodeColor} />
      <pointLight position={[-6, -4, 4]} intensity={isDark ? 0.3 : 0.4} color={orbColor2} />

      {/* Fog for depth */}
      <fog attach="fog" args={[fogColor, 5, 20]} />
    </>
  );
};

export default HeroScene;
