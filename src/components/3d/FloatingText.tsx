import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FloatingTextProps {
  text: string;
  position?: [number, number, number];
  fontSize?: number;
  color?: string;
  opacity?: number;
  speed?: number;
}

const FloatingText = ({
  text,
  position = [0, 0, 0],
  fontSize = 0.3,
  color = "#00f0ff",
  opacity = 0.4,
  speed = 0.5,
}: FloatingTextProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.3;
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.woff"
        fillOpacity={opacity}
        outlineWidth={0.002}
        outlineColor={color}
        outlineOpacity={opacity * 0.3}
      >
        {text}
      </Text>
    </group>
  );
};

export default FloatingText;
