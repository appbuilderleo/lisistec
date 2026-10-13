"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  Search,
  Eye,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Layers,
  BookOpen,
} from "lucide-react";
import { galleryItems, GalleryItem } from "@/lib/galleryData";
import { getWhatsAppUrl } from "@/lib/constants";

const categories = [
  "Todos",
  "Criação de Logo",
  "Manual de Identidade Visual",
  "Branding",
  "Design Gráfico",
];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "Todos"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const currentIndex = activeModalItem
    ? filteredItems.findIndex((it) => it.id === activeModalItem.id)
    : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setActiveModalItem(filteredItems[currentIndex - 1]);
    } else {
      setActiveModalItem(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredItems.length - 1) {
      setActiveModalItem(filteredItems[currentIndex + 1]);
    } else {
      setActiveModalItem(filteredItems[0]);
    }
  };

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "96px", position: "relative" }}>
      {/* Background ambient orbs */}
      <div
        className="absolute top-28 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }} className="relative z-10">
        {/* Page Hero Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="section-tag" style={{ margin: "0 auto 16px", display: "inline-flex" }}>
            <Palette size={14} style={{ marginRight: "6px" }} />
            Galeria de Trabalhos & Portfólio Visual
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            Design, Criação de Logo &{" "}
            <span className="text-gradient">Identidade Visual</span>
          </h1>
          <p
            style={{
              color: "#8B9CC0",
              fontSize: "1.15rem",
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Conheça as nossas criações de logotipos, manuais de normas de identidade visual,
            mockups tridimensionais e projetos de branding em formato vertical de alta resolução (9:16).
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "28px",
              flexWrap: "wrap",
            }}
          >
            <a
              href={getWhatsAppUrl("Olá! Estive a ver a vossa Galeria de Design e gostaria de solicitar uma proposta para a criação de um Logotipo e Identidade Visual.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "12px 28px", fontSize: "0.95rem" }}
              id="gallery-hero-whatsapp-btn"
            >
              <MessageCircle size={18} />
              Solicitar Projeto no WhatsApp
            </a>
            <Link
              href="/servicos#design"
              className="btn-secondary"
              style={{ padding: "12px 24px", fontSize: "0.95rem" }}
            >
              Conhecer Nossos Serviços de Design
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
          role="tablist"
          aria-label="Filtrar por categoria"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                role="tab"
                aria-selected={active}
                className="cursor-pointer transition-all duration-200"
                style={{
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: active
                    ? "1px solid rgba(0, 242, 254, 0.6)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  background: active
                    ? "linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(59, 130, 246, 0.2))"
                    : "rgba(12, 16, 24, 0.6)",
                  color: active ? "#00F2FE" : "#8B9CC0",
                  backdropFilter: "blur(8px)",
                  boxShadow: active ? "0 0 16px rgba(0, 242, 254, 0.2)" : "none",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 9:16 Aspect Ratio Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "28px",
            marginBottom: "72px",
          }}
        >
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group glass-card cursor-pointer"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                aspectRatio: "9 / 16",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* 9:16 Full Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                priority={false}
              />

              {/* Dark Gradient Overlay for text readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/50 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity"
                aria-hidden="true"
              />

              {/* Top Meta Header */}
              <div
                className="absolute top-4 left-4 right-4 flex items-center justify-between z-10"
              >
                <span
                  style={{
                    background: "rgba(7, 9, 14, 0.8)",
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                    backdropFilter: "blur(10px)",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Sparkles size={12} />
                  {item.category}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalItem(item);
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black cursor-pointer"
                  title="Ampliar Imagem"
                >
                  <Eye size={16} />
                </button>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-5 flex flex-col justify-end">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  {item.subtitle}
                </span>

                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    color: "#ffffff",
                    lineHeight: 1.3,
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    color: "#94A3B8",
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                  {item.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: "0.7rem",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.08)",
                        color: "#CAD5E8",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Ver Detalhes</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(`Olá! Vi o trabalho "${item.title}" na Galeria da Lisis e gostaria de solicitar um orçamento para o meu projeto.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "6px 12px",
                      borderRadius: "8px",
                      background: "rgba(37, 211, 102, 0.18)",
                      color: "#25D366",
                      border: "1px solid rgba(37, 211, 102, 0.35)",
                      textDecoration: "none",
                    }}
                    title="Pedir orçamento no WhatsApp"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Why Choose Lisis for Design & Branding Section */}
        <div
          className="glass-card"
          style={{
            padding: "48px 36px",
            borderRadius: "24px",
            border: "1px solid rgba(0, 242, 254, 0.15)",
            background: "linear-gradient(135deg, rgba(13, 17, 26, 0.8), rgba(9, 13, 20, 0.9))",
            marginBottom: "56px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#00D4AA",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Vantagens Competitivas
            </span>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Por que investir em <span className="text-gradient">Branding & Design</span> com a Lisis?
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <div style={{ color: "#00F2FE", marginBottom: "12px" }}><Sparkles size={24} /></div>
              <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "8px" }}>Originalidade 100% Vetorial</h4>
              <p style={{ color: "#8B9CC0", fontSize: "0.85rem", lineHeight: 1.6 }}>
                Nada de templates pré-fabricados ou cópias. Cada logotipo é desenhado à medida, com grid matemático e ficheiros que escalam de um cartão de visita até um outdoor gigante sem perder nitidez.
              </p>
            </div>

            <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <div style={{ color: "#F59E0B", marginBottom: "12px" }}><BookOpen size={24} /></div>
              <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "8px" }}>Manual de Normas Completo</h4>
              <p style={{ color: "#8B9CC0", fontSize: "0.85rem", lineHeight: 1.6 }}>
                Entregamos o Brandbook com regras de proteção, paleta cromática (Pantone, CMYK, RGB, HEX) e tipografias para que gráficas e agências nunca distorçam a identidade da sua empresa.
              </p>
            </div>

            <div style={{ padding: "20px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <div style={{ color: "#00D4AA", marginBottom: "12px" }}><Layers size={24} /></div>
              <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem", marginBottom: "8px" }}>Mockups 3D Hiper-Realistas</h4>
              <p style={{ color: "#8B9CC0", fontSize: "0.85rem", lineHeight: 1.6 }}>
                Visualize a sua marca aplicada em viaturas, fachadas corporativas, fardas e suportes digitais antes mesmo de mandar produzir, garantindo aprovação com máxima segurança.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          style={{
            textAlign: "center",
            padding: "56px 24px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)",
            border: "1px solid rgba(0, 242, 254, 0.25)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Pronto para transformar a imagem da sua empresa?
          </h2>
          <p
            style={{
              color: "#8B9CC0",
              fontSize: "1.05rem",
              maxWidth: "600px",
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Fale connosco hoje. Apresentamos uma proposta personalizada para criação de logotipo,
            manual de identidade visual ou rebranding completo.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href={getWhatsAppUrl("Olá! Gostaria de receber uma proposta de Design de Logotipo e Identidade Visual para o meu negócio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: "14px 32px",
                fontSize: "1rem",
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                borderColor: "rgba(37,211,102,0.4)",
              }}
              id="gallery-bottom-whatsapp-btn"
            >
              <MessageCircle size={20} />
              Conversar no WhatsApp
            </a>
            <Link
              href="/contacto"
              className="btn-secondary"
              style={{ padding: "14px 32px", fontSize: "1rem" }}
            >
              Enviar Mensagem pelo Site
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal (9:16 Optimized) */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row bg-[#0c1018] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-rose-500 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            {/* Previous & Next Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Imagem Anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-[390px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Próxima Imagem"
            >
              <ChevronRight size={22} />
            </button>

            {/* Left: 9:16 Image Viewport */}
            <div
              className="relative w-full md:w-7/12 flex items-center justify-center bg-black/90 p-4"
              style={{ minHeight: "360px" }}
            >
              <div
                className="relative w-full h-[65vh] md:h-[82vh]"
                style={{ aspectRatio: "9 / 16", maxHeight: "82vh" }}
              >
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right: Detailed Information Panel */}
            <div className="w-full md:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#0a0d14]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    style={{
                      background: "rgba(0, 242, 254, 0.15)",
                      color: activeModalItem.color,
                      border: `1px solid ${activeModalItem.color}40`,
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {activeModalItem.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {activeModalItem.year}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "#ffffff",
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  {activeModalItem.title}
                </h3>

                <p className="text-xs text-cyan-400 font-mono tracking-wider uppercase mb-4">
                  {activeModalItem.subtitle}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {activeModalItem.description}
                </p>

                <div className="mb-6 space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Tags & Conceitos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 mb-6">
                  <span className="text-slate-500 block mb-0.5">Segmento / Cliente:</span>
                  <span className="font-semibold text-white">{activeModalItem.clientOrConcept}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <a
                  href={getWhatsAppUrl(`Olá! Gostei muito do projeto "${activeModalItem.title}" que vi na vossa Galeria. Gostaria de saber mais e pedir um orçamento.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg transition-all"
                >
                  <MessageCircle size={18} />
                  <span>Quero um Design Semelhante</span>
                </a>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
