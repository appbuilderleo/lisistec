import Link from "next/link";
import { ArrowRight, ExternalLink, ShoppingCart, HeartPulse, HeartHandshake, UtensilsCrossed } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const projects = [
  {
    id: "stoka",
    title: "STOKA - Gestão de Vendas & PDV",
    category: "Comércio Local & Retalho",
    description:
      "Sistema de gestão de vendas para comércio local, integrando ponto de venda (PDV) e sistema de pagamentos. Desenhado para agilizar o atendimento em caixas de mercearias e pequenas lojas.",
    tags: ["Ponto de Venda", "Gestão de Stock", "Pagamentos", "Retalho"],
    url: "https://stoka-three.vercel.app/",
    icon: ShoppingCart,
    heroImage: "/projects/stoka-hero.png",
    accentColor: "#00D4AA",
  },
  {
    id: "medspa",
    title: "MEDSPA - Clínica de Medicina Integrativa",
    category: "Saúde & Bem-Estar",
    description:
      "Site oficial de clínica especializada em Medicina Funcional e Integrativa. Inclui apresentação de tratamentos, corpo clínico e sistema direto de agendamento de consultas via WhatsApp.",
    tags: ["Medicina Integrativa", "Agendamento WhatsApp", "Clínica", "Saúde"],
    url: "https://medspa-kappa.vercel.app/",
    icon: HeartPulse,
    heroImage: "/projects/medspa-hero.png",
    accentColor: "#0088FF",
  },
  {
    id: "convite",
    title: "Convite Digital Interativo",
    category: "Eventos & Celebrações",
    description:
      "Convite de casamento digital eletrónico com confirmação de presença (RSVP) em tempo real, contagem regressiva, localização GPS da cerimónia e todos os detalhes do evento para os convidados.",
    tags: ["Convite Digital", "Confirmação RSVP", "Casamentos", "Mobile First"],
    url: "https://convite-two-beige.vercel.app/",
    icon: HeartHandshake,
    heroImage: "/projects/convite-hero.png",
    accentColor: "#F59E0B",
  },
  {
    id: "muliba",
    title: "MULIBA - Gastronomia & Restaurante",
    category: "Restauração & E-Commerce",
    description:
      "Site de restaurante moderno com sistema de cardápio digital incorporado, pedidos online de comida para take-away/entrega e sistema de reserva de mesas, tudo num só lugar.",
    tags: ["Cardápio Digital", "Pedidos Online", "Reserva de Mesas", "Restaurante"],
    url: "https://muliba.vercel.app/",
    icon: UtensilsCrossed,
    heroImage: "/projects/muliba-hero.png",
    accentColor: "#EF4444",
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
            <div className="section-tag" style={{ marginBottom: "16px" }}>Portfólio em Produção</div>
            <h2
              id="portfolio-heading"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, color: "#ffffff" }}
            >
              Projetos em <span className="text-gradient">destaque</span>
            </h2>
            <p style={{ color: "#8B9CC0", marginTop: "16px", maxWidth: "560px", lineHeight: 1.7 }}>
              Conheça alguns dos websites e aplicações web desenvolvidos pela nossa equipa que já estão no ar. Clique nos links para aceder diretamente a cada projecto em nova aba.
            </p>
          </div>
          <Link href="/portfolio" className="btn-secondary" style={{ flexShrink: 0 }} id="portfolio-view-all-btn">
            Ver Todos os Projetos <ArrowRight size={18} />
          </Link>
        </div>

        {/* Portfolio Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "28px" }}>
          {projects.map(({ id, title, category, description, tags, url, icon: Icon, heroImage, accentColor }) => (
            <article
              key={id}
              className="glass-card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              aria-labelledby={`project-${id}-title`}
            >
              {/* Visual preview header — real hero screenshot as cover */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Abrir ${title} em nova aba`}
                style={{
                  height: "200px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Dark overlay for contrast */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(2,12,27,0.45) 0%, rgba(2,12,27,0.65) 100%)",
                  transition: "background 0.3s ease",
                }} />

                {/* Hover overlay — accent tint */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: `${accentColor}18`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }} className="card-hover-tint" />

                {/* Glassmorphic icon badge */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: "72px",
                    height: "72px",
                    borderRadius: "20px",
                    background: "rgba(2,12,27,0.72)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: `1px solid ${accentColor}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}22`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <Icon size={32} style={{ color: accentColor }} />
                </div>

                {/* Online badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    zIndex: 2,
                    background: "rgba(2,12,27,0.80)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.75rem",
                    color: "#ffffff",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00D4AA", display: "inline-block", boxShadow: "0 0 6px #00D4AA" }} />
                  <span>Online</span>
                  <ExternalLink size={12} style={{ color: accentColor }} />
                </div>

                {/* Bottom gradient for smooth card transition */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  background: "linear-gradient(to bottom, transparent, rgba(9,18,32,0.9))",
                  zIndex: 1,
                }} />
              </a>

              {/* Content */}
              <div style={{ padding: "26px", display: "flex", flexDirection: "column", flex: 1 }}>
                <span className="tag" style={{ marginBottom: "12px", display: "inline-block", width: "fit-content", fontSize: "0.75rem" }}>
                  {category}
                </span>

                <h3
                  id={`project-${id}-title`}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    marginBottom: "10px",
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ffffff", textDecoration: "none" }}
                    title={`Abrir ${title} em nova aba`}
                  >
                    {title}
                  </a>
                </h3>

                <p style={{ color: "#8B9CC0", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                  {description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "#0D1F35",
                        border: "1px solid rgba(0,212,170,0.15)",
                        color: "#8B9CC0",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
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
                      fontSize: "0.875rem",
                      padding: "10px 16px",
                      textDecoration: "none",
                    }}
                    id={`project-${id}-live-btn`}
                  >
                    <span>Ver Projecto Online</span>
                    <ExternalLink size={15} />
                  </a>

                  <a
                    href={getWhatsAppUrl(`Olá! Vi o projecto ${title} e gostaria de solicitar uma proposta similar para o meu negócio.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      fontSize: "0.825rem",
                      padding: "8px 14px",
                      textDecoration: "none",
                    }}
                    id={`project-${id}-whatsapp-btn`}
                  >
                    <span>Pedir Proposta no WhatsApp</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
