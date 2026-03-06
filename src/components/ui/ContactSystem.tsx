"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MessageSquare, ShieldCheck } from "lucide-react";

type Step = "email" | "otp" | "message" | "success";

export default function ContactSystem() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_otp", email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("otp");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_otp", email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("message");
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit_message", email, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass max-w-md w-full mx-auto rounded-3xl p-8 relative overflow-hidden backdrop-blur-3xl border-white/10 shadow-2xl shadow-neon-blue/5">
      <AnimatePresence mode="wait">
        
        {step === "email" && (
          <motion.form
            key="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSendOTP}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/5 rounded-2xl text-neon-blue border border-white/10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Secure Contact</h3>
                <p className="text-sm text-white/50">Verified Inquiries Only</p>
              </div>
            </div>
            
            <p className="text-sm text-white/70 mb-4 font-light leading-relaxed">
              Enter your email to receive a secure one-time passcode. This eliminates spam and ensures authentic connections.
            </p>

            <input
              type="email"
              placeholder="hello@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all font-light"
            />
            
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 mt-2 hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Magic Code"}
            </button>
          </motion.form>
        )}

        {step === "otp" && (
          <motion.form
            key="otp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleVerifyOTP}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/5 rounded-2xl text-neon-purple border border-white/10">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Verification</h3>
                <p className="text-sm text-white/50">Code sent to {email}</p>
              </div>
            </div>

            <input
              type="text"
              placeholder="4-Digit OTP"
              required
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-center tracking-[1em] font-mono text-xl focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition-all"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-neon-purple text-white font-semibold rounded-xl px-4 py-3 mt-2 hover:bg-neon-purple/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
            </button>
          </motion.form>
        )}

        {step === "message" && (
          <motion.form
            key="message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmitMessage}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/5 rounded-2xl text-neon-blue border border-white/10">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Compose Message</h3>
                <p className="text-sm text-white/50">Verified as {email}</p>
              </div>
            </div>

            <textarea
              placeholder="Your secure message for Akash..."
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all resize-none font-light"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 mt-2 hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Initiate Transfer"}
            </button>
          </motion.form>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-8 gap-4"
          >
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Transmission Successful</h3>
            <p className="text-white/60 font-light max-w-xs mx-auto">Your message has been safely encrypted and delivered. I will respond to your email momentarily.</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
