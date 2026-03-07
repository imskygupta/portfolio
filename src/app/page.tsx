import Scene from "@/components/canvas/Scene";
import { ArrowDown } from "lucide-react";

import ProjectGrid from "@/components/ui/ProjectGrid";
import ContactSystem from "@/components/ui/ContactSystem";
import ExperienceTimeline from "@/components/ui/ExperienceTimeline";
import BlogGrid from "@/components/ui/BlogGrid";
import StickyNav from "@/components/ui/StickyNav";
import Footer from "@/components/ui/Footer";

import HeroText from "@/components/ui/HeroText";

export default function Home() {
  return (
    <main className="relative w-full">
      <StickyNav />
      {/* 3D Canvas Background */}
      <Scene />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        <HeroText />

        <div className="absolute bottom-10 animate-bounce text-white/50 flex flex-col items-center gap-2">
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* Projects Section */}
      <ProjectGrid />

      {/* Experience Section */}
      <ExperienceTimeline />

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
