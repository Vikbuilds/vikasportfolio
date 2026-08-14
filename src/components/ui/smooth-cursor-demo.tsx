"use client";

import { SmoothCursor } from "@/components/ui/smooth-cursor";

export function SmoothCursorDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-border/40 bg-muted/20 text-center space-y-2">
      <span className="hidden md:block font-medium text-sm text-muted-foreground">
        Move your mouse around to experience physics-based smooth cursor animations.
      </span>
      <span className="block md:hidden text-xs text-muted-foreground">
        SmoothCursor is disabled on touch devices automatically.
      </span>
      <SmoothCursor />
    </div>
  );
}
