import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesShowcase from "@/components/home/FeaturesShowcase";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import JoinGuideSection from "@/components/home/JoinGuideSection";
import RanksPreviewSection from "@/components/home/RanksPreviewSection";
import NewsPreviewSection from "@/components/home/NewsPreviewSection";
import FAQSection from "@/components/home/FAQSection";
import ParticleBackground from "@/components/shared/ParticleBackground";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <HeroSection />
      <StatsSection />
      <FeaturesShowcase />
      <FeaturesSection />
      <TestimonialsSection />
      <JoinGuideSection />
      <RanksPreviewSection />
      <NewsPreviewSection />
      <FAQSection />
    </div>
  );
}
