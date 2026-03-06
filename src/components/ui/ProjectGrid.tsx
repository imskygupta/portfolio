"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  span?: string;
}

const mockProjects: Project[] = [
  { _id: "1", title: "Skycart Ecommerce", description: "UI + SEO for live product using Laravel", span: "md:col-span-2 md:row-span-2", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop" },
  { _id: "2", title: "VidMaxx", description: "AI-powered SaaS tool for video generation", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1626544827763-d516dce335e4?q=80&w=1000&auto=format&fit=crop" },
  { _id: "3", title: "Cosmo India", description: "Facebook ad campaigns & brand reach", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" },
  { _id: "4", title: "Kaal Coders", description: "SEO-ready mobile-first design", span: "md:col-span-3 md:row-span-1", image: "https://images.unsplash.com/photo-1507238692062-7301c22e43f3?q=80&w=1000&auto=format&fit=crop" }
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const maxRotate = 4;
    setRotateX(((y - centerY) / centerY) * -maxRotate);
    setRotateY(((x - centerX) / centerX) * maxRotate);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`glass rounded-3xl p-6 flex flex-col justify-end min-h-[300px] relative overflow-hidden group cursor-pointer ${project.span}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
      
      {project.image && (
        <div className="absolute inset-0 z-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-105 group-hover:scale-100" />
        </div>
      )}

      <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500 z-0 pointer-events-none" />

      <div className="relative z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-2xl font-bold mb-2 tracking-tight">{project.title}</h3>
        <p className="text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.description}
        </p>
      </div>

      {/* Decorative gradient orb on hover */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-purple/30 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
      {mockProjects.map(p => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}
