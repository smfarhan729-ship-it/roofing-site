"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, ServiceItem } from "@/config/site";
import {
  ShieldCheck,
  Layers,
  Camera,
  CloudLightning,
  Building2,
  Droplets,
  ArrowRight,
  Check,
  X,
  Sparkles,
} from "lucide-react";

// Icon mapping helper
const ICONS: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-orange-400" />,
  Layers: <Layers className="w-5 h-5 text-amber-400" />,
  Camera: <Camera className="w-5 h-5 text-orange-400" />,
  CloudLightning: <CloudLightning className="w-5 h-5 text-amber-400" />,
  Building2: <Building2 className="w-5 h-5 text-orange-400" />,
  Droplets: <Droplets className="w-5 h-5 text-amber-400" />,
};

interface ServiceCardProps {
  service: ServiceItem;
  spanClass?: string;
  onSelect: (service: ServiceItem) => void;
}

function ServiceCard({ service, spanClass = "", onSelect }: ServiceCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl overflow-hidden glass-panel glass-panel-hover p-6 sm:p-8 flex flex-col justify-between cursor-pointer border border-white/10 ${spanClass}`}
      onClick={() => onSelect(service)}
    >
      {/* Background image preview if large span */}
      {service.image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity duration-500 scale-100 group-hover:scale-105 pointer-events-none"
          style={{ backgroundImage: `url(${service.image})` }}
        />
      )}

      {/* Subtle top glare */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300">
            {ICONS[service.icon] || <ShieldCheck className="w-5 h-5 text-orange-400" />}
          </div>
          <span className="text-[11px] font-mono text-slate-400 group-hover:text-orange-400 transition-colors">
            {service.recommendedPitch}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
          {service.title}
        </h3>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Tags with clean unboxed styling */}
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-400">
          {service.tags.map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-orange-500/80" />
              {tag}
              {i < service.tags.length - 1 && <span className="text-white/20 ml-1">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA trigger */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-semibold text-orange-400 group-hover:underline flex items-center gap-1">
          Explore System Specifications
        </span>
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-orange-500 transition-all">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="relative py-24 bg-[#070A0F] noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
            Engineered Roofing & Exterior Disciplines
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Every home and facility possesses distinct pitch, alpine wind shears, and architectural lines.
            We curate engineered roofing systems designed to withstand Colorado&apos;s harshest seasonal cycles.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, idx) => {
            // First two cards span nicely for bento visual rhythm
            const spanClass =
              idx === 0
                ? "md:col-span-2 lg:col-span-2"
                : idx === 1
                ? "md:col-span-1 lg:col-span-1"
                : "col-span-1";

            return (
              <ServiceCard
                key={service.id}
                service={service}
                spanClass={spanClass}
                onSelect={(s) => setSelectedService(s)}
              />
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl glass-panel bg-[#0B0F17]/95 border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    {ICONS[selectedService.icon]}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {selectedService.title}
                    </h3>
                    <p className="text-xs text-orange-400 font-medium">
                      Pitch Rating: {selectedService.recommendedPitch}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedService.fullDesc}
              </p>

              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Engineered Specifications & Inclusions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 text-xs text-slate-200 border border-white/5"
                    >
                      <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Backed by <span className="text-white font-semibold">50-Year Non-Prorated</span> Manufacturer Coverage
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs shadow-md text-center"
                >
                  Request Quote for this System
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
