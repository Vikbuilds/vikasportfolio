"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Bookmark, ExternalLink, BookOpen, Film } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { favorites } from "@/data/favorites";

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

function FavoritesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "All Time";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const cat = searchParams?.get("category");
    if (cat) {
      if (cat === "All" || cat === "All Time") {
        setSelectedCategory("All Time");
      } else if (categories.includes(cat as (typeof categories)[number])) {
        setSelectedCategory(cat);
      }
    }
  }, [searchParams]);

  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Time" ||
        selectedCategory === "All" ||
        item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-20 pt-8">
      <div className="space-y-6">
        {/* Header & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-2.5"
        >
          <h1 className="text-2xl font-semibold tracking-tight text-foreground font-(family-name:--font-schibsted)">
            Favorites
          </h1>
          <p className="text-sm text-muted-foreground truncate">
            A personal stash of books, movies, tools, designs, and minds that have left a lasting impression on me.
          </p>
        </motion.div>

        {/* Search & Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
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
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.04, 0.3),
                    ease: "easeOut",
                  }}
                  className={`relative flex items-center justify-between gap-4 py-2 px-3 -mx-3 rounded-xl transition-all duration-200 hover:bg-muted/40 group ${
                    hoveredId !== null && hoveredId !== item.id
                      ? "opacity-60"
                      : "opacity-100"
                  }`}
                >
                  {/* Floating OpenGraph / Book Cover Preview Card */}
                  <AnimatePresence>
                    {hoveredId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, x: -14 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: -14 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute -left-[275px] top-1/2 -translate-y-1/2 z-40 hidden xl:block w-64 overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted/60">
                          <Image
                            src={
                              item.coverImage ||
                              item.ogImage ||
                              `https://image.thum.io/get/width/600/crop/400/${item.url}`
                            }
                            alt={item.title}
                            fill
                            className="object-cover object-top"
                            unoptimized
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Left: Icon / Cover, Title, / , Description (Strict 1 Line) */}
                  <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                    {/* Icon / Mini Cover */}
                    <div className="relative h-6 w-6 rounded-md overflow-hidden shrink-0 border border-border/40 bg-muted/40 flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          width={24}
                          height={24}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : item.icon && !imageErrors[item.id] ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={24}
                          height={24}
                          className="h-full w-full object-cover"
                          onError={() =>
                            setImageErrors((prev) => ({ ...prev, [item.id]: true }))
                          }
                          unoptimized
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
                  <div className="hidden xs:flex items-center gap-1 shrink-0 font-mono text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                    <span>{item.domain}</span>
                    <ExternalLink
                      size={12}
                      className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </div>
                </motion.a>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-sm text-muted-foreground"
              >
                No items found matching &quot;{searchQuery}&quot;.
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
