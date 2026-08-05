"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionSubtitle } from "./motion-subtitle";
import { X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface OrbitalImageWheelImage {
  src: string;
  alt?: string;
  label?: string;
  subtitle?: string;
  location?: string;
  date?: string;
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
  turns = 3,
  blur = 4,
  dim = 40,
  brightnessBoost = 30,
  darknessStrength = 1.05,
  minSaturation = 55,
  saturationStrength = 0.6,
  focusSpread = 0.34,
  scaleEffect = 0.06,
  scrollSensitivity = 0.7,
  itemWidth = 260,
  itemHeight = 350,
  wheelSize,
  cropRatio = 0.7,
  scrollLength = 330,
  captionOffset = 12,
  showCaption = true,
  subtitleDirection = "top",
  subtitleSpeed = 1.25,
  subtitleStagger = 0.014,
  scrollContainerRef,
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

  // GSAP ScrollTrigger setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroller = scrollContainerRef?.current || window;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        scroller: scroller === window ? undefined : scroller,
        start: "top top",
        end: `+=${scrollLength * 10}px`,
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          if (isDraggingRef.current) return;
          const totalSpan = turns * Math.PI * 2 * scrollSensitivity;
          const targetAngle =
            getAngleForIndex(initialIndex) + self.progress * totalSpan;
          setRotationAngle(targetAngle);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [scrollLength, turns, scrollSensitivity, initialIndex, getAngleForIndex, scrollContainerRef]);

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

  // Handle direct click on a card to bring it into focus
  const handleCardClick = (index: number) => {
    const targetAngle = getAngleForIndex(index);
    gsap.to(
      { angle: rotationAngle },
      {
        angle: targetAngle,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          setRotationAngle(this.targets()[0].angle);
        },
      }
    );
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
  }, [activeIndex, numItems]);

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
    const angleDelta = (-dx / 400) * Math.PI;
    setRotationAngle(dragStartAngleRef.current + angleDelta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    let normalized = rotationAngle % (2 * Math.PI);
    if (normalized < 0) normalized += 2 * Math.PI;
    const closestIdx = Math.round(normalized / stepAngle) % numItems;
    handleCardClick(closestIdx);
  };

  const getRadius = () => {
    if (wheelSize) return wheelSize / 2;
    if (typeof window !== "undefined") {
      return Math.max(700, Math.min(1200, window.innerWidth * 0.75));
    }
    return 850;
  };

  const radius = getRadius();
  const centerY = radius * cropRatio;

  const currentImage = images[activeIndex] || images[0];

  // Subtitle format: e.g. "PUDUCHERRY HARBOR, INDIA · JAN 2026"
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
      className={`relative w-full h-screen overflow-hidden bg-black text-white select-none ${className}`}
    >
      {/* Top Left Index Counter Pill */}
      <div className="absolute top-6 left-6 z-50 pointer-events-auto">
        <span className="font-mono text-xs text-white/70 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
          {activeIndex + 1} / {numItems}
        </span>
      </div>

      {/* Top Right Close Button */}
      {onClose && (
        <div className="absolute top-6 right-6 z-50 pointer-events-auto">
          <button
            onClick={onClose}
            aria-label="Close orbital wheel"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Centered Top Active Caption Block */}
      {showCaption && (
        <div
          className="absolute left-1/2 z-40 flex flex-col items-center -translate-x-1/2 text-center pointer-events-none max-w-xl px-4"
          style={{ top: `${captionOffset}%` }}
        >
          <MotionSubtitle
            text={subtitleText}
            direction={subtitleDirection}
            speed={subtitleSpeed}
            stagger={subtitleStagger}
            className="text-[11px] font-mono tracking-[0.22em] text-white/60 mb-2 uppercase"
          />

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white drop-shadow-md">
            {titleText}
          </h2>
        </div>
      )}

      {/* The Orbital Wheel Arc Container */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
      >
        {/* Wheel Hub Center Anchor */}
        <div
          className="absolute left-1/2 top-full -translate-x-1/2"
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
              1 - scaleEffect * Math.min(2.5, absDiff * 2) + focusFactor * 0.1;
            const blurVal = (1 - focusFactor) * blur;
            const brightness =
              dim + focusFactor * (100 - dim + brightnessBoost);
            const saturation =
              minSaturation + Math.pow(focusFactor, saturationStrength) * (100 - minSaturation);
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
                className={`absolute left-0 top-0 transition-all duration-150 ease-out cursor-pointer rounded-2xl overflow-hidden shadow-2xl border ${
                  isCurrent
                    ? "border-white/40 ring-1 ring-white/20"
                    : "border-white/10"
                }`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${tiltDeg}deg) scale(${scale})`,
                  filter: `blur(${blurVal}px) brightness(${brightness}%) saturate(${saturation}%)`,
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
