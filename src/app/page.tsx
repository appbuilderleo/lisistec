import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import DesignBrandingShowcase from "@/components/sections/DesignBrandingShowcase";
import SolutionsPreview from "@/components/sections/SolutionsPreview";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Lisis Tecnologias e Serviços | Engenharia de Software, Sistemas e Branding em Moçambique",
  description:
    "Mais de 7 anos de experiência e mais de 15 projectos entregues em Moçambique. Desenvolvimento de software, portais institucionais, sistemas ERP/POS/CRM e identidade visual corporativa.",
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
      <DesignBrandingShowcase />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
