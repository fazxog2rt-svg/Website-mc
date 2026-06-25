import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import RanksPreviewSection from "@/components/home/RanksPreviewSection";
import FAQSection from "@/components/home/FAQSection";
import NewsPreviewSection from "@/components/home/NewsPreviewSection";
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
      <FeaturesSection />
      <StatisticsSection />
      <RanksPreviewSection />
      <NewsPreviewSection />
      <FAQSection />
    </div>
  );
}
