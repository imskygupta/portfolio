"use client";

import { useState } from "react";
import { login } from "../actions";
import { Lock, LogIn, KeyRound } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSentMsg, setOtpSentMsg] = useState("");

  const handleRequestOTP = async () => {
    setIsPending(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_otp",
          email: "contact@skycart.xyz", 
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStep("verify");
        setOtpSentMsg("Secure OTP sent to contact@skycart.xyz");
      } else {
        setErrorMessage("Failed to send OTP. System error.");
      }
    } catch (e) {
      setErrorMessage("Network error.");
    } finally {
      setIsPending(false);
    }
  };

  const handleVerifyLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp") as string;
    
    // Hardcoded default fallback password format, but the real security is the OTP
    // First, verify OTP via API
    try {
      const checkRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_otp",
          email: "contact@skycart.xyz",
          otp,
        }),
      });

      const checkData = await checkRes.json();
      
      if (!checkData.success) {
         setErrorMessage("Invalid or expired OTP.");
         setIsPending(false);
         return;
      }

      // If OTP is valid, submit login credentials
      const loginForm = new FormData();
      loginForm.append("email", "contact@skycart.xyz");
      loginForm.append("password", "Akash@1234");
      
      const resMsg = await login(null, loginForm);
      if (resMsg) {
        setErrorMessage(resMsg);
      }
      
    } catch (err: any) {
      setErrorMessage("Authentication failure.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-background -z-10" />
      <div className="noise-bg opacity-30 pointer-events-none" />
      
      <div className="glass max-w-sm w-full rounded-3xl p-8 border border-neon-blue/20 shadow-[0_0_50px_rgba(0,240,255,0.05)] text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 bg-white/5 rounded-full text-neon-blue mb-4 border border-neon-blue/20 shadow-inner">
            {step === "request" ? <Lock className="w-8 h-8 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" /> : <KeyRound className="w-8 h-8 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />}
          </div>
          <h1 className="text-xl font-bold tracking-widest uppercase">Admin Terminal</h1>
          <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Restricted Zone</p>
        </div>

        {errorMessage && (
          <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20 mb-4 font-mono">
            Error: {errorMessage}
          </div>
        )}
        
        {otpSentMsg && (
          <div className="text-emerald-400 text-sm text-center bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 mb-4 font-mono">
            {otpSentMsg}
          </div>
        )}

        {step === "request" ? (
          <div className="flex flex-col gap-4">
             <p className="text-sm font-light text-white/70 mb-2">
               Authenticate default profile to request secure key.
             </p>
             <button
               onClick={handleRequestOTP}
               disabled={isPending}
               className="w-full bg-neon-blue/20 border border-neon-blue/50 text-neon-blue font-semibold rounded-xl px-4 py-3 hover:bg-neon-blue/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-widest text-sm"
             >
               {isPending ? "Connecting..." : (
                 <>
                   <LogIn className="w-4 h-4" /> Request Authorization
                 </>
               )}
             </button>
          </div>
        ) : (
          <form onSubmit={handleVerifyLogin} className="flex flex-col gap-4">
            <input
              type="text"
              name="otp"
              placeholder="_ _ _ _"
              maxLength={4}
              required
              className="w-full bg-black/50 border border-neon-blue/30 rounded-xl px-4 py-4 text-center text-3xl tracking-[1em] text-neon-blue placeholder:text-neon-blue/20 focus:outline-none focus:ring-1 focus:ring-neon-blue font-mono"
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 mt-2 hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-widest text-sm"
            >
              {isPending ? "Verifying..." : "Enter System"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
