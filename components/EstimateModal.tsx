"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calculator, ShieldCheck, Sparkles, Check, ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EstimateModal({ isOpen, onClose }: EstimateModalProps) {
  const [sqft, setSqft] = useState(3200);
  const [material, setMaterial] = useState<"architectural" | "metal" | "luxury">("architectural");
  const [pitch, setPitch] = useState<"standard" | "steep">("standard");
  const [step, setStep] = useState<"calc" | "contact">("calc");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Approximate calculation logic
  const baseRatePerSqFt = {
    architectural: 5.25,
    metal: 11.5,
    luxury: 8.75,
  }[material];

  const pitchMultiplier = pitch === "steep" ? 1.25 : 1.0;
  const rawCost = sqft * baseRatePerSqFt * pitchMultiplier;
  const minCost = Math.round((rawCost * 0.95) / 100) * 100;
  const maxCost = Math.round((rawCost * 1.08) / 100) * 100;

  const handleLockPricing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setConfirmed(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl rounded-2xl glass-panel bg-[#0B0F17]/95 border border-white/20 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Instant Roof Estimate Calculator</h3>
              <p className="text-xs text-slate-400">Based on Colorado Front Range Master Elite labor rates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white">Estimate Locked In</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              We have reserved your fixed-price estimate bracket of{" "}
              <span className="text-orange-400 font-bold">
                ${minCost.toLocaleString()} – ${maxCost.toLocaleString()}
              </span>
              . Our drone team will call <span className="text-white font-semibold">{phone}</span> to confirm your complimentary 4K flight date.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
            >
              Done
            </button>
          </div>
        ) : step === "calc" ? (
          <div className="space-y-6">
            {/* Square footage slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Approximate Roof / Home Footprint</span>
                <span className="font-mono font-bold text-orange-400 text-sm">
                  {sqft.toLocaleString()} sq. ft.
                </span>
              </div>
              <input
                type="range"
                min="1200"
                max="8000"
                step="100"
                value={sqft}
                onChange={(e) => setSqft(parseInt(e.target.value, 10))}
                className="w-full accent-orange-500 bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1,200 sq.ft. (Cottage)</span>
                <span>4,000 sq.ft. (Suburban)</span>
                <span>8,000 sq.ft. (Estate)</span>
              </div>
            </div>

            {/* Material Grade */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Material Engineering Grade
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMaterial("architectural")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    material === "architectural"
                      ? "bg-orange-500/20 border-orange-500 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <p className="font-bold">Architectural</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">GAF Timberline HDZ</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMaterial("luxury")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    material === "luxury"
                      ? "bg-orange-500/20 border-orange-500 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <p className="font-bold">Luxury Shingle</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">CertainTeed Grand</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMaterial("metal")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    material === "metal"
                      ? "bg-orange-500/20 border-orange-500 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <p className="font-bold">Standing Seam</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">24-Ga Galvalume</p>
                </button>
              </div>
            </div>

            {/* Pitch */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Roof Incline / Pitch
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPitch("standard")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    pitch === "standard"
                      ? "bg-orange-500/20 border-orange-500 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  Standard Pitch (4:12 – 7:12)
                </button>
                <button
                  type="button"
                  onClick={() => setPitch("steep")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    pitch === "steep"
                      ? "bg-orange-500/20 border-orange-500 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  Steep Alpine Slope (8:12+)
                </button>
              </div>
            </div>

            {/* Live Calculation Display Card */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                  Estimated Installed Investment
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">
                  ${minCost.toLocaleString()} – ${maxCost.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  Includes Complete Tear-off & 50-Year Golden Pledge
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep("contact")}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <span>Lock In This Pricing & Request Drone Scan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Step 2: Contact Info to reserve rate */
          <form onSubmit={handleLockPricing} className="space-y-4">
            <p className="text-xs text-slate-300">
              Enter your contact details to lock in this estimate bracket for 60 days and schedule your free drone flight.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Phone Number (For inspection scheduling)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(303) 555-0192"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep("calc")}
                className="w-1/3 py-3 rounded-xl bg-white/5 text-slate-400 text-xs font-semibold hover:bg-white/10"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg"
              >
                Confirm & Lock Estimate
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
