"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Proof of Work
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A selection of things I&apos;ve built and shipped.
        </p>
      </motion.div>

      <div className="space-y-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
