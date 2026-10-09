import Link from "next/link";
import { Globe, Smartphone, LayoutDashboard, Headphones, GitMerge, ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Desenvolvimento Web",
    description: "Criamos websites e aplicações web modernas, rápidas e escaláveis usando as mais recentes tecnologias.",
    features: ["Next.js & React", "APIs RESTful", "CMS & E-commerce"],
    accentColor: "rgba(59,130,246,0.2)",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Aplicações Móveis",
    description: "Desenvolvemos apps nativas e híbridas para iOS e Android que os seus utilizadores vão adorar.",
    features: ["React Native", "iOS & Android", "UI/UX Premium"],
    accentColor: "rgba(168,85,247,0.2)",
  },
  {
    id: "sistemas",
    icon: LayoutDashboard,
    title: "Sistemas de Gestão",
    description: "ERP, CRM e sistemas de gestão personalizados para automatizar e otimizar os seus processos empresariais.",
    features: ["ERP Customizado", "Relatórios em tempo real", "Multi-utilizador"],
    accentColor: "rgba(0,212,170,0.15)",
  },
  {
    id: "consultoria",
    icon: Headphones,
    title: "Consultoria e Suporte",
    description: "Apoio técnico especializado e consultoria estratégica em tecnologia para o seu negócio crescer.",
    features: ["Suporte 24/7", "Formação técnica", "Assessoria TI"],
    accentColor: "rgba(249,115,22,0.2)",
  },
  {
    id: "integracao",
    icon: GitMerge,
    title: "Integração de Sistemas",
    description: "Conectamos os seus sistemas existentes para criar fluxos de trabalho automatizados e eficientes.",
    features: ["APIs & Webhooks", "Automação", "Migração de dados"],
    accentColor: "rgba(34,197,94,0.2)",
  },
];

export default function ServicesPreview() {
  return (
    <section
      style={{ padding: "96px 0", position: "relative" }}
      aria-labelledby="services-heading"
      id="services-section"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ margin: "0 auto 16px", display: "inline-flex" }}>
            Os Nossos Serviços
          </div>
          <h2
            id="services-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Soluções completas para o{" "}
            <span className="text-gradient">seu negócio</span>
          </h2>
          <p style={{ color: "#8B9CC0", fontSize: "1.1rem", maxWidth: "640px", margin: "0 auto", lineHeight: 1.7 }}>
            Oferecemos um conjunto completo de serviços de tecnologia para
            transformar e acelerar o crescimento da sua empresa.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {services.map(({ id, icon: Icon, title, description, features, accentColor }) => (
            <article
              key={id}
              className="glass-card"
              style={{ padding: "32px", position: "relative", overflow: "hidden" }}
              aria-labelledby={`service-${id}-title`}
            >
              <div className="service-icon" style={{ marginBottom: "20px" }}>
                <Icon size={24} />
              </div>
              <h3
                id={`service-${id}-title`}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#ffffff", marginBottom: "12px" }}
              >
                {title}
              </h3>
              <p style={{ color: "#8B9CC0", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "20px" }}>
                {description}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8B9CC0" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00D4AA", flexShrink: 0 }} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "auto" }}>
                <Link
                  href={`/servicos#${id}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#8B9CC0", fontWeight: 500, textDecoration: "none" }}
                  aria-label={`Saber mais sobre ${title}`}
                >
                  Detalhes
                  <ArrowRight size={14} />
                </Link>
                <a
                  href={getWhatsAppUrl(`Olá! Gostaria de solicitar uma proposta para o serviço: ${title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.825rem",
                    color: "#00D4AA",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(0,212,170,0.3)",
                    background: "rgba(0,212,170,0.08)",
                  }}
                  id={`service-${id}-whatsapp-btn`}
                >
                  Pedir Proposta
                </a>
              </div>
            </article>
          ))}

          {/* CTA Card */}
          <article
            className="glass-card"
            style={{ padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", borderStyle: "dashed" }}
          >
            <div
              style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "24px" }}
              aria-hidden="true"
            >
              🤝
            </div>
            <h3 style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "8px" }}>
              Tem um projecto?
            </h3>
            <p style={{ color: "#8B9CC0", fontSize: "0.875rem", marginBottom: "20px" }}>
              Vamos conversar sobre como podemos ajudar.
            </p>
            <a
              href={getWhatsAppUrl("Olá! Tenho um projecto e gostaria de solicitar uma proposta com a Lisis Tecnologias.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "0.875rem", padding: "10px 20px" }}
              id="services-cta-btn"
            >
              Pedir Proposta no WhatsApp
              <ArrowRight size={16} />
            </a>
          </article>
        </div>

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/servicos" className="btn-secondary" id="all-services-btn">
            Ver Todos os Serviços
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
