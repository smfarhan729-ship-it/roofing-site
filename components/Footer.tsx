"use client";

import { siteConfig } from "@/config/site";
import { ArrowUp, Phone, Mail, MapPin, Shield } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#05070B] text-white pt-20 pb-12 border-t border-white/10 overflow-hidden noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12L12 3L21 12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 10V20H19V10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                {siteConfig.company.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.company.tagline} {siteConfig.company.subtagline}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-orange-400 shrink-0" />
              <span>GAF Master Elite® · License #{siteConfig.company.licenseNumber}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Architectural Shingles</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Standing Seam Metal</a></li>
              <li><a href="#drone-inspection" className="hover:text-orange-400 transition-colors">Drone Photogrammetry</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Storm Recovery</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Commercial TPO/EPDM</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Seamless Copper Gutters</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Service Regions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>Denver & Cherry Creek</li>
              <li>Boulder & Foothills</li>
              <li>Highlands Ranch & Castle Rock</li>
              <li>Vail & Alpine Corridors</li>
              <li>Evergreen & Golden</li>
              <li>Fort Collins & Northern Front Range</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Contact Concierge
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <a href={`tel:${siteConfig.company.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <a href={`mailto:${siteConfig.company.email}`} className="hover:text-white transition-colors">
                  {siteConfig.company.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>{siteConfig.company.address}, {siteConfig.company.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized Cinematic Brand Text Reveal */}
        <div className="py-12 border-b border-white/5 select-none overflow-hidden">
          <p className="text-[12vw] font-black tracking-tighter text-white/[0.04] leading-none text-center whitespace-nowrap">
            APEX RIDGE ROOFING
          </p>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {siteConfig.company.legalName}. All rights reserved.
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
