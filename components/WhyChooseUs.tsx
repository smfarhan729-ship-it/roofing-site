"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/config/site";
import {
  Award,
  ShieldAlert,
  Eye,
  Sparkles,
  FileCheck,
  Lock,
} from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  Award: <Award className="w-6 h-6 text-orange-400" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-amber-400" />,
  Eye: <Eye className="w-6 h-6 text-orange-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-400" />,
  FileCheck: <FileCheck className="w-6 h-6 text-orange-400" />,
  Lock: <Lock className="w-6 h-6 text-amber-400" />,
};

export function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-[#070A0F] border-t border-white/5 noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Apex Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
            Why Discerning Homeowners Choose Apex Ridge
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Roofing is the most critical protective envelope of your estate.
            We uphold standards that standard volume contractors cannot match.
          </p>
        </div>

        {/* Feature Grid with Alternating Micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.whyChooseUs.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 rounded-2xl glass-panel glass-panel-hover border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300">
                  {ICONS[feature.icon] || <Award className="w-6 h-6 text-orange-400" />}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Standard 0{idx + 1}</span>
                <span className="text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Verified Protocol →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
