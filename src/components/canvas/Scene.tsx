"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SpaceScene from "./SpaceScene";
import { Suspense } from "react";

export default function Scene() {
  return (
    <div className="w-full h-screen fixed inset-0 -z-10 bg-transparent">
      <Canvas camera={{ position: [0, 5, 25], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        
        <Suspense fallback={null}>
          <SpaceScene />
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
              <Lightformer form="circle" intensity={1} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            </group>
          </Environment>
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
