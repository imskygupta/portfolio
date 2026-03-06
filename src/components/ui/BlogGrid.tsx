"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const mockBlogs = [
  {
    id: 1,
    title: "The Future of Spatial UI in Web Applications",
    date: "Mar 2026",
    excerpt: "Why the 3D web is becoming the new standard for luxury digital experiences...",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering Next.js 15 Server Actions",
    date: "Feb 2026",
    excerpt: "How to eliminate API routes and streamline your full-stack monorepo completely.",
    readTime: "8 min read"
  }
];

export default function BlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
      {mockBlogs.map((blog, idx) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="glass p-8 rounded-3xl flex flex-col justify-between group hover:border-white/30 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-neon-purple text-sm font-semibold tracking-widest uppercase">
                {blog.date}
              </span>
              <div className="p-2 bg-white/5 rounded-full text-white/50 group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-neon-purple transition-colors">
              {blog.title}
            </h3>
            <p className="text-white/60 font-light leading-relaxed mb-6">
              {blog.excerpt}
            </p>
          </div>
          
          <Link href={`/blogs/${blog.id}`} className="inline-flex items-center gap-2 text-sm text-white/50 group-hover:text-white transition-colors w-fit">
            Read Article <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
