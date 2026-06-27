import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Preload } from "@react-three/drei";
import * as THREE from "three";
import ParticleField from "../3d/ParticleField";
import GlowOrb from "../3d/GlowOrb";
import { useTheme } from "../ui/theme-provider";

// Background Scene with drift rotation
const CosmicBackgroundScene = () => {
  const sceneRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const ringColor = isDark ? "#ffffff" : "#64748b";
  const particleColor = isDark ? "#00f0ff" : "#6366f1";
  
  const orbColor1 = isDark ? "#00f0ff" : "#818cf8";
  const orbColor2 = isDark ? "#3b82f6" : "#a78bfa";
  const orbColor3 = isDark ? "#8b5cf6" : "#c084fc";

  // Slow drift rotation in the background
  useFrame((state) => {
    if (!sceneRef.current) return;
    const t = state.clock.elapsedTime;
    sceneRef.current.rotation.y = t * 0.003;
    sceneRef.current.rotation.x = Math.sin(t * 0.03) * 0.02;
  });

  return (
    <group ref={sceneRef} rotation={[Math.PI / 8, 0, 0]}>
      {/* Stars only in dark mode */}
      {isDark && (
        <Stars
          radius={70}
          depth={50}
          count={1200}
          factor={4}
          saturation={0}
          fade
          speed={0.3}
        />
      )}

      {/* Floating particles (stardust) */}
      <ParticleField
        count={250}
        size={0.012}
        color={particleColor}
        spread={20}
        speed={0.1}
      />

      {/* Tilted Cosmic Orbit Rings floating in the background */}
      {[7.0, 10.5, 14.0].map((radius, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={isDark ? 0.02 : 0.06}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Floating Space Orbs */}
      <GlowOrb position={[-6, 3, -6]} color={orbColor1} size={0.3} intensity={isDark ? 1.2 : 0.6} speed={0.5} />
      <GlowOrb position={[7, -2, -8]} color={orbColor2} size={0.35} intensity={isDark ? 0.8 : 0.4} speed={0.3} />
      <GlowOrb position={[-3, -4, -5]} color={orbColor3} size={0.2} intensity={isDark ? 1.0 : 0.5} speed={0.6} />

      {/* Lighting */}
      <ambientLight intensity={isDark ? 0.06 : 0.2} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.2 : 0.15} color={orbColor1} />
    </group>
  );
};

const Background3D = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const bgColor = isDark ? "#050505" : "#f8f9fc";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: bgColor }}
      >
        <Suspense fallback={null}>
          <CosmicBackgroundScene />
          {/* Fog for depth */}
          <fog attach="fog" args={[bgColor, 8, 30]} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;
