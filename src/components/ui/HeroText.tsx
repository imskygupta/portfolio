"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Simple, subtle floating animation in fixed position
    gsap.to(containerRef.current, {
      y: 15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center pointer-events-none select-none">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 mb-2 tracking-tighter mix-blend-plus-lighter">
        AKASH GUPTA
      </h1>
      <p className="text-xl md:text-2xl text-white/70 max-w-2xl text-center font-light tracking-wide mb-12 mix-blend-plus-lighter drop-shadow-lg">
        Full-Stack Developer & SEO Specialist
      </p>
    </div>
  );
}
