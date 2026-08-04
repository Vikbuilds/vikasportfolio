"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

function getDomain(url?: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Projects() {
  return (
    <section id="work" className="space-y-4 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Work
        </h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          A selection of projects and applications I've built.
        </p>
      </motion.div>

      <div className="space-y-0.5">
        {projects.map((project, index) => {
          const targetUrl = project.liveUrl || project.githubUrl || "#";
          const domain = getDomain(targetUrl);

          return (
            <motion.a
              key={project.title}
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
              className="flex items-center justify-between gap-4 py-2 px-3 -mx-3 rounded-xl transition-all duration-200 hover:bg-muted/40 group"
            >
              {/* Left: App Icon & Single-line Title / Description */}
              <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                {/* App / Project Icon */}
                <div className="relative h-6 w-6 rounded-md overflow-hidden shrink-0 border border-border/40 bg-muted/40 flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={project.icon || project.thumbnail}
                    alt={project.title}
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>

                {/* Single Line Content */}
                <div className="flex items-center gap-2 min-w-0 flex-1 truncate text-sm">
                  <span className="font-semibold text-foreground tracking-tight shrink-0 group-hover:underline underline-offset-4 decoration-border/60">
                    {project.title}
                  </span>
                  <span className="text-muted-foreground/40 font-normal text-xs select-none shrink-0">
                    /
                  </span>
                  <span className="text-muted-foreground/70 font-normal text-xs truncate">
                    {project.description}
                  </span>
                </div>
              </div>

              {/* Right: Domain Link */}
              {domain && (
                <div className="flex items-center gap-1 shrink-0 font-mono text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                  <span className="truncate max-w-[100px] sm:max-w-none">{domain}</span>
                  <ExternalLink
                    size={12}
                    className="opacity-70 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </div>
              )}
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
