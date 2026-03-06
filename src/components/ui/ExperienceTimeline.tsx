"use client";

import { Briefcase } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const experiences = [
  {
    id: 1,
    role: "Software Development Intern",
    company: "Crystaltech Services Pvt Ltd",
    period: "Jan 2026 - Jun 2026",
    description: "Frontend focused development bridging academic knowledge with enterprise solutions."
  },
  {
    id: 2,
    role: "SEO & Research Intern",
    company: "ScaleDigiHub",
    period: "Mar 2025 - Jun 2025",
    description: "Optimized blog and service pages using keyword research and audited website structures."
  },
  {
    id: 3,
    role: "Facebook Marketing Intern",
    company: "Cosmo India",
    period: "Feb 2025 - Mar 2025",
    description: "Designed and ran Facebook ad campaigns focused on brand reach and orientation."
  },
  {
    id: 4,
    role: "Lead Web Designer",
    company: "Kaal Coders",
    period: "2024",
    description: "Managed the website design project for ItemX with mobile-first and SEO-ready design strategies."
  },
  {
    id: 5,
    role: "Lead Frontend Developer",
    company: "Skycart.xyz",
    period: "Dec 2023",
    description: "Designed and developed full-stack e-commerce UI integrating live products and optimal SEO."
  }
];

export default function ExperienceTimeline() {
  return (
    <div className="w-full relative py-8">
      {/* Horizontal timeline connective line backdrop */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0 hidden md:block" />

      <Swiper
        slidesPerView={1}
        spaceBetween={40}
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
        className="w-full pb-16 pt-8 px-4"
      >
        {experiences.map((exp, index) => (
          <SwiperSlide key={exp.id} className="pt-4 h-full">
            <div className="relative group h-full cursor-grab active:cursor-grabbing">
              {/* Timeline Node - Top for mobile, center for desktop */}
              <div className="absolute -top-[52px] md:-top-[68px] left-8 w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center group-hover:bg-neon-blue/10 group-hover:border-neon-blue/50 transition-colors shadow-2xl z-20">
                <Briefcase className="w-4 h-4 text-white/50 group-hover:text-neon-blue transition-colors" />
              </div>

              {/* Connector line up to node */}
              <div className="absolute left-[51px] -top-6 w-px h-6 bg-white/20 group-hover:bg-neon-blue/50 transition-colors z-10" />

              <div className="glass p-6 md:p-8 rounded-3xl group-hover:border-white/20 transition-colors h-[280px] flex flex-col justify-start border border-white/10 shadow-lg relative z-10 bg-black/40">
                <span className="text-neon-blue text-sm font-semibold tracking-widest uppercase mb-2 block object-left">
                  {exp.period}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                  {exp.role}
                </h3>
                <h4 className="text-lg text-white/50 mb-4 font-light">
                  {exp.company}
                </h4>
                <p className="text-white/70 leading-relaxed font-light text-sm max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                  {exp.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Global override for Swiper pagination bullets */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #b026ff;
          box-shadow: 0 0 10px #b026ff;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05); 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2); 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(176,38,255,0.5); 
        }
      `}</style>
    </div>
  );
}
