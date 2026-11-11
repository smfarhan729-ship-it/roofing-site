"use client";

import { useState, useCallback } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ImageSequenceHero } from "@/components/ImageSequenceHero";
import { Navbar } from "@/components/Navbar";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { ProcessStorytelling } from "@/components/ProcessStorytelling";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ProjectGallery } from "@/components/ProjectGallery";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { EstimateModal } from "@/components/EstimateModal";

export default function Home() {
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setAnimationComplete(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#070A0F] text-[#F3F4F6] selection:bg-orange-600 selection:text-white">
      {/* Visual & interaction foundations */}
      <CustomCursor />
      {animationComplete && <ScrollProgress />}

      {/* 1. HERO: Full-Screen Image-Sequence Scroll Animation (TOP PRIORITY - Covers 100vw x 100dvh) */}
      <ImageSequenceHero
        onAnimationComplete={handleAnimationComplete}
        onOpenQuoteModal={() => setEstimateModalOpen(true)}
        isUnlocked={animationComplete}
      />

      {/* 2. Sticky Navbar - Revealed & active once hero sequence completes */}
      {animationComplete && (
        <Navbar onOpenQuoteModal={() => setEstimateModalOpen(true)} />
      )}

      {/* 3. Gated Content Sections - Stay hidden & non-interactive until hero completes */}
      <div
        className={`transition-all duration-1000 ease-out ${
          animationComplete
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Trust bar & Marquee */}
        <TrustBar />

        {/* Bento Grid Services with 3D tilt */}
        <Services />

        {/* Storytelling Process with progressive deliverables */}
        <ProcessStorytelling />

        {/* Before / After Draggable Comparison */}
        <BeforeAfter />

        {/* Architectural Project Gallery with layout filter and lightbox */}
        <ProjectGallery />

        {/* Why Choose Us & Standards */}
        <WhyChooseUs />

        {/* Testimonials draggable carousel */}
        <Testimonials />

        {/* FAQ Smooth Accordion */}
        <FaqSection />

        {/* Contact & Lead Capture Form with WhatsApp and Call direct */}
        <ContactSection />

        {/* Cinematic Brand Footer */}
        <Footer />
      </div>

      {/* Instant Estimate Calculator Modal */}
      <EstimateModal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
      />
    </main>
  );
}
