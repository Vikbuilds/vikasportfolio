"use client";

import { Map } from "@/components/ui/map";

// Koramangala, Bengaluru coordinates [longitude, latitude]
const KORAMANGALA_COORDS: [number, number] = [77.6245, 12.9352];

export function LocationMap({ className }: { className?: string }) {
  return <Map center={KORAMANGALA_COORDS} zoom={14.6} className={className} />;
}
