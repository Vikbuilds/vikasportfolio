"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitCounter({ className }: { className?: string }) {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        const res = await fetch("/api/visitors");
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data.visits === "number" && isMounted) {
          setVisits(data.visits);
        }
      } catch {
        // Fallback remains active
      }
    }

    fetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayCount = visits !== null ? visits.toLocaleString() : "8,144";

  return (
    <span
      className={`inline-flex items-center gap-1 select-none text-muted-foreground/50 ${className ?? ""}`}
    >
      <Eye size={11} className="shrink-0 text-muted-foreground/60" />
      <span
        suppressHydrationWarning
        className="font-mono tabular-nums font-medium text-muted-foreground/80"
      >
        {displayCount}
      </span>
      <span>visits</span>
    </span>
  );
}
