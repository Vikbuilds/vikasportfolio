"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Bookmark, ExternalLink, BookOpen, Film } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { favorites, FavoriteItem } from "@/data/favorites";

const categories = [
  "All Time",
  "Books",
  "Movies",
  "Tools",
  "Design",
  "Inspiration",
  "People",
  "Fonts",
  "Products",
] as const;

// Memoized Individual Row Component
const FavoriteRow = React.memo(function FavoriteRow({
  item,
  index,
  isHovered,
  isOtherHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  item: FavoriteItem;
  index: number;
  isHovered: boolean;
  isOtherHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  const previewImg = item.coverImage || item.ogImage;

  return (
    <motion.a
      key={item.id}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isOtherHovered ? 0.55 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.22,
        delay: Math.min(index * 0.025, 0.15),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative flex items-center justify-between gap-4 py-2 px-3 -mx-3 rounded-xl transition-colors duration-150 hover:bg-muted/50 group"
    >
      {/* Instant Floating OpenGraph / Book Cover Preview Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -8 }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
              mass: 0.6,
            }}
            className="pointer-events-none absolute -left-[275px] top-1/2 -translate-y-1/2 z-40 hidden xl:block w-64 overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md gpu-accelerate"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted/60">
              {previewImg ? (
                <Image
                  src={previewImg}
                  alt={item.title}
                  fill
                  className="object-cover object-top"
                  sizes="256px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-muted/80 to-muted/40 text-muted-foreground select-none">
                  <span className="font-semibold text-xs text-foreground line-clamp-1">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground/70 font-mono mt-1">{item.domain}</span>
                  <span className="mt-2 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border/50 bg-background/50 font-medium">{item.category}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left: Icon / Cover, Title, / , Description */}
      <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
        {/* Icon / Mini Cover */}
        <div className="relative h-6 w-6 rounded-md overflow-hidden shrink-0 border border-border/40 bg-muted/40 flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
          {item.icon && !imageError ? (
            <Image
              src={item.icon}
              alt={item.title}
              width={24}
              height={24}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
              priority
            />
          ) : item.coverImage ? (
            <Image
              src={item.coverImage}
              alt={item.title}
              width={24}
              height={24}
              className="h-full w-full object-cover"
              priority
            />
          ) : item.category === "Books" ? (
            <BookOpen size={13} className="text-muted-foreground" />
          ) : item.category === "Movies" ? (
            <Film size={13} className="text-muted-foreground" />
          ) : (
            <Bookmark size={13} className="text-muted-foreground" />
          )}
        </div>

        {/* Single Line Content: Title / Description */}
        <div className="flex items-center gap-2 min-w-0 flex-1 truncate text-sm">
          <span className="font-semibold text-foreground tracking-tight shrink-0 group-hover:underline underline-offset-4 decoration-border/60">
            {item.title}
          </span>
          {item.author && (
            <span className="text-xs text-muted-foreground/70 font-medium shrink-0">
              by {item.author}
            </span>
          )}
          <span className="text-muted-foreground/40 font-normal text-xs select-none shrink-0">
            /
          </span>
          <span className="text-muted-foreground/70 font-normal text-xs truncate">
            {item.description}
          </span>
        </div>
      </div>

      {/* Right: Monospace Domain Link */}
      <div className="flex items-center gap-1 shrink-0 font-mono text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
        <span className="truncate max-w-[90px] sm:max-w-none">{item.domain}</span>
        <ExternalLink
          size={12}
          className="opacity-70 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>
    </motion.a>
  );
});

function FavoritesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "All Time";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.includes(initialCategory as (typeof categories)[number]) ? initialCategory : "All Time"
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const cat = searchParams?.get("category");
    if (cat && categories.includes(cat as (typeof categories)[number])) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Time" || selectedCategory === "All"
          ? true
          : item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Preload all favorite local images into browser memory immediately on render
  useEffect(() => {
    if (typeof window === "undefined") return;
    favorites.forEach((item) => {
      const src = item.coverImage || item.ogImage;
      if (src) {
        const img = new window.Image();
        img.src = src;
      }
      if (item.icon) {
        const iconImg = new window.Image();
        iconImg.src = item.icon;
      }
    });
  }, []);

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <main className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
      <div className="space-y-6">
        {/* Header & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-2.5"
        >
          <h1 className="text-2xl font-semibold tracking-tight text-foreground font-(family-name:--font-schibsted)">
            Favorites
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A personal stash of books, movies, tools, designs, and minds that have left a lasting impression on me.
          </p>
        </motion.div>

        {/* Search & Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
          className="flex items-center justify-between gap-4 pt-2 border-b border-border/40 pb-4"
        >
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm flex items-center">
            <Search
              size={16}
              className="absolute left-3 text-muted-foreground/60 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              className="w-full rounded-xl border border-border/50 bg-muted/20 pl-9 pr-4 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-border focus:bg-background focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none cursor-pointer rounded-xl border border-border/50 bg-muted/20 pl-3 pr-8 py-1.5 text-sm font-medium text-foreground hover:bg-muted/40 focus:outline-none transition-colors duration-200"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-background text-foreground">
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Favorites List */}
        <div className="space-y-0.5 relative">
          <AnimatePresence mode="popLayout">
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map((item, index) => (
                <FavoriteRow
                  key={item.id}
                  item={item}
                  index={index}
                  isHovered={hoveredId === item.id}
                  isOtherHovered={hoveredId !== null && hoveredId !== item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-sm text-muted-foreground"
              >
                No favorites found matching your criteria.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

export default function FavoritesPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <FavoritesContent />
      </Suspense>

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
