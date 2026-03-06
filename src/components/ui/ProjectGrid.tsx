"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

const mockProjects: Project[] = [
  { _id: "1", title: "Skycart Ecommerce", description: "UI + SEO for live product using Laravel", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop" },
  { _id: "2", title: "VidMaxx", description: "AI-powered SaaS tool for video generation", image: "https://images.unsplash.com/photo-1626544827763-d516dce335e4?q=80&w=1000&auto=format&fit=crop" },
  { _id: "3", title: "Cosmo India", description: "Facebook ad campaigns & brand reach", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" },
  { _id: "4", title: "Kaal Coders", description: "SEO-ready mobile-first design", image: "https://images.unsplash.com/photo-1507238692062-7301c22e43f3?q=80&w=1000&auto=format&fit=crop" },
  { _id: "5", title: "Neural Architect", description: "Spatial UI Portfolio featuring custom 3D engines", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" }
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: 1000, 
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out"
      }}
      className="glass rounded-3xl p-6 flex flex-col justify-end h-[400px] w-full relative overflow-hidden group cursor-pointer"
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

      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-purple/30 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

export default function ProjectGrid() {
  return (
    <div className="w-full -mx-4 md:-mx-8 px-4 md:px-8">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        mousewheel={{
          forceToAxis: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[FreeMode, Pagination, Mousewheel]}
        className="w-full pb-16 pt-4 px-4"
      >
        {mockProjects.map(p => (
          <SwiperSlide key={p._id} className="pt-4">
            <ProjectCard project={p} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Global override for Swiper pagination bullets to match Neon Noir aesthetic */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #b026ff;
          box-shadow: 0 0 10px #b026ff;
        }
      `}</style>
    </div>
  );
}
