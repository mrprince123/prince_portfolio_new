import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/ui/theme-provider";

// Steam particles count
const STEAM_PARTICLES = 12;

const Laptop3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const mugRef = useRef<THREE.Mesh>(null);
  const steamRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  // States for interactive animations
  const [isOpen, setIsOpen] = useState(true);
  const [isLidHovered, setIsLidHovered] = useState(false);
  const [mugClicks, setMugClicks] = useState(0);
  const [mugWobble, setMugWobble] = useState(0);
  
  // Responsive layout state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Theme checking
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Theme-aware colors
  const laptopBodyColor = isDark ? "#1e293b" : "#cbd5e1"; // Space Grey vs. Aluminum Silver
  const keyboardBgColor = isDark ? "#090d16" : "#f1f5f9";
  const keyboardKeysColor = isDark ? "#1e293b" : "#e2e8f0";
  const screenBezelColor = isDark ? "#1e293b" : "#cbd5e1";
  const screenDisplayColor = isDark ? "#020617" : "#ffffff";
  const glowColor = isDark ? "#00f0ff" : "#6366f1";
  const codeColor1 = isDark ? "#00f0ff" : "#4f46e5";
  const codeColor2 = isDark ? "#8b5cf6" : "#7c3aed";
  const codeColor3 = isDark ? "#3b82f6" : "#2563eb";
  const textLabelColor = isDark ? "#ffffff" : "#0f172a";

  // Steam particle animation state
  const steamParticles = useState(() => {
    const arr = [];
    for (let i = 0; i < STEAM_PARTICLES; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 0.1,
        y: Math.random() * 0.4,
        z: (Math.random() - 0.5) * 0.1,
        speed: Math.random() * 0.008 + 0.004,
      });
    }
    return arr;
  })[0];

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // 1. Laptop general breathing/bobbing
    if (groupRef.current) {
      groupRef.current.position.y = (isMobile ? 1.0 : -0.3) + Math.sin(t * 1.2) * 0.05;
      groupRef.current.position.x = isMobile ? 0 : 1.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        isMobile ? Math.sin(t * 0.2) * 0.1 : Math.sin(t * 0.3) * 0.1 + 0.2,
        0.05
      );
    }

    // 2. Lid open/close interpolation
    if (lidRef.current) {
      const targetAngle = isOpen ? 0.3 : -Math.PI / 2.1;
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        targetAngle,
        0.1
      );
    }

    // 3. Mug click wobble physics
    if (mugRef.current && mugWobble > 0.01) {
      setMugWobble((prev) => prev * 0.9); // decay wobble
      mugRef.current.rotation.z = Math.sin(t * 20) * mugWobble;
      mugRef.current.rotation.x = Math.cos(t * 20) * mugWobble;
    }

    // 4. Steam particles animation
    if (steamRef.current) {
      const positions = steamRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < STEAM_PARTICLES; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += steamParticles[i].speed; // rise
        positions[i3] += Math.sin(t * 5 + i) * 0.001; // sway

        // Reset particle if too high
        if (positions[i3 + 1] > 0.6) {
          positions[i3] = (Math.random() - 0.5) * 0.1;
          positions[i3 + 1] = 0;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.1;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const handleMugClick = (e: any) => {
    e.stopPropagation();
    setMugClicks((c) => c + 1);
    setMugWobble(0.4);
  };

  const handleLidClick = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const currentScale = isMobile ? 0.75 : 1.05;

  return (
    <group ref={groupRef} scale={currentScale}>
      
      {/* ─── DESK SURFACE ─── */}
      <mesh position={[0, -0.4, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial
          color={isDark ? "#1e1e24" : "#e2e8f0"}
          roughness={0.7}
          metalness={0.2}
          transparent
          opacity={isDark ? 0.35 : 0.6}
        />
      </mesh>

      {/* ─── COFFEE MUG ─── */}
      <group position={[1.4, -0.3, 0.3]}>
        {/* Wobbling body */}
        <mesh
          ref={mugRef}
          onClick={handleMugClick}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.16, 0.16, 0.38, 16]} />
          <meshStandardMaterial
            color="#e11d48"
            roughness={0.15}
            metalness={0.4}
            emissive="#991b1b"
            emissiveIntensity={isDark ? 0.25 : 0.05}
          />
        </mesh>
        
        {/* Handle */}
        <mesh position={[0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.03, 8, 16]} />
          <meshStandardMaterial color="#e11d48" roughness={0.15} />
        </mesh>

        {/* Liquid inside */}
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.02, 16]} />
          <meshStandardMaterial color="#3b2314" roughness={0.9} />
        </mesh>

        {/* Steam Points */}
        <points ref={steamRef} position={[0, 0.2, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={STEAM_PARTICLES}
              array={new Float32Array(STEAM_PARTICLES * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color={isDark ? "#ffffff" : "#475569"}
            transparent
            opacity={isDark ? 0.3 : 0.5}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Mug interactive label */}
        <Html distanceFactor={5} position={[0, 0.35, 0]} center>
          <div 
            className="px-2 py-1 rounded bg-card/90 border border-border text-[8px] font-mono select-none shadow-sm transition-colors duration-200"
            style={{ color: textLabelColor }}
          >
            {mugClicks === 0 ? "Click Coffee" : `Clicks: ${mugClicks}`}
          </div>
        </Html>
      </group>

      {/* ─── LAPTOP BASE ─── */}
      <group position={[0, -0.3, 0.1]}>
        <mesh position={[0, -0.05, 0]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[2.2, 0.07, 1.4]} />
          <meshStandardMaterial
            color={laptopBodyColor}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Keyboard area background */}
        <mesh position={[0, 0.001, 0.05]} rotation={[-0.05, 0, 0]}>
          <planeGeometry args={[2.0, 1.1]} />
          <meshBasicMaterial color={keyboardBgColor} />
        </mesh>

        {/* Keyboard keys hints */}
        <mesh position={[0, 0.005, 0.1]} rotation={[-0.05, 0, 0]}>
          <planeGeometry args={[1.7, 0.7]} />
          <meshBasicMaterial color={keyboardKeysColor} />
        </mesh>

        {/* Glowing trackpad outline */}
        <mesh position={[0, 0.005, 0.5]} rotation={[-0.05, 0, 0]}>
          <planeGeometry args={[0.45, 0.3]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.15} />
        </mesh>
      </group>

      {/* ─── LAPTOP LID / SCREEN (Interactive hinge) ─── */}
      <group
        ref={lidRef}
        position={[0, -0.32, -0.55]} // Pivot point on base rear
        onClick={handleLidClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsLidHovered(true);
        }}
        onPointerOut={() => setIsLidHovered(false)}
      >
        {/* Nested screen content to align pivot relative to rear edge */}
        <group position={[0, 0.75, -0.02]}>
          {/* Bezel */}
          <mesh castShadow>
            <boxGeometry args={[2.3, 1.5, 0.04]} />
            <meshStandardMaterial
              color={screenBezelColor}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          {/* Display */}
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[2.1, 1.35]} />
            <meshBasicMaterial color={screenDisplayColor} />
          </mesh>

          {/* Screen Code Lines */}
          {isOpen && Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[-0.7 + Math.random() * 0.1, 0.45 - i * 0.13, 0.03]}>
              <planeGeometry args={[0.45 + Math.random() * 0.8, 0.03]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? codeColor1 : i % 3 === 1 ? codeColor2 : codeColor3}
                transparent
                opacity={isDark ? (0.6 + Math.random() * 0.3) : (0.8 + Math.random() * 0.2)}
              />
            </mesh>
          ))}

          {/* Display Glow */}
          {isOpen && (
            <pointLight
              position={[0, 0, 0.5]}
              intensity={isDark ? 1.5 : 0.6}
              color={glowColor}
              distance={3.5}
              decay={2}
            />
          )}

          {/* Interactive Screen Overlay */}
          <Html distanceFactor={5} position={[0, 0.85, 0]} center>
            <div
              className="px-2 py-1 rounded bg-card/90 border border-border text-[8px] font-mono select-none shadow-sm transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: isLidHovered ? 1 : 0,
                color: textLabelColor,
              }}
            >
              {isOpen ? "Click to Close" : "Click to Open"}
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
};

export default Laptop3D;
