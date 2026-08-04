"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Briefcase,
  GitCommit,
  BookOpen,
  Bookmark,
  FileText,
  Lock,
  Home,
  Copy,
  Check,
  Sun,
  Moon,
  ExternalLink,
  Command as CommandIcon,
  X,
} from "lucide-react";
import { socials } from "@/data/socials";
import {
  GitHubIcon,
  XIcon,
  LinkedInIcon,
  MediumIcon,
  PeerlistIcon,
  MailIcon,
  ProductHuntIcon,
  BuyMeACoffeeIcon,
} from "@/components/icons";

const socialIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GitHubIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
  "custom:medium": MediumIcon,
  "custom:peerlist": PeerlistIcon,
  "custom:producthunt": ProductHuntIcon,
  "custom:buymeacoffee": BuyMeACoffeeIcon,
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  // Toggle palette on ⌘K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        // Prevent default browser search behavior if target is not editable
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vikas.devopp@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-0 shadow-2xl backdrop-blur-md"
          >
            <Command
              className="flex w-full flex-col overflow-hidden rounded-2xl bg-transparent"
              label="Global Command Palette"
            >
              {/* Search Bar */}
              <div className="flex items-center border-b border-border/60 px-4 py-3 gap-2">
                <Search size={18} className="shrink-0 text-muted-foreground" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground shrink-0">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="sm:hidden flex items-center justify-center p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors shrink-0"
                  aria-label="Close Command Palette"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Command List */}
              <Command.List className="max-h-[340px] overflow-y-auto p-2 scrollbar-none space-y-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No matching results found.
                </Command.Empty>

                {/* Navigation Section */}
                <Command.Group heading="Navigation" className="px-2 py-1 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <Home size={16} className="text-muted-foreground" />
                    <span>Home</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/#work"))}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <Briefcase size={16} className="text-muted-foreground" />
                    <span>Work & Projects</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/#contributions"))}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <GitCommit size={16} className="text-muted-foreground" />
                    <span>GitHub Contributions</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/blog"))}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <BookOpen size={16} className="text-muted-foreground" />
                    <span>Blogs & Articles</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/favorites"))}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <Bookmark size={16} className="text-muted-foreground" />
                    <span>Favorites & Curations</span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/private"))}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <Lock size={16} className="text-muted-foreground" />
                    <span>Vikas&apos;s Private Space</span>
                  </Command.Item>
                </Command.Group>

                {/* Social Links Section */}
                <Command.Group heading="Social Profiles" className="px-2 py-1 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
                  {socials.map((social) => {
                    const IconComponent = socialIconMap[social.icon] || ExternalLink;
                    return (
                      <Command.Item
                        key={social.name}
                        onSelect={() =>
                          runCommand(() => window.open(social.url, "_blank"))
                        }
                        className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent size={16} className="text-muted-foreground" />
                          <span>{social.name}</span>
                        </div>
                        <ExternalLink size={14} className="text-muted-foreground/50" />
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                {/* Quick Actions & System Section */}
                <Command.Group heading="Actions" className="px-2 py-1 text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
                  <Command.Item
                    onSelect={() => runCommand(handleCopyEmail)}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {copied ? (
                        <Check size={16} className="text-emerald-500" />
                      ) : (
                        <Copy size={16} className="text-muted-foreground" />
                      )}
                      <span>
                        {copied ? "Email Copied to Clipboard!" : "Copy Contact Email"}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground/60">
                      vikas.devopp@gmail.com
                    </span>
                  </Command.Item>

                  <Command.Item
                    onSelect={() =>
                      runCommand(() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                      )
                    }
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/60 data-[selected=true]:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {resolvedTheme === "dark" ? (
                        <Sun size={16} className="text-muted-foreground" />
                      ) : (
                        <Moon size={16} className="text-muted-foreground" />
                      )}
                      <span>
                        Switch to {resolvedTheme === "dark" ? "Light" : "Dark"} Mode
                      </span>
                    </div>
                    <kbd className="font-mono text-xs text-muted-foreground/60">D</kbd>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Footer status */}
              <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground/60">
                <span className="flex items-center gap-1">
                  <CommandIcon size={12} /> Search & Navigation
                </span>
                <span>Press ↑ ↓ to navigate, ↵ to select</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
