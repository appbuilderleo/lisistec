import type { Metadata } from "next";
import Image from "next/image";
import {
  Briefcase,
  LayoutDashboard,
  Globe,
  Package,
  Bot,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Soluções & Produtos Próprios em Produção",
  description:
    "Conheça as soluções em produção da Lisis Tecnologias: Portal Maputo FACIM, CCN Consultores, CRM CCN, STOKA POS, Lisis School e Lisis Assist.",
  alternates: { canonical: "/solucoes" },
};

const solutions = [
  {
    id: "stoka",
    code: "PROD // 01",
    icon: Package,
    name: "STOKA · Ponto de Venda & Stock",
    tagline: "Gestão Comercial, Faturação e Inventário para Retalho",
    description:
      "Sistema comercial desenvolvido para supermercados, mercearias, farmácias e lojas de retalho em Moçambique. Integra terminal de ponto de venda (POS), controlo de stock multi-armazém e relatórios diários de caixa.",
    features: [
      "Interface de ponto de venda (POS) rápida para atendimento em caixa",
      "Controlo de stock em tempo real com alertas de reposição mínima",
      "Fecho de caixa diário, controlo de turnos e relatórios de vendas",
      "Emissão de recibos, guias e gestão de contas de clientes",
      "Operação resiliente adaptada à realidade do comércio moçambicano",
    ],
    useCases: [
      "Supermercados (ex: Cesta Cheia)",
      "Mercearias & Grossistas",
      "Lojas de Retalho",
      "Farmácias & Ferragens",
    ],
    badge: "Produto Próprio · Retalho",
    url: "https://stoka-three.vercel.app/",
    heroImage: "/projects/stoka-hero.png",
  },
  {
    id: "maputo-facim",
    code: "PROD // 02",
    icon: Globe,
    name: "Portal Oficial Maputo FACIM",
    tagline: "Promoção Económica e Investimento da Província de Maputo",
    description:
      "Plataforma digital com foco internacional que promove as potencialidades económicas, oportunidades de investimento, sectores produtivos e infraestruturas estratégicas da Província de Maputo.",
    features: [
      "Plataforma bilingue (Português e Inglês) para investidores",
      "Apresentação interactiva dos sectores agro-industrial, turismo e energia",
      "Vitrine digital de projectos estruturantes e zonas francas",
      "Arquitectura de alta velocidade para acesso em feiras e delegações",
      "Estrutura optimizada para captação de parcerias público-privadas",
    ],
    useCases: [
      "Órgãos Governamentais",
      "Ministérios & Direcções Provinciais",
      "Investidores Internacionais",
      "Câmaras de Comércio",
    ],
    badge: "Governo & Investimento",
    url: "https://maputofacim-kappa.vercel.app/en",
    heroImage: "/projects/facim-hero.png",
  },
  {
    id: "crm-ccn",
    code: "PROD // 03",
    icon: LayoutDashboard,
    name: "CRM Corporativo CCN Consultores",
    tagline: "Sistema Integrado de Gestão Comercial e Clientes",
    description:
      "Sistema web privado para gestão completa do ciclo de relacionamento com clientes corporativos: registo de oportunidades, histórico de reuniões, propostas técnicas e acompanhamento de metas da equipa.",
    features: [
      "Autenticação segura com controlo de permissões por utilizador",
      "Gestão visual do pipeline de vendas e propostas em negociação",
      "Histórico centralizado de contactos, notas técnicas e ficheiros",
      "Dashboard executivo com indicadores de conversão em tempo real",
      "Exportação de relatórios gerenciais para tomada de decisão",
    ],
    useCases: [
      "Empresas de Consultoria",
      "Equipas Comerciais B2B",
      "Sociedades de Advogados",
      "Prestadores de Serviços",
    ],
    badge: "Sistema CRM",
    url: "https://crm.ccnconsultores.com/login",
    heroImage: "/projects/crm-hero.png",
  },
  {
    id: "ccn-consultores",
    code: "PROD // 04",
    icon: Briefcase,
    name: "Portal CCN Consultores Moçambique",
    tagline: "Plataforma Institucional de Consultoria Empresarial",
    description:
      "Portal institucional oficial da CCN Consultores Moçambique. Apresenta de forma estruturada os serviços de consultoria, estudos económicos, equipa técnica e canais directos de solicitação de proposta.",
    features: [
      "Arquitectura editorial corporativa adaptada a desktop e telemóvel",
      "Catálogo detalhado de áreas de actuação e projectos realizados",
      "Formulário integrado ao sistema interno de gestão de leads",
      "Optimização técnica de velocidade e indexação no Google (SEO)",
      "Infraestrutura cloud de alta disponibilidade e segurança SSL",
    ],
    useCases: [
      "Consultoras Nacionais",
      "Instituições Financeiras",
      "Associações Empresariais",
      "Grupos Corporativos",
    ],
    badge: "Portal Institucional",
    url: "https://ccnconsultores.com/",
    heroImage: "/projects/ccn-hero.png",
  },
  {
    id: "school",
    code: "PROD // 05",
    icon: GraduationCap,
    name: "Lisis School · Gestão Académica",
    tagline: "Plataforma Integrada para Escolas, Institutos e Universidades",
    description:
      "Sistema completo de administração académica e financeira que digitaliza matrículas, pautas electrónicas, horários, propinas e a comunicação entre docentes, estudantes e encarregados de educação.",
    features: [
      "Portal de inscrições e renovação de matrículas online",
      "Gestão de turmas, cursos, docentes e pautas electrónicas",
      "Controlo de propinas, emolumentos e emissão de recibos",
      "Área reservada para estudantes e encarregados de educação",
      "Emissão automatizada de declarações, certificados e relatórios",
    ],
    useCases: [
      "Universidades & Ensino Superior",
      "Institutos Técnicos",
      "Escolas Secundárias & Primárias",
      "Centros de Formação",
    ],
    badge: "Produto Próprio · EduTech",
    url: null,
    heroImage: null,
  },
  {
    id: "assist",
    code: "PROD // 06",
    icon: Bot,
    name: "Lisis Assist · Atendimento Inteligente",
    tagline: "Automação de Atendimento e Triagem via WhatsApp Business",
    description:
      "Plataforma de assistente digital que automatiza a recepção de clientes no WhatsApp 24/7, responde a questões frequentes, recolhe dados de pedidos ou marcações e encaminha casos prioritários para a equipa humana.",
    features: [
      "Atendimento automático ininterrupto (24 horas / 7 dias)",
      "Integração oficial com WhatsApp Business e sistemas internos",
      "Fluxos de triagem configuráveis em língua portuguesa",
      "Encaminhamento inteligente para departamentos específicos",
      "Painel de métricas de tempo de resposta e volume de atendimentos",
    ],
    useCases: [
      "Clínicas & Hospitais",
      "Serviços Públicos ao Cidadão",
      "Banca, Seguros & Microfinanças",
      "Comércio & Logística",
    ],
    badge: "Produto Próprio · Automação",
    url: null,
    heroImage: null,
  },
];

export default function SolucoesPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section
        className="py-16 lg:py-24 bg-grid border-b border-border"
        aria-labelledby="solutions-page-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">
              <Zap size={14} /> Ecossistema Lisis // Soluções
            </div>
            <h1
              id="solutions-page-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-text leading-tight mb-6"
            >
              Sistemas e produtos próprios que{" "}
              <span className="text-gradient">operam no terreno.</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Plataformas em produção desenvolvidas pela Lisis Tecnologias para
              modernizar o comércio a retalho, a gestão de consultoria, o ensino
              superior e a administração pública em Moçambique.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Detail */}
      <section className="py-16 lg:py-20" aria-label="Detalhes das soluções">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {solutions.map(
            ({
              id,
              code,
              icon: Icon,
              name,
              tagline,
              description,
              features,
              useCases,
              badge,
              url,
              heroImage,
            }) => (
              <article
                key={id}
                id={id}
                className="arch-card p-7 sm:p-10 bg-bg-surface scroll-mt-28"
                aria-labelledby={`solution-detail-${id}`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-8 border-b border-border">
                  <div className="flex items-start gap-4">
                    <div className="service-icon w-14 h-14">
                      <Icon size={26} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap mb-1">
                        <span className="mono-index text-xs">{code}</span>
                        <span className="tag">{badge}</span>
                      </div>
                      <h2
                        id={`solution-detail-${id}`}
                        className="text-2xl sm:text-3xl font-heading font-700 text-text"
                      >
                        {name}
                      </h2>
                      <p className="font-mono text-xs text-primary font-600 uppercase tracking-wider mt-1">
                        {tagline}
                      </p>
                    </div>
                  </div>

                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm py-2.5 px-5"
                      title={`Aceder a ${url} (abre em nova aba)`}
                    >
                      <span>Aceder à Plataforma</span>
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Description, Screenshot if present, and Use Cases (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    {heroImage && url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block aspect-[16/9] rounded-xl overflow-hidden border border-border bg-[#06101E]"
                      >
                        <Image
                          src={heroImage}
                          alt={name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </a>
                    )}

                    <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                      {description}
                    </p>

                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider text-text-secondary font-600 mb-2.5">
                        Sectores & Aplicações
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {useCases.map((u) => (
                          <span
                            key={u}
                            className="text-xs font-mono px-3 py-1 rounded-md bg-bg-elevated border border-border text-text-secondary"
                          >
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Features & Actions (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="p-6 rounded-2xl bg-bg-elevated border border-border">
                      <h3 className="font-mono text-xs uppercase tracking-wider text-text-secondary font-600 mb-4 pb-3 border-b border-border">
                        Funcionalidades & Arquitectura Técnica
                      </h3>
                      <div className="grid sm:grid-cols-1 gap-3">
                        {features.map((f) => (
                          <div
                            key={f}
                            className="flex items-start gap-3 p-3 rounded-xl bg-bg-surface border border-border"
                          >
                            <CheckCircle2
                              size={17}
                              className="text-primary shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span className="text-text-secondary text-sm">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm py-2.5 px-5"
                          id={`solution-${id}-online-btn`}
                        >
                          <span>Visitar Solução Online</span>
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <a
                        href={getWhatsAppUrl(
                          `Olá! Gostaria de solicitar uma demonstração e proposta para a solução: ${name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm py-2.5 px-5"
                        id={`solution-${id}-contact-btn`}
                      >
                        <span>Solicitar Demonstração no WhatsApp</span>
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      {/* Custom Software CTA */}
      <section className="py-12" aria-label="Soluções à medida">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="arch-card p-8 sm:p-12 bg-bg-surface text-center">
            <div className="section-tag mx-auto w-fit mb-4">
              Engenharia por Encomenda
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-700 text-text mb-3">
              Precisa de um sistema desenvolvido à medida da sua instituição?
            </h2>
            <p className="text-text-muted max-w-xl mx-auto mb-6 text-sm sm:text-base leading-relaxed">
              Analisamos o seu caderno de encargos e desenhamos uma arquitectura
              exclusiva para os fluxos operacionais da sua organização.
            </p>
            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de falar sobre o desenvolvimento de um sistema tecnológico à medida."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="coming-soon-whatsapp-btn"
            >
              <span>Falar com a Equipa de Engenharia</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
