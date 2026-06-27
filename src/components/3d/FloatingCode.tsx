import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const codeSnippets = [
  "const app = express();",
  "async function deploy() {",
  "  return await build();",
  "}",
  "docker build -t app .",
  "git push origin main",
  "<Component {...props} />",
  "npm run dev",
  "SELECT * FROM users;",
  "interface Developer {",
  "  skills: string[];",
  "}",
];

const FloatingCode = () => {
  const groupRef = useRef<THREE.Group>(null);

  const snippetConfigs = useMemo(() => {
    return codeSnippets.map((text, i) => ({
      text,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.15 + 0.08,
      fontSize: Math.random() * 0.08 + 0.08,
      color: i % 3 === 0 ? "#00f0ff" : i % 3 === 1 ? "#8b5cf6" : "#0066ff",
      rotationY: (Math.random() - 0.5) * 0.5,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={groupRef}>
      {snippetConfigs.map((config, i) => (
        <FloatingSnippet key={i} {...config} index={i} />
      ))}
    </group>
  );
};

interface SnippetProps {
  text: string;
  position: [number, number, number];
  speed: number;
  opacity: number;
  fontSize: number;
  color: string;
  rotationY: number;
  index: number;
}

const FloatingSnippet = ({
  text,
  position,
  speed,
  opacity,
  fontSize,
  color,
  rotationY,
  index,
}: SnippetProps) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(t + index) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5 + index * 2) * 0.3;
    meshRef.current.rotation.y = rotationY + Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={meshRef} position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="left"
        anchorY="middle"
        fillOpacity={opacity}
        font={undefined}
      >
        {text}
      </Text>
    </group>
  );
};

export default FloatingCode;
