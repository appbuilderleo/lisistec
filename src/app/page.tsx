import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import SolutionsPreview from "@/components/sections/SolutionsPreview";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Lisis Tecnologias e Serviços | Smart Solutions. Real Growth.",
  description:
    "Transformamos ideias em soluções digitais. Desenvolvimento de software, aplicações móveis, sistemas de gestão e consultoria em TI em Moçambique.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <SolutionsPreview />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
