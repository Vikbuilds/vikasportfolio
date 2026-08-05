"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MotionSubtitleProps {
  text: string;
  direction?: "top" | "bottom";
  speed?: number;
  stagger?: number;
  className?: string;
}

export function MotionSubtitle({
  text,
  direction = "top",
  speed = 1,
  stagger = 0.018,
  className = "",
}: MotionSubtitleProps) {
  const characters = text.split("");
  const initialY = direction === "top" ? -14 : 14;

  const adjustedStagger = Math.max(0.005, stagger / speed);
  const duration = 0.25 / speed;

  return (
    <div className={`inline-flex flex-wrap justify-center overflow-hidden py-0.5 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: adjustedStagger,
              },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.15 },
            },
          }}
          className="inline-flex flex-wrap justify-center gap-[0.05em]"
        >
          {characters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={{
                hidden: {
                  opacity: 0,
                  y: initialY,
                  filter: "blur(4px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: duration,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="inline-block whitespace-pre font-medium"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
