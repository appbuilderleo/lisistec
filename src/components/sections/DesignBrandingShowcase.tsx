"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Palette,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  MessageCircle,
  Eye,
  CheckCircle,
} from "lucide-react";
import { galleryItems, designServicePillars } from "@/lib/galleryData";
import { getWhatsAppUrl } from "@/lib/constants";

export default function DesignBrandingShowcase() {
  // Select top 3 or 4 gallery preview items
  const previewItems = galleryItems.slice(0, 3);

  const pillarIcons = [Sparkles, BookOpen, Layers, Palette];

  return (
    <section
      id="design-branding-section"
      style={{ padding: "96px 0", position: "relative" }}
      aria-labelledby="design-branding-heading"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }} className="relative z-10">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ margin: "0 auto 16px", display: "inline-flex" }}>
            <Palette size={14} style={{ marginRight: "6px" }} />
            Design & Identidade Visual
          </div>
          <h2
            id="design-branding-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Design, Criação de Logo, Manual de Identidade Visual e{" "}
            <span className="text-gradient">Branding</span>
          </h2>
          <p
            style={{
              color: "#8B9CC0",
              fontSize: "1.1rem",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Uma marca forte não é apenas um desenho; é a reputação visual da sua empresa. Criamos identidades marcantes,
            profissionais e memoráveis que geram credibilidade imediata no mercado.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginBottom: "64px",
          }}
        >
          {designServicePillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <div
                key={pillar.id}
                className="glass-card"
                style={{
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: `1px solid rgba(255, 255, 255, 0.08)`,
                }}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: `${pillar.color}15`,
                      border: `1px solid ${pillar.color}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: pillar.color,
                      marginBottom: "20px",
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "#ffffff",
                      marginBottom: "12px",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      color: "#8B9CC0",
                      fontSize: "0.88rem",
                      lineHeight: 1.65,
                      marginBottom: "20px",
                    }}
                  >
                    {pillar.description}
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {pillar.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "0.82rem",
                          color: "#CAD5E8",
                        }}
                      >
                        <CheckCircle size={14} style={{ color: pillar.color, flexShrink: 0, marginTop: "2px" }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* 9:16 Gallery Spotlight Banner & Cards */}
        <div
          className="glass-card"
          style={{
            padding: "48px 32px",
            background: "linear-gradient(135deg, rgba(12, 16, 24, 0.85) 0%, rgba(16, 23, 38, 0.7) 100%)",
            border: "1px solid rgba(0, 242, 254, 0.2)",
            borderRadius: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginBottom: "36px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#00F2FE",
                  marginBottom: "10px",
                }}
              >
                <Sparkles size={14} />
                Galeria de Trabalhos Recentes (Formato 9:16)
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                Amostras dos Nossos <span className="text-gradient">Projetos de Design</span>
              </h3>
              <p style={{ color: "#8B9CC0", fontSize: "0.95rem", marginTop: "8px", maxWidth: "560px" }}>
                Confira prévias de criações de logotipos, manuais corporativos e peças de branding desenvolvidas para os nossos clientes.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/galeria"
                className="btn-primary"
                style={{
                  padding: "12px 24px",
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                id="home-view-gallery-btn"
              >
                <span>Ver Galeria Completa</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 3 cards with 9:16 Aspect Ratio */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {previewItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-xl"
                style={{
                  aspectRatio: "9 / 16",
                  background: "#080b11",
                }}
              >
                {/* 9:16 Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlays */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity"
                  aria-hidden="true"
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md"
                    style={{
                      background: "rgba(7, 9, 14, 0.75)",
                      color: item.color,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    <Sparkles size={12} />
                    {item.category}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
                  <span className="text-[11px] text-slate-400 font-mono tracking-wider uppercase mb-1">
                    {item.subtitle}
                  </span>
                  <h4 className="text-base font-heading font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <Link
                      href="/galeria"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Eye size={14} />
                      <span>Ver na Galeria</span>
                    </Link>

                    <a
                      href={getWhatsAppUrl(`Olá! Gostei do projeto de design "${item.title}" e gostaria de solicitar uma proposta similar para a minha empresa.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
                      title="Solicitar orçamento deste design"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner CTA */}
          <div
            style={{
              marginTop: "32px",
              padding: "20px 24px",
              background: "rgba(0, 242, 254, 0.05)",
              border: "1px solid rgba(0, 242, 254, 0.15)",
              borderRadius: "16px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "rgba(0, 242, 254, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00F2FE",
                  flexShrink: 0,
                }}
              >
                <Palette size={20} />
              </div>
              <div>
                <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem", margin: 0 }}>
                  Precisa de um Logo, Manual de Identidade Visual ou Redesign Completo?
                </p>
                <p style={{ color: "#8B9CC0", fontSize: "0.82rem", margin: 0 }}>
                  A nossa equipa de designers entrega ficheiros 100% vetoriais, prontos para frotas, registo de marca e marketing digital.
                </p>
              </div>
            </div>

            <a
              href={getWhatsAppUrl("Olá! Gostaria de solicitar uma proposta para Criação de Logo e Manual de Identidade Visual com a Lisis.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                fontSize: "0.85rem",
                padding: "10px 20px",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                borderColor: "rgba(37,211,102,0.4)",
                color: "#ffffff",
              }}
            >
              <MessageCircle size={16} />
              Solicitar Orçamento de Design
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
