import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { CONTACTS, getWhatsAppUrl } from "@/lib/constants";

export default function CTASection() {
  return (
    <section
      style={{ padding: "96px 0", position: "relative", overflow: "hidden" }}
      aria-labelledby="cta-heading"
      id="cta-section"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(0,136,255,0.05) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div className="bg-dots" aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      {/* Glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "300px",
          borderRadius: "50%",
          opacity: 0.2,
          filter: "blur(48px)",
          background: "radial-gradient(ellipse, #00D4AA, transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "896px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="glass-card" style={{ padding: "64px 48px" }}>
          <div className="section-tag" style={{ margin: "0 auto 24px", display: "inline-flex" }}>Vamos começar</div>
          <h2
            id="cta-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            Pronto para <span className="text-gradient">transformar</span>
            <br />o seu negócio?
          </h2>
          <p style={{ color: "#8B9CC0", fontSize: "1.1rem", marginBottom: "40px", maxWidth: "512px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            Estamos prontos para ajudar o seu negócio a crescer com tecnologia
            de ponta. Fale connosco hoje e receba uma proposta personalizada.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            <a
              href={getWhatsAppUrl("Olá! Gostaria de solicitar uma proposta para a Lisis Tecnologias e Serviços.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "1rem", padding: "14px 32px" }}
              id="cta-contact-btn"
            >
              <MessageCircle size={20} />
              Solicitar Proposta no WhatsApp
            </a>
            <a
              href={CONTACTS.phone.href}
              className="btn-secondary"
              style={{ fontSize: "1rem", padding: "14px 32px" }}
              id="cta-phone-btn"
            >
              <Phone size={20} />
              Ligar ({CONTACTS.phone.display})
            </a>
          </div>

          {/* Trust indicators */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
              marginTop: "48px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(0,212,170,0.15)",
            }}
          >
            {["✓ Proposta gratuita", "✓ Sem compromisso", "✓ Resposta em 24h", "✓ Suporte dedicado"].map((item) => (
              <span key={item} style={{ fontSize: "0.875rem", color: "#8B9CC0" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
