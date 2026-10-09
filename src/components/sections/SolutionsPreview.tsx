import Link from "next/link";
import { Briefcase, LayoutDashboard, Globe, ExternalLink, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const solutions = [
  {
    id: "ccn-consultores",
    icon: Briefcase,
    name: "CCN Consultores Moçambique",
    tagline: "Site Institucional de Consultoria",
    description:
      "Site institucional oficial da Empresa de Consultoria CCN Consultores Moçambique. Apresenta de forma elegante os serviços corporativos, equipa técnica e áreas de actuação estratégica.",
    features: [
      "Design corporativo premium e profissional",
      "Apresentação completa de serviços e equipa",
      "Formulário de contacto e captação de clientes",
      "Totalmente optimizado para mobile e SEO",
    ],
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
      "Sistema integrado de gestão de clientes (CRM) desenvolvido para a empresa CCN Consultores. Permite gerir leads, histórico de interações, propostas comerciais e tarefas da equipa num ambiente seguro.",
    features: [
      "Autenticação segura e perfis de utilizador",
      "Controlo de pipeline de vendas e propostas",
      "Histórico centralizado de clientes e notas",
      "Dashboard com métricas e indicadores de desempenho",
    ],
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
      "Portal digital oficial com foco internacional que promove as potencialidades económicas, oportunidades de investimento, sectores produtivos e atracções turísticas da Província de Maputo.",
    features: [
      "Apresentação das potencialidades provinciais",
      "Suporte a conteúdo em Inglês e Português",
      "Navegação interactiva rápida e responsiva",
      "Vitrine de atracção de investimentos estratégicos",
    ],
    color: "#9333EA",
    badge: "Governo & Investimento",
    url: "https://maputofacim-kappa.vercel.app/en",
  },
];

export default function SolutionsPreview() {
  return (
    <section
      style={{
        padding: "96px 0",
        position: "relative",
        background: "linear-gradient(180deg, transparent, rgba(0,212,170,0.02), transparent)",
      }}
      aria-labelledby="solutions-heading"
      id="solutions-section"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ margin: "0 auto 16px", display: "inline-flex", gap: "8px" }}>
            <Zap size={14} />
            Soluções Próprias e Em Produção
          </div>
          <h2
            id="solutions-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Soluções que fazem a <span className="text-gradient">diferença</span>
          </h2>
          <p style={{ color: "#8B9CC0", fontSize: "1.1rem", maxWidth: "680px", margin: "0 auto", lineHeight: 1.7 }}>
            Plataformas digitais reais desenvolvidas e implementadas pela Lisis Tecnologias, gerando impacto e eficiência para clientes em Moçambique.
          </p>
        </div>

        {/* Solutions Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
          {solutions.map(({ id, icon: Icon, name, tagline, description, features, color, badge, url }) => (
            <article
              key={id}
              className="glass-card"
              style={{
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.3s ease",
              }}
              aria-labelledby={`solution-${id}-title`}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${color}22`,
                    border: `1px solid ${color}44`,
                  }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <span
                  className="tag"
                  style={{ background: `${color}22`, borderColor: `${color}44`, color }}
                >
                  {badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3
                id={`solution-${id}-title`}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ffffff", textDecoration: "none", transition: "color 0.2s" }}
                  title={`Abrir ${name} em nova aba`}
                >
                  {name}
                </a>
              </h3>
              <p style={{ color, fontSize: "0.875rem", fontWeight: 600, marginBottom: "16px" }}>{tagline}</p>
              
              <p style={{ color: "#8B9CC0", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "24px", flex: 1 }}>
                {description}
              </p>

              {/* Features list */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.875rem", color: "#8B9CC0" }}>
                    <CheckCircle2 size={16} style={{ color, flexShrink: 0, marginTop: "2px" }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "auto" }}>
                {/* External link button */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "0.9rem",
                    padding: "12px 20px",
                    textDecoration: "none",
                  }}
                  id={`solution-${id}-visit-btn`}
                  title={`Aceder a ${url} (abre em nova aba)`}
                >
                  <span>Visitar Solução Online</span>
                  <ExternalLink size={16} />
                </a>

                {/* WhatsApp button */}
                <a
                  href={getWhatsAppUrl(`Olá! Gostaria de solicitar uma proposta para uma solução similar a: ${name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "0.85rem",
                    padding: "10px 18px",
                    textDecoration: "none",
                  }}
                  id={`solution-${id}-whatsapp-btn`}
                >
                  <span>Solicitar Solução Similar via WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
