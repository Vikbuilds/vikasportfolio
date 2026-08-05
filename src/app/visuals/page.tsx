"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { photos } from "@/data/photos";
import { OrbitalImageWheel } from "@/components/unlumen-ui/orbital-image-wheel";

export default function VisualsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Map photos data to OrbitalImageWheel format
  const orbitalImages = photos.map((photo) => ({
    src: photo.src,
    alt: photo.title,
    label: photo.title,
    subtitle: photo.location
      ? `${photo.location} · ${photo.date || ""}`
      : photo.date || "Visual Journal",
    location: photo.location,
    date: photo.date,
    story: photo.story,
    id: photo.id,
  }));

  // Keyboard Escape listener to close full screen wheel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
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
              Moments, light, and perspective captured through my lens. Click any photo below to enter the interactive orbital wheel view.
            </p>
          </motion.div>

          {/* Masonry Photography Grid */}
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
                onClick={() => setActiveIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/40 bg-card/40 shadow-xs hover:border-border/80 transition-all duration-300 break-inside-avoid"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={800}
                  height={1000}
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="w-full h-auto block grayscale-0 sm:grayscale sm:contrast-[1.05] transition-all duration-500 sm:group-hover:grayscale-0 group-hover:scale-[1.03]"
                  unoptimized
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Minimal Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-0 sm:translate-y-2 opacity-100 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 space-y-0.5 pointer-events-none">
                  <p className="font-semibold text-xs leading-snug drop-shadow-md">
                    {photo.title}
                  </p>
                  {photo.location && (
                    <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-mono">
                      <MapPin size={10} className="shrink-0" />
                      <span>{photo.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Orbital Image Wheel Fullscreen Viewer replacing old modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-background overflow-hidden"
          >
            <OrbitalImageWheel
              images={orbitalImages}
              initialIndex={activeIndex}
              onClose={() => setActiveIndex(null)}
              turns={2.4}
              cropRatio={0.7}
              itemWidth={250}
              itemHeight={330}
              showCaption={true}
              subtitleDirection="top"
              subtitleSpeed={1.25}
              subtitleStagger={0.014}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-xl px-5 pb-16">
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
