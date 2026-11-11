"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

export function Testimonials() {
  const testimonials = siteConfig.testimonials;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="reviews" className="relative py-24 bg-[#070A0F] noise-overlay border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
              Trusted by Colorado Architects & Estate Owners
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Over 4,850 homeowners, architects, and estate managers have entrusted us with their exterior protection.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => {
              // Show two cards at a time on desktop, matching currentIdx
              const isVisible =
                idx === currentIdx || idx === (currentIdx + 1) % testimonials.length;

              return (
                <div
                  key={t.id}
                  className={`p-8 rounded-2xl glass-panel border border-white/10 shadow-2xl relative flex flex-col justify-between transition-all duration-500 ${
                    isVisible ? "opacity-100 scale-100" : "hidden md:hidden"
                  }`}
                >
                  {/* Subtle watermarked quote icon */}
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 pointer-events-none" />

                  <div>
                    {/* Stars & Verified */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Homeowner</span>
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Client Info Footer */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        <p className="text-xs text-slate-400">{t.role} · {t.neighborhood}</p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-[11px] font-mono text-orange-400/90 text-right">
                      {t.projectType}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIdx ? "w-8 bg-orange-500" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
