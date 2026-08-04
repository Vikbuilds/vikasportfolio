"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";
import { MorphingText } from "@/components/ui/morphing-text";

const heroTexts = [
  "Software Engineer for Web & Mobile",
  "Full Stack Developer",
  "Polymath",
  "Open Source Contributor",
  "Freelancer",
  "Otaku",
  "Product Engineer",
];

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
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-(family-name:--font-schibsted)">
            Vikas Acharya
          </h1>
          {/* Open to Work Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Open to Work</span>
          </div>
        </div>

        <div className="h-6 relative overflow-hidden">
          <MorphingText
            texts={heroTexts}
            className="h-6 text-sm text-muted-foreground font-medium text-left mx-0 max-w-none filter-[url(#threshold)_blur(0.3px)] leading-6"
          />
        </div>

        {/* Quick Resume Link */}
        <div className="pt-0.5">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <FileText size={13} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>Resume</span>
            <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
