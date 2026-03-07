"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function AdminWarning() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative bg-black">
      <div className="absolute inset-0 noise-bg opacity-50 pointer-events-none" />
      
      <div className="max-w-md w-full text-center space-y-6 flex flex-col items-center">
        <div className="animate-pulse text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]">
          <ShieldAlert className="w-24 h-24" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-widest uppercase text-red-500 drop-shadow-md">
          Access Denied
        </h1>
        
        <div className="glass p-6 rounded-2xl border border-red-500/30 bg-red-950/20">
          <p className="text-lg text-white/90 leading-relaxed font-mono">
            This is not the page. Recommended to not visit.
            Something dangerous is here.
          </p>
          <p className="text-sm text-white/50 mt-4 italic">
            I appreciate your extra knowledge.
          </p>
        </div>

        <p className="text-xs text-red-500/50 uppercase tracking-widest animate-bounce">
          Redirecting to safety...
        </p>

        <button 
          onClick={() => router.push("/")}
          className="mt-8 px-6 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-full transition-colors text-sm uppercase tracking-widest"
        >
          Return Now
        </button>
      </div>
    </main>
  );
}
