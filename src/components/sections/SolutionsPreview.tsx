import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  LayoutDashboard,
  Globe,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const solutions = [
  {
    id: "maputo-facim",
    code: "SOL // 01",
    icon: Globe,
    name: "Portal Oficial Maputo FACIM",
    tagline: "Governo, Investimento & Potencialidades Económicas",
    description:
      "Plataforma digital com alcance internacional que apresenta as potencialidades económicas, oportunidades de investimento, sectores produtivos e infraestruturas da Província de Maputo em Português e Inglês.",
    features: [
      "Arquitectura bilingue (Português e Inglês) para investidores",
      "Mapeamento interactivo dos sectores produtivos provinciais",
      "Desempenho optimizado para acesso rápido em redes móveis",
      "Catálogo estruturado de projectos estratégicos e turismo",
    ],
    badge: "Governo & Investimento",
    url: "https://maputofacim-kappa.vercel.app/en",
    heroImage: "/projects/facim-hero.png",
  },
  {
    id: "ccn-consultores",
    code: "SOL // 02",
    icon: Briefcase,
    name: "CCN Consultores Moçambique",
    tagline: "Plataforma Institucional de Consultoria Estratégica",
    description:
      "Portal corporativo oficial da CCN Consultores Moçambique. Estrutura as áreas de actuação técnica, portfólio de projectos, perfil institucional e captação directa de oportunidades comerciais.",
    features: [
      "Arquitectura de informação clara para clientes institucionais",
      "Apresentação detalhada de especialidades e equipa técnica",
      "Sistema integrado de pedidos de proposta e contacto",
      "Optimização técnica de indexação nos motores de pesquisa",
    ],
    badge: "Consultoria Empresarial",
    url: "https://ccnconsultores.com/",
    heroImage: "/projects/ccn-hero.png",
  },
  {
    id: "crm-ccn",
    code: "SOL // 03",
    icon: LayoutDashboard,
    name: "CRM Corporativo CCN Consultores",
    tagline: "Sistema Integrado de Gestão Comercial e Clientes",
    description:
      "Aplicação web privada desenvolvida para centralizar a operação comercial da CCN Consultores: controlo de oportunidades, registo de interacções, envio de propostas e indicadores de desempenho da equipa.",
    features: [
      "Controlo de acesso seguro por perfil de consultor e direcção",
      "Gestão visual do funil de vendas e estados de proposta",
      "Histórico cronológico de reuniões, notas e documentos",
      "Painel executivo com métricas de conversão em tempo real",
    ],
    badge: "Sistema de Gestão CRM",
    url: "https://crm.ccnconsultores.com/login",
    heroImage: "/projects/crm-hero.png",
  },
];

export default function SolutionsPreview() {
  return (
    <section
      className="py-24 lg:py-28 relative border-t border-border bg-bg-surface/40"
      aria-labelledby="solutions-heading"
      id="solutions-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-tag mb-4">02 // Sistemas em Produção</div>
            <h2
              id="solutions-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-700 text-text"
            >
              Soluções reais a operar no{" "}
              <span className="text-gradient">mercado moçambicano.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-4">
              Conheça plataformas desenvolvidas pela Lisis Tecnologias que já
              apoiam instituições públicas, investidores e equipas de
              consultoria todos os dias.
            </p>
            <Link
              href="/solucoes"
              className="inline-flex items-center gap-2 font-mono text-xs font-600 uppercase tracking-wider text-primary hover:underline"
            >
              <span>Ver todas as 6 soluções e produtos próprios</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Stacked Editorial Case Studies */}
        <div className="space-y-10">
          {solutions.map(
            (
              {
                id,
                code,
                icon: Icon,
                name,
                tagline,
                description,
                features,
                badge,
                url,
                heroImage,
              },
              index
            ) => (
              <article
                key={id}
                className="arch-card p-6 sm:p-8 lg:p-10 bg-bg-surface"
                aria-labelledby={`solution-${id}-title`}
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Screenshot Column (6 cols) */}
                  <div
                    className={`lg:col-span-6 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Abrir ${name} em nova aba`}
                      className="group block rounded-xl overflow-hidden border border-border bg-[#06101E] shadow-card"
                    >
                      {/* Browser Top Bar */}
                      <div className="px-4 py-2.5 bg-[#091628] border-b border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 truncate max-w-[220px] sm:max-w-xs">
                          {url.replace(/^https?:\/\//, "")}
                        </span>
                        <span className="font-mono text-[10px] text-[#00D4AA] inline-flex items-center gap-1">
                          ONLINE <ExternalLink size={11} />
                        </span>
                      </div>

                      {/* Unobscured High-Clarity Screenshot */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={heroImage}
                          alt={`Interface do sistema ${name}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </a>
                  </div>

                  {/* Content Column (6 cols) */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-between ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="mono-index px-2.5 py-1 rounded bg-bg-elevated border border-border">
                          {code}
                        </span>
                        <span className="tag">{badge}</span>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                          <Icon size={20} />
                        </div>
                        <h3
                          id={`solution-${id}-title`}
                          className="text-2xl sm:text-3xl font-heading font-700 text-text"
                        >
                          {name}
                        </h3>
                      </div>

                      <p className="font-mono text-xs text-primary font-600 uppercase tracking-wider mb-4">
                        {tagline}
                      </p>

                      <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
                        {description}
                      </p>

                      {/* Features Grid */}
                      <ul className="grid sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-border">
                        {features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-primary shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-2.5 px-5"
                        id={`solution-${id}-visit-btn`}
                      >
                        <span>Aceder à Plataforma</span>
                        <ExternalLink size={15} />
                      </a>

                      <a
                        href={getWhatsAppUrl(
                          `Olá! Gostaria de solicitar uma proposta para uma solução semelhante a: ${name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm py-2.5 px-5"
                        id={`solution-${id}-whatsapp-btn`}
                      >
                        <span>Solicitar Solução Similar</span>
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
