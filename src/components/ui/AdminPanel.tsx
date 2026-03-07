"use client";

import { useState } from "react";
import { PlusCircle, Save, Trash2, KeyRound } from "lucide-react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"projects" | "experiences" | "settings">("projects");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Projects State
  const [newProject, setNewProject] = useState({ title: "", description: "", image: "", link: "", order: 0 });
  
  // Experiences State
  const [newExperience, setNewExperience] = useState({ role: "", company: "", period: "", description: "", order: 0 });

  // Settings State
  const [newPassword, setNewPassword] = useState("");

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setMessage(`[${type.toUpperCase()}] ${msg}`);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleCreateProject = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject)
      });
      const data = await res.json();
      if (data.success) {
        showMessage("Project Created Successfully!");
        setNewProject({ title: "", description: "", image: "", link: "", order: 0 });
      } else throw new Error(data.error);
    } catch (e: any) {
      showMessage(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExperience)
      });
      const data = await res.json();
      if (data.success) {
        showMessage("Experience Added Successfully!");
        setNewExperience({ role: "", company: "", period: "", description: "", order: 0 });
      } else throw new Error(data.error);
    } catch (e: any) {
      showMessage(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword })
      });
      const data = await res.json();
      if (data.success) {
        showMessage("Password Updated Securely!");
        setNewPassword("");
      } else throw new Error(data.error);
    } catch (e: any) {
      showMessage(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 rounded-3xl border border-white/10 w-full col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <h3 className="text-xl font-bold tracking-tight text-white flex gap-6">
          <button onClick={() => setActiveTab("projects")} className={`hover:text-neon-blue transition-colors ${activeTab === "projects" ? "text-neon-blue border-b-2 border-neon-blue pb-1" : "text-white/50"}`}>Projects</button>
          <button onClick={() => setActiveTab("experiences")} className={`hover:text-emerald-400 transition-colors ${activeTab === "experiences" ? "text-emerald-400 border-b-2 border-emerald-400 pb-1" : "text-white/50"}`}>Career</button>
          <button onClick={() => setActiveTab("settings")} className={`hover:text-neon-purple transition-colors ${activeTab === "settings" ? "text-neon-purple border-b-2 border-neon-purple pb-1" : "text-white/50"}`}>Settings</button>
        </h3>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl border border-white/20 bg-black/50 text-white font-mono text-sm shadow-inner">
          {message}
        </div>
      )}

      {activeTab === "projects" && (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <h4 className="font-semibold text-neon-blue tracking-widest uppercase mb-4 text-sm flex items-center gap-2"><PlusCircle className="w-4 h-4"/> Add New Project</h4>
          <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
          <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue" placeholder="Short Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} rows={3} />
          <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue" placeholder="Image URL (Unsplash or direct)" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} />
          <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue" placeholder="Optional Link" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} />
          <button disabled={loading} onClick={handleCreateProject} className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/20 hover:bg-neon-blue/20 hover:text-neon-blue rounded-xl py-3 mt-4 transition-colors font-semibold disabled:opacity-50">
            <Save className="w-4 h-4"/> Publish Project to Gallery
          </button>
        </div>
      )}

      {activeTab === "experiences" && (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <h4 className="font-semibold text-emerald-400 tracking-widest uppercase mb-4 text-sm flex items-center gap-2"><PlusCircle className="w-4 h-4"/> Add Career Node</h4>
          <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400" placeholder="Job Role" value={newExperience.role} onChange={e => setNewExperience({...newExperience, role: e.target.value})} />
          <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400" placeholder="Company Name" value={newExperience.company} onChange={e => setNewExperience({...newExperience, company: e.target.value})} />
          <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400" placeholder="Period (e.g. Dec 2023 - Present)" value={newExperience.period} onChange={e => setNewExperience({...newExperience, period: e.target.value})} />
          <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400" placeholder="Job Description Highlights" value={newExperience.description} onChange={e => setNewExperience({...newExperience, description: e.target.value})} rows={3} />
          <button disabled={loading} onClick={handleCreateExperience} className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/20 hover:bg-emerald-400/20 hover:text-emerald-400 rounded-xl py-3 mt-4 transition-colors font-semibold disabled:opacity-50">
            <Save className="w-4 h-4"/> Add to Timeline
          </button>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <h4 className="font-semibold text-neon-purple tracking-widest uppercase mb-4 text-sm flex items-center gap-2"><KeyRound className="w-4 h-4"/> Security Controls</h4>
          <p className="text-white/50 text-sm mb-4">Update the default master password used to authenticate into this system. Make it highly secure.</p>
          <input type="password" minLength={6} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-purple" placeholder="New Master Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <button disabled={loading} onClick={handleUpdatePassword} className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/20 hover:bg-neon-purple/20 hover:text-neon-purple rounded-xl py-3 mt-4 transition-colors font-semibold disabled:opacity-50 text-neon-purple">
            <Save className="w-4 h-4"/> Enforce New Password
          </button>
        </div>
      )}
    </div>
  );
}
