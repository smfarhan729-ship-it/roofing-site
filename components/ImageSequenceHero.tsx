"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageSequenceHeroProps {
  onAnimationComplete: () => void;
  onOpenQuoteModal: () => void;
  isUnlocked: boolean;
}

export function ImageSequenceHero({
  onAnimationComplete,
  onOpenQuoteModal,
  isUnlocked,
}: ImageSequenceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [initialReady, setInitialReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafIdRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  const totalFrames = siteConfig.animation.FRAME_COUNT || 656;

  // Draw frame on canvas with object-fit: cover math and DPR cap of 1.5
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Zero-index lookup
    const img = imagesRef.current[frameIdx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame if this specific frame is still loading
      return;
    }

    const cWidth = canvas.width;
    const cHeight = canvas.height;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cWidth / cHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = cWidth;
      drawHeight = cWidth / imgRatio;
      offsetY = (cHeight - drawHeight) / 2;
    } else {
      drawHeight = cHeight;
      drawWidth = cHeight * imgRatio;
      offsetX = (cWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Responsive Canvas Sizing (DPR capped at 1.5 for performance)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Preload frames in two phases: first 30 frames first, then background loading
  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionTimer = setTimeout(() => {
        setInitialReady(true);
        onAnimationComplete();
      }, 0);
      return () => clearTimeout(reducedMotionTimer);
    }

    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = imgs;

    const onLoad = (index: number) => {
      loaded++;
      setLoadedCount(loaded);

      if (index === 1) {
        drawFrame(1);
      }

      // Once first 30 frames are ready, reveal canvas
      if (loaded >= Math.min(30, totalFrames)) {
        setInitialReady(true);
      }
    };

    // Phase 1: load first 30 frames immediately
    const priorityCount = Math.min(30, totalFrames);
    for (let i = 1; i <= priorityCount; i++) {
      const img = new Image();
      img.src = siteConfig.animation.getFrameUrl(i);
      img.onload = () => onLoad(i);
      img.onerror = () => {
        // Skip failed frame silently
        onLoad(i);
      };
      imgs[i - 1] = img;
    }

    // Phase 2: Stagger remaining frames in background
    const timer = setTimeout(() => {
      for (let i = priorityCount + 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = siteConfig.animation.getFrameUrl(i);
        img.onload = () => onLoad(i);
        img.onerror = () => {
          onLoad(i);
        };
        imgs[i - 1] = img;
      }
    }, 150);

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [totalFrames, resizeCanvas, drawFrame, onAnimationComplete]);

  // Smooth lerp loop for scrubbing
  useEffect(() => {
    let lastRenderedFrame = -1;

    const renderLoop = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;

      // Smooth lerp (0.18 for buttery responsiveness)
      const diff = target - current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.max(1, Math.min(totalFrames, Math.round(currentFrameRef.current)));

      if (frameToDraw !== lastRenderedFrame) {
        drawFrame(frameToDraw);
        lastRenderedFrame = frameToDraw;
        setActiveFrameDisplay(frameToDraw);

        // Check if user has scrubbed to the very end
        if (frameToDraw >= totalFrames - 2 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onAnimationComplete();
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [totalFrames, drawFrame, onAnimationComplete]);

  // GSAP ScrollTrigger & Lenis Setup
  useEffect(() => {
    if (!triggerRef.current || !containerRef.current) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "+=500%",
      pin: containerRef.current,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Map progress 0..1 to 1..totalFrames
        const target = 1 + p * (totalFrames - 1);
        targetFrameRef.current = target;

        // Completion trigger
        if (p >= 0.96 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onAnimationComplete();
        }
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [totalFrames, onAnimationComplete]);

  // Quick unlock action
  const handleSkipToContent = () => {
    hasCompletedRef.current = true;
    onAnimationComplete();
    const target = document.getElementById("trust-bar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Progress Percentage for preloader
  const preloadPercent = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <div ref={triggerRef} className="relative w-full bg-[#070A0F]">
      {/* Pinned Viewport Container (100vw x 100dvh) */}
      <div
        ref={containerRef}
        className="relative w-full h-[100dvh] min-h-screen overflow-hidden select-none bg-[#070A0F]"
      >
        {/* The Single Canvas rendering the full-screen sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block z-0"
        />

        {/* Cinematic Vignette & Scrim Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-black/60 z-10" />
        <div className="pointer-events-none absolute inset-0 bg-radial-vignette opacity-50 z-10" />

        {/* Aerospace HUD telemetry markings */}
        <div className="pointer-events-none absolute top-6 left-6 z-20 hidden sm:flex items-center gap-3 text-[11px] font-mono text-white/60 tracking-wider">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>PHOTOGRAMMETRY SCAN 4K</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md">
            FRAME {String(activeFrameDisplay).padStart(4, "0")} / {totalFrames}
          </div>
        </div>

        {/* Top Right Skip / Fast-Forward Button */}
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={handleSkipToContent}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 hover:bg-orange-600/90 text-white text-xs font-semibold backdrop-blur-md border border-white/15 shadow-xl transition-all"
          >
            <span>{isUnlocked ? "Jump to Content" : "Skip Animation"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ---------------- Text Overlays with Staged Progress Fade ---------------- */}

        {/* Stage 1: Progress 0% to 12% */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0 && scrollProgress <= 0.12
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-orange-400 text-xs font-semibold mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Roofing · Denver & Front Range</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] font-sans drop-shadow-2xl">
              Engineered for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Generations.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
              Triple-laminated architectural shingles, standing seam copper, and autonomous drone forensics designed for Colorado&apos;s alpine extremes.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <button
                onClick={onOpenQuoteModal}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(234,88,12,0.5)] hover:shadow-[0_0_50px_rgba(234,88,12,0.8)] hover:scale-105 active:scale-95 transition-all"
              >
                Request Free Drone Roof Inspection
              </button>
            </div>
          </div>
        </div>

        {/* Stage 2: Progress 38% to 58% */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.38 && scrollProgress <= 0.58
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="max-w-3xl mx-auto p-8 rounded-3xl glass-panel bg-black/60 border border-white/15 backdrop-blur-xl shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Sub-Millimeter Photogrammetry</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              360° Forensic Precision
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Every shingle pitch, copper valley flashing, and rafter load line is mapped in 4K resolution. Zero foot traffic on fragile tiles.
            </p>

            <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs text-slate-300">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                130 MPH Wind Shear Tested
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                Class-4 Impact Resilience
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                Thermal Infrared Heatmap
              </span>
            </div>
          </div>
        </div>

        {/* Stage 3: Progress 82% to 100% */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0.82
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" />
              <span>Scan Complete · Master Craftsmanship Verified</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Architectural Mastery Below
            </h2>

            <p className="mt-4 text-sm sm:text-lg text-slate-200 max-w-2xl font-medium leading-relaxed">
              Continue scrolling to explore our verified materials, before/after transformations, live price calculator, and certified portfolio.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
              <button
                onClick={handleSkipToContent}
                className="px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(234,88,12,0.6)] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Explore Full Portfolio</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator (visible at start) */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 transition-opacity duration-500 pointer-events-none ${
            scrollProgress < 0.8 ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-300 font-semibold bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            Scroll to Inspect Estate
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1 bg-black/20">
            <div className="w-1.5 h-2.5 rounded-full bg-orange-500 animate-bounce" />
          </div>
        </div>

        {/* Minimal Initial Preloader Bar */}
        <AnimatePresence>
          {!initialReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 bg-[#070A0F] flex flex-col items-center justify-center p-6 text-white select-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/40 text-orange-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,88,12,0.3)]">
                <Compass className="w-7 h-7 animate-spin-slow" />
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-2 font-sans">
                {siteConfig.company.name}
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                Initializing 4K Photogrammetry Stream ({preloadPercent}%)
              </p>

              {/* Progress bar */}
              <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-600 to-amber-400 transition-all duration-150"
                  style={{ width: `${Math.max(5, preloadPercent)}%` }}
                />
              </div>

              <button
                onClick={() => setInitialReady(true)}
                className="mt-8 text-[11px] text-slate-400 hover:text-white underline"
              >
                Skip Preload
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
