"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowRight, Phone } from "lucide-react";

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Magnetic button effect state
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > 300 && diff > 10) {
      setIsHidden(true); // scrolling down
    } else if (diff < -8) {
      setIsHidden(false); // scrolling up
    }
    lastScrollY.current = latest;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnOffset({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const navLinks = [
    { label: "3D Inspection", href: "#drone-inspection" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Before & After", href: "#before-after" },
    { label: "Projects", href: "#projects" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#070A0F]/85 backdrop-blur-md border-b border-white/10 shadow-lg py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, single line */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(234,88,12,0.4)] group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12L12 3L21 12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10V20H19V10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-sans font-extrabold tracking-tight">
              {siteConfig.company.name}
            </span>
          </a>

          {/* Zone 2: 4-5 concise nav links, single line with animated hover underline */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors py-1 group whitespace-nowrap shrink-0"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action (Magnetic Button) */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${siteConfig.company.phone}`}
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>{siteConfig.company.phoneDisplay}</span>
            </a>

            <motion.button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: btnOffset.x, y: btnOffset.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={onOpenQuoteModal}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(234,88,12,0.35)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] transition-shadow duration-300 whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Get a Free Quote
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen animated mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#070A0F]/95 flex flex-col justify-between p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">
                {siteConfig.company.name}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="text-2xl font-bold text-slate-200 hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-center shadow-lg"
              >
                Request Free Drone Inspection & Quote
              </button>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{siteConfig.company.phoneDisplay}</span>
                <span>{siteConfig.company.city}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
