"use client";

import React, { memo, useEffect, useLayoutEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navLinks = [
  { label: "Home", href: "/", id: "/" },
  { label: "Work", href: "/#work", id: "/#work" },
  { label: "Blogs", href: "/#blogs", id: "/#blogs" },
  { label: "Visuals", href: "/visuals", id: "/visuals" },
  { label: "Favorites", href: "/favorites", id: "/favorites" },
];

/** Isolated NavLinks component: owns scroll-spy & ultra-stable persistent liquid glass pill animation */
const NavLinksGroup = memo(function NavLinksGroup() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("/");
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [isMounted, setIsMounted] = useState(false);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; height: number; opacity: number }>({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/blog")) {
        setActiveTab("/#blogs");
      } else if (pathname.startsWith("/visuals")) {
        setActiveTab("/visuals");
      } else if (pathname.startsWith("/favorites")) {
        setActiveTab("/favorites");
      } else {
        setActiveTab(pathname);
      }
      return;
    }

    const handleScroll = () => {
      const workEl = document.getElementById("work");
      const blogsEl = document.getElementById("blogs");
      const scrollPosition = window.scrollY + 220;

      if (blogsEl && scrollPosition >= blogsEl.offsetTop) {
        setActiveTab("/#blogs");
      } else if (workEl && scrollPosition >= workEl.offsetTop) {
        setActiveTab("/#work");
      } else {
        setActiveTab("/");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Recalculate single pill position whenever activeTab changes or route updates
  const updatePill = useCallback(() => {
    const activeEl = linkRefs.current.get(activeTab);
    const container = containerRef.current;

    if (activeEl && container) {
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setPillStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
        height: activeRect.height,
        opacity: 1,
      });
    }
  }, [activeTab]);

  useLayoutEffect(() => {
    const rAF = requestAnimationFrame(() => {
      updatePill();
    });
    return () => cancelAnimationFrame(rAF);
  }, [updatePill, pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      updatePill();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [updatePill]);

  return (
    <div ref={containerRef} className="relative flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none max-w-[calc(100vw-110px)] sm:max-w-none">
      {/* Single Persistent Liquid Glass Pill Capsule */}
      <motion.div
        initial={false}
        className="absolute top-0 bg-muted/80 rounded-xl -z-10 border border-border/40 backdrop-blur-sm pointer-events-none"
        animate={{
          left: pillStyle.left,
          width: pillStyle.width,
          height: pillStyle.height,
          opacity: isMounted ? pillStyle.opacity : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 35,
          mass: 0.7,
        }}
      />

      {navLinks.map((link) => {
        const isActive = activeTab === link.id;

        return (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linkRefs.current.set(link.id, el);
            }}
            onClick={() => {
              setActiveTab(link.id);
            }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 rounded-xl ${
              isActive
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground/80"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
});

/** Isolated NavbarActions component: completely static, zero re-renders on scroll */
const NavbarActions = memo(function NavbarActions() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === "d" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        document.querySelector<HTMLButtonElement>("[data-theme-toggler]")?.click();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openPalette = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.dispatchEvent(new Event("open-command-palette"));
  }, []);

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Command Palette Trigger Button */}
      <button
        onClick={openPalette}
        type="button"
        className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-all duration-200 hover:border-border hover:bg-muted/70 hover:text-foreground"
        aria-label="Open Command Palette"
      >
        <Search size={13} />
        <span className="hidden sm:inline font-medium">Search</span>
        <kbd className="font-mono text-[10px] bg-background/80 px-1.5 py-0.5 rounded-md border border-border/40 text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Theme Toggler */}
      {mounted && (
        <TooltipProvider delay={300}>
          <Tooltip>
            <TooltipTrigger
              render={(triggerProps) => (
                <AnimatedThemeToggler
                  {...triggerProps}
                  theme={resolvedTheme === "dark" ? "dark" : "light"}
                  onThemeChange={setTheme}
                  className="cursor-pointer flex items-center justify-center p-1.5 rounded-xl text-muted-foreground hover:text-foreground/80 hover:bg-muted/50 transition-colors"
                />
              )}
            />
            <TooltipContent side="bottom" className="text-xs" sideOffset={8}>
              Toggle Theme (D)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
});

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center pointer-events-none mb-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <nav className="pointer-events-auto flex items-center justify-between gap-3 w-full max-w-2xl px-5">
        <NavLinksGroup />
        <NavbarActions />
      </nav>
    </header>
  );
}
