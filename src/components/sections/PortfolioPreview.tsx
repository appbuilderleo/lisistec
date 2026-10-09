import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "web-platform",
    title: "Plataforma Web Empresarial",
    category: "Sites e Plataformas Web",
    description: "Portal corporativo com gestão de conteúdo e área de cliente.",
    tags: ["Next.js", "CockroachDB", "Vercel"],
    gradientFrom: "rgba(59,130,246,0.3)",
    gradientTo: "rgba(0,212,170,0.2)",
  },
  {
    id: "mobile-app",
    title: "App de Gestão Comercial",
    category: "Aplicações Móveis",
    description: "Aplicação móvel para gestão de vendas e inventário em tempo real.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    gradientFrom: "rgba(168,85,247,0.3)",
    gradientTo: "rgba(59,130,246,0.2)",
  },
  {
    id: "erp-system",
    title: "Sistema ERP Integrado",
    category: "Sistemas de Gestão",
    description: "ERP completo para empresa de médio porte com módulos financeiros e RH.",
    tags: ["React", "Express", "MySQL"],
    gradientFrom: "rgba(0,212,170,0.3)",
    gradientTo: "rgba(34,197,94,0.2)",
  },
  {
    id: "ui-design",
    title: "Design UX para FinTech",
    category: "Design e UX/UI",
    description: "Redesign completo de aplicação financeira com foco em usabilidade.",
    tags: ["Figma", "Design System", "Prototyping"],
    gradientFrom: "rgba(249,115,22,0.3)",
    gradientTo: "rgba(0,212,170,0.2)",
  },
];

export default function PortfolioPreview() {
  return (
    <section
      style={{ padding: "96px 0", position: "relative" }}
      aria-labelledby="portfolio-heading"
      id="portfolio-section"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", marginBottom: "64px" }}>
          <div>
            <div className="section-tag" style={{ marginBottom: "16px" }}>Portfólio</div>
            <h2
              id="portfolio-heading"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, color: "#ffffff" }}
            >
              Projetos em <span className="text-gradient">destaque</span>
            </h2>
            <p style={{ color: "#8B9CC0", marginTop: "16px", maxWidth: "480px" }}>
              Conheça alguns dos trabalhos que desenvolvemos para os nossos clientes.
            </p>
          </div>
          <Link href="/portfolio" className="btn-secondary" style={{ flexShrink: 0 }} id="portfolio-view-all-btn">
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>

        {/* Portfolio Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {projects.map(({ id, title, category, description, tags, gradientFrom, gradientTo }) => (
            <article
              key={id}
              className="glass-card"
              style={{ overflow: "hidden", cursor: "pointer" }}
              aria-labelledby={`project-${id}-title`}
            >
              {/* Visual preview */}
              <div
                style={{
                  height: "192px",
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px",
                    opacity: 0.6,
                  }}
                >
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(239,68,68,0.6)" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(234,179,8,0.6)" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(34,197,94,0.6)" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    <div style={{ height: "8px", width: "64px", background: "rgba(255,255,255,0.2)", borderRadius: "4px" }} />
                    <div style={{ height: "8px", width: "40px", background: "rgba(255,255,255,0.15)", borderRadius: "4px" }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", gap: "8px", marginTop: "4px" }}>
                    <div style={{ width: "33%", borderRadius: "4px", background: "rgba(255,255,255,0.1)" }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ height: "12px", background: "rgba(255,255,255,0.2)", borderRadius: "4px" }} />
                      <div style={{ height: "12px", width: "75%", background: "rgba(255,255,255,0.15)", borderRadius: "4px" }} />
                      <div style={{ height: "12px", width: "50%", background: "rgba(255,255,255,0.1)", borderRadius: "4px" }} />
                    </div>
                  </div>
                </div>
                <ExternalLink size={24} style={{ color: "#ffffff", opacity: 0.7, position: "relative", zIndex: 1 }} aria-hidden="true" />
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <span className="tag" style={{ marginBottom: "12px", display: "inline-block" }}>{category}</span>
                <h3
                  id={`project-${id}-title`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#ffffff", marginBottom: "8px" }}
                >
                  {title}
                </h3>
                <p style={{ color: "#8B9CC0", fontSize: "0.875rem", marginBottom: "16px" }}>{description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "12px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "#0D1F35",
                        border: "1px solid rgba(0,212,170,0.15)",
                        color: "#8B9CC0",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
