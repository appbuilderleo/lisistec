"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Layers,
  ExternalLink,
} from "lucide-react";
import { getWhatsAppUrl, TRUSTED_CLIENTS } from "@/lib/constants";

const heroShowcases = [
  {
    id: "facim",
    code: "SYS // 01",
    title: "Portal Oficial Maputo FACIM",
    client: "Sector Público & Investimento Provincial",
    image: "/projects/facim-hero.png",
    url: "https://maputofacim-kappa.vercel.app/en",
    metrics: "Bilingue PT/EN · Alta Disponibilidade",
    tags: ["Next.js", "Portal Governamental", "Investimento"],
  },
  {
    id: "ccn",
    code: "SYS // 02",
    title: "Ecossistema Web & CRM CCN Consultores",
    client: "CCN Consultores Moçambique",
    image: "/projects/ccn-hero.png",
    url: "https://ccnconsultores.com/",
    metrics: "Portal Corporativo + CRM Integrado",
    tags: ["CRM Comercial", "Gestão de Propostas", "Cloud"],
  },
  {
    id: "stoka",
    code: "SYS // 03",
    title: "STOKA · Ponto de Venda & Gestão de Stock",
    client: "Comércio & Supermercados em Moçambique",
    image: "/projects/stoka-hero.png",
    url: "https://stoka-three.vercel.app/",
    metrics: "Faturação Rápida · Multi-Caixa",
    tags: ["POS / PDV", "Controlo de Stock", "Retalho"],
  },
  {
    id: "frutas",
    code: "SYS // 04",
    title: "Frutas · Distribuição & E-Commerce Alimentar",
    client: "Agronegócio, Supermercados & Restauração",
    image: "/projects/frutas-hero.png",
    url: "https://frutas-zeta.vercel.app/",
    metrics: "Catálogo Interactivo · Pedidos WhatsApp",
    tags: ["E-Commerce", "Logística Refrigerada", "Catálogo Digital"],
  },
  {
    id: "vilaflor",
    code: "SYS // 05",
    title: "Vila Flor · Casa de Praia em Ponta do Ouro",
    client: "Hospitalidade & Turismo de Luxo em Moçambique",
    image: "/projects/vilaflor-hero.png",
    url: "https://vilaflor.vercel.app/",
    metrics: "Airbnb Superhost · Reserva & Galeria",
    tags: ["Turismo & Hotelaria", "Ponta do Ouro", "Alojamento"],
  },
  {
    id: "livehotel",
    code: "SYS // 06",
    title: "LIVE HOTEL · Santuário Costeiro & Resort",
    client: "Hospitalidade & Resorts de Alto Padrão",
    image: "/projects/livehotel-hero.png",
    url: "https://livehotel.vercel.app/",
    metrics: "Experiência Cinematográfica · Oceanfront",
    tags: ["Hotelaria de Luxo", "Resort", "Motor de Reservas"],
  },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = heroShowcases[activeTab];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid pt-28 pb-16 lg:pt-32 lg:pb-24"
      aria-label="Secção principal"
      id="hero"
    >
      {/* Architectural SVG Vector Layer (Hand-drawn blueprint lines) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M0 180 H1440 M0 740 H1440 M260 0 V900 M1180 0 V900"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle cx="260" cy="180" r="4" fill="var(--primary)" />
        <circle cx="1180" cy="180" r="4" fill="var(--primary)" />
        <circle cx="260" cy="740" r="4" fill="var(--accent)" />
        <circle cx="1180" cy="740" r="4" fill="var(--accent)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Asymmetric Two-Column Stage */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Authority (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <span
                className="w-2 h-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-600 uppercase tracking-wider text-primary">
                Maputo, Moçambique · +7 Anos de Experiência
              </span>
            </div>

            <h1 className="hero-headline">
              Engenharia de software, sistemas e{" "}
              <span className="text-gradient">identidade visual</span> para
              instituições que lideram.
            </h1>

            <p className="hero-sub">
              Com mais de 7 anos no mercado moçambicano e mais de 15 projectos
              entregues, desenvolvemos portais governamentais, plataformas
              académicas, sistemas ERP e POS, aplicações móveis e branding
              corporativo de alta precisão.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl(
                  "Olá! Gostaria de solicitar uma proposta técnica com a Lisis Tecnologias e Serviços."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base py-3.5 px-7"
                id="hero-proposal-btn"
              >
                <span>Solicitar Proposta Técnica</span>
                <ArrowRight size={18} />
              </a>
              <Link
                href="/portfolio"
                className="btn-secondary text-base py-3.5 px-6"
                id="hero-portfolio-btn"
              >
                <span>Ver Projectos Entregues</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* Key Quantitative Proof Row */}
            <div className="pt-6 border-t border-border grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
              <div>
                <span className="font-heading font-700 text-2xl sm:text-3xl text-primary block">
                  7+ Anos
                </span>
                <span className="text-xs text-text-muted mt-0.5 block">
                  Experiência comprovada
                </span>
              </div>
              <div>
                <span className="font-heading font-700 text-2xl sm:text-3xl text-text block">
                  15+ Projectos
                </span>
                <span className="text-xs text-text-muted mt-0.5 block">
                  Entregues e em produção
                </span>
              </div>
              <div>
                <span className="font-heading font-700 text-2xl sm:text-3xl text-text block">
                  8+ Entidades
                </span>
                <span className="text-xs text-text-muted mt-0.5 block">
                  Governo, Academia & Privado
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live System Stage (5 cols) */}
          <div className="lg:col-span-5">
            <div className="arch-card p-4 sm:p-5 bg-bg-surface">
              {/* Top Selector Tabs */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-text-muted">
                    PRODUÇÃO // LISIS.MZ
                  </span>
                </div>
                <div
                  className="flex items-center gap-1"
                  role="tablist"
                  aria-label="Sistemas em destaque"
                >
                  {heroShowcases.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === idx}
                      onClick={() => setActiveTab(idx)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-600 transition-all cursor-pointer ${
                        activeTab === idx
                          ? "bg-primary text-[#040D1A]"
                          : "bg-bg-elevated text-text-muted hover:text-text"
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real Screenshot Frame */}
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-xl overflow-hidden border border-border aspect-[16/10] bg-[#06101E]"
                title={`Abrir ${current.title} em nova aba`}
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/85 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#040D1A]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-[#00D4AA] font-600">
                  {current.code} · ONLINE
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-white/90 bg-[#040D1A]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {current.metrics}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-heading font-600 text-[#040D1A] bg-[#00D4AA] px-3 py-1 rounded-md shadow-md">
                    Visitar <ExternalLink size={12} />
                  </span>
                </div>
              </a>

              {/* Active System Metadata */}
              <div className="mt-4 pt-3 border-t border-border flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      {current.client}
                    </p>
                    <h2 className="font-heading font-700 text-base sm:text-lg text-text mt-0.5">
                      {current.title}
                    </h2>
                  </div>
                  <Link
                    href="/solucoes"
                    className="text-xs font-mono text-text-muted hover:text-primary inline-flex items-center gap-1 shrink-0 mt-1"
                  >
                    Ver ficha <ArrowUpRight size={13} />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-bg-elevated border border-border text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Trust Ledger (8 Real Clients) */}
        <div
          className="mt-16 lg:mt-20 pt-10 border-t border-border"
          aria-labelledby="trusted-clients-heading"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-primary shrink-0" />
              <h2
                id="trusted-clients-heading"
                className="font-mono text-xs uppercase tracking-widest text-text-secondary font-600"
              >
                Instituições e Empresas com as quais já prestámos serviços
              </h2>
            </div>
            <span className="font-mono text-xs text-text-muted">
              Sector Público · Ensino Superior · Consultoria · Retalho
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TRUSTED_CLIENTS.map((client) => (
              <div
                key={client.id}
                className="p-4 rounded-xl bg-bg-surface/90 border border-border hover:border-primary/40 transition-all flex flex-col justify-between gap-2 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-600 px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    {client.badge}
                  </span>
                  <Building2
                    size={14}
                    className="text-text-faint group-hover:text-primary transition-colors"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-700 text-sm text-text leading-snug">
                    {client.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">
                    {client.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
