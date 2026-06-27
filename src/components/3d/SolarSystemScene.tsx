import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/ui/theme-provider";

interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  hasRings?: boolean;
  hasMoon?: boolean;
  roughness?: number;
  metalness?: number;
  techStack: string[];
}

interface PlanetState extends PlanetData {
  radiusScale: number;
  speedScale: number;
  visualMode: "realistic" | "neon" | "wireframe";
  isReversed: boolean;
}

interface GalaxyState {
  arms: number;
  spinSpeed: number;
  colorTheme: string;
  tiltX: number;
  tiltZ: number;
  isSolid: boolean;
  starSize: number;
}

const initialPlanets: PlanetData[] = [
  { name: "Mercury", radius: 0.08, distance: 1.5, speed: 1.4, color: "#8a8a8a", roughness: 0.9, metalness: 0.1, techStack: ["Performance", "Fast Load", "SEO"] },
  { name: "Venus", radius: 0.13, distance: 2.0, speed: 1.0, color: "#eab308", roughness: 0.8, metalness: 0.1, techStack: ["CSS Grid", "Tailwind", "Responsive"] },
  { name: "Earth", radius: 0.17, distance: 2.6, speed: 0.75, color: "#3b82f6", hasMoon: true, roughness: 0.4, metalness: 0.3, techStack: ["React", "TypeScript", "Vite"] },
  { name: "Mars", radius: 0.11, distance: 3.2, speed: 0.6, color: "#ef4444", roughness: 0.9, metalness: 0.1, techStack: ["Redux", "Context API", "State"] },
  { name: "Jupiter", radius: 0.38, distance: 4.1, speed: 0.4, color: "#f97316", roughness: 0.3, metalness: 0.1, techStack: ["Node.js", "Express", "REST APIs"] },
  { name: "Saturn", radius: 0.32, distance: 5.2, speed: 0.28, color: "#fcd34d", hasRings: true, roughness: 0.5, metalness: 0.1, techStack: ["PostgreSQL", "MongoDB", "SQL"] },
  { name: "Uranus", radius: 0.23, distance: 6.2, speed: 0.18, color: "#22d3ee", roughness: 0.3, metalness: 0.1, techStack: ["Docker", "Kubernetes", "Microservices"] },
  { name: "Neptune", radius: 0.22, distance: 7.1, speed: 0.12, color: "#4f46e5", roughness: 0.3, metalness: 0.1, techStack: ["AWS", "CI/CD", "GitHub Actions"] },
];

const generateProceduralTexture = (name: string, baseColor: string) => {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 256, 128);

  if (name === "Sun") {
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(0, 0, 256, 128);
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#ef4444" : "#facc15";
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 24 + 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === "Mercury") {
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#525252" : "#a3a3a3";
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 8 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (name === "Venus") {
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#ca8a04" : "#fef08a";
      ctx.fillRect(0, Math.random() * 128, 256, Math.random() * 16 + 4);
    }
  } else if (name === "Earth") {
    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = "#15803d";
    for (let i = 0; i < 15; i++) {
      const cx = Math.random() * 256;
      const cy = Math.random() * 128;
      const size = Math.random() * 45 + 15;
      ctx.beginPath();
      ctx.arc(cx, cy, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#b45309"; 
      ctx.beginPath();
      ctx.arc(cx + (Math.random() - 0.5) * 10, cy + (Math.random() - 0.5) * 10, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#15803d";
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(0, Math.random() * 128, 256, Math.random() * 8 + 2);
    }
  } else if (name === "Mars") {
    ctx.fillStyle = "#b91c1c";
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = "#7f1d1d";
    for (let i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 18 + 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 256, 6);
    ctx.fillRect(0, 122, 256, 6);
  } else if (name === "Jupiter") {
    ctx.fillStyle = "#ea580c";
    ctx.fillRect(0, 0, 256, 128);
    const colors = ["#c2410c", "#fed7aa", "#7c2d12", "#fdba74"];
    for (let y = 0; y < 128; y += 6) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(0, y, 256, Math.random() * 10 + 3);
    }
    ctx.fillStyle = "#991b1b";
    ctx.beginPath();
    ctx.ellipse(120, 80, 22, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (name === "Saturn") {
    ctx.fillStyle = "#d97706";
    ctx.fillRect(0, 0, 256, 128);
    const colors = ["#b45309", "#fef08a", "#fcd34d", "#78350f"];
    for (let y = 0; y < 128; y += 8) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(0, y, 256, Math.random() * 12 + 4);
    }
  } else if (name === "Uranus") {
    ctx.fillStyle = "#0891b2";
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    for (let y = 0; y < 128; y += 12) {
      ctx.fillRect(0, y, 256, 4);
    }
  } else if (name === "Neptune") {
    ctx.fillStyle = "#1e3a8a";
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    for (let y = 0; y < 128; y += 14) {
      ctx.fillRect(0, y, 256, 6);
    }
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.ellipse(80, 60, 18, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};

interface PlanetComponentProps extends PlanetState {
  onSelect: () => void;
  isSelected: boolean;
}

const Planet = ({
  name,
  radius,
  distance,
  speed,
  color,
  hasRings,
  hasMoon,
  roughness = 0.5,
  metalness = 0.1,
  techStack,
  radiusScale,
  speedScale,
  visualMode,
  isReversed,
  onSelect,
  isSelected,
}: PlanetComponentProps) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);
  const [wobble, setWobble] = useState(0);

  const planetTexture = useMemo(() => {
    return generateProceduralTexture(name, color);
  }, [name, color]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (planetGroupRef.current) {
      const currentSpeed = speed * speedScale * (isReversed ? -1 : 1);
      const activeSpeed = hovered ? currentSpeed * 0.18 : currentSpeed;
      const angle = t * activeSpeed * 0.12;
      planetGroupRef.current.position.x = distance * Math.cos(angle);
      planetGroupRef.current.position.z = distance * Math.sin(angle);
    }

    if (bodyRef.current) {
      bodyRef.current.rotation.y = t * 0.6;
      if (wobble > 0.01) {
        setWobble((w) => w * 0.9);
        bodyRef.current.rotation.x = Math.sin(t * 30) * wobble;
        bodyRef.current.rotation.z = Math.cos(t * 30) * wobble;
      }
    }

    if (hasMoon && moonRef.current) {
      const moonAngle = t * 2.0;
      moonRef.current.position.x = 0.38 * Math.cos(moonAngle);
      moonRef.current.position.z = 0.38 * Math.sin(moonAngle);
    }
  });

  const handlePlanetClick = (e: any) => {
    e.stopPropagation();
    setWobble(0.6);
    onSelect();
  };

  const finalRadius = radius * radiusScale;
  const scale = hovered ? 1.3 : 1.0;

  return (
    <group ref={planetGroupRef}>
      <group
        onClick={handlePlanetClick}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => { setHovered(false); }}
      >
        {visualMode === "wireframe" ? (
          <group scale={[scale, scale, scale]}>
            <mesh ref={bodyRef}>
              <sphereGeometry args={[finalRadius, 16, 16]} />
              <meshBasicMaterial color={color} wireframe />
            </mesh>
          </group>
        ) : visualMode === "neon" ? (
          <mesh ref={bodyRef} scale={[scale, scale, scale]}>
            <sphereGeometry args={[finalRadius, 32, 32]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ) : (
          <mesh ref={bodyRef} scale={[scale, scale, scale]} castShadow receiveShadow>
            <sphereGeometry args={[finalRadius, 32, 32]} />
            {planetTexture ? (
              <meshStandardMaterial 
                map={planetTexture} 
                roughness={roughness}
                metalness={metalness}
                emissive={color}
                emissiveIntensity={hovered ? 0.35 : 0.0}
              />
            ) : (
              <meshStandardMaterial 
                color={color} 
                roughness={roughness}
                metalness={metalness}
                emissive={color}
                emissiveIntensity={hovered ? 0.5 : 0.02}
              />
            )}
          </mesh>
        )}

        {name === "Earth" && visualMode === "realistic" && (
          <mesh scale={[scale * 1.08, scale * 1.08, scale * 1.08]}>
            <sphereGeometry args={[finalRadius, 32, 32]} />
            <meshBasicMaterial
              color="#60a5fa"
              transparent
              opacity={hovered ? 0.25 : 0.15}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
            />
          </mesh>
        )}

        {hasRings && (
          <group rotation={[Math.PI / 2.3, 0, 0]}>
            <mesh>
              <ringGeometry args={[finalRadius * 1.3, finalRadius * 1.7, 64]} />
              <meshStandardMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
            <mesh>
              <ringGeometry args={[finalRadius * 1.8, finalRadius * 2.4, 64]} />
              <meshStandardMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}

        {hasMoon && (
          <mesh ref={moonRef}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.9} metalness={0.1} />
          </mesh>
        )}
      </group>

      {(hovered || isSelected) && (
        <Html distanceFactor={6} position={[0, finalRadius + 0.3, 0]} center>
          <div className="px-2 py-1 rounded bg-card/95 border border-primary/20 text-[9px] font-mono font-semibold text-foreground shadow-md whitespace-nowrap pointer-events-none scale-100 flex flex-col items-center gap-1">
            <span>{name}</span>
            {isSelected && (
              <span className="text-[6px] text-primary uppercase tracking-widest animate-pulse font-bold">Selected</span>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

const AsteroidBelt = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const count = 320;

  const { positions, speeds, angles, radii } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 3.8 + Math.random() * 0.4;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.15;

      pos[i * 3] = radius * Math.cos(angle);
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = radius * Math.sin(angle);

      spd[i] = 0.05 + Math.random() * 0.08;
      ang[i] = angle;
      rad[i] = radius;
    }

    return { positions: pos, speeds: spd, angles: ang, radii: rad };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = angles[i] + t * speeds[i] * 0.15;
      posArray[i3] = radii[i] * Math.cos(angle);
      posArray[i3 + 2] = radii[i] * Math.sin(angle);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const beltColor = isDark ? "#00f0ff" : "#c084fc";

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
        size={0.025}
        color={beltColor}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};

// Interactive 3D Milky Way Galaxy with Solid Volumetric Nebula modes
interface MilkyWayProps {
  config: GalaxyState;
  onCoreSelect: () => void;
  isCoreSelected: boolean;
}

const MilkyWay = ({ config, onCoreSelect, isCoreSelected }: MilkyWayProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const starCount = 2000;
  const gasCloudCount = 180; // Overlapping meshes to make a solid nebula

  // 1. Star coordinate buffers (Point Cloud mode)
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const cols = new Float32Array(starCount * 3);
    const baseColor = new THREE.Color(config.colorTheme);
    const edgeColor = isDark ? new THREE.Color("#4f46e5") : new THREE.Color("#ec4899");

    for (let i = 0; i < starCount; i++) {
      const distance = Math.pow(Math.random(), 2.2) * 16 + 0.6;
      const armIdx = i % config.arms;
      const angle = (armIdx * (Math.PI * 2) / config.arms) + distance * 0.32 + (Math.random() - 0.5) * 0.45;

      pos[i * 3] = distance * Math.cos(angle);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.0 * (1.5 - distance / 16);
      pos[i * 3 + 2] = distance * Math.sin(angle);

      const coreMix = Math.max(0, 1 - distance / 8);
      const mixedColor = baseColor.clone().lerp(edgeColor, 1 - coreMix);
      if (coreMix > 0.45) {
        mixedColor.lerp(new THREE.Color("#ffffff"), (coreMix - 0.45) * 1.8);
      }

      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    return { positions: pos, colors: cols };
  }, [starCount, config.arms, config.colorTheme, isDark]);

  // 2. Volumetric Gas Cloud locations (Solid Nebula Mode)
  const gasClouds = useMemo(() => {
    const clouds = [];
    const baseColor = new THREE.Color(config.colorTheme);
    const edgeColor = isDark ? new THREE.Color("#4f46e5") : new THREE.Color("#ec4899");

    for (let i = 0; i < gasCloudCount; i++) {
      const distance = Math.pow(Math.random(), 1.8) * 14 + 0.5;
      const armIdx = i % config.arms;
      const angle = (armIdx * (Math.PI * 2) / config.arms) + distance * 0.32 + (Math.random() - 0.5) * 0.25;

      const x = distance * Math.cos(angle);
      const y = (Math.random() - 0.5) * 0.5 * (1.5 - distance / 14);
      const z = distance * Math.sin(angle);

      const coreMix = Math.max(0, 1 - distance / 7);
      const mixedColor = baseColor.clone().lerp(edgeColor, 1 - coreMix);
      if (coreMix > 0.5) {
        mixedColor.lerp(new THREE.Color("#ffffff"), (coreMix - 0.5) * 2.0);
      }

      const size = (0.45 + Math.random() * 0.55) * (1.5 - distance / 16);

      clouds.push({
        position: [x, y, z] as [number, number, number],
        color: "#" + mixedColor.getHexString(),
        size: size
      });
    }

    return clouds;
  }, [gasCloudCount, config.arms, config.colorTheme, isDark]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const activeSpin = t * 0.008 * config.spinSpeed;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = activeSpin;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = activeSpin;
    }
  });

  const coreColor = isDark ? "#ffffff" : "#fdf4ff";

  return (
    <group position={[-5.5, -1, -6.5]} rotation={[config.tiltX, 0, config.tiltZ]}>
      {/* Supermassive Black Hole Core */}
      <group onClick={(e) => { e.stopPropagation(); onCoreSelect(); }}>
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshBasicMaterial color={coreColor} transparent opacity={0.8} />
        </mesh>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshBasicMaterial color={config.colorTheme} transparent opacity={isCoreSelected ? 0.45 : 0.25} />
        </mesh>
        
        {isCoreSelected && (
          <Html distanceFactor={6} position={[0, 0.9, 0]} center>
            <div className="px-2 py-0.5 rounded bg-primary/20 border border-primary text-[8px] font-mono font-bold text-foreground uppercase tracking-widest pointer-events-none">
              Milky Way Center
            </div>
          </Html>
        )}
      </group>

      {/* Galaxy Body arms: Solid Volumetric Clouds vs Points Stars */}
      {config.isSolid ? (
        <group ref={groupRef}>
          {gasClouds.map((cloud, idx) => (
            <mesh key={idx} position={cloud.position}>
              <sphereGeometry args={[cloud.size, 16, 16]} />
              <meshBasicMaterial
                color={cloud.color}
                transparent
                opacity={isDark ? 0.095 : 0.065}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      ) : (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={starCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={starCount}
              array={colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={config.starSize}
            vertexColors
            transparent
            opacity={isDark ? 0.85 : 0.55}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
};

const SolarSystemScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const { theme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // HUD active selection modes
  const [hudTab, setHudTab] = useState<"planets" | "galaxy">("planets");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCoreSelected, setIsCoreSelected] = useState(false);

  // States to custom manage/change planet parameters
  const [planetsState, setPlanetsState] = useState<PlanetState[]>(() =>
    initialPlanets.map((p) => ({
      ...p,
      radiusScale: 1.0,
      speedScale: 1.0,
      visualMode: "realistic",
      isReversed: false,
    }))
  );

  // Galaxy state settings
  const [galaxyConfig, setGalaxyConfig] = useState<GalaxyState>({
    arms: 2,
    spinSpeed: 1.0,
    colorTheme: "#00f0ff",
    tiltX: Math.PI / 4.2,
    tiltZ: Math.PI / 8,
    isSolid: true, // starts in SOLID nebula gas mode!
    starSize: 0.045,
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sunTexture = useMemo(() => {
    return generateProceduralTexture("Sun", "#eab308");
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.rotation.x = Math.PI / 6.5 + Math.sin(t * 0.18) * 0.02;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x, 
      (isMobile ? 0 : 1.45), 
      0.05
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, 
      (isMobile ? 0.65 : -0.15), 
      0.05
    );

    if (sunRef.current) {
      sunRef.current.rotation.y = t * 0.04;
    }
    if (coronaRef.current) {
      coronaRef.current.scale.setScalar(1.08 + Math.sin(t * 2.0) * 0.04);
      coronaRef.current.rotation.z = -t * 0.08;
    }
  });

  const updateSelectedPlanet = (updater: (prev: PlanetState) => PlanetState) => {
    if (selectedIdx === null) return;
    setPlanetsState((prev) =>
      prev.map((p, idx) => (idx === selectedIdx ? updater(p) : p))
    );
  };

  const sunColor = isDark ? "#00f0ff" : "#8b5cf6";
  const ringColor = isDark ? "#0066ff" : "#8b5cf6";

  const selectedPlanet = selectedIdx !== null ? planetsState[selectedIdx] : null;

  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={2.5}
        maxDistance={15}
        rotateSpeed={0.6}
      />

      <group ref={groupRef}>
        {/* ─── INTERACTIVE GALAXY BACKDROP ─── */}
        <MilkyWay
          config={galaxyConfig}
          isCoreSelected={isCoreSelected}
          onCoreSelect={() => {
            setIsCoreSelected(true);
            setSelectedIdx(null);
            setHudTab("galaxy");
          }}
        />

        {/* ─── THE SUN ─── */}
        <group>
          <mesh ref={sunRef}>
            <sphereGeometry args={[0.75, 32, 32]} />
            {sunTexture ? (
              <meshBasicMaterial map={sunTexture} color={isDark ? "#bbf7ff" : "#d8b4fe"} />
            ) : (
              <meshBasicMaterial color={sunColor} />
            )}
          </mesh>
          <mesh ref={coronaRef}>
            <sphereGeometry args={[0.78, 32, 32]} />
            <meshBasicMaterial color={sunColor} transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Sunlight */}
        <pointLight position={[0, 0, 0]} intensity={3.5} distance={20} decay={1.5} color={sunColor} />

        {/* Orbit Rings */}
        {planetsState.map((planet, idx) => (
          <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.distance - 0.015, planet.distance + 0.015, 64]} />
            <meshBasicMaterial color={ringColor} transparent opacity={isDark ? 0.08 : 0.16} side={THREE.DoubleSide} />
          </mesh>
        ))}

        <AsteroidBelt />

        {/* Orbiting Planets */}
        {planetsState.map((planet, idx) => (
          <Planet
            key={idx}
            {...planet}
            isSelected={selectedIdx === idx}
            onSelect={() => {
              setSelectedIdx(idx);
              setIsCoreSelected(false);
              setHudTab("planets");
            }}
          />
        ))}
      </group>

      <ambientLight intensity={isDark ? 0.12 : 0.5} />

      {/* ─── FUTURISTIC CUSTOMIZER CONTROL HUD (Rendered using Drei Html to prevent canvas reconciler crash) ─── */}
      <Html fullscreen style={{ pointerEvents: "none" }}>
        <div className="absolute inset-0 flex items-end justify-center lg:justify-end pb-8 lg:pr-8 pointer-events-none">
          {/* Main Controls Wrapper */}
          <div className="w-[90%] sm:w-[350px] p-5 rounded-xl bg-card/95 border border-primary/20 shadow-xl pointer-events-auto backdrop-blur-md flex flex-col gap-4 text-sm text-foreground">
            
            {/* Header Tabs Toggle */}
            <div className="flex border-b border-border/40 pb-2 justify-between items-center">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setHudTab("planets");
                    if (selectedIdx === null) setSelectedIdx(2); // select Earth by default
                    setIsCoreSelected(false);
                  }}
                  className={`text-xs uppercase font-mono tracking-widest transition-all ${
                    hudTab === "planets" ? "text-primary font-bold border-b border-primary pb-1" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Planets
                </button>
                <button
                  onClick={() => {
                    setHudTab("galaxy");
                    setIsCoreSelected(true);
                    setSelectedIdx(null);
                  }}
                  className={`text-xs uppercase font-mono tracking-widest transition-all ${
                    hudTab === "galaxy" ? "text-primary font-bold border-b border-primary pb-1" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Milky Way
                </button>
              </div>
              <button
                onClick={() => {
                  setSelectedIdx(null);
                  setIsCoreSelected(false);
                }}
                className="text-[10px] text-muted-foreground hover:text-foreground font-mono"
              >
                [Reset]
              </button>
            </div>

            {/* TAB 1: Planet Customizer Config */}
            {hudTab === "planets" && (
              <div className="flex flex-col gap-4">
                {selectedPlanet ? (
                  <>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-semibold">Selected Node</span>
                      <span className="text-base font-bold tracking-wide font-display">{selectedPlanet.name}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {selectedPlanet.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-mono bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Size Scale:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateSelectedPlanet(p => ({ ...p, radiusScale: Math.max(0.5, p.radiusScale - 0.2) }))}
                            className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                          >
                            -
                          </button>
                          <span className="w-12 text-center">{(selectedPlanet.radiusScale * 100).toFixed(0)}%</span>
                          <button
                            onClick={() => updateSelectedPlanet(p => ({ ...p, radiusScale: Math.min(2.0, p.radiusScale + 0.2) }))}
                            className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Orbit Speed:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateSelectedPlanet(p => ({ ...p, speedScale: Math.max(0, p.speedScale - 0.25) }))}
                            className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                          >
                            -
                          </button>
                          <span className="w-12 text-center">{(selectedPlanet.speedScale * 100).toFixed(0)}%</span>
                          <button
                            onClick={() => updateSelectedPlanet(p => ({ ...p, speedScale: Math.min(3.0, p.speedScale + 0.25) }))}
                            className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Direction:</span>
                        <button
                          onClick={() => updateSelectedPlanet(p => ({ ...p, isReversed: !p.isReversed }))}
                          className="px-2 py-1 border border-border bg-card/50 hover:bg-primary/10 rounded transition-colors text-[9px]"
                        >
                          {selectedPlanet.isReversed ? "⏪ Reverse" : "⏩ Forward"}
                        </button>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-muted-foreground">Visual Appearance:</span>
                        <div className="grid grid-cols-3 gap-1.5 text-[9px] text-center">
                          {(["realistic", "neon", "wireframe"] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => updateSelectedPlanet(p => ({ ...p, visualMode: mode }))}
                              className={`py-1 border rounded capitalize transition-all ${
                                selectedPlanet.visualMode === mode
                                  ? "border-primary bg-primary/10 font-bold"
                                  : "border-border bg-card/50 hover:bg-primary/5"
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center text-muted-foreground text-xs font-mono">
                    ℹ Click any planet in the solar system to configure its parameters.
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Milky Way Customizer Config (Do anything with the Milky Way) */}
            {hudTab === "galaxy" && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-semibold">Milky Way Config</span>
                  <span className="text-base font-bold tracking-wide font-display">Logarithmic Spiral Galaxy</span>
                </div>

                <div className="flex flex-col gap-3 font-mono text-xs">
                  {/* 1. Visual Mode (Volumetric solid nebula vs point stars) */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-muted-foreground">Galaxy Rendering:</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-center">
                      <button
                        onClick={() => setGalaxyConfig(prev => ({ ...prev, isSolid: true }))}
                        className={`py-1.5 border rounded transition-all ${
                          galaxyConfig.isSolid ? "border-primary bg-primary/10 font-bold" : "border-border bg-card/50 hover:bg-primary/5"
                        }`}
                      >
                        ☁ Solid Nebula
                      </button>
                      <button
                        onClick={() => setGalaxyConfig(prev => ({ ...prev, isSolid: false }))}
                        className={`py-1.5 border rounded transition-all ${
                          !galaxyConfig.isSolid ? "border-primary bg-primary/10 font-bold" : "border-border bg-card/50 hover:bg-primary/5"
                        }`}
                      >
                        ✨ Star Particles
                      </button>
                    </div>
                  </div>

                  {/* 2. Number of Spiral Arms */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Spiral Arms:</span>
                    <div className="flex gap-1.5">
                      {[2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setGalaxyConfig(prev => ({ ...prev, arms: num }))}
                          className={`w-6 h-6 border rounded text-[10px] flex items-center justify-center transition-all ${
                            galaxyConfig.arms === num ? "border-primary bg-primary/10 font-bold" : "border-border bg-card/50 hover:bg-primary/5"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Rotational Spin Speed */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Spin Speed:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGalaxyConfig(prev => ({ ...prev, spinSpeed: Math.max(-2, prev.spinSpeed - 0.25) }))}
                        className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{(galaxyConfig.spinSpeed * 100).toFixed(0)}%</span>
                      <button
                        onClick={() => setGalaxyConfig(prev => ({ ...prev, spinSpeed: Math.min(4.0, prev.spinSpeed + 0.25) }))}
                        className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 4. Color Theme (Color Circle selectors) */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-muted-foreground">Galaxy Color Palette:</span>
                    <div className="flex gap-2.5 items-center">
                      {[
                        { color: "#00f0ff", name: "Cyan" },
                        { color: "#8b5cf6", name: "Purple" },
                        { color: "#ec4899", name: "Pink" },
                        { color: "#10b981", name: "Green" },
                        { color: "#eab308", name: "Amber" },
                      ].map((item) => (
                        <button
                          key={item.color}
                          onClick={() => setGalaxyConfig(prev => ({ ...prev, colorTheme: item.color }))}
                          className={`w-6 h-6 rounded-full border transition-all ${
                            galaxyConfig.colorTheme === item.color ? "border-white ring-2 ring-primary scale-110" : "border-transparent opacity-75 hover:opacity-100"
                          }`}
                          style={{ backgroundColor: item.color }}
                          title={item.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 5. Galaxy Tilt Angle */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Inclination Tilt:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setGalaxyConfig(prev => ({
                          ...prev,
                          tiltX: Math.max(0, prev.tiltX - 0.08),
                          tiltZ: Math.max(-Math.PI/4, prev.tiltZ - 0.08)
                        }))}
                        className="px-2 py-1 border border-border bg-card/50 hover:bg-primary/10 rounded text-[9px]"
                      >
                        Flatten
                      </button>
                      <button
                        onClick={() => setGalaxyConfig(prev => ({
                          ...prev,
                          tiltX: Math.min(Math.PI/2, prev.tiltX + 0.08),
                          tiltZ: Math.min(Math.PI/2, prev.tiltZ + 0.08)
                        }))}
                        className="px-2 py-1 border border-border bg-card/50 hover:bg-primary/10 rounded text-[9px]"
                      >
                        Tilt Up
                      </button>
                    </div>
                  </div>

                  {/* 6. Point Cloud Star Size (only in star mode) */}
                  {!galaxyConfig.isSolid && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Star Size:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setGalaxyConfig(prev => ({ ...prev, starSize: Math.max(0.015, prev.starSize - 0.01) }))}
                          className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{(galaxyConfig.starSize * 1000).toFixed(0)}px</span>
                        <button
                          onClick={() => setGalaxyConfig(prev => ({ ...prev, starSize: Math.min(0.12, prev.starSize + 0.01) }))}
                          className="px-2 py-0.5 border border-border bg-card/50 hover:bg-primary/10 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Html>
    </>
  );
};

export default SolarSystemScene;
