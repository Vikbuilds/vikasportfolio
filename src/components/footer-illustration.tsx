"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BookOpen, Camera, Headphones, Lamp, KeyRound, Lock, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { favorites } from "@/data/favorites";
import { photos } from "@/data/photos";

interface BookHotspot {
  left: string;
  top: string;
  width: string;
  height: string;
}

interface ProductHotspot {
  id: string;
  name: string;
  story: string;
  url: string;
  previewImage: string;
  icon: typeof Headphones;
  left: string;
  top: string;
  width: string;
  height: string;
}

interface PawPop {
  id: number;
}

export function FooterIllustration() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [paws, setPaws] = useState<PawPop[]>([]);

  // Passcode Modal State
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [modalPassword, setModalPassword] = useState("");
  const [modalError, setModalError] = useState(false);

  const handleKidduClick = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e && "key" in e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    const id = Date.now() + Math.random();
    setPaws((prev) => [...prev, { id }]);
  };

  const handleRemovePaw = (id: number) => {
    setPaws((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalPassword.trim()) return;

    try {
      const res = await fetch("/api/private-space/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: modalPassword }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsPasscodeModalOpen(false);
        setModalPassword("");
        setModalError(false);
        router.push("/private");
      } else {
        setModalError(true);
        setTimeout(() => setModalError(false), 2500);
      }
    } catch {
      setModalError(true);
      setTimeout(() => setModalError(false), 2500);
    }
  };

  // 14 bookshelf position coordinates (1-to-1 matching books on line-art drawing)
  const bookHotspotPositions: BookHotspot[] = [
    { left: "16.5%", top: "2%", width: "2%", height: "15%" },
    { left: "18.5%", top: "2%", width: "2%", height: "15%" },
    { left: "20.5%", top: "2%", width: "2%", height: "15%" },
    { left: "22.5%", top: "4%", width: "3.5%", height: "13%" },
    { left: "33%", top: "4%", width: "2.5%", height: "13%" },
    { left: "35.5%", top: "2%", width: "3.5%", height: "15%" },
    { left: "39%", top: "2%", width: "3%", height: "15%" },
    { left: "42%", top: "4%", width: "3.5%", height: "13%" },
    { left: "46%", top: "9%", width: "11%", height: "5%" },
    { left: "58%", top: "2%", width: "3%", height: "15%" },
    { left: "61%", top: "2%", width: "4%", height: "15%" },
    { left: "65%", top: "2%", width: "2.5%", height: "15%" },
    { left: "67.5%", top: "4%", width: "3%", height: "13%" },
    { left: "71%", top: "9%", width: "11%", height: "5%" },
  ];

  // Dynamically filter books from Favorites data
  const bookFavorites = favorites.filter((item) => item.category === "Books");

  const productHotspots: ProductHotspot[] = [
    {
      id: "headphones",
      name: "Over-Ear Headphones",
      story: "Daily driver for deep work focus & lofi beats.",
      url: "https://amzn.in/d/0ez3DsK2",
      previewImage: "https://m.media-amazon.com/images/I/61+btxzpfDL._SL1500_.jpg",
      icon: Headphones,
      left: "41%",
      top: "45%",
      width: "18%",
      height: "22%",
    },
    {
      id: "lamp",
      name: "Warm Desk Lamp",
      story: "Warm ambient light for late-night coding sessions.",
      url: "https://amzn.in/d/0atp2TTu",
      previewImage: "https://m.media-amazon.com/images/I/61U08j6wA0L._SL1500_.jpg",
      icon: Lamp,
      left: "17%",
      top: "43%",
      width: "16%",
      height: "21%",
    },
  ];

  return (
    <TooltipProvider delay={100}>
      <section aria-label="Illustration of Vikas coding at desk with Kiddu the cat" className="relative w-full max-w-[380px] sm:max-w-[420px] mx-auto my-2 px-2">
        {/* Simple Minimal Arrow Cue pointing to Bookshelf */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-1 text-[11px] font-mono text-muted-foreground/60 select-none">
          <span>Explore books</span>
          <motion.span
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>

        {/* Transparent Workspace Illustration Container */}
        <div className="relative aspect-[932/818] w-full overflow-hidden bg-transparent pointer-events-auto mt-2">
          <div className="relative w-full h-full">
            <Image
              src="/workspace-illustration.png"
              alt="Illustration of Vikas coding at desk with headphones, Kiddu the cat, coffee mug, cake slice, lamp, map, and bookshelf"
              fill
              sizes="(max-width: 420px) 100vw, 420px"
              className="object-contain dark:invert dark:hue-rotate-180 dark:brightness-120 transition-all duration-300 pointer-events-none select-none"
              priority={false}
            />

            {/* Dynamically Sync Books from Favorites Data onto Bookshelf Hotspots */}
            {bookHotspotPositions.map((spot, index) => {
              const bookData = bookFavorites[index];
              if (!bookData) return null;

              return (
                <Tooltip key={bookData.id}>
                  <TooltipTrigger
                    style={{
                      left: spot.left,
                      top: spot.top,
                      width: spot.width,
                      height: spot.height,
                    }}
                    onClick={() => router.push("/favorites?category=Books")}
                    aria-label={`Preview book: ${bookData.title}`}
                    className="absolute z-20 cursor-pointer bg-transparent border-0 outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="w-full h-full bg-transparent" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="bg-popover/95 backdrop-blur-md text-popover-foreground border border-border/60 p-2.5 shadow-xl rounded-xl z-[100] max-w-[220px] text-left"
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Book Front Cover Image Preview */}
                      <div className="relative h-16 w-11 rounded-xs overflow-hidden shrink-0 border border-border/50 bg-muted/60 shadow-xs">
                        {bookData.coverImage ? (
                          <Image
                            src={bookData.coverImage}
                            alt={bookData.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <BookOpen size={14} />
                          </div>
                        )}
                      </div>

                      <div className="space-y-0.5 min-w-0 flex-1">
                        <p className="font-semibold text-xs text-foreground tracking-tight line-clamp-2 leading-tight">
                          {bookData.title}
                        </p>
                        {bookData.author && (
                          <p className="text-[10px] text-muted-foreground/70 font-medium">
                            by {bookData.author}
                          </p>
                        )}
                        <p className="text-[10px] text-muted-foreground/80 line-clamp-2 pt-0.5 leading-tight">
                          {bookData.description}
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Product Hotspots: Headphones & Desk Lamp */}
            {productHotspots.map((product) => {
              const IconComp = product.icon;
              return (
                <Tooltip key={product.id}>
                  <TooltipTrigger
                    style={{
                      left: product.left,
                      top: product.top,
                      width: product.width,
                      height: product.height,
                    }}
                    onClick={() => window.open(product.url, "_blank")}
                    aria-label={`View ${product.name} on Amazon`}
                    className="absolute z-20 cursor-pointer bg-transparent border-0 outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="w-full h-full bg-transparent" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="bg-popover/95 backdrop-blur-md text-popover-foreground border border-border/60 p-2.5 shadow-xl rounded-xl z-[100] max-w-[210px] text-left"
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Product Preview Image */}
                      <div className="relative h-12 w-12 rounded-md overflow-hidden shrink-0 border border-border/50 bg-white shadow-xs">
                        <Image
                          src={product.previewImage}
                          alt={product.name}
                          fill
                          className="object-contain p-0.5"
                          unoptimized
                        />
                      </div>

                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-1 font-semibold text-xs text-foreground tracking-tight">
                          <IconComp size={13} className="text-primary shrink-0" />
                          <span className="line-clamp-1">{product.name}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground/80 leading-snug">
                          {product.story}
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Vintage Camera Hotspot on Table */}
            <Tooltip>
              <TooltipTrigger
                style={{
                  left: "11%",
                  top: "62%",
                  width: "12%",
                  height: "12%",
                }}
                onClick={() => router.push("/visuals")}
                aria-label="View Visuals photography page"
                className="absolute z-20 cursor-pointer bg-transparent border-0 outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
              >
                <div className="relative w-full h-full flex items-center justify-center p-0.5">
                  <svg
                    viewBox="0 0 115 85"
                    className="w-full h-full opacity-90 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105 text-foreground dark:text-white"
                  >
                    <rect x="5" y="10" width="105" height="70" rx="8" className="fill-background/90 dark:fill-black/90 stroke-current stroke-[3.5]" />
                    <rect x="25" y="3" width="14" height="6" rx="2" className="fill-foreground stroke-current stroke-[2]" />
                    <rect x="80" y="4" width="14" height="5" rx="1.5" className="fill-foreground stroke-current stroke-[2]" />
                    <rect x="82" y="14" width="14" height="10" rx="2" className="fill-foreground dark:fill-white stroke-current stroke-[2.5]" />
                    <circle cx="26" cy="19" r="3.5" className="fill-foreground dark:fill-white stroke-current stroke-[2]" />
                    <circle cx="58" cy="48" r="23" className="fill-background dark:fill-black stroke-current stroke-[3.5]" />
                    <circle cx="58" cy="48" r="16" className="fill-foreground/20 dark:fill-white/20 stroke-current stroke-[2.5]" />
                    <circle cx="58" cy="48" r="10" className="fill-foreground dark:fill-white stroke-current stroke-[2]" />
                    <circle cx="54" cy="44" r="3" className="fill-background dark:fill-black stroke-none" />
                  </svg>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-popover/95 backdrop-blur-md text-popover-foreground border border-border/60 p-2 shadow-xl rounded-xl z-[100] max-w-[190px] text-center"
              >
                <div className="space-y-1.5">
                  {photos[0] && (
                    <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-border/40 bg-black/90">
                      <Image
                        src={photos[0].src}
                        alt={photos[0].title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <p className="font-semibold text-xs text-foreground tracking-tight line-clamp-1 px-1">
                    Visuals by Vik
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Table Drawer Hotspot — Vikas's Private Space Trigger */}
            <Tooltip>
              <TooltipTrigger
                style={{
                  left: "60%",
                  top: "72%",
                  width: "28%",
                  height: "16%",
                }}
                onClick={() => setIsPasscodeModalOpen(true)}
                aria-label="Vikas's Private Space"
                className="absolute z-20 cursor-pointer bg-transparent border-0 outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
              >
                <div className="w-full h-full bg-transparent" />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-popover/95 backdrop-blur-md text-popover-foreground border border-border/60 p-2 px-3 shadow-xl rounded-xl z-[100] text-center"
              >
                <div className="flex items-center gap-1.5 font-medium text-xs text-foreground">
                  <Lock size={12} className="text-muted-foreground" />
                  <span>Vikas&apos;s Private Space</span>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Kiddu (Cat) Hotspot — Motion + Paw Pop */}
            <div
              style={{
                left: "62%",
                top: "56%",
                width: "22%",
                height: "20%",
              }}
              className="absolute z-20"
            >
              <motion.button
                type="button"
                aria-label="Kiddu the cat"
                onClick={handleKidduClick}
                onKeyDown={handleKidduClick}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        rotate: [0, -3, 3, 0],
                        transition: { duration: 0.4 },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="w-full h-full bg-transparent border-0 outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
              />
            </div>

            {/* Paw Pops Animation Overlay */}
            <AnimatePresence>
              {paws.map((paw) => (
                <motion.div
                  key={paw.id}
                  initial={{ opacity: 0, scale: 0.3, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -28 }}
                  exit={{ opacity: 0, scale: 0.8, y: -45 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  onAnimationComplete={() => handleRemovePaw(paw.id)}
                  style={{ left: "68%", top: "54%" }}
                  className="absolute pointer-events-none z-30 select-none"
                >
                  <span className="font-mono text-xs font-semibold text-foreground bg-background/90 px-2 py-0.5 rounded-full border border-border/60 shadow-md">
                    meow!
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Passcode Prompt Modal */}
        <AnimatePresence>
          {isPasscodeModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 select-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPasscodeModalOpen(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-border/60 bg-popover/95 p-6 shadow-2xl backdrop-blur-md space-y-4"
              >
                <button
                  onClick={() => setIsPasscodeModalOpen(false)}
                  className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-muted/40 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-foreground font-semibold text-sm">
                    <Lock size={15} />
                    <span>Vikas&apos;s Private Space</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Enter password to enter.
                  </p>
                </div>

                <motion.form
                  onSubmit={handlePasscodeSubmit}
                  animate={modalError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
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
                      value={modalPassword}
                      onChange={(e) => {
                        setModalPassword(e.target.value);
                        if (modalError) setModalError(false);
                      }}
                      autoFocus
                      className={`w-full rounded-xl border ${
                        modalError
                          ? "border-red-500/80 bg-red-500/10 focus:border-red-500"
                          : "border-border/60 bg-muted/20 focus:border-border focus:bg-background"
                      } pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-200`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-foreground text-background py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
                  >
                    Unlock & Open Space
                  </button>
                </motion.form>

                {modalError && (
                  <p className="text-[11px] text-red-500 font-medium text-center">
                    Incorrect password.
                  </p>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </TooltipProvider>
  );
}
