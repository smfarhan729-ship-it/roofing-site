"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#070A0F] text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated Roof Gable SVG */}
            <svg
              width="90"
              height="60"
              viewBox="0 0 90 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4"
            >
              {/* Outer Roof Pitch */}
              <motion.path
                d="M5 48L45 12L85 48"
                stroke="#EA580C"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {/* Secondary Ridge Line */}
              <motion.path
                d="M20 48L45 26L70 48"
                stroke="#F3F4F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
              />
              {/* Chimney / Peak accent */}
              <motion.path
                d="M60 22V14H67V28"
                stroke="#C25E00"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              />
            </svg>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                {siteConfig.company.name}
              </h2>
              <p className="mt-1 text-xs tracking-widest uppercase text-orange-400 font-medium">
                Architectural Exterior Systems
              </p>
            </motion.div>

            {/* Subtle Loading line */}
            <div className="mt-6 h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut", repeat: 0 }}
                className="h-full w-full bg-gradient-to-r from-orange-600 to-amber-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
