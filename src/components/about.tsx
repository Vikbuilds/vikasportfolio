"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <motion.section
      className="space-y-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        Konnichiwa, I&apos;m a Software Engineer obsessed with building products people genuinely love to use.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        From architecting secure backend systems to crafting interfaces with flair, I focus on building things that are not just functional, but robust and scalable.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        Currently exploring the edges of AI, web and mobile engineering.
      </p>
    </motion.section>
  );
}
