import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logout } from "./actions";
import { Activity, Mail, LogOut, Settings2, FileText } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch actual data
  await connectDB();
  const contacts = await Contact.find({ isVerified: true }).sort({ createdAt: -1 }).limit(5);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 glass p-6 rounded-3xl border border-white/10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Core</h1>
            <p className="text-white/50 text-sm">Welcome back, {session.user?.name || "Admin"}</p>
          </div>
          <form action={logout}>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/10 text-sm">
              <LogOut className="w-4 h-4" /> Terminate Session
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-6 rounded-3xl border border-neon-blue/20">
            <div className="flex items-center gap-3 mb-4 text-neon-blue">
              <Activity className="w-5 h-5" />
              <h3 className="font-semibold tracking-widest uppercase text-sm">Global Status</h3>
            </div>
            <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue/50">
              <option>Looking for Work</option>
              <option>Employed</option>
              <option>Freelancing</option>
            </select>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/10">
             <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <FileText className="w-5 h-5" />
              <h3 className="font-semibold tracking-widest uppercase text-sm">Records</h3>
            </div>
            <p className="text-4xl font-light">4</p>
            <p className="text-white/50 text-sm mt-1">Active Projects</p>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/10 text-neon-purple cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-neon-purple">
              <Mail className="w-5 h-5" />
              <h3 className="font-semibold tracking-widest uppercase text-sm">Inbox Total</h3>
            </div>
            <p className="text-4xl font-light text-white">{contacts.length}</p>
            <p className="text-white/50 text-sm mt-1">Verified Inquiries</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="glass p-8 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight">Recent Inquiries</h3>
              <button className="text-sm text-white/50 hover:text-white">View All</button>
            </div>
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <p className="text-white/50 text-sm">No new inquiries.</p>
              ) : (
                contacts.map((contact: any) => (
                  <div key={contact._id.toString()} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">{contact.email}</span>
                      <span className="text-xs text-white/40">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 truncate">{contact.message}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="glass p-8 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight">Content Management</h3>
              <Settings2 className="w-5 h-5 text-white/50" />
            </div>
            <div className="flex flex-col gap-3">
              <button className="w-full text-left p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                Edit Project Gallery
              </button>
              <button className="w-full text-left p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                Manage Newsletter & Blogs
              </button>
              <button className="w-full text-left p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                Update Technical Skills
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
