import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface SceneContainerProps {
  children: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
  style?: React.CSSProperties;
}

const SceneContainer = ({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 75 },
  style,
}: SceneContainerProps) => {
  return (
    <Canvas
      className={`r3f-canvas ${className}`}
      camera={camera}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={style}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066ff" />
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default SceneContainer;
