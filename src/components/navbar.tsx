"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const navLinks = [
  { label: "3000", href: "#home" },
  { label: "Proof of Work", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-170 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          {mounted && (
            <AnimatedThemeToggler
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              onThemeChange={setTheme}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
