"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site";
import {
  Play,
  Pause,
  RotateCw,
  Compass,
  Layers,
  ZoomIn,
  ShieldCheck,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

interface Hotspot {
  frameRange: [number, number];
  title: string;
  subtitle: string;
  xPercent: number;
  yPercent: number;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    frameRange: [1, 55],
    title: "Multi-Tier Gable & Architectural Ridges",
    subtitle: "High-Wind LayerLock™ Interlock",
    xPercent: 52,
    yPercent: 32,
    description: "Multi-layered starter courses and 6-nail fastening tested against 130 mph alpine wind shear.",
  },
  {
    frameRange: [56, 120],
    title: "Precision Valley Flashing & Ice Shield",
    subtitle: "Self-Healing Bitumen Barrier",
    xPercent: 62,
    yPercent: 44,
    description: "High-temperature self-adhering ice & water membrane extending 6 feet beyond exterior heated wall lines.",
  },
  {
    frameRange: [121, 200],
    title: "Dormer Flashing & Copper Masonry Integration",
    subtitle: "Reglet & Step Flashing Joint",
    xPercent: 46,
    yPercent: 40,
    description: "Custom copper sidewall step flashing counter-flashed into stone mortar joints to eliminate capillary water entry.",
  },
  {
    frameRange: [201, 300],
    title: "Continuous Ridge Vent & Airflow Calibration",
    subtitle: "Thermal Equalization System",
    xPercent: 42,
    yPercent: 26,
    description: "Computer-modeled Net Free Vent Area (NFVA) balanced with soffit intakes prevents winter ice damming.",
  },
];

export function DroneInspectionViewer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);

  const frames = siteConfig.droneFrames;
  const totalFrames = frames.length || 300;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameId = useRef<number | null>(null);

  // Derive active hotspot directly from current frame
  const activeHotspot =
    HOTSPOTS.find(
      (h) => currentFrame + 1 >= h.frameRange[0] && currentFrame + 1 <= h.frameRange[1]
    ) || null;

  // Draw frame on canvas
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      const cWidth = canvas.width;
      const cHeight = canvas.height;

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = cWidth / cHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = cWidth;
        drawHeight = cWidth / imgAspect;
        offsetX = 0;
        offsetY = (cHeight - drawHeight) / 2;
      } else {
        drawHeight = cHeight;
        drawWidth = cHeight * imgAspect;
        offsetX = (cWidth - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, []);

  // Preload frames progressively
  useEffect(() => {
    if (!frames || frames.length === 0) return;

    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(frames.length);

    // Phase 1: Load every 8th frame first for rapid scrub responsiveness
    const step = 8;
    const prioritizedIndices: number[] = [];
    for (let i = 0; i < frames.length; i += step) {
      prioritizedIndices.push(i);
    }
    for (let i = 0; i < frames.length; i++) {
      if (i % step !== 0) prioritizedIndices.push(i);
    }

    prioritizedIndices.forEach((idx) => {
      const img = new Image();
      img.src = frames[idx];
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (idx === 0) {
          renderFrame(0);
          setIsLoaded(true);
        }
      };
      imgs[idx] = img;
    });

    imagesRef.current = imgs;

    const updateCanvasSize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = rect.width * dpr;
      canvasRef.current.height = rect.height * dpr;
      renderFrame(currentFrame);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [frames, renderFrame, currentFrame]);

  // Play / Pause auto-orbit
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      return;
    }

    let lastTime = performance.now();
    const fps = 30;
    const interval = 1000 / fps;

    const loop = (time: number) => {
      const delta = time - lastTime;
      if (delta >= interval) {
        setCurrentFrame((prev) => {
          const next = (prev + 1) % totalFrames;
          renderFrame(next);
          return next;
        });
        lastTime = time - (delta % interval);
      }
      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, totalFrames, renderFrame]);

  // Touch and mouse drag controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    const frameDelta = Math.floor(diff / 4);
    if (Math.abs(frameDelta) >= 1) {
      const newFrame = (currentFrame - frameDelta + totalFrames) % totalFrames;
      setCurrentFrame(newFrame);
      renderFrame(newFrame);
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStartX(e.touches[0].clientX);
      setIsPlaying(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const diff = e.touches[0].clientX - dragStartX;
    const frameDelta = Math.floor(diff / 5);
    if (Math.abs(frameDelta) >= 1) {
      const newFrame = (currentFrame - frameDelta + totalFrames) % totalFrames;
      setCurrentFrame(newFrame);
      renderFrame(newFrame);
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentFrame(val);
    renderFrame(val);
    setIsPlaying(false);
  };

  const jumpToHotspot = (hotspot: Hotspot) => {
    const target = hotspot.frameRange[0];
    setCurrentFrame(target);
    renderFrame(target);
    setIsPlaying(false);
  };

  return (
    <section
      id="drone-inspection"
      className="relative py-24 bg-[#070A0F] border-t border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Interactive 360° Aerial Inspection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
              Precision Drone Photogrammetry
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Drag horizontally or toggle auto-orbit to inspect every shingle line,
              copper valley, and gable termination of this completed Colorado estate.
            </p>
          </div>

          {/* Quick Stats / Telemetry Box */}
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 text-xs backdrop-blur-md">
            <div>
              <p className="text-slate-400">Resolution</p>
              <p className="font-semibold text-white">4K 60FPS Photogrammetry</p>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <p className="text-slate-400">Shingle Profile</p>
              <p className="font-semibold text-orange-400">Class-4 Architectural</p>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <p className="text-slate-400">Angle</p>
              <p className="font-mono font-semibold text-white">
                {Math.round((currentFrame / totalFrames) * 360)}° Orbit
              </p>
            </div>
          </div>
        </div>

        {/* Main Canvas Viewer Container */}
        <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl bg-black">
          {/* Canvas viewport */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[380px] sm:min-h-[480px] cursor-grab active:cursor-grabbing select-none"
          >
            <canvas ref={canvasRef} className="w-full h-full object-cover block" />

            {/* Subtle corner crosshairs for aerospace drone HUD look */}
            <div className="pointer-events-none absolute top-4 left-4 text-[10px] font-mono text-white/40 tracking-wider">
              ALT: 48FT · PITCH: 8:12 · GPS: 39.7392° N
            </div>
            <div className="pointer-events-none absolute top-4 right-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                LIVE 360 SCRIBE
              </span>
            </div>

            {/* Interactive Dynamic Hotspot Overlay on Canvas */}
            <AnimatePresence>
              {showHotspots && activeHotspot && (
                <motion.div
                  key={activeHotspot.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    left: `${activeHotspot.xPercent}%`,
                    top: `${activeHotspot.yPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                  <div className="relative">
                    {/* Pulsing ring target */}
                    <div className="w-8 h-8 rounded-full border-2 border-orange-500 bg-orange-500/20 flex items-center justify-center animate-pulse shadow-[0_0_20px_#ea580c]">
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    </div>

                    {/* Popover Callout */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-64 sm:w-72 p-3.5 rounded-xl bg-[#070A0F]/90 backdrop-blur-md border border-orange-500/40 shadow-2xl text-left pointer-events-auto">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Inspection Hotspot</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {activeHotspot.title}
                      </h4>
                      <p className="text-[11px] text-orange-300/90 font-medium mb-1">
                        {activeHotspot.subtitle}
                      </p>
                      <p className="text-[11px] text-slate-300 leading-normal">
                        {activeHotspot.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instruction tooltip overlay when not interacting */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-slate-300 border border-white/10 flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-orange-400 animate-spin-slow" />
              <span>Click & drag horizontally to rotate roof view</span>
            </div>
          </div>

          {/* Control Bar */}
          <div className="p-4 sm:p-5 bg-[#0B0F17]/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Play/Pause & Step Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Orbit</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Auto 360° Orbit</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const prev = (currentFrame - 15 + totalFrames) % totalFrames;
                  setCurrentFrame(prev);
                  renderFrame(prev);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                title="Previous Angle"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const next = (currentFrame + 15) % totalFrames;
                  setCurrentFrame(next);
                  renderFrame(next);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                title="Next Angle"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  showHotspots
                    ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Hotspots</span>
              </button>
            </div>

            {/* Scrub Slider */}
            <div className="w-full sm:max-w-md flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 shrink-0">0°</span>
              <input
                type="range"
                min="0"
                max={totalFrames - 1}
                value={currentFrame}
                onChange={handleSliderChange}
                className="w-full accent-orange-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[11px] font-mono text-slate-400 shrink-0">360°</span>
            </div>

            {/* Quick Hotspot Jump Tabs */}
            <div className="hidden lg:flex items-center gap-2">
              {HOTSPOTS.map((h, i) => (
                <button
                  key={i}
                  onClick={() => jumpToHotspot(h)}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                    activeHotspot?.title === h.title
                      ? "bg-orange-500/30 text-orange-200 border border-orange-500/50"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  Feature 0{i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
