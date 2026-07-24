"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
          alt="Shivam Verma"
          width={80}
          height={80}
          className="rounded-full object-cover ring-1 ring-border transition-transform duration-300 hover:scale-105"
          priority
        />
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Shivam Verma
        </h1>
        <p className="text-sm text-muted-foreground">
          Software Engineer for the Web & Mobile
        </p>
      </div>
    </motion.section>
  );
}
