"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BookOpen, Headphones, Lamp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { favorites } from "@/data/favorites";

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
                        rotate: [0, -2, 2, 0],
                        scale: [1, 1.02, 1],
                        transition: {
                          duration: 1.2,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                className="w-full h-full cursor-pointer border border-transparent rounded-xl focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent"
              />

              {/* Paw Icon One-Shot Click Animation */}
              <AnimatePresence>
                {paws.map((paw) => (
                  <motion.span
                    key={paw.id}
                    initial={{ opacity: 1, y: 0, scale: 0.9 }}
                    animate={
                      shouldReduceMotion
                        ? { opacity: [1, 1, 0] }
                        : { opacity: [1, 1, 0], y: -20, scale: 1.1 }
                    }
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    onAnimationComplete={() => handleRemovePaw(paw.id)}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 pointer-events-none text-base select-none z-30"
                  >
                    🐾
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
