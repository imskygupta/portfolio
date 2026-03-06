import Scene from "@/components/canvas/Scene";
import { ArrowDown } from "lucide-react";

import ProjectGrid from "@/components/ui/ProjectGrid";
import ContactSystem from "@/components/ui/ContactSystem";
import ExperienceTimeline from "@/components/ui/ExperienceTimeline";
import BlogGrid from "@/components/ui/BlogGrid";
import StickyNav from "@/components/ui/StickyNav";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <StickyNav />
      {/* 3D Canvas Background */}
      <Scene />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pointer-events-none select-none">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 mb-2 tracking-tighter mix-blend-plus-lighter">
          AKASH GUPTA
        </h1>
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl text-center font-light tracking-wide mb-12 mix-blend-plus-lighter drop-shadow-lg">
          Full-Stack Developer & SEO Specialist
        </p>

        <div className="absolute bottom-10 animate-bounce text-white/50 flex flex-col items-center gap-2">
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen relative z-10 p-4 md:p-8 pt-24" id="projects">
        <div className="max-w-7xl mx-auto glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-emerald-500/10 shadow-2xl">
          <h2 className="text-5xl font-bold mb-12 tracking-tight">Selected Works</h2>
          <ProjectGrid />
        </div>
      </section>

      {/* Experience Section */}
      <section className="min-h-screen relative z-10 p-4 md:p-8 pt-24" id="experience">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 tracking-tight">Career Journey</h2>
          <ExperienceTimeline />
        </div>
      </section>

      {/* Blogs Section */}
      <section className="min-h-screen relative z-10 p-4 md:p-8 pt-24" id="blogs">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl font-bold tracking-tight">Insights & Writing</h2>
            <div className="hidden md:block">
              <button className="text-sm tracking-widest uppercase text-neon-purple hover:text-white transition-colors">
                View All Archives
              </button>
            </div>
          </div>
          <BlogGrid />
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen relative z-10 p-4 md:p-8 flex flex-col items-center justify-center mt-24" id="contact">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">Let's Connect</h2>
          <p className="text-white/50 max-w-lg mx-auto font-light">
            Skip the noise. Enter your email below to verify your identity and send me a direct message to my secure inbox.
          </p>
        </div>
        
        <ContactSystem />
      </section>
      
      <Footer />
    </main>
  );
}
