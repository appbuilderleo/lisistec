"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
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
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(
    null
  );

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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!activeModalItem) return;
      if (e.key === "Escape") setActiveModalItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModalItem]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Page Hero Header */}
      <section className="py-16 lg:py-20 bg-grid border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">
              <Palette size={14} /> Caderno Visual // Formato 9:16
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-text leading-tight mb-6">
              Design, Logotipos &{" "}
              <span className="text-gradient">Identidade Visual.</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8">
              Inspeccione criações de logotipos vetoriais, manuais de normas de
              identidade visual (brandbooks), grelhas de construção geométrica e
              aplicações em frotas e estacionário corporativo.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrl(
                  "Olá! Estive a ver a Galeria de Design da Lisis e gostaria de solicitar uma proposta para Logotipo e Identidade Visual."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                id="gallery-hero-whatsapp-btn"
              >
                <span>Solicitar Proposta de Design</span>
                <ArrowRight size={18} />
              </a>
              <Link href="/servicos#design" className="btn-secondary">
                <span>Especificações de Branding</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Category Filter Pills */}
        <div
          className="flex flex-wrap items-center gap-2 mb-12"
          role="tablist"
          aria-label="Filtrar galeria por categoria"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                role="tab"
                aria-selected={active}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-600 transition-all cursor-pointer border ${
                  active
                    ? "bg-primary text-[#040D1A] border-primary shadow-neon"
                    : "bg-bg-surface border-border text-text-muted hover:text-text hover:border-primary/40"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 9:16 Aspect Ratio Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary shadow-card transition-all duration-300 flex flex-col justify-end"
              style={{
                aspectRatio: "9 / 16",
                background: "#06101E",
              }}
            >
              {/* 9:16 Full Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Dark Gradient Scrim for Legibility over Image */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-[#040D1A]/50 to-black/20 opacity-90 group-hover:opacity-95 transition-opacity"
                aria-hidden="true"
              />

              {/* Top Meta Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-600 bg-[#040D1A]/85 text-[#00D4AA] border border-[#00D4AA]/35 backdrop-blur-md">
                  {item.category}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalItem(item);
                  }}
                  className="w-9 h-9 rounded-full bg-[#040D1A]/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#00D4AA] hover:text-[#040D1A] transition-colors cursor-pointer"
                  aria-label={`Ampliar ${item.title}`}
                  title="Ampliar imagem"
                >
                  <Eye size={16} />
                </button>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-6 flex flex-col justify-end">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">
                  {item.subtitle}
                </span>

                <h2 className="font-heading font-700 text-lg text-white leading-snug mb-2">
                  {item.title}
                </h2>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-600 text-[#00D4AA] hover:underline cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Ver Ficha Técnica</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(
                      `Olá! Vi o projecto "${item.title}" na Galeria da Lisis e gostaria de solicitar um orçamento semelhante.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-heading font-600 bg-white/15 text-white hover:bg-[#00D4AA] hover:text-[#040D1A] transition-colors"
                    title="Pedir orçamento no WhatsApp"
                  >
                    <span>Pedir Proposta</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Technical Rigor Section */}
        <div className="arch-card p-8 sm:p-12 bg-bg-surface mb-16">
          <div className="max-w-2xl mb-10">
            <span className="mono-index block mb-2">
              RIGOR TÉCNICO // IDENTIDADE CORPORATIVA
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-700 text-text">
              Porque desenvolver a identidade da sua marca com a{" "}
              <span className="text-gradient">Lisis Tecnologias?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-bg-elevated border border-border">
              <div className="service-icon mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-heading font-700 text-lg text-text mb-2">
                Construção 100% Vetorial
              </h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                Cada símbolo é desenhado sobre grelha matemática, garantindo
                leitura nítida desde um ícone de aplicação móvel até à fachada
                de um edifício ou viatura comercial.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-bg-elevated border border-border">
              <div className="service-icon mb-4">
                <BookOpen size={20} />
              </div>
              <h3 className="font-heading font-700 text-lg text-text mb-2">
                Manual de Normas (Brandbook)
              </h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                Entregamos o documento normativo com códigos Pantone, CMYK, RGB
                e HEX, tipografia oficial e regras de aplicação para gráficas e
                fornecedores.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-bg-elevated border border-border">
              <div className="service-icon mb-4">
                <Layers size={20} />
              </div>
              <h3 className="font-heading font-700 text-lg text-text mb-2">
                Mockups 3D & Ficheiros Finais
              </h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                Valide a aplicação da sua marca em fardamento, viaturas e
                papelaria antes da produção gráfica, com pacote completo de
                ficheiros editáveis (AI, EPS, SVG, PDF, PNG).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="arch-card p-8 sm:p-12 bg-bg-surface text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-700 text-text mb-3">
            Precisa de criar ou modernizar a identidade visual da sua instituição?
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Solicite uma proposta técnica para criação de logotipo, manual de
            identidade visual ou rebranding corporativo completo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de receber uma proposta para Design de Logotipo e Manual de Identidade Visual."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="gallery-bottom-whatsapp-btn"
            >
              <span>Solicitar Orçamento no WhatsApp</span>
              <ArrowRight size={18} />
            </a>
            <Link href="/contacto" className="btn-secondary">
              <span>Enviar Pedido pelo Formulário</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal (9:16 Optimized) */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row bg-bg-surface border border-border-strong rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/75 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:text-[#040D1A] transition-colors cursor-pointer"
              aria-label="Fechar visualização"
            >
              <X size={20} />
            </button>

            {/* Previous & Next Navigation Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/75 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:text-[#040D1A] transition-colors cursor-pointer"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 md:right-[390px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/75 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:text-[#040D1A] transition-colors cursor-pointer"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={22} />
            </button>

            {/* Left: 9:16 Image Viewport */}
            <div className="relative w-full md:w-7/12 flex items-center justify-center bg-[#040A14] p-4 min-h-[340px]">
              <div
                className="relative w-full h-[60vh] md:h-[82vh]"
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
            <div className="w-full md:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-bg-surface">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="tag">{activeModalItem.category}</span>
                  <span className="text-xs text-text-muted font-mono">
                    {activeModalItem.year}
                  </span>
                </div>

                <h3 className="font-heading font-700 text-xl sm:text-2xl text-text leading-snug mb-2">
                  {activeModalItem.title}
                </h3>

                <p className="text-xs text-primary font-mono tracking-wider uppercase mb-4">
                  {activeModalItem.subtitle}
                </p>

                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  {activeModalItem.description}
                </p>

                <div className="mb-6 space-y-2">
                  <h4 className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                    Especificações & Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-elevated text-text-secondary border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-bg-elevated border border-border text-xs text-text-secondary mb-6">
                  <span className="text-text-muted font-mono block mb-0.5">
                    Segmento / Aplicação:
                  </span>
                  <span className="font-heading font-700 text-text">
                    {activeModalItem.clientOrConcept}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="space-y-2.5 pt-4 border-t border-border">
                <a
                  href={getWhatsAppUrl(
                    `Olá! Gostei do projecto "${activeModalItem.title}" na Galeria da Lisis e gostaria de pedir um orçamento semelhante.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm"
                >
                  <span>Solicitar Design Semelhante</span>
                  <ArrowUpRight size={16} />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="btn-secondary w-full py-2.5 text-xs cursor-pointer"
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
