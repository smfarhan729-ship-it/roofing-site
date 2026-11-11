"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { siteConfig, StatItem } from "@/config/site";
import { CheckCircle2, Shield } from "lucide-react";

function AnimatedCounter({ item }: { item: StatItem }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = item.value;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // easeOutExpo curve
      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames));
      const currentVal = start + (end - start) * progress;

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(currentVal);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, item.value]);

  const formatted =
    item.decimals && item.decimals > 0
      ? count.toFixed(item.decimals)
      : Math.floor(count).toLocaleString();

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sans tabular-nums tracking-tight">
        {item.prefix}
        {formatted}
        <span className="text-orange-400">{item.suffix}</span>
      </div>
      <p className="mt-1 text-xs sm:text-sm font-medium text-slate-400">
        {item.label}
      </p>
    </div>
  );
}

export function TrustBar() {
  const logos = [...siteConfig.trustLogos, ...siteConfig.trustLogos];

  return (
    <section id="trust-bar" className="relative py-16 bg-[#070A0F] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Animated Count-up Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10 pt-4">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className={`${idx !== 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
              <AnimatedCounter item={stat} />
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee of Certifications & Partners */}
      <div className="relative w-full overflow-hidden border-t border-white/5 pt-8">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-8 sm:px-12 py-3 mx-2 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300 whitespace-nowrap shrink-0 group hover:border-orange-500/30 hover:bg-white/[0.04] transition-all"
            >
              <Shield className="w-4 h-4 text-orange-400 shrink-0" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  {logo.name}
                </span>
                <span className="text-[11px] text-slate-400 block font-normal">
                  {logo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
