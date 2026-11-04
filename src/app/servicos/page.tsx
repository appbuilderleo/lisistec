import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Headphones,
  GitMerge,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Palette,
  Sparkles,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Serviços de Engenharia de Software, Sistemas e Branding",
  description:
    "Desenvolvimento de sistemas ERP/POS/CRM, portais institucionais, aplicações móveis, design de logotipos e manuais de identidade visual em Moçambique.",
  alternates: { canonical: "/servicos" },
};

const services = [
  {
    id: "sistemas",
    code: "MOD // 01",
    icon: LayoutDashboard,
    title: "Sistemas de Gestão (ERP, CRM & POS)",
    subtitle: "Automação Comercial, Académica e Institucional",
    description:
      "Desenvolvemos sistemas de gestão personalizados para controlar operações críticas: pontos de venda para supermercados e retalho, plataformas académicas para ensino superior e escolas, e sistemas CRM para equipas de consultoria.",
    features: [
      "Ponto de Venda (POS) rápido para supermercados e retalho",
      "Controlo de stock multi-loja, lotes e alertas de reposição",
      "Sistemas CRM para gestão de clientes, leads e propostas",
      "Plataformas de gestão académica, matrículas e propinas",
      "Relatórios financeiros e indicadores em tempo real",
      "Controlo rigoroso de permissões e auditoria de utilizadores",
    ],
    tech: ["React", "Next.js", "PostgreSQL", "Node.js", "Prisma"],
  },
  {
    id: "web",
    code: "MOD // 02",
    icon: Globe,
    title: "Portais Institucionais & Desenvolvimento Web",
    subtitle: "Plataformas Governamentais, Corporativas & E-Commerce",
    description:
      "Construímos portais institucionais de alta velocidade, plataformas de promoção de investimento e websites corporativos com arquitectura moderna, segurança reforçada e optimização para motores de busca.",
    features: [
      "Portais governamentais e institucionais bilingues (PT/EN)",
      "Websites executivos para consultoras e grandes empresas",
      "Plataformas de comércio electrónico e encomendas online",
      "Painéis de administração intuitivos para equipas de comunicação",
      "Optimização técnica de velocidade (Core Web Vitals) e SEO",
      "Alojamento cloud resiliente e certificados de segurança SSL",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Cloud"],
  },
  {
    id: "design",
    code: "MOD // 03",
    icon: Palette,
    title: "Design, Logotipos & Identidade Visual",
    subtitle: "Arquitectura de Marca, Brandbooks & Sinalética",
    description:
      "Criamos identidades visuais com rigor geométrico e documentação técnica completa. Da concepção do logotipo vetorial até ao manual de normas (brandbook) e aplicação em viaturas e estacionário.",
    features: [
      "Desenho de logotipo 100% vetorial e exclusivo",
      "Manual de Normas de Identidade Visual (Brandbook completo)",
      "Especificação cromática oficial (Pantone, CMYK, RGB e HEX)",
      "Estacionário corporativo (cartões, papel timbrado, pastas, crachás)",
      "Design de frotas comerciais, fardamento e sinalética exterior",
      "Mockups 3D realistas e entrega de ficheiros editáveis (AI, SVG, PDF)",
    ],
    tech: ["Adobe Illustrator", "Figma", "Vector Grid", "Brandbook", "3D Mockups"],
    galleryLink: "/galeria",
  },
  {
    id: "mobile",
    code: "MOD // 04",
    icon: Smartphone,
    title: "Aplicações Móveis (iOS & Android)",
    subtitle: "Mobilidade Corporativa & Serviços ao Cidadão",
    description:
      "Desenvolvemos aplicações móveis nativas e multiplataforma para iOS e Android, projectadas para funcionar com rapidez e fiabilidade mesmo em redes móveis com oscilação de sinal.",
    features: [
      "Aplicações nativas e híbridas para Android e iOS",
      "Modo de operação offline com sincronização automática",
      "Integração com carteiras móveis e notificações push",
      "Aplicações para equipas de campo, vendas e logística",
      "Interfaces centradas na facilidade de uso do cliente final",
      "Publicação e gestão nas lojas Google Play e App Store",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Offline Sync", "APIs"],
  },
  {
    id: "integracao",
    code: "MOD // 05",
    icon: GitMerge,
    title: "Integração de Sistemas & Automação",
    subtitle: "Interoperabilidade, APIs & Fluxos Digitais",
    description:
      "Unificamos sistemas isolados da sua organização para eliminar trabalho manual duplicado, conectando bases de dados, plataformas web, ERPs e canais de atendimento como o WhatsApp Business.",
    features: [
      "Desenvolvimento e integração de APIs RESTful seguras",
      "Sincronização automática entre loja física (POS) e plataforma online",
      "Automação de atendimento e triagem via WhatsApp Business",
      "Migração segura de bases de dados legadas para a nuvem",
      "Webhooks e alertas automáticos por email ou SMS",
      "Documentação técnica de endpoints para equipas internas",
    ],
    tech: ["REST APIs", "Webhooks", "Node.js", "WhatsApp API", "Cloud DB"],
  },
  {
    id: "consultoria",
    code: "MOD // 06",
    icon: Headphones,
    title: "Consultoria TI, Formação & Suporte",
    subtitle: "Acompanhamento Técnico & Continuidade Operacional",
    description:
      "Apoiamos instituições públicas e privadas no planeamento tecnológico, elaboração de cadernos de encargos, formação prática de utilizadores e manutenção preventiva de sistemas.",
    features: [
      "Levantamento de requisitos e arquitectura de soluções",
      "Formação presencial e remota para equipas operacionais",
      "Contratos de manutenção evolutiva e suporte técnico (SLA)",
      "Auditoria de desempenho, segurança e rotinas de backup",
      "Apoio técnico local em Maputo e assistência remota imediata",
      "Actualização tecnológica de portais e sistemas antigos",
    ],
    tech: ["Linux", "Docker", "Cloud Backup", "SLA Support", "Formação"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Diagnóstico & Caderno Técnico",
    desc: "Reunião de levantamento com a sua equipa para mapear fluxos de trabalho, requisitos técnicos e prazos de entrega.",
  },
  {
    step: "02",
    title: "Arquitectura & Prototipagem",
    desc: "Desenho da estrutura de base de dados, interfaces de utilizador e validação visual antes da codificação ou produção.",
  },
  {
    step: "03",
    title: "Engenharia & Testes no Terreno",
    desc: "Desenvolvimento iterativo com demonstrações periódicas, testes de carga, segurança e validação em dispositivos reais.",
  },
  {
    step: "04",
    title: "Formação, Lançamento & Suporte",
    desc: "Entrada em produção assistida, capacitação prática dos utilizadores e acompanhamento técnico contínuo.",
  },
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section
        className="py-16 lg:py-24 bg-dots border-b border-border"
        aria-labelledby="services-page-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">Catálogo Técnico // Serviços</div>
            <h1
              id="services-page-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-text leading-tight mb-6"
            >
              Engenharia digital e branding para{" "}
              <span className="text-gradient">operações exigentes.</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8">
              Mais de 7 anos de experiência a entregar sistemas de gestão,
              portais governamentais, aplicações móveis e identidades visuais
              corporativas em Moçambique.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrl(
                  "Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                id="services-page-cta"
              >
                <span>Solicitar Proposta no WhatsApp</span>
                <ArrowRight size={18} />
              </a>
              <Link href="/portfolio" className="btn-secondary">
                <span>Ver Projectos Entregues</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detailed Modules */}
      <section className="py-16 lg:py-20" aria-label="Detalhes dos serviços">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {services.map(
            (
              {
                id,
                code,
                icon: Icon,
                title,
                subtitle,
                description,
                features,
                tech,
                galleryLink,
              },
              index
            ) => (
              <article
                key={id}
                id={id}
                className="arch-card p-7 sm:p-10 bg-bg-surface scroll-mt-28"
                aria-labelledby={`service-detail-${id}`}
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Info Column (6 cols) */}
                  <div
                    className={`lg:col-span-6 space-y-5 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="service-icon">
                        <Icon size={24} />
                      </div>
                      <span className="mono-index px-3 py-1 rounded bg-bg-elevated border border-border">
                        {code}
                      </span>
                    </div>

                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-primary font-600 mb-1">
                        {subtitle}
                      </p>
                      <h2
                        id={`service-detail-${id}`}
                        className="text-2xl sm:text-3xl font-heading font-700 text-text"
                      >
                        {title}
                      </h2>
                    </div>

                    <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {tech.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <a
                        href={getWhatsAppUrl(
                          `Olá! Gostaria de solicitar uma proposta técnica para o serviço: ${title}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm"
                        id={`service-${id}-contact-btn`}
                      >
                        <span>Solicitar Proposta</span>
                        <ArrowRight size={16} />
                      </a>
                      {galleryLink && (
                        <Link
                          href={galleryLink}
                          className="btn-secondary text-sm"
                          id="service-design-gallery-btn"
                        >
                          <Sparkles size={16} />
                          <span>Explorar Galeria (9:16)</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Features Checklist (6 cols) */}
                  <div
                    className={`lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-bg-elevated border border-border ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-secondary font-600 mb-4 pb-3 border-b border-border">
                      Especificações & Entregáveis Incluídos
                    </h3>
                    <ul className="space-y-3">
                      {features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle2
                            size={18}
                            className="text-primary shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span className="text-text-secondary text-sm">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      {/* Methodology Section */}
      <section
        className="py-16 lg:py-20 border-t border-border bg-bg-surface/40"
        aria-labelledby="process-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="section-tag mb-4">Metodologia Lisis</div>
            <h2
              id="process-heading"
              className="text-3xl sm:text-4xl font-heading font-700 text-text"
            >
              Como conduzimos cada <span className="text-gradient">projecto.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ step, title, desc }) => (
              <div key={step} className="arch-card p-6 bg-bg-surface">
                <span className="mono-index text-xs block mb-3">
                  FASE // {step}
                </span>
                <h3 className="font-heading font-700 text-lg text-text mb-2">
                  {title}
                </h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
