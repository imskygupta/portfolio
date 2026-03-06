"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [planetaryTime, setPlanetaryTime] = useState("");
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
      const now = Date.now();
      const diffInSeconds = Math.floor((now - startOfYear) / 1000);
      
      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = Math.floor(diffInSeconds % 60);

      setPlanetaryTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch and register real visitor
    const recordVisitor = async () => {
      try {
        const res = await fetch("/api/visitors", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setVisitors(data.totalVisitors);
        }
      } catch (error) {
        console.error("Failed to record visitor", error);
      }
    };
    recordVisitor();
  }, []);

  return (
    <footer className="relative border-t border-white/10 mt-32 pt-16 pb-8 overflow-hidden z-10 bg-black/60 backdrop-blur-xl">
      {/* Glow fading into footer from Galaxy effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/5 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
            Neural Architect
          </h2>
          <p className="text-white/60 font-light max-w-sm mb-6">
            Crafting spatial user interfaces and high-performance digital experiences driving the next cycle of the web.
          </p>
          <div className="glass inline-flex items-center px-4 py-2 rounded-xl border-white/10 gap-4">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest">Earth Rotation State</p>
              <p className="text-neon-purple font-mono font-bold">{planetaryTime} / 365d</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-white/50 text-sm mb-4">Join to receive updates on my latest tech deep dives and projects.</p>
          <form className="flex rounded-xl overflow-hidden glass border-white/10 focus-within:ring-1 focus-within:ring-neon-blue">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent text-sm w-full outline-none px-4 py-3 placeholder:text-white/30 text-white" 
            />
            <button type="button" className="px-4 hover:bg-white/10 transition-colors border-l border-white/10 text-white">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Metrics</h3>
          <div className="glass p-4 rounded-xl border border-white/10 flex flex-col gap-1">
             <span className="text-xs text-white/50 uppercase tracking-widest">Global Visitors</span>
             <span className="text-3xl font-light text-neon-blue">
               {visitors !== null ? visitors.toLocaleString() : "..."}
             </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
        <p>© 2026 Akash Gupta. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="https://github.com/imskygupta" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/iskygupta/" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
