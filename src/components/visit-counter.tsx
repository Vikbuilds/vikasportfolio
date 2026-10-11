"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitCounter({ className }: { className?: string }) {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        const res = await fetch("/api/visitors", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data.visits === "number" && isMounted) {
          setVisits(data.visits);
        }
      } catch {
        // Graceful fallback
      }
    }

    fetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1 select-none text-muted-foreground/50 ${className ?? ""}`}
    >
      <Eye size={11} className="shrink-0 text-muted-foreground/60" />
      <span
        suppressHydrationWarning
        className="font-mono tabular-nums font-medium text-muted-foreground/80 min-w-[20px] text-center"
      >
        {visits !== null ? visits.toLocaleString() : "···"}
      </span>
      <span>visits</span>
    </span>
  );
}
