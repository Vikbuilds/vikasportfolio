"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
    >
      <p className="text-[15px] leading-relaxed text-foreground/90">
        Hey, I&apos;m Shivam — a software builder and fullstack developer with a
        deep passion for converting complex ideas into robust, real-world
        applications. I thrive at the intersection of clean architecture and
        thoughtful design.
      </p>
      <p className="text-[15px] leading-relaxed text-foreground/90">
        From architecting secure backend systems to crafting interfaces with
        flair, I focus on building things that are not just functional — but
        genuinely delightful to use. Currently exploring the edges of web and
        mobile engineering.
      </p>
    </motion.section>
  );
}
