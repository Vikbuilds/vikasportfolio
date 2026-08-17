import { Bug } from "lucide-react";
import { FooterIllustration } from "@/components/footer-illustration";
import { AgeClock } from "@/components/age-clock";

export function Footer() {
  return (
    <footer className="w-full pt-6 pb-8">
      <FooterIllustration />
      <div className="border-t border-dashed border-border/40 pt-6 flex flex-col items-center gap-2 text-center mt-2">
        <AgeClock className="text-xs" />
        <p className="text-xs text-muted-foreground/70">
          Built by{" "}
          <a
            href="https://github.com/Vikbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Vikas Acharya
          </a>
        </p>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
          <p>© {new Date().getFullYear()} · All rights reserved.</p>
          <span>·</span>
          <a
            href="https://x.com/VikasAcharyaa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors duration-200"
          >
            <Bug size={12} />
            Report a bug
          </a>
        </div>
      </div>
    </footer>
  );
}
