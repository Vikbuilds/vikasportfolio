"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <motion.section
      id="home"
      className="flex items-center gap-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative shrink-0">
        <Image
          src="/pfp.png"
          alt="Vikas Acharya"
          width={96}
          height={96}
          className="rounded-full object-cover ring-1 ring-border transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-(family-name:--font-schibsted)">
          Vikas Acharya
        </h1>

        {/* Minimal Open to Work / Resume Row */}
        <div className="pt-1 flex items-center gap-2 text-xs font-medium text-muted-foreground select-none">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground/80 font-medium">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Open to Work</span>
          </span>

          <span className="text-muted-foreground/40 font-normal">/</span>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <FileText size={12} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>Resume</span>
            <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
