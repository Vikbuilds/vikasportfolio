"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <motion.section
      className="space-y-3.5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        I&apos;m a software engineer and founder focused on building high-performance applications and scalable digital products. Over the years, I&apos;ve focused on architecting software that feels fast, intuitive, and genuinely delightful to use.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        I regularly write about software craft, system architecture, and hard-won lessons from my journey building startups. These writings are my way of thinking through technical challenges and sharing insights with fellow builders.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        When I&apos;m not shipping code, I love capturing street photography and exploring visual storytelling. There&apos;s something special about slowing down to observe everyday moments through a lens.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        Always open to interesting conversations about software, startups, and visual craft. Feel free to reach out or say hello.
      </p>
    </motion.section>
  );
}
