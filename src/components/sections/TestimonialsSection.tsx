"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Building2, CheckCircle2 } from "lucide-react";

const institutionalCases = [
  {
    id: "ccn",
    code: "CASO // 01",
    organization: "CCN Consultores Moçambique",
    sector: "Consultoria Empresarial & Estratégica",
    deliverable: "Portal Corporativo & Sistema CRM Dedicado",
    quote:
      "A implementação do novo portal institucional e do sistema CRM pela Lisis Tecnologias centralizou todo o nosso funil de propostas comerciais e o acompanhamento de clientes corporativos num único ambiente seguro.",
    impact: [
      "Centralização de 100% do histórico de clientes e propostas",
      "Acesso seguro por níveis de permissão para a equipa de consultores",
      "Presença digital alinhada com o posicionamento executivo da marca",
    ],
  },
  {
    id: "cesta-cheia",
    code: "CASO // 02",
    organization: "Cesta Cheia Supermercado",
    sector: "Retalho & Distribuição Alimentar",
    deliverable: "Gestão Comercial, Ponto de Venda (POS) & Inventário",
    quote:
      "No retalho alimentar cada segundo na caixa conta. A solução implementada pela Lisis trouxe rapidez ao atendimento, rigor no controlo de stock e visibilidade diária sobre a facturação e reposição de produtos.",
    impact: [
      "Atendimento ágil em múltiplos terminais de ponto de venda",
      "Controlo rigoroso de entradas, saídas e quebras de stock",
      "Suporte técnico local sempre disponível em Maputo",
    ],
  },
  {
    id: "educacao-uem",
    code: "CASO // 03",
    organization: "Ministério da Educação · Universidade Eduardo Mondlane",
    sector: "Sector Público & Ensino Superior",
    deliverable: "Plataformas Digitais & Sistemas Académicos",
    quote:
      "Projectos para o sector público e académico exigem conformidade técnica, estabilidade sob elevado volume de acessos e interfaces claras para estudantes, docentes e gestores públicos.",
    impact: [
      "Arquitectura preparada para milhares de utilizadores simultâneos",
      "Digitalização e desmaterialização de fluxos administrativos",
      "Documentação técnica completa e formação de equipas internas",
    ],
  },
  {
    id: "institucional-servicos",
    code: "CASO // 04",
    organization: "CEMOQE-MOÇ · AMEC · ML Services",
    sector: "Institucional, Certificação & Serviços Corporativos",
    deliverable: "Sistemas Digitais, Portais & Identidade Visual",
    quote:
      "A Lisis combina engenharia de software com design de comunicação. Desde sistemas operacionais até à padronização da identidade visual, cada entrega reflecte rigor técnico e conhecimento da realidade moçambicana.",
    impact: [
      "Padronização visual e tecnológica em múltiplos canais",
      "Plataformas web rápidas e adaptadas a dispositivos móveis",
      "Acompanhamento contínuo após a entrada em produção",
    ],
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const prev = () =>
    setActive((a) => (a - 1 + institutionalCases.length) % institutionalCases.length);
  const next = () =>
    setActive((a) => (a + 1) % institutionalCases.length);
  const current = institutionalCases[active];

  return (
    <section
      className="py-24 lg:py-28 relative border-t border-border bg-bg-surface/40"
      aria-labelledby="testimonials-heading"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="section-tag mb-4">05 // Impacto Comprovado</div>
              <h2
                id="testimonials-heading"
                className="text-3xl sm:text-4xl font-heading font-700 text-text leading-tight"
              >
                A confiança de quem move{" "}
                <span className="text-gradient">Moçambique.</span>
              </h2>
              <p className="text-text-muted text-sm sm:text-base mt-3 leading-relaxed">
                Seleccione uma instituição ou empresa abaixo para consultar o
                âmbito técnico e os resultados alcançados em cada parceria.
              </p>
            </div>

            <div
              className="space-y-2.5"
              role="tablist"
              aria-label="Casos de clientes da Lisis"
            >
              {institutionalCases.map((item, idx) => {
                const isSelected = idx === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActive(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-bg-surface border-primary shadow-card"
                        : "bg-bg-elevated/60 border-border hover:border-primary/40"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-primary block">
                        {item.sector}
                      </span>
                      <span className="font-heading font-700 text-sm sm:text-base text-text mt-0.5 block">
                        {item.organization}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xs px-2 py-1 rounded ${
                        isSelected
                          ? "bg-primary text-[#040D1A] font-700"
                          : "text-text-muted"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Case Detail Card (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="arch-card p-8 sm:p-10 bg-bg-surface"
              role="region"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="mono-index block">{current.code}</span>
                    <h3 className="font-heading font-700 text-xl text-text">
                      {current.organization}
                    </h3>
                  </div>
                </div>
                <span className="tag">{current.deliverable}</span>
              </div>

              <div className="relative mb-8">
                <Quote
                  size={32}
                  className="text-primary/25 mb-3"
                  aria-hidden="true"
                />
                <blockquote className="text-text text-base sm:text-lg leading-relaxed font-500">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </div>

              <div className="p-5 rounded-xl bg-bg-elevated border border-border mb-6">
                <p className="font-mono text-xs uppercase tracking-wider text-primary font-600 mb-3">
                  Resultados & Entregáveis Técnicos
                </p>
                <ul className="space-y-2.5">
                  {current.impact.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-xs text-text-muted">
                  Caso {active + 1} de {institutionalCases.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-10 h-10 rounded-xl bg-bg-elevated border border-border hover:border-primary text-text-secondary hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Caso anterior"
                    id="testimonial-prev-btn"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="w-10 h-10 rounded-xl bg-bg-elevated border border-border hover:border-primary text-text-secondary hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Próximo caso"
                    id="testimonial-next-btn"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
