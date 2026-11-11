"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Architectural Roof Replacement",
    preferredTime: "Morning (8:00 AM - 12:00 PM)",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name";
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Please enter your property address or zip code";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real server-side dispatch
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ea580c", "#f97316", "#fbbf24", "#ffffff"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#070A0F] border-t border-white/5 noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dramatic CTA Band */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 mb-16 bg-gradient-to-r from-orange-950/40 via-amber-950/20 to-slate-900 border border-orange-500/30 shadow-[0_0_50px_rgba(234,88,12,0.15)] text-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary 4K Drone Inspection & Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
              Protect Your Estate Under a Master-Engineered Roof
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Schedule your sub-millimeter drone scan today. No obligation, fixed-price estimate,
              and comprehensive forensic storm impact report within 24 hours.
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <a
                href={`tel:${siteConfig.company.phone}`}
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call {siteConfig.company.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.company.whatsappNumber}?text=Hello%20Apex%20Ridge%2C%20I%20would%20like%20to%20request%20a%20roof%20inspection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl glass-panel text-emerald-400 hover:text-white hover:bg-emerald-600/20 border border-emerald-500/30 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form and Contact Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Accreditations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Executive Concierge & Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you require forensic insurance documentation for severe hail or an architectural consultation on standing seam copper, our master specialists are available 6 days a week.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Direct Telephone</span>
                    <a href={`tel:${siteConfig.company.phone}`} className="font-semibold text-white hover:text-orange-400 transition-colors">
                      {siteConfig.company.phoneDisplay} ({siteConfig.company.phone})
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Direct Email</span>
                    <a href={`mailto:${siteConfig.company.email}`} className="font-semibold text-white hover:text-orange-400 transition-colors">
                      {siteConfig.company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Headquarters & Design Studio</span>
                    <p className="font-semibold text-white">
                      {siteConfig.company.address}, {siteConfig.company.city} {siteConfig.company.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Inspection Hours</span>
                    <p className="font-semibold text-white">
                      Monday – Saturday: 7:00 AM – 7:00 PM MST
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
                <p>Licensed & Bonded: <span className="text-slate-200">{siteConfig.company.licenseNumber}</span></p>
                <p>Insured: <span className="text-slate-200">{siteConfig.company.insuredAmount}</span></p>
              </div>
            </div>
          </div>

          {/* Right Column: Glass Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl glass-panel border border-white/15 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Inspection Request Confirmed
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-8">
                      Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our senior roofing engineer will review your property records and reach out at{" "}
                      <span className="text-orange-400 font-semibold">{formData.phone}</span> during your preferred time window.
                    </p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          serviceType: "Architectural Roof Replacement",
                          preferredTime: "Morning (8:00 AM - 12:00 PM)",
                          address: "",
                          message: "",
                        });
                      }}
                      className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        Schedule Autonomous Drone Scan & Quote
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Zero sales pressure. Itemized line-item scope delivered within 24 hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Thomas Vance"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Direct Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(303) 555-0192"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="thomas@estate.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Property Address */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Property Address or Zip *
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="e.g. 1420 Boulder Creek Way"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        {errors.address && (
                          <p className="text-red-400 text-[11px] mt-1">{errors.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Service Type */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Primary Service Required
                        </label>
                        <select
                          value={formData.serviceType}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        >
                          <option value="Architectural Roof Replacement">Architectural Roof Replacement</option>
                          <option value="Standing Seam Metal Roof">Custom Standing Seam Metal</option>
                          <option value="Drone AI Roof Inspection">Drone AI & Thermal Inspection</option>
                          <option value="Storm & Hail Insurance Claim">Storm & Hail Damage Insurance Claim</option>
                          <option value="Commercial Flat Roof System">Commercial Flat Roof System (TPO/EPDM)</option>
                          <option value="Seamless Gutters & Snow Retention">Architectural Gutters & Snow Guards</option>
                        </select>
                      </div>

                      {/* Preferred Contact Time */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Preferred Contact Window
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        >
                          <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                          <option value="Afternoon (12:00 PM - 5:00 PM)">Afternoon (12:00 PM - 5:00 PM)</option>
                          <option value="Evening (5:00 PM - 7:30 PM)">Evening (5:00 PM - 7:30 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message / Notes */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Specific Project Details or Known Damage (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your roof age, recent hail storm dates, or material preferences..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.65)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Dispatching Drone Inspection Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Free Inspection Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-400">
                      Your privacy is protected. No spam, guaranteed fixed-price estimate with 50-year warranty.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
