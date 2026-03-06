"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Planet({ distance, size, color, speed, offset }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speed + offset;
    meshRef.current.position.x = Math.cos(time) * distance;
    meshRef.current.position.z = Math.sin(time) * distance;
    meshRef.current.rotation.y += 0.01; // self rotation
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

function CursorParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 4000; // Increased count
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60; // wider spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      spd[i] = Math.random() * 0.02 + 0.01;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Mouse tracking for particles
    const time = state.clock.getElapsedTime();
    const targetX = (state.pointer.x * state.viewport.width) / 2;
    const targetY = (state.pointer.y * state.viewport.height) / 2;

    pointsRef.current.rotation.y = time * 0.03; // slightly faster rotation
    pointsRef.current.rotation.x = time * 0.015;

    // Slight attraction to mouse (like bubbles)
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX * 0.2, 0.02);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY * 0.2, 0.02);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} args={[positions, 3] as any} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a0c0ff" transparent opacity={0.5} sizeAttenuation={true} blending={THREE.AdditiveBlending} /> {/* Slight blue tint */}
    </points>
  );
}

export default function SolarSystem() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
     if(groupRef.current){
       groupRef.current.rotation.x = 0.2; // Slight tilt to see the orbits better
       const targetX = (state.pointer.x * state.viewport.width) / 20;
       const targetY = (state.pointer.y * state.viewport.height) / 20;
       groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
       groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
     }
  });

  return (
    <group>
      <CursorParticles />
      <group ref={groupRef}>
        {/* Deep Space Galaxy Core instead of a bright yellow Sun */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshBasicMaterial color="#0a001a" /> {/* Very dark purple/black core */}
          <pointLight intensity={3} distance={60} color="#b026ff" /> {/* Neon purple ambient light for planets */}
        </mesh>
        
        {/* Subtle Neon Accretion Disk / Glow */}
        <mesh position={[0, 0, 0]} rotation-x={Math.PI / 2.5}>
           <torusGeometry args={[3.2, 0.5, 16, 100]} />
           <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>

        <mesh position={[0, 0, 0]}>
           <sphereGeometry args={[3.5, 32, 32]} />
           <meshBasicMaterial color="#b026ff" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Planets (Adjusted specific planetary materials slightly to catch the neon light better) */}
        <Planet distance={4} size={0.3} color="#222222" speed={0.8} offset={0} /> 
        <Planet distance={6} size={0.5} color="#1a1a1a" speed={0.6} offset={2} /> 
        <Planet distance={8.5} size={0.6} color="#004488" speed={0.4} offset={5} /> 
        <Planet distance={11} size={0.5} color="#331111" speed={0.3} offset={1} /> 
        <Planet distance={16} size={1.2} color="#221133" speed={0.15} offset={4} /> 
        <Planet distance={21} size={1.0} color="#112233" speed={0.1} offset={3} /> 
      </group>
    </group>
  );
}
