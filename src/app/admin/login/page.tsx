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
      <div className="noise-bg" />
      
      <div className="glass max-w-sm w-full rounded-3xl p-8 border border-white/10 shadow-2xl shadow-neon-blue/10">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-white/5 rounded-full text-white/80 mb-4 border border-white/10 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>
          <p className="text-white/50 text-sm mt-1">Restricted Access</p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-neon-blue/50"
          />
          <input
            type="password"
            name="password"
            placeholder="Passcode"
            required
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-neon-blue/50"
          />

          {errorMessage && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 mt-4 hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
