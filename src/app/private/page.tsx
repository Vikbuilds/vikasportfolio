"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Lock,
  KeyRound,
  ArrowLeft,
  LogOut,
  X,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  aboutMeParagraphs,
  philosophyLine,
  unlockNoteText,
} from "@/data/private-space";

const CORRECT_PASSWORD = "radhe radhe";

// 1. Blur-to-Focus Word-by-Word Text Reveal Component
function BlurWordReveal({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(14px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
      className="text-xl sm:text-3xl font-private-editorial italic text-foreground/90 leading-relaxed font-normal tracking-wide text-center"
    >
      &ldquo;
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">
          {word}
        </motion.span>
      ))}
      &rdquo;
    </motion.h1>
  );
}

// 2. Scroll-Triggered Section Component
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PrivateSpacePage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedStatus = sessionStorage.getItem("private_space_unlocked");
    if (savedStatus === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = passwordInput.trim().toLowerCase().replace(/\s+/g, " ");

    if (normalizedInput === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setHasError(false);
      sessionStorage.setItem("private_space_unlocked", "true");
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setShowScrollCue(false);
    setPasswordInput("");
    sessionStorage.removeItem("private_space_unlocked");
  };

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-2xl px-5 pb-32 pt-8 font-private-grotesk">
        <div className="space-y-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors font-private-grotesk"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>

            {isUnlocked && (
              <button
                onClick={handleLock}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all duration-200 cursor-pointer font-private-grotesk"
              >
                <LogOut size={13} />
                <span>Lock Space</span>
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              /* SINGLE PASSCODE MODAL OVERLAY */
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 select-none font-private-grotesk">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => (window.location.href = "/")}
                  className="absolute inset-0 bg-background/80 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-border/60 bg-popover/95 p-6 shadow-2xl backdrop-blur-md space-y-4 text-left"
                >
                  <Link
                    href="/"
                    className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={14} />
                  </Link>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-foreground font-semibold text-sm font-private-grotesk">
                      <Lock size={15} />
                      <span>Vikas&apos;s Private Space</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-private-grotesk">
                      Enter password to enter.
                    </p>
                  </div>

                  <motion.form
                    onSubmit={handleUnlock}
                    animate={hasError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="relative flex items-center">
                      <KeyRound
                        size={14}
                        className="absolute left-3 text-muted-foreground/60 pointer-events-none"
                      />
                      <input
                        type="password"
                        placeholder="Enter password..."
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (hasError) setHasError(false);
                        }}
                        autoFocus
                        className={`w-full rounded-xl border ${
                          hasError
                            ? "border-red-500/80 bg-red-500/10 focus:border-red-500"
                            : "border-border/60 bg-muted/20 focus:border-border focus:bg-background"
                        } pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-200 font-private-grotesk`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-foreground text-background py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs cursor-pointer font-private-grotesk"
                    >
                      Unlock &amp; Open Space
                    </button>
                  </motion.form>

                  {hasError && (
                    <p className="text-[11px] text-red-500 font-medium text-center font-private-grotesk">
                      Incorrect password.
                    </p>
                  )}
                </motion.div>
              </div>
            ) : (
              /* UNLOCKED PACED EDITORIAL FLOW */
              <motion.div
                key="unlocked-paced-flow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-32 pt-10 font-private-grotesk"
              >
                {/* STAGE 1: FIRST REVEAL NOTE */}
                <section className="min-h-[60vh] flex flex-col items-center justify-center space-y-10 text-center px-4">
                  <div className="max-w-xl mx-auto">
                    <BlurWordReveal
                      text={unlockNoteText}
                      onComplete={() => setShowScrollCue(true)}
                    />
                  </div>

                  {/* Redesigned Minimal Editorial Scroll Cue */}
                  <AnimatePresence>
                    {showScrollCue && (
                      <motion.div
                        initial={{ opacity: 0, y: 16, filter: "blur(14px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="pt-14 flex flex-col items-center gap-3 select-none"
                      >
                        <span className="text-[11px] font-private-mono text-muted-foreground/60 tracking-wider uppercase">
                          Scroll to explore
                        </span>
                        <div className="relative w-px h-10 bg-border/40 overflow-hidden rounded-full">
                          <motion.div
                            animate={{
                              y: [-40, 40],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="w-full h-1/2 bg-gradient-to-b from-transparent via-foreground to-transparent"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* STAGE 2: THE STORY — IN PP EDITORIAL FONT */}
                <AnimatedSection className="space-y-10 max-w-xl mx-auto pt-6">
                  <div className="text-center space-y-2 border-b border-border/30 pb-4">
                    <span className="text-[10px] font-private-mono uppercase tracking-widest text-muted-foreground/60">
                      The Story
                    </span>
                  </div>

                  <div className="space-y-8 font-private-editorial text-base sm:text-xl text-foreground/90 leading-relaxed text-left">
                    {aboutMeParagraphs.map((para, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.75, delay: 0.1 }}
                        className="whitespace-pre-line leading-relaxed font-normal"
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>
                </AnimatedSection>

                {/* STAGE 3: PHILOSOPHY LINE IN PP EDITORIAL FONT (PAGE ENDS HERE) */}
                <AnimatedSection className="text-center py-20 space-y-4 border-t border-border/30">
                  <span className="text-[10px] font-private-mono uppercase tracking-widest text-muted-foreground/60">
                    Personal Philosophy
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-normal tracking-wide text-foreground font-private-editorial italic leading-snug">
                    &ldquo;{philosophyLine}&rdquo;
                  </h2>
                </AnimatedSection>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
