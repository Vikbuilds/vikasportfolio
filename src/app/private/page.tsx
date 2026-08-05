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
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

interface PrivateData {
  aboutMeParagraphs: string[];
  philosophyLine: string;
  unlockNoteText: string;
}

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [privateData, setPrivateData] = useState<PrivateData | null>(null);

  // Check server session on mount
  useEffect(() => {
    setMounted(true);
    fetchPrivateData();
  }, []);

  const fetchPrivateData = async () => {
    try {
      const res = await fetch("/api/private-space/data");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setPrivateData(json.data);
          setIsUnlocked(true);
        }
      } else {
        setIsUnlocked(false);
      }
    } catch {
      setIsUnlocked(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/private-space/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setPasswordInput("");
        await fetchPrivateData();
      } else {
        setErrorMessage(json.error || "Incorrect password.");
      }
    } catch {
      setErrorMessage("Network error during security check.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLock = async () => {
    try {
      await fetch("/api/private-space/logout", { method: "POST" });
    } catch {
      // Ignore
    } finally {
      setIsUnlocked(false);
      setShowScrollCue(false);
      setPasswordInput("");
      setPrivateData(null);
    }
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
              <span>Back to home</span>
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

          {/* Locked State Modal */}
          {!isUnlocked && (
            <div className="py-20 flex items-center justify-center font-private-grotesk">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm overflow-hidden rounded-3xl border border-border/60 bg-popover/90 p-6 shadow-2xl backdrop-blur-xl space-y-4"
              >
                <div className="space-y-1 text-center">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-muted/60 text-foreground mb-2 shadow-xs">
                    <Lock size={18} />
                  </div>
                  <h2 className="flex items-center justify-center gap-1.5 text-foreground font-semibold text-base font-private-grotesk">
                    Vikas&apos;s Private Space
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed font-private-grotesk">
                    Protected with end-to-end security. Enter passcode to open.
                  </p>
                </div>

                <motion.form
                  onSubmit={handleUnlock}
                  animate={errorMessage ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
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
                        if (errorMessage) setErrorMessage(null);
                      }}
                      autoFocus
                      disabled={isSubmitting}
                      className={`w-full rounded-xl border ${
                        errorMessage
                          ? "border-red-500/80 bg-red-500/10 focus:border-red-500"
                          : "border-border/60 bg-muted/20 focus:border-border focus:bg-background"
                      } pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-200 font-private-grotesk`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-foreground text-background py-2 text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs cursor-pointer disabled:opacity-50 font-private-grotesk"
                  >
                    {isSubmitting ? "Authenticating..." : "Unlock & Open Space"}
                  </button>
                </motion.form>

                {errorMessage && (
                  <div className="flex items-start gap-1.5 text-[11px] text-red-500 font-medium text-center justify-center font-private-grotesk pt-1">
                    <AlertCircle size={13} className="shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-border/40 text-[10px] text-muted-foreground/60 text-center flex items-center justify-center gap-1 font-mono">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>Rate limited & Server Authenticated</span>
                </div>
              </motion.div>
            </div>
          )}

          {/* Unlocked Private Space Content */}
          {isUnlocked && privateData && (
            <div className="space-y-32 pt-10 font-private-grotesk">
              {/* Hero Philosophy Quote */}
              <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6 px-2">
                <BlurWordReveal
                  text={privateData.philosophyLine}
                  onComplete={() => setShowScrollCue(true)}
                />

                {showScrollCue && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pt-8 text-center space-y-2"
                  >
                    <span className="text-[11px] font-private-mono text-muted-foreground/60 tracking-wider uppercase">
                      Scroll to read
                    </span>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="mx-auto h-4 w-0.5 bg-muted-foreground/40 rounded-full"
                    />
                  </motion.div>
                )}
              </div>

              {/* Unlock Note Banner */}
              <AnimatedSection delay={0.1}>
                <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8 backdrop-blur-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground font-private-grotesk">
                    <Lock size={12} className="text-foreground" />
                    <span className="text-[10px] font-private-mono uppercase tracking-widest text-muted-foreground/60">
                      Private Reflection
                    </span>
                  </div>
                  <p className="font-private-editorial text-lg sm:text-xl text-foreground/90 italic leading-relaxed">
                    &ldquo;{privateData.unlockNoteText}&rdquo;
                  </p>
                </div>
              </AnimatedSection>

              {/* About Me Essay */}
              <AnimatedSection delay={0.2}>
                <div className="space-y-8 font-private-editorial text-base sm:text-xl text-foreground/90 leading-relaxed text-left">
                  {privateData.aboutMeParagraphs.map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              {/* Bottom Signoff */}
              <AnimatedSection delay={0.3}>
                <div className="text-center pt-12 space-y-3 border-t border-border/40">
                  <span className="text-[10px] font-private-mono uppercase tracking-widest text-muted-foreground/60">
                    End of entry
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-normal tracking-wide text-foreground font-private-editorial italic leading-snug">
                    Thanks for stopping by.
                  </h2>
                </div>
              </AnimatedSection>
            </div>
          )}
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
