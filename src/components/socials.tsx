"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GitHubIcon,
  XIcon,
  LinkedInIcon,
  InstagramIcon,
  DiscordIcon,
  MediumIcon,
  PeerlistIcon,
  HashnodeIcon,
  MailIcon,
  ProductHuntIcon,
  BuyMeACoffeeIcon,
  MedialIcon,
} from "@/components/icons";
import { socials } from "@/data/socials";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: GitHubIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  mail: MailIcon,
  "custom:discord": DiscordIcon,
  "custom:medium": MediumIcon,
  "custom:peerlist": PeerlistIcon,
  "custom:hashnode": HashnodeIcon,
  "custom:producthunt": ProductHuntIcon,
  "custom:buymeacoffee": BuyMeACoffeeIcon,
  "custom:medial": MedialIcon,
};

const brandColors: Record<string, string> = {
  github: "hover:text-foreground",
  twitter: "hover:text-foreground",
  linkedin: "hover:text-[#0A66C2]",
  instagram: "hover:text-[#E4405F]",
  "custom:discord": "hover:text-[#5865F2]",
  "custom:medium": "hover:text-foreground",
  "custom:peerlist": "hover:text-[#00aa45]",
  "custom:hashnode": "hover:text-[#2962FF]",
  "custom:producthunt": "hover:text-[#DA552F]",
  "custom:buymeacoffee": "hover:text-[#FFDD00]",
  "custom:medial": "hover:text-[#007AFF]",
  mail: "hover:text-foreground",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function Socials() {
  const [timeString, setTimeString] = useState<string>("");
  const [visits, setVisits] = useState<number>(8144);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch live real-time visitor count
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch("/api/visitors");
        if (res.ok) {
          const data = await res.json();
          if (data.visits) {
            setVisits(data.visits);
          }
        }
      } catch {
        // Retain count
      }
    };

    fetchVisits();
    const interval = setInterval(fetchVisits, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Left: Social Icons */}
      <TooltipProvider delay={100}>
        <motion.div
          className="flex flex-wrap items-center gap-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            const colorClass = brandColors[social.icon] || "hover:text-foreground";
            if (!Icon) return null;
            return (
              <motion.div key={social.name} variants={item}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:scale-110 active:scale-95 ${colorClass}`}
                        aria-label={social.name}
                      />
                    }
                  >
                    <Icon size={18} />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="text-xs"
                    sideOffset={6}
                  >
                    {social.name}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}
        </motion.div>
      </TooltipProvider>

      {/* Right: Live Running Timestamp & Realtime Visitors */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col sm:items-end gap-0.5 text-xs text-muted-foreground/75 font-sans select-none shrink-0"
      >
        <div className="flex items-center gap-2 font-mono text-[13px] text-muted-foreground/90 font-medium tracking-tight">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{timeString ? `${timeString} IST` : "10:12:32 PM IST"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground/60 text-xs sm:text-right font-sans flex-wrap justify-start sm:justify-end">
          <span>Bengaluru, India</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-mono text-muted-foreground/80 font-medium">
            {visits.toLocaleString()} visits
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
