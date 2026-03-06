"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

export default function GlassCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Rotate slowly over time
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.2;

    // Follow mouse with lerp (antigravity effect)
    // The pointer is normalized between -1 and 1
    const targetX = (state.pointer.x * state.viewport.width) / 6;
    const targetY = (state.pointer.y * state.viewport.height) / 6;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={4}
          roughness={0.05}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.6}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
          clearcoat={1}
          attenuationDistance={2}
          attenuationColor="#ffffff"
        />
      </mesh>
      {/* Floating Skycart Logo behind core */}
      <Text 
        position={[0, 0, -3]} 
        fontSize={1} 
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#b026ff"
      >
        SKYCART
      </Text>
    </group>
  );
}
