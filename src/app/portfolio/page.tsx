import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import PortfolioCatalog from "@/components/sections/PortfolioCatalog";

export const metadata: Metadata = {
  title: "Portfólio | +15 Projectos Entregues em Moçambique",
  description:
    "Conheça os mais de 15 projectos entregues pela Lisis Tecnologias: Governo de Moçambique, UEM, CEMOQE-MOÇ, AMEC, Cesta Cheia Supermercado, CCN Consultores, ML Services, STOKA e mais.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section
        className="py-16 lg:py-24 bg-dots border-b border-border"
        aria-labelledby="portfolio-page-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">
              Portfólio Oficial // 15+ Projectos Entregues
            </div>
            <h1
              id="portfolio-page-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-text leading-tight mb-6"
            >
              Obras digitais em operação{" "}
              <span className="text-gradient">por todo o país.</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Mais de 7 anos a desenvolver portais governamentais, sistemas de
              gestão empresarial, aplicações comerciais e identidades visuais
              para instituições públicas e privadas em Moçambique.
            </p>
          </div>
        </div>
      </section>

      <PortfolioCatalog />

      {/* Bottom CTA */}
      <section className="py-12" aria-label="Iniciar projecto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="arch-card p-8 sm:p-12 bg-bg-surface text-center">
            <span className="mono-index block mb-3">
              NOVO PROJECTO // ORÇAMENTO TÉCNICO
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-700 text-text mb-4">
              Pronto para iniciar o próximo projecto da sua organização?
            </h2>
            <p className="text-text-muted max-w-xl mx-auto mb-6 text-sm sm:text-base">
              Apresente-nos os seus requisitos e receba um plano de arquitectura
              e proposta comercial detalhada.
            </p>
            <a
              href={getWhatsAppUrl(
                "Olá! Estive a consultar o portfólio da Lisis Tecnologias e gostaria de solicitar uma proposta."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="portfolio-cta-btn"
            >
              <span>Solicitar Proposta no WhatsApp</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
