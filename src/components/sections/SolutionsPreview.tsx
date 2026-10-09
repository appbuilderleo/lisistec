import Link from "next/link";
import { Bot, GraduationCap, Package, ArrowRight, Zap } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const solutions = [
  {
    id: "assist",
    icon: Bot,
    name: "Lisis Assist",
    tagline: "Assistente via Inteligência Artificial",
    description: "Assistente virtual com IA para automatizar atendimento ao cliente, responder perguntas e otimizar processos de suporte empresarial 24/7.",
    features: ["Atendimento automatizado 24/7", "Integração com WhatsApp", "Análise de sentimentos", "Relatórios de interação"],
    color: "#00D4AA",
    badge: "IA",
    href: "/solucoes#assist",
  },
  {
    id: "school",
    icon: GraduationCap,
    name: "Lisis School",
    tagline: "Gestão Escolar Completa",
    description: "Plataforma completa de gestão escolar para controlar matrículas, notas, turmas, professores e comunicação com pais e encarregados.",
    features: ["Matrículas online", "Portal para pais", "Gestão de notas", "Comunicação integrada"],
    color: "#0088FF",
    badge: "EduTech",
    href: "/solucoes#school",
  },
  {
    id: "stoka",
    icon: Package,
    name: "Stoka",
    tagline: "Gestão de Stock e PDV",
    description: "Sistema de gestão de inventário e ponto de venda para pequenos e médios negócios. Controle total do seu stock em tempo real.",
    features: ["PDV intuitivo", "Controlo de stock em tempo real", "Relatórios de vendas", "Multi-loja"],
    color: "#9333EA",
    badge: "Commerce",
    href: "/solucoes#stoka",
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
            Soluções Próprias
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
          <p style={{ color: "#8B9CC0", fontSize: "1.1rem", maxWidth: "640px", margin: "0 auto", lineHeight: 1.7 }}>
            Produtos e plataformas criadas para aumentar a produtividade e gerar resultados reais para o seu negócio.
          </p>
        </div>

        {/* Solutions Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
          {solutions.map(({ id, icon: Icon, name, tagline, description, features, color, badge, href }) => (
            <article
              key={id}
              className="glass-card"
              style={{ padding: "32px", display: "flex", flexDirection: "column" }}
              aria-labelledby={`solution-${id}-title`}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
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

              <h3
                id={`solution-${id}-title`}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#ffffff", marginBottom: "4px" }}
              >
                {name}
              </h3>
              <p style={{ color, fontSize: "0.875rem", fontWeight: 600, marginBottom: "16px" }}>{tagline}</p>
              <p style={{ color: "#8B9CC0", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "24px", flex: 1 }}>
                {description}
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
                {features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8B9CC0" }}>
                    <span
                      style={{ width: "16px", height: "16px", borderRadius: "4px", background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, display: "block" }} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "auto" }}>
                <Link
                  href={href}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#8B9CC0", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none" }}
                  aria-label={`Saber mais sobre ${name}`}
                  id={`solution-${id}-btn`}
                >
                  Detalhes <ArrowRight size={14} />
                </Link>
                <a
                  href={getWhatsAppUrl(`Olá! Gostaria de solicitar uma demonstração e proposta para a solução ${name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.825rem",
                    color,
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${color}44`,
                    background: `${color}15`,
                  }}
                  id={`solution-${id}-whatsapp-btn`}
                >
                  Solicitar no WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/solucoes" className="btn-secondary" id="all-solutions-btn">
            Ver Todas as Soluções
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
