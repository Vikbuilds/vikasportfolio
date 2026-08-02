"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Calendar } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { photos, type PhotoItem } from "@/data/photos";

export default function VisualsPage() {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getBentoSpan = (index: number) => {
    switch (index % 4) {
      case 0:
        return "col-span-1 sm:col-span-2 aspect-[16/10] sm:aspect-[16/9]";
      case 1:
        return "col-span-1 aspect-[4/5]";
      case 2:
        return "col-span-1 aspect-[4/5]";
      case 3:
        return "col-span-1 sm:col-span-2 aspect-[16/9]";
      default:
        return "col-span-1 aspect-square";
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-2xl px-5 pb-20 pt-8">
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-2"
          >
            <h1 className="text-2xl font-semibold tracking-tight text-foreground font-(family-name:--font-schibsted)">
              Visuals by Vik
            </h1>
            <p className="text-sm text-muted-foreground truncate">
              Moments, light, and perspective captured through my lens. An ongoing visual journal of places and details.
            </p>
          </motion.div>

          {/* Bento Style Photography Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layoutId={`bento-photo-${photo.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.06, 0.25),
                  ease: "easeOut",
                }}
                onClick={() => setActivePhoto(photo)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card/40 shadow-xs hover:border-border/80 transition-all duration-300 ${getBentoSpan(
                  index
                )}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  unoptimized
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 space-y-0.5">
                  <p className="font-semibold text-xs leading-snug drop-shadow-md">
                    {photo.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-mono">
                    <MapPin size={10} className="shrink-0" />
                    <span>{photo.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Preview Modal (No Camera Metadata) */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-background/85 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`bento-photo-${activePhoto.id}`}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-border/60 bg-popover/95 shadow-2xl backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                aria-label="Close photo preview"
                className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md border border-border/50 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Full Image */}
              <div className="relative aspect-[4/3] w-full bg-black/90 overflow-hidden">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Minimal Meta */}
              <div className="p-4 sm:p-4.5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-foreground tracking-tight">
                    {activePhoto.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <MapPin size={11} className="text-primary" />
                      {activePhoto.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Calendar size={11} />
                      {activePhoto.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-2xl px-5 pb-16">
        <Footer />
      </div>

      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
