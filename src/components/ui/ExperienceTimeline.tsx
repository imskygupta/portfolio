"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

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
    <div className="relative border-l border-white/20 ml-4 md:ml-8 py-8 space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={exp.id}
          className="relative pl-8 md:pl-12 group"
        >
          {/* Timeline Node */}
          <div className="absolute -left-[21px] top-1 w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center group-hover:bg-neon-blue/10 group-hover:border-neon-blue/50 transition-colors shadow-2xl">
            <Briefcase className="w-4 h-4 text-white/50 group-hover:text-neon-blue transition-colors" />
          </div>

          <div className="glass p-6 md:p-8 rounded-3xl group-hover:border-white/20 transition-colors">
            <span className="text-neon-blue text-sm font-semibold tracking-widest uppercase mb-2 block object-left">
              {exp.period}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">
              {exp.role}
            </h3>
            <h4 className="text-lg text-white/60 mb-4 font-light">
              {exp.company}
            </h4>
            <p className="text-white/70 leading-relaxed font-light">
              {exp.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
