"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MotionSubtitle } from "./motion-subtitle";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface OrbitalImageWheelImage {
  src: string;
  alt?: string;
  label?: string;
  subtitle?: string;
  location?: string;
  date?: string;
  story?: string;
  id?: string;
}

export interface OrbitalImageWheelProps {
  images: OrbitalImageWheelImage[];
  initialIndex?: number;
  turns?: number;
  blur?: number;
  dim?: number;
  brightnessBoost?: number;
  darknessStrength?: number;
  minSaturation?: number;
  saturationStrength?: number;
  focusSpread?: number;
  scaleEffect?: number;
  scrollSensitivity?: number;
  itemWidth?: number;
  itemHeight?: number;
  wheelSize?: number;
  cropRatio?: number;
  scrollLength?: number;
  captionOffset?: number;
  showCaption?: boolean;
  subtitleDirection?: "top" | "bottom";
  subtitleSpeed?: number;
  subtitleStagger?: number;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  onClose?: () => void;
  className?: string;
}

export function OrbitalImageWheel({
  images,
  initialIndex = 0,
  blur = 3,
  focusSpread = 0.38,
  scaleEffect = 0.08,
  itemWidth = 240,
  itemHeight = 320,
  wheelSize,
  cropRatio = 0.55,
  captionOffset = 4,
  showCaption = true,
  subtitleDirection = "top",
  subtitleSpeed = 1.25,
  subtitleStagger = 0.014,
  onClose,
  className = "",
}: OrbitalImageWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);

  const numItems = images.length;
  const stepAngle = (2 * Math.PI) / Math.max(1, numItems);

  const getAngleForIndex = useCallback(
    (index: number) => {
      return index * stepAngle;
    },
    [stepAngle]
  );

  useEffect(() => {
    setRotationAngle(getAngleForIndex(initialIndex));
    setActiveIndex(initialIndex);
  }, [initialIndex, getAngleForIndex]);

  // Calculate active card index based on current rotation angle
  useEffect(() => {
    if (numItems === 0) return;
    let normalized = rotationAngle % (2 * Math.PI);
    if (normalized < 0) normalized += 2 * Math.PI;

    const exactIndex = (normalized / stepAngle) % numItems;
    const closestIndex = Math.round(exactIndex) % numItems;

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [rotationAngle, numItems, stepAngle, activeIndex]);

  // Direct smooth rotation transition when selecting a card
  const handleCardClick = useCallback((index: number) => {
    const targetAngle = getAngleForIndex(index);
    gsap.to(
      { angle: rotationAngle },
      {
        angle: targetAngle,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: function () {
          setRotationAngle(this.targets()[0].angle);
        },
      }
    );
  }, [getAngleForIndex, rotationAngle]);

  // Mouse wheel & trackpad scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const angleChange = (delta / 450) * stepAngle;
    setRotationAngle((prev) => prev + angleChange);
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const nextIdx = (activeIndex + 1) % numItems;
        handleCardClick(nextIdx);
      } else if (e.key === "ArrowLeft") {
        const prevIdx = (activeIndex - 1 + numItems) % numItems;
        handleCardClick(prevIdx);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, numItems, handleCardClick]);

  // Pointer/Touch Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = rotationAngle;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const angleDelta = (-dx / 300) * stepAngle;
    setRotationAngle(dragStartAngleRef.current + angleDelta);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    let normalized = rotationAngle % (2 * Math.PI);
    if (normalized < 0) normalized += 2 * Math.PI;
    const closestIdx = Math.round(normalized / stepAngle) % numItems;
    handleCardClick(closestIdx);
  };

  // Tight radius calculation for clean photo spacing
  const getRadius = () => {
    if (wheelSize) return wheelSize / 2;
    if (typeof window !== "undefined") {
      return Math.max(420, Math.min(650, window.innerWidth * 0.40));
    }
    return 500;
  };

  const radius = getRadius();
  const centerY = radius * cropRatio;

  const currentImage = images[activeIndex] || images[0];

  const subtitleText = currentImage?.subtitle
    ? currentImage.subtitle.toUpperCase()
    : currentImage?.location && currentImage?.date
    ? `${currentImage.location} · ${currentImage.date}`.toUpperCase()
    : (currentImage?.alt || "VISUAL JOURNAL").toUpperCase();

  const titleText =
    currentImage?.label || currentImage?.alt || `Photo ${activeIndex + 1}`;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className={`relative w-full h-full min-h-screen overflow-hidden bg-background text-foreground select-none ${className}`}
    >
      {/* Top Left Index Counter Pill */}
      <div className="absolute top-6 left-6 z-50 pointer-events-auto">
        <span className="font-mono text-xs font-medium text-foreground px-3.5 py-1.5 rounded-full bg-muted/80 backdrop-blur-md border border-border/50 shadow-xs">
          {activeIndex + 1} / {numItems}
        </span>
      </div>

      {/* Top Right Close Button */}
      {onClose && (
        <div className="absolute top-6 right-6 z-50 pointer-events-auto">
          <button
            onClick={onClose}
            aria-label="Close orbital wheel"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/80 hover:bg-muted text-foreground backdrop-blur-md border border-border/50 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Centered Top Active Caption & PP Editorial Story Block */}
      {showCaption && (
        <div
          className="absolute left-1/2 z-40 flex flex-col items-center -translate-x-1/2 text-center pointer-events-none max-w-[90vw] sm:max-w-md px-4"
          style={{ top: `${captionOffset}%` }}
        >
          <MotionSubtitle
            text={subtitleText}
            direction={subtitleDirection}
            speed={subtitleSpeed}
            stagger={subtitleStagger}
            className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground mb-1 uppercase"
          />

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {titleText}
          </h2>

          {currentImage?.story && (
            <p className="mt-2 font-private-editorial text-sm sm:text-base italic text-foreground/85 leading-relaxed max-w-sm sm:max-w-md">
              &ldquo;{currentImage.story}&rdquo;
            </p>
          )}
        </div>
      )}

      {/* Minimal Side Navigation Controls */}
      <button
        onClick={() => handleCardClick((activeIndex - 1 + numItems) % numItems)}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-muted/80 hover:bg-muted text-foreground border border-border/50 shadow-md backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => handleCardClick((activeIndex + 1) % numItems)}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-muted/80 hover:bg-muted text-foreground border border-border/50 shadow-md backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      {/* The Orbital Wheel Arc Container */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
      >
        {/* Wheel Hub Center Anchor positioned at top-[78%] for perfect vertical balance */}
        <div
          className="absolute left-1/2 top-[78%] -translate-x-1/2"
          style={{ transform: `translate(-50%, ${centerY}px)` }}
        >
          {images.map((image, i) => {
            const itemBaseAngle = i * stepAngle;
            const angle = itemBaseAngle - rotationAngle - Math.PI / 2;

            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            let diff = angle - (-Math.PI / 2);
            while (diff < -Math.PI) diff += 2 * Math.PI;
            while (diff > Math.PI) diff -= 2 * Math.PI;

            const absDiff = Math.abs(diff);
            const normalizedDist = absDiff / (focusSpread * Math.PI);
            const focusFactor = Math.max(0, 1 - normalizedDist);

            const scale =
              1 - scaleEffect * Math.min(2.5, absDiff * 2) + focusFactor * 0.12;
            const blurVal = (1 - focusFactor) * blur;
            const opacityVal = 0.45 + focusFactor * 0.55;
            const cardZIndex = Math.round(100 - absDiff * 40);
            const tiltDeg = (diff * 180) / Math.PI * 0.18;

            const isCurrent = i === activeIndex;

            return (
              <div
                key={image.id || i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(i);
                }}
                className={`absolute left-0 top-0 transition-all duration-200 ease-out cursor-pointer rounded-2xl overflow-hidden border ${
                  isCurrent
                    ? "border-foreground/50 ring-2 ring-primary/30 shadow-xl"
                    : "border-border/50 shadow-md"
                }`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${tiltDeg}deg) scale(${scale})`,
                  filter: `blur(${blurVal}px)`,
                  opacity: opacityVal,
                  zIndex: cardZIndex,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt || image.label || `Photo ${i + 1}`}
                  fill
                  sizes="380px"
                  className="object-cover pointer-events-none"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
