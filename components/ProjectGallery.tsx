"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, ProjectItem } from "@/config/site";
import { Sparkles, MapPin, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);

  const categories = [
    "All",
    "Architectural Shingle",
    "Standing Seam Metal",
    "Commercial",
    "Storm Restoration",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.category === selectedCategory);

  const handleLightboxNav = (direction: "next" | "prev") => {
    if (!lightboxProject) return;
    const currentIdx = filteredProjects.findIndex((p) => p.id === lightboxProject.id);
    if (direction === "next") {
      const nextIdx = (currentIdx + 1) % filteredProjects.length;
      setLightboxProject(filteredProjects[nextIdx]);
    } else {
      const prevIdx = (currentIdx - 1 + filteredProjects.length) % filteredProjects.length;
      setLightboxProject(filteredProjects[prevIdx]);
    }
  };

  return (
    <section id="projects" className="relative py-24 bg-[#070A0F] border-t border-white/5 noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
              Recent Colorado Roof Installations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              From steep-pitch Boulder estates to commercial contemporary facilities,
              view our master craftsmanship in detail.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="galleryFilterPill"
                    className="absolute inset-0 bg-orange-600 rounded-lg shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxProject(project)}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-xl cursor-pointer aspect-[4/3]"
              >
                {/* Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Location Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-200">
                  <MapPin className="w-3 h-3 text-orange-400" />
                  <span>{project.location}</span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-orange-400 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold group-hover:text-orange-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-1">
                    {project.specs}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxProject && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full rounded-2xl glass-panel bg-[#0B0F17]/95 border border-white/20 shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              {/* Top Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-orange-400 uppercase tracking-widest block">
                    {lightboxProject.category} · {lightboxProject.location}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {lightboxProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setLightboxProject(null)}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image with Nav buttons */}
              <div className="relative aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={lightboxProject.image}
                  alt={lightboxProject.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLightboxNav("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-orange-500 transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLightboxNav("next");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-orange-500 transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Details Footer */}
              <div className="p-5 sm:p-6 bg-[#070A0F] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-slate-400">
                    System Architecture: <span className="text-white font-medium">{lightboxProject.specs}</span>
                  </p>
                  <p className="text-xs text-orange-300 font-medium mt-1">
                    {lightboxProject.highlight}
                  </p>
                </div>
                <a
                  href="#contact"
                  onClick={() => setLightboxProject(null)}
                  className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shrink-0"
                >
                  Request Similar Installation
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
