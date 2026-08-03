"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Calendar, Camera, Sliders } from "lucide-react";
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Moments, light, and perspective captured through my lens. An ongoing visual journal of places and details.
            </p>
          </motion.div>

          {/* Masonry Photography Grid - Preserving Original Photo Aspect Ratios */}
          <div className="columns-1 sm:columns-2 gap-3.5 pt-2 space-y-3.5">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layoutId={`bento-photo-${photo.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.25),
                  ease: "easeOut",
                }}
                onClick={() => setActivePhoto(photo)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card/40 shadow-xs hover:border-border/80 transition-all duration-300 break-inside-avoid"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="w-full h-auto block grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  unoptimized
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Hover Details & Metadata */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 space-y-1.5 pointer-events-none">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-xs leading-snug drop-shadow-md tracking-tight">
                      {photo.title}
                    </p>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white/90 shrink-0">
                      {photo.category}
                    </span>
                  </div>

                  <div className="space-y-0.5 text-[10px] text-white/85 font-mono">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={10} className="shrink-0 text-emerald-400" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                    {photo.camera && (
                      <div className="flex items-center gap-1.5 text-white/70 text-[9.5px]">
                        <Camera size={10} className="shrink-0 text-white/60" />
                        <span className="truncate">{photo.camera} • {photo.settings}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Preview Modal */}
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

              {/* Full Original Image View */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-black/95 overflow-hidden p-2">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  width={1200}
                  height={1600}
                  className="max-h-[75vh] w-auto h-auto object-contain rounded-xl"
                  unoptimized
                />
              </div>

              {/* Minimal Meta */}
              <div className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/40">
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold text-foreground tracking-tight">
                    {activePhoto.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-emerald-500" />
                      {activePhoto.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {activePhoto.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground/80 bg-muted/40 px-2.5 py-1 rounded-lg border border-border/40 self-start sm:self-center">
                  <Camera size={11} className="text-muted-foreground" />
                  <span>{activePhoto.camera}</span>
                  <span>·</span>
                  <Sliders size={11} className="text-muted-foreground" />
                  <span>{activePhoto.settings}</span>
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
