"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, BookOpen } from "lucide-react";

export default function StickyNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show nav after scrolling down ~80% of hero height (approx 600px)
    if (latest > 600) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full border border-white/20 shadow-2xl shadow-neon-blue/20 flex items-center gap-6 backdrop-blur-3xl"
    >
      <Link href="#blogs" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
        <BookOpen className="w-4 h-4" /> Blogs
      </Link>
      <Link href="#contact" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
        <Mail className="w-4 h-4" /> Contact
      </Link>
      
      <div className="w-px h-4 bg-white/20 mx-2" />
      
      <Link href="https://github.com/imskygupta" target="_blank" className="text-white/70 hover:text-neon-purple transition-colors">
        <Github className="w-5 h-5" />
      </Link>
      <Link href="https://www.linkedin.com/in/iskygupta/" target="_blank" className="text-white/70 hover:text-neon-blue transition-colors">
        <Linkedin className="w-5 h-5" />
      </Link>
    </motion.nav>
  );
}
