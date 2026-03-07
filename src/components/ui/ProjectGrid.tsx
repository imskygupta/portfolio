"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

const mockProjects: Project[] = [
  { _id: "1", title: "Skycart Ecommerce", description: "UI + SEO for live product using Laravel", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop" },
  { _id: "2", title: "VidMaxx", description: "AI-powered SaaS tool for video generation", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop" },
  { _id: "3", title: "Cosmo India", description: "Facebook ad campaigns & brand reach", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" },
  { _id: "4", title: "Kaal Coders", description: "SEO-ready mobile-first design", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" },
  { _id: "5", title: "Neural Architect", description: "Spatial UI Portfolio featuring custom 3D engines", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" }
];

function ProjectCard({ project, isActive, onClick }: { project: Project, isActive: boolean, onClick: () => void }) {
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
    <div className="p-2 transition-all duration-300">
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          perspective: 1000, 
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out"
        }}
        className={twMerge(
          "glass rounded-3xl p-6 flex flex-col justify-end h-[400px] w-full relative overflow-hidden group cursor-pointer border border-white/10",
          isActive && "ring-2 ring-neon-purple shadow-[0_0_40px_rgba(176,38,255,0.6)] border-neon-purple"
        )}
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
          <p className="text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base">
            {project.description}
          </p>
        </div>

        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-purple/30 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = scrollRef.current;
      if (!track) return;
      
      const scrollAmount = track.scrollWidth - window.innerWidth + 150; 
      
      gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => "+=" + scrollAmount,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen relative z-10 flex flex-col justify-center overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mb-4">
         <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Selected Works</h2>
      </div>
      
      <div 
        ref={scrollRef} 
        className="flex gap-4 px-4 md:px-8 w-max pb-8 pt-4 items-center"
      >
        {mockProjects.map(p => (
          <div key={p._id} className="w-[85vw] sm:w-[350px] lg:w-[400px] shrink-0">
            <ProjectCard 
              project={p} 
              isActive={activeCard === p._id} 
              onClick={() => setActiveCard(p._id === activeCard ? null : p._id)} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
