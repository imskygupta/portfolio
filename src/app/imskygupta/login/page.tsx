"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    login,
    undefined
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-background -z-10" />
      <div className="noise-bg opacity-30 pointer-events-none" />
      
      <div className="glass max-w-sm w-full rounded-3xl p-8 border border-neon-blue/20 shadow-[0_0_50px_rgba(0,240,255,0.05)] text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 bg-white/5 rounded-full text-neon-blue mb-4 border border-neon-blue/20 shadow-inner">
            <Lock className="w-8 h-8 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
          </div>
          <h1 className="text-xl font-bold tracking-widest uppercase">Admin Terminal</h1>
          <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Restricted Zone</p>
        </div>

        {errorMessage && (
          <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20 mb-4 font-mono">
            Error: {errorMessage}
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            className="w-full bg-black/50 border border-neon-blue/30 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
          <input
            type="password"
            name="password"
            placeholder="Passcode"
            required
            className="w-full bg-black/50 border border-neon-blue/30 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 mt-4 hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 tracking-widest uppercase text-sm"
          >
            {isPending ? "Authenticating..." : (
              <>
                <LogIn className="w-4 h-4" /> Enter System
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
