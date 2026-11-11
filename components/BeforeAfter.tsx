"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { ChevronsLeftRight, Sparkles, ShieldCheck } from "lucide-react";

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const data = siteConfig.beforeAfter;

  return (
    <section id="before-after" className="relative py-24 bg-[#070A0F] noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Forensic Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
            {data.title}
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Comparison Slider Container */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] select-none cursor-ew-resize overflow-hidden"
          >
            {/* After Image (Full background) */}
            <Image
              src={data.afterImage}
              alt="After Restoration"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              draggable={false}
              referrerPolicy="no-referrer"
            />

            {/* Before Image with dynamic clip-path */}
            <Image
              src={data.beforeImage}
              alt="Before Damage"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
              draggable={false}
              referrerPolicy="no-referrer"
            />

            {/* Vertical Divider Line with Glow */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-400 via-amber-300 to-orange-500 shadow-[0_0_12px_#ea580c] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Draggable Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#070A0F] border-2 border-orange-500 shadow-2xl flex items-center justify-center text-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <ChevronsLeftRight className="w-5 h-5 text-orange-400" />
              </div>
            </div>

            {/* Badges on each side */}
            <div className="pointer-events-none absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white shadow-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>{data.beforeLabel}</span>
            </div>

            <div className="pointer-events-none absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-white shadow-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{data.afterLabel}</span>
            </div>

            {/* Drag helper prompt at bottom */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-slate-300 border border-white/10">
              Drag left or right to compare
            </div>
          </div>

          {/* Specification comparison strip */}
          <div className="p-6 sm:p-8 bg-[#0B0F17]/95 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.specs.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
