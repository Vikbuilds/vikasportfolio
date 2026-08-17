"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// May 11, 2005 00:00:00 UTC
const BIRTH_TIMESTAMP = new Date("2005-05-11T00:00:00Z").getTime();
// Gregorian year average length in milliseconds (365.2425 days)
const MS_PER_YEAR = 365.2425 * 24 * 60 * 60 * 1000;

export function AgeClock({ className }: { className?: string }) {
  const [age, setAge] = useState<string | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateAge = () => {
      const now = Date.now();
      const currentAge = (now - BIRTH_TIMESTAMP) / MS_PER_YEAR;
      setAge(currentAge.toFixed(9));
      animationFrameId = requestAnimationFrame(updateAge);
    };

    updateAge();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const displayAge = age ?? ((Date.now() - BIRTH_TIMESTAMP) / MS_PER_YEAR).toFixed(9);

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-muted-foreground/80 font-normal select-none ${className ?? ""}`}
    >
      <Clock size={12} className="text-muted-foreground/70 shrink-0 animate-pulse" />
      <span>been here for</span>
      <span
        suppressHydrationWarning
        className="font-mono tabular-nums font-medium text-foreground tracking-tight"
      >
        {displayAge}
      </span>
      <span>years</span>
    </span>
  );
}
