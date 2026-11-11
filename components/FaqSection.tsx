"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = siteConfig.faqs;

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#070A0F] border-t border-white/5 noise-overlay">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clarity & Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Everything you need to know about architectural materials, insurance advocacy, and lifetime guarantees.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono text-orange-400 shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-orange-400" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                        <div className="mt-3 flex items-center gap-2 text-xs text-orange-400/90 font-mono">
                          <span>Category: {faq.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Have a specific question about your roof slope?</h4>
            <p className="text-xs text-slate-400">Speak directly with our senior architectural roofing specialist.</p>
          </div>
          <a
            href={`tel:${siteConfig.company.phone}`}
            className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shrink-0"
          >
            Call {siteConfig.company.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
