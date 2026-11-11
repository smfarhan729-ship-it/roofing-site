"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Award, Star, ArrowDown, Sparkles, ChevronRight } from "lucide-react";

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export function Hero({ onOpenQuoteModal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax offset (-10px to +10px)
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Split-text headline
  const headlineWords = ["Architectural", "Roofing.", "Engineered", "for", "Generations."];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24 pb-16 noise-overlay"
    >
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-orange-600/15 via-amber-600/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#070A0F] to-transparent z-10" />
      </div>

      {/* Layered subtle architectural background grid */}
      <motion.div
        style={{
          x: mousePos.x * -0.5,
          y: mousePos.y * -0.5,
        }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="w-full h-full [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]">
          <svg className="w-full h-full stroke-white/15" fill="none">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </motion.div>

      {/* Floating Glass Badges (Desktop Parallax) */}
      <motion.div
        style={{ x: mousePos.x * 1.2, y: mousePos.y * 1.2 }}
        className="hidden lg:block absolute top-32 left-[8%] z-20"
      >
        <div className="glass-panel px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl border border-white/10">
          <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">GAF Master Elite®</p>
            <p className="text-[11px] text-slate-400">Top 2% Certified Nationwide</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: mousePos.x * -1.2, y: mousePos.y * -1.2 }}
        className="hidden lg:block absolute top-44 right-[8%] z-20"
      >
        <div className="glass-panel px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl border border-white/10">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">50-Year Non-Prorated</p>
            <p className="text-[11px] text-slate-400">Golden Pledge Transferable</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: mousePos.x * 0.8, y: mousePos.y * 0.8 }}
        className="hidden md:block absolute bottom-28 left-[12%] z-20"
      >
        <div className="glass-panel px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 shadow-xl border border-white/10">
          <div className="flex items-center text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400" />
            <Star className="w-4 h-4 fill-amber-400" />
          </div>
          <span className="text-xs font-semibold text-white">4.98 Rating</span>
          <span className="text-[11px] text-slate-400">· 4,850+ Completed Roofs</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: heroY, opacity }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Subtle kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Colorado&apos;s Benchmark in Architectural Roofing & Exteriors</span>
        </motion.div>

        {/* Split text headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans max-w-4xl">
          {headlineWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.15 + idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block mr-2.5 sm:mr-3.5 ${
                word.includes("Roofing") || word.includes("Generations")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Animated Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal"
        >
          Triple-laminated architectural shingles, concealed-fastener standing seam metal,
          and forensic storm restoration. Guaranteed against 130&nbsp;mph winds and alpine hail.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(234,88,12,0.45)] hover:shadow-[0_0_45px_rgba(234,88,12,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Get a Free Roof Estimate</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#drone-inspection"
            className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel text-slate-200 hover:text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2.5 border border-white/15"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Interactive 360° Drone Inspection</span>
          </a>
        </motion.div>

        {/* Key Quick Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span>Free 4K Drone Scans</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span>Zero Out-of-Pocket Insurance Claims</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span>Licensed & Insured ($5M Umbrella)</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.a
        href="#trust-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400 group-hover:text-orange-400 transition-colors">
          Scroll to Explore
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2 rounded-full bg-orange-500"
          />
        </div>
      </motion.a>
    </section>
  );
}
