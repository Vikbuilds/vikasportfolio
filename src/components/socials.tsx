"use client";

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
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Social Icons */}
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
    </motion.section>
  );
}
