"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site";
import { CheckCircle2, Clock, FileCheck, ArrowRight, Sparkles } from "lucide-react";

export function ProcessStorytelling() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const steps = siteConfig.processSteps;
  const currentStep = steps[activeStepIdx];

  const stepVisuals = [
    "/frame_0001.jpg",
    "/assets/images/commercial_roof_showcase_1794318232306.jpg",
    "/assets/images/roof_before_damage_1794318109874.jpg",
    "/assets/images/craftsman_crew_install_1794318293723.jpg",
    "/assets/images/roof_after_restoration_1794318168047.jpg",
  ];

  return (
    <section id="process" className="relative py-24 bg-[#070A0F] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Execution Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
            Precision From First Flight to Final Sign-Off
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            We eliminate the chaos and uncertainty of traditional contractors. Every project follows a strict 5-stage engineering blueprint.
          </p>
        </div>

        {/* Process Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-6 space-y-4 relative">
            {/* Background connecting line */}
            <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-white/10 hidden sm:block pointer-events-none" />

            {steps.map((step, idx) => {
              const isActive = idx === activeStepIdx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-white/[0.07] border-orange-500/40 shadow-[0_10px_30px_rgba(234,88,12,0.15)]"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number Bubble */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-all ${
                        isActive
                          ? "bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-[0_0_15px_#ea580c]"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">
                          {step.subtitle}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.estimatedTime}
                        </span>
                      </div>
                      <h3
                        className={`text-base sm:text-lg font-bold mt-1 transition-colors ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Step Detail Showcase & Visual Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Image Banner */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-slate-900 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStepIdx}
                    src={stepVisuals[activeStepIdx]}
                    alt={currentStep.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-orange-400">
                      Active Stage
                    </span>
                    <h4 className="text-sm sm:text-base font-bold">{currentStep.title}</h4>
                  </div>
                  <span className="text-xs font-mono bg-black/60 px-2.5 py-1 rounded-md border border-white/20">
                    Step {currentStep.step} of 05
                  </span>
                </div>
              </div>

              {/* In-Depth Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {currentStep.description}
              </p>

              {/* Verified Deliverables */}
              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Guaranteed Deliverables for this Phase
                </div>
                {currentStep.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Progress step navigators */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  disabled={activeStepIdx === 0}
                  onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                >
                  Previous Step
                </button>
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStepIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeStepIdx ? "w-6 bg-orange-500" : "w-2 bg-white/20"
                      }`}
                      aria-label={`Jump to step ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  disabled={activeStepIdx === steps.length - 1}
                  onClick={() => setActiveStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
