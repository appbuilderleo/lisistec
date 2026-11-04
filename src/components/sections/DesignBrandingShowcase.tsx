"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Palette,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { galleryItems, designServicePillars } from "@/lib/galleryData";
import { getWhatsAppUrl } from "@/lib/constants";

export default function DesignBrandingShowcase() {
  const previewItems = galleryItems.slice(0, 4);
  const pillarIcons = [Sparkles, BookOpen, Layers, Palette];

  return (
    <section
      id="design-branding-section"
      className="py-24 lg:py-28 relative border-t border-border"
      aria-labelledby="design-branding-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Architectural Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="section-tag mb-4">
              03 // Design, Logotipos & Brandbooks
            </div>
            <h2
              id="design-branding-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-700 text-text leading-tight"
            >
              Identidade visual construída com{" "}
              <span className="text-gradient">precisão geométrica.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              Uma marca institucional sólida exige mais do que um símbolo: exige
              normas técnicas de reprodução, paleta cromática oficial,
              estacionário e aplicação impecável em viaturas, fardas e suportes
              digitais.
            </p>
          </div>
        </div>

        {/* 4 Pillars Ledger */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {designServicePillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <div
                key={pillar.id}
                className="arch-card p-6 flex flex-col justify-between bg-bg-surface"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="service-icon w-11 h-11">
                      <Icon size={20} />
                    </div>
                    <span className="mono-index text-xs">
                      PILAR // {pillar.code}
                    </span>
                  </div>

                  <h3 className="font-heading font-700 text-lg text-text mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-5">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2 pt-4 border-t border-border">
                    {pillar.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-text-secondary"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-primary shrink-0 mt-0.5"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* 9:16 Vertical Lookbook Container */}
        <div className="arch-card p-6 sm:p-10 bg-bg-surface">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="mono-index block mb-2">
                PORTFÓLIO VISUAL // FORMATO VERTICAL 9:16
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-700 text-text">
                Amostras de Projectos de{" "}
                <span className="text-gradient">Branding & Identidade</span>
              </h3>
              <p className="text-text-muted text-sm mt-2 max-w-xl">
                Explore criações de logotipos vetoriais, manuais de identidade
                visual, grelhas de construção e aplicações em frotas comerciais.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/galeria"
                className="btn-primary text-sm py-2.5 px-5"
                id="home-view-gallery-btn"
              >
                <span>Abrir Galeria Completa (9:16)</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={getWhatsAppUrl(
                  "Olá! Gostaria de solicitar uma proposta para Criação de Logotipo e Manual de Identidade Visual com a Lisis."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2.5 px-5"
              >
                <span>Orçamento de Branding</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* 4 Cards with 9:16 Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewItems.map((item) => (
              <article
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-300 shadow-card"
                style={{
                  aspectRatio: "9 / 16",
                  background: "#06101E",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Legibility Scrim Over Image */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-[#040D1A]/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"
                  aria-hidden="true"
                />

                {/* Top Category Pill */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-600 backdrop-blur-md bg-[#040D1A]/80 text-[#00D4AA] border border-[#00D4AA]/35">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
                  <span className="text-[10px] text-slate-300 font-mono tracking-wider uppercase mb-1">
                    {item.subtitle}
                  </span>
                  <h4 className="text-base font-heading font-700 text-white mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15">
                    <Link
                      href="/galeria"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-600 text-[#00D4AA] hover:underline"
                    >
                      <Eye size={13} />
                      <span>Inspecionar</span>
                    </Link>

                    <a
                      href={getWhatsAppUrl(
                        `Olá! Gostei do projecto de design "${item.title}" e gostaria de solicitar uma proposta semelhante.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-heading font-600 bg-white/15 text-white hover:bg-[#00D4AA] hover:text-[#040D1A] transition-colors"
                      title="Solicitar orçamento deste estilo"
                    >
                      <span>Pedir igual</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
