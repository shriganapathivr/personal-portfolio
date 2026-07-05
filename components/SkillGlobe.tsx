"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Billboard, OrbitControls, Text } from "@react-three/drei";

const SKILLS = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js",
  "Node.js", "MongoDB", "REST API", "Git & GitHub", "Three.js",
];

const COLORS = ["#00ff88", "#f4f6f4", "#a855f7"];

/** Evenly distribute points on a sphere (Fibonacci). */
function fibonacciSphere(n: number, radius: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = golden * i;
    pts.push([
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ]);
  }
  return pts;
}

function Globe() {
  const positions = useMemo(() => fibonacciSphere(SKILLS.length, 3.2), []);
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[3.2, 1]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.08} />
      </mesh>
      {SKILLS.map((skill, i) => (
        <Billboard key={skill} position={positions[i]}>
          <Text
            fontSize={0.36}
            color={COLORS[i % COLORS.length]}
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

export default function SkillGlobe() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={1} />
      <Globe />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.1}
      />
    </Canvas>
  );
}
