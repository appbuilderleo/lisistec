"use client";

import { useState } from "react";
import { ArrowUpRight, Phone, CheckCircle2, Sliders } from "lucide-react";
import { CONTACTS, getWhatsAppUrl } from "@/lib/constants";

const solutionOptions = [
  {
    id: "erp-pos",
    label: "Sistema ERP / POS / CRM",
    deliverables: [
      "Arquitectura multi-utilizador e perfis de acesso",
      "Controlo de vendas, stock, facturação ou pipeline comercial",
      "Formação presencial/remota e suporte técnico dedicado",
    ],
    timeline: "Entrega faseada · 3 a 8 semanas",
  },
  {
    id: "portal-web",
    label: "Portal Institucional / Governamental",
    deliverables: [
      "Design editorial exclusivo (Modo Escuro & Claro)",
      "Alta velocidade, segurança SSL e optimização Google (SEO)",
      "Painel de gestão de conteúdos e suporte multilíngue",
    ],
    timeline: "Entrega rápida · 2 a 4 semanas",
  },
  {
    id: "mobile-app",
    label: "Aplicação Móvel (iOS & Android)",
    deliverables: [
      "Aplicação nativa/híbrida com suporte offline",
      "Painel administrativo web e integração via API",
      "Publicação oficial na App Store e Google Play",
    ],
    timeline: "Ciclo ágil · 4 a 10 semanas",
  },
  {
    id: "branding",
    label: "Logotipo & Manual de Identidade",
    deliverables: [
      "Logotipo 100% vetorial exclusivo + isotipo",
      "Brandbook completo (Pantone, CMYK, RGB, tipografia)",
      "Mockups 3D de papelaria, fardamento e frotas",
    ],
    timeline: "Entrega completa · 1 a 2 semanas",
  },
];

const sectorOptions = [
  "Governo / Instituição Pública",
  "Retalho / Supermercado / Comércio",
  "Educação / Universidade / Academia",
  "Consultoria / Serviços Corporativos",
];

export default function CTASection() {
  const [selectedSol, setSelectedSol] = useState(0);
  const [selectedSector, setSelectedSector] = useState(0);

  const activeSolution = solutionOptions[selectedSol];
  const activeSector = sectorOptions[selectedSector];

  const customWhatsAppMessage = `Olá! Usei o configurador no site da Lisis Tecnologias.\n- Solução pretendida: ${activeSolution.label}\n- Sector: ${activeSector}\nGostaria de receber uma proposta técnica.`;

  return (
    <section
      className="py-24 lg:py-28 relative overflow-hidden border-t border-border"
      aria-labelledby="cta-heading"
      id="cta-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="arch-card p-8 sm:p-12 lg:p-14 bg-bg-surface">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Interactive Configurator (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-tag">
                <Sliders size={13} /> 06 // Configurador de Projecto
              </div>

              <h2
                id="cta-heading"
                className="text-3xl sm:text-4xl font-heading font-700 text-text leading-tight"
              >
                Configure o seu projecto e receba uma{" "}
                <span className="text-gradient">proposta técnica.</span>
              </h2>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Seleccione o tipo de solução e o sector da sua organização para
                gerar o resumo técnico e falar directamente com a nossa equipa
                de engenharia em Maputo.
              </p>

              {/* Step 1: Solution Type */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-text-secondary font-600 mb-2.5">
                  1. Qual é a necessidade principal?
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {solutionOptions.map((opt, idx) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSol(idx)}
                      className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-heading font-600 transition-all cursor-pointer ${
                        selectedSol === idx
                          ? "bg-primary text-[#040D1A] border-primary shadow-neon"
                          : "bg-bg-elevated border-border text-text hover:border-primary/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Sector */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-text-secondary font-600 mb-2.5">
                  2. Sector de actuação
                </p>
                <div className="flex flex-wrap gap-2">
                  {sectorOptions.map((sec, idx) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setSelectedSector(idx)}
                      className={`px-3.5 py-2 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                        selectedSector === idx
                          ? "bg-primary/15 border-primary text-primary font-600"
                          : "bg-bg-elevated border-border text-text-muted hover:text-text"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Summary & Action Box (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-bg-elevated border border-border-strong space-y-6">
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-border">
                  <span className="mono-index">CADERNO TÉCNICO // RESUMO</span>
                  <span className="font-mono text-xs text-primary font-600">
                    {activeSolution.timeline}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-mono text-text-muted uppercase">
                    Configuração Seleccionada
                  </p>
                  <h3 className="font-heading font-700 text-xl text-text mt-1">
                    {activeSolution.label}
                  </h3>
                  <p className="text-xs font-mono text-primary mt-1">
                    Sector: {activeSector}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-mono text-text-muted uppercase mb-2.5">
                    Entregáveis Incluídos
                  </p>
                  <ul className="space-y-2.5">
                    {activeSolution.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-primary shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={getWhatsAppUrl(customWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-3.5 text-sm"
                    id="cta-contact-btn"
                  >
                    <span>Solicitar Proposta no WhatsApp</span>
                    <ArrowUpRight size={17} />
                  </a>

                  <a
                    href={CONTACTS.phone.href}
                    className="btn-secondary w-full py-3 text-sm"
                    id="cta-phone-btn"
                  >
                    <Phone size={16} />
                    <span>Ligar Directo ({CONTACTS.phone.display})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
