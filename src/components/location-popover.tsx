"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { LocationMap } from "@/components/location-map";

export function LocationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href="https://maps.google.com/?q=Koramangala,+Bengaluru,+India"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors group cursor-pointer"
      >
        <MapPin
          size={12}
          className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 translate-y-[1px]"
        />
        <span>Bengaluru, India</span>
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -6, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block absolute left-full top-1/2 -translate-y-1/2 -ml-8 z-50 w-64 h-44 pointer-events-none mix-blend-multiply dark:mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
          >
            <LocationMap />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
