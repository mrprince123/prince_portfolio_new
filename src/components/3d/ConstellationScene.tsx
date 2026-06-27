import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/ui/theme-provider";

interface NodeItem {
  id: number;
  label: string;
  pos: THREE.Vector3;
  size: number;
  speed: number;
  orbitRadius: number;
  angle: number;
}

const techNames = [
  "React.js", "Node.js", "TypeScript", "Next.js", "Docker", "AWS", "PostgreSQL",
  "MongoDB", "Redis", "JavaScript", "Express.js", "Tailwind CSS", "GraphQL",
  "REST APIs", "Git", "VS Code", "Python", "Kubernetes", "Nginx", "HTML5",
  "CSS3", "Vue.js", "Figma", "Microservices", "CI/CD", "GitHub Actions"
];

const ConstellationScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const footballRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const { theme } = useTheme();

  // Click interaction states
  const [spinSpeed, setSpinSpeed] = useState(1);
  const [pulseIntensity, setPulseIntensity] = useState(1.0);

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Generate nodes scattered in orbits around the giant central football
  const nodes: NodeItem[] = useMemo(() => {
    return techNames.map((name, i) => {
      const orbitRadius = 2.8 + (i % 3) * 0.8; // concentric rings
      const angle = (i * 2 * Math.PI) / techNames.length;
      const speed = 0.08 + Math.random() * 0.12;

      // Position in 3D space
      const x = orbitRadius * Math.cos(angle);
      const y = (Math.random() - 0.5) * 1.5; // slight height dispersion
      const z = orbitRadius * Math.sin(angle);

      return {
        id: i,
        label: name,
        pos: new THREE.Vector3(x, y, z),
        size: 0.08,
        speed,
        orbitRadius,
        angle,
      };
    });
  }, []);

  // Responsive layout state
  const [isMobile, setIsMobile] = useState(false);

  useMemo(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Update orbits and rotate elements
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Rotate the entire constellation group gently
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.02 * spinSpeed;
      // Mouse tilting parallax (shifted right on desktop, centered/up on mobile)
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, 
        (isMobile ? 0 : 1.35) + mouse.x * 0.4, 
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y, 
        (isMobile ? 0.65 : -0.15) + mouse.y * 0.3, 
        0.05
      );
    }

    // Rotate the giant central football
    if (footballRef.current) {
      footballRef.current.rotation.y = -t * 0.15 * spinSpeed;
      footballRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
    }

    // Decay the spin speed multiplier and pulse intensity back to normal
    if (spinSpeed > 1) {
      setSpinSpeed((prev) => Math.max(1, prev - 0.02));
    }
    if (pulseIntensity > 1) {
      setPulseIntensity((prev) => Math.max(1.0, prev - 0.05));
    }
  });

  const handleFootballClick = (e: any) => {
    e.stopPropagation();
    setSpinSpeed(4.5); // spin super fast on click!
    setPulseIntensity(2.5); // pulse glow!
  };

  const nodeColor = isDark ? "#00f0ff" : "#4f46e5";
  const lineColor = isDark ? "#ffffff" : "#64748b";
  const textColor = isDark ? "#ffffff" : "#0f172a";
  const opacityLine = isDark ? 0.08 : 0.14;

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
      />

      <group ref={groupRef}>
        
        {/* ─── GIANT GEOMETRIC FOOTBALL CORE (Interactive) ─── */}
        <group 
          ref={footballRef} 
          onClick={handleFootballClick}
          scale={[1.7, 1.7, 1.7]} // Made it significantly bigger!
        >
          {/* Main solid facet faces */}
          <mesh>
            <icosahedronGeometry args={[1.0, 1]} />
            <meshStandardMaterial
              color={nodeColor}
              emissive={nodeColor}
              emissiveIntensity={isDark ? (0.35 * pulseIntensity) : (0.12 * pulseIntensity)}
              transparent
              opacity={isDark ? 0.12 : 0.22}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>

          {/* Glowing wireframe outlines (Football edges) */}
          <lineSegments>
            <edgesGeometry attach="geometry" args={[new THREE.IcosahedronGeometry(1.004, 1)]} />
            <lineBasicMaterial 
              attach="material" 
              color={nodeColor} 
              transparent 
              opacity={isDark ? 0.5 : 0.75} 
            />
          </lineSegments>

          {/* Interactive HTML Help Tag */}
          <Html distanceFactor={4} position={[0, 1.3, 0]} center>
            <div className="select-none font-mono text-[7px] uppercase tracking-wider bg-card/90 px-2 py-0.5 rounded border border-border/40 text-foreground/50 whitespace-nowrap shadow-sm">
              Click Core to Spin
            </div>
          </Html>
        </group>

        {/* Orbit paths visualization */}
        {[2.8, 3.6, 4.4].map((radius, idx) => (
          <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
            <meshBasicMaterial
              color={lineColor}
              transparent
              opacity={isDark ? 0.05 : 0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Orbiting Satellite Tech Nodes */}
        {nodes.map((node) => (
          <group key={node.id} position={node.pos}>
            <mesh>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshBasicMaterial color={nodeColor} transparent opacity={isDark ? 0.7 : 0.9} />
            </mesh>

            {/* Glowing aura */}
            <mesh>
              <sphereGeometry args={[node.size * 2.2, 8, 8]} />
              <meshBasicMaterial color={nodeColor} transparent opacity={0.08} />
            </mesh>

            {/* Label in 3D space */}
            <Html distanceFactor={6} center>
              <div 
                className="select-none font-mono text-[8px] px-1 py-0.5 rounded pointer-events-none transition-colors duration-300"
                style={{ 
                  color: textColor,
                  textShadow: isDark 
                    ? "0 1px 3px rgba(0,0,0,0.8)" 
                    : "0 1px 2px rgba(255,255,255,0.8)",
                  opacity: 0.8
                }}
              >
                {node.label}
              </div>
            </Html>
          </group>
        ))}
      </group>

      <ambientLight intensity={isDark ? 0.2 : 0.5} />
      <pointLight position={[5, 5, 5]} intensity={2.0} color={nodeColor} />
    </>
  );
};

export default ConstellationScene;
