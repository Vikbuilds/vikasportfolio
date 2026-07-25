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
       Konnichiwa, I&apos;m a Software Engineer obsessed with building products people genuinely love to use,
              </p>
      <p className="text-[15px] leading-relaxed text-foreground/90">
        From architecting secure backend systems to crafting interfaces with
        flair, I focus on building things that are not just functional, but robust and scalable. 
      </p>
            <p className="text-[15px] leading-relaxed text-foreground/90">Currently exploring the edges of AI, web and
        mobile engineering.</p>

      
    </motion.section>
  );
}
