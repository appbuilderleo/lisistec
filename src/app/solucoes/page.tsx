import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, LayoutDashboard, Globe, Package, Bot, GraduationCap, ArrowRight, ExternalLink, CheckCircle, Zap } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Conheça as nossas soluções em produção: CCN Consultores, CRM CCN, Portal Maputo FACIM, STOKA, Lisis Assist e Lisis School.",
  alternates: { canonical: "/solucoes" },
};

const solutions = [
  {
    id: "ccn-consultores",
    icon: Briefcase,
    name: "CCN Consultores Moçambique",
    tagline: "Site Institucional de Consultoria",
    description:
      "Site institucional oficial da Empresa de Consultoria CCN Consultores Moçambique. Apresenta serviços corporativos, equipa técnica e áreas de actuação estratégica para empresas.",
    features: [
      "Design corporativo premium e responsivo",
      "Apresentação estruturada de serviços e equipa",
      "Formulário de contacto e geração de leads",
      "Optimizado para velocidade e motores de busca (SEO)",
      "Segurança e alojamento na nuvem de alta disponibilidade",
    ],
    useCases: ["Empresas corporativas", "Consultoria", "PME", "Prestadores de serviços"],
    color: "#00D4AA",
    badge: "Consultoria",
    url: "https://ccnconsultores.com/",
  },
  {
    id: "crm-ccn",
    icon: LayoutDashboard,
    name: "CRM CCN Consultores",
    tagline: "Sistema Integrado de Gestão de Clientes",
    description:
      "Sistema integrado de gestão de clientes (CRM) para controlo do funil de vendas, histórico de interações, propostas comerciais e tarefas da equipa de consultores.",
    features: [
      "Autenticação segura com níveis de acesso",
      "Gestão completa do ciclo de clientes e leads",
      "Registo de interações e acompanhamento de propostas",
      "Dashboard com métricas e gráficos em tempo real",
      "Exportação de relatórios para tomada de decisão",
    ],
    useCases: ["Equipas comerciais", "Empresas de consultoria", "Gestores de contas", "Equipas de vendas"],
    color: "#0088FF",
    badge: "Sistema CRM",
    url: "https://crm.ccnconsultores.com/login",
  },
  {
    id: "maputo-facim",
    icon: Globe,
    name: "Portal Maputo FACIM",
    tagline: "Potencialidades da Província de Maputo",
    description:
      "Portal digital oficial com foco internacional que promove as potencialidades económicas, oportunidades de investimento, sectores produtivos e atracções da Província de Maputo.",
    features: [
      "Plataforma multilíngue (Português e Inglês)",
      "Apresentação interativa dos sectores económicos",
      "Vitrine de atracção de investimentos estratégicos",
      "Design moderno com desempenho de alta velocidade",
      "Informações para investidores e visitantes",
    ],
    useCases: ["Entidades governamentais", "Investidores internacionais", "Câmaras de comércio", "Turismo"],
    color: "#9333EA",
    badge: "Governo & Investimento",
    url: "https://maputofacim-kappa.vercel.app/en",
  },
  {
    id: "stoka",
    icon: Package,
    name: "STOKA",
    tagline: "Gestão de Vendas, Stock e Ponto de Venda",
    description:
      "O STOKA é um sistema completo de gestão de vendas para comércio local, integrando ponto de venda (PDV) e sistema de pagamentos. Desenhado para agilizar o atendimento em caixas de mercearias e retalho.",
    features: [
      "Interface de ponto de venda (PDV) rápida e intuitiva",
      "Controlo de stock e inventário em tempo real",
      "Registo de vendas diárias e relatórios de faturação",
      "Suporte a pagamentos e emissão de recibos",
      "Ideal para mercearias, lojas e comércios locais",
    ],
    useCases: ["Mercearias locais", "Lojas de conveniência", "Supermercados", "Comércio a retalho"],
    color: "#10B981",
    badge: "Comércio Local",
    url: "https://stoka-three.vercel.app/",
  },
  {
    id: "assist",
    icon: Bot,
    name: "Lisis Assist",
    tagline: "Assistente via Inteligência Artificial",
    description:
      "O Lisis Assist é um assistente virtual inteligente que automatiza o atendimento ao cliente, responde perguntas frequentes e encaminha casos complexos para a sua equipa no WhatsApp 24/7.",
    features: [
      "Atendimento automático 24/7",
      "Integração nativa com WhatsApp Business",
      "Processamento de linguagem natural em Português",
      "Dashboard com métricas de atendimento",
      "Escalada inteligente para agentes humanos",
    ],
    useCases: ["Empresas de serviços", "E-commerce", "Bancos e finanças", "Saúde"],
    color: "#00D4AA",
    badge: "IA & Automação",
    url: null,
  },
  {
    id: "school",
    icon: GraduationCap,
    name: "Lisis School",
    tagline: "Plataforma Completa de Gestão Escolar",
    description:
      "O Lisis School é uma plataforma moderna de gestão escolar que digitaliza toda a administração académica: matrículas, notas, turmas, professores e comunicação com encarregados de educação.",
    features: [
      "Portal de matrículas online",
      "Gestão de turmas e horários",
      "Lançamento e consulta de notas",
      "Portal para pais e encarregados",
      "Gestão de propinas e pagamentos",
    ],
    useCases: ["Escolas primárias", "Escolas secundárias", "Centros de formação", "Universidades"],
    color: "#0088FF",
    badge: "EduTech",
    url: null,
  },
];

export default function SolucoesPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-grid" aria-labelledby="solutions-page-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit">
            <Zap size={14} /> As Nossas Soluções
          </div>
          <h1
            id="solutions-page-heading"
            className="text-4xl lg:text-6xl font-heading font-700 text-white mt-4 mb-6"
          >
            Soluções que fazem a{" "}
            <span className="text-gradient">diferença</span>
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">
            Plataformas e sistemas digitais reais em produção, desenhados para resolver desafios e acelerar o crescimento do mercado moçambicano.
          </p>
        </div>
      </section>

      {/* Solutions Detail */}
      <section className="py-16" aria-label="Detalhes das soluções">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {solutions.map(({ id, icon: Icon, name, tagline, description, features, useCases, color, badge, url }) => (
            <article
              key={id}
              id={id}
              className="glass-card p-8 lg:p-12 scroll-mt-28"
              aria-labelledby={`solution-detail-${id}`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `2px solid ${color}30` }}
                  >
                    <Icon size={30} style={{ color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h2
                        id={`solution-detail-${id}`}
                        className="text-2xl sm:text-3xl font-heading font-700 text-white"
                      >
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors flex items-center gap-2"
                            title={`Aceder a ${name} em nova aba`}
                          >
                            {name}
                            <ExternalLink size={20} className="text-text-muted" />
                          </a>
                        ) : (
                          name
                        )}
                      </h2>
                      <span
                        className="tag"
                        style={{ background: `${color}15`, borderColor: `${color}30`, color }}
                      >
                        {badge}
                      </span>
                    </div>
                    <p className="font-600 text-sm" style={{ color }}>{tagline}</p>
                  </div>
                </div>

                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-4"
                    title={`Aceder a ${url} (abre em nova aba)`}
                  >
                    Aceder ao Site <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Description & CTAs */}
                <div className="lg:col-span-1 flex flex-col">
                  <p className="text-text-muted leading-relaxed mb-6 flex-1">{description}</p>

                  <div className="mb-6">
                    <h3 className="text-white font-heading font-600 text-xs uppercase tracking-wider mb-3">
                      Ideal para
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {useCases.map((u) => (
                        <span key={u} className="text-xs px-3 py-1 rounded-full bg-bg-surface border border-border text-text-muted">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-2.5 justify-center"
                        id={`solution-${id}-online-btn`}
                      >
                        Visitar Solução Online <ExternalLink size={15} />
                      </a>
                    )}
                    <a
                      href={getWhatsAppUrl(`Olá! Gostaria de solicitar uma demonstração e proposta para a solução: ${name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm py-2.5 justify-center"
                      id={`solution-${id}-contact-btn`}
                    >
                      Pedir Proposta no WhatsApp <ArrowRight size={15} />
                    </a>
                  </div>
                </div>

                {/* Features */}
                <div className="lg:col-span-2">
                  <h3 className="text-white font-heading font-600 text-sm uppercase tracking-wider mb-4">
                    Funcionalidades e Vantagens
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {features.map((f) => (
                      <div key={f} className="flex items-start gap-3 p-3.5 rounded-lg bg-bg-surface/50 border border-border">
                        <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color }} aria-hidden="true" />
                        <span className="text-text-muted text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* In development teaser */}
      <section className="py-16" aria-label="Projectos em desenvolvimento">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 text-center border-dashed">
            <div className="section-tag mx-auto w-fit mb-4">Em Breve</div>
            <h2 className="text-2xl font-heading font-700 text-white mb-3">
              Mais soluções a caminho 🚀
            </h2>
            <p className="text-text-muted max-w-lg mx-auto mb-6">
              Desenvolvemos produtos à medida das necessidades do seu negócio. Fale connosco no WhatsApp para criar uma solução exclusiva.
            </p>
            <a
              href={getWhatsAppUrl("Olá! Gostaria de falar sobre o desenvolvimento de uma solução tecnológica sob medida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="coming-soon-whatsapp-btn"
            >
              Falar com a Equipa no WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
