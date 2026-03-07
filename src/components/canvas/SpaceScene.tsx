"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Spaceship({ radius, speed, offset, yOffset, scale = 1 }: any) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() * speed + offset;
    
    groupRef.current.position.x = Math.cos(time) * radius;
    groupRef.current.position.z = Math.sin(time) * radius;
    groupRef.current.position.y = Math.sin(time * 2) * 2 + yOffset;
    
    // face direction of movement
    groupRef.current.rotation.y = -time;
    groupRef.current.rotation.z = Math.sin(time * 2) * 0.2; // slight bank
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh rotation-x={Math.PI / 2}>
        <coneGeometry args={[0.2, 1, 4]} />
        <meshStandardMaterial color="#222222" roughness={0.7} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#b026ff" />
        <pointLight color="#b026ff" intensity={1} distance={3} />
      </mesh>
      <mesh position={[0, -0.1, 0.3]} rotation-z={Math.PI / 2}>
        <boxGeometry args={[0.05, 0.8, 0.3]} />
        <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.9} />
      </mesh>
    </group>
  );
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 5000;
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      spd[i] = Math.random() * 0.02 + 0.01;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const targetX = (state.pointer.x * state.viewport.width) / 2;
    const targetY = (state.pointer.y * state.viewport.height) / 2;

    pointsRef.current.rotation.y = time * 0.01;
    pointsRef.current.rotation.x = time * 0.005;

    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX * 0.1, 0.02);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY * 0.1, 0.02);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} args={[positions as any, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation={true} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function SpaceScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
     if(groupRef.current){
       const targetX = (state.pointer.x * state.viewport.width) / 20;
       const targetY = (state.pointer.y * state.viewport.height) / 20;
       groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
       groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
     }
  });

  return (
    <group>
      <StarField />
      <group ref={groupRef}>
        <ambientLight intensity={0.05} />
        
        <mesh position={[0, 0, 0]}>
           <sphereGeometry args={[1, 16, 16]} />
           <meshBasicMaterial color="#b026ff" transparent opacity={0.02} blending={THREE.AdditiveBlending} />
        </mesh>

        <Spaceship radius={8} speed={0.4} offset={0} yOffset={2} scale={1.5} />
        <Spaceship radius={12} speed={0.2} offset={3} yOffset={-3} scale={1} />
        <Spaceship radius={18} speed={0.15} offset={5} yOffset={1} scale={2} />
        <Spaceship radius={5} speed={0.6} offset={2} yOffset={-1} scale={0.8} />
        <Spaceship radius={15} speed={0.3} offset={7} yOffset={4} scale={1.2} />
      </group>
    </group>
  );
}
