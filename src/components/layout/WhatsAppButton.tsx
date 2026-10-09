"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, CONTACTS } from "@/lib/constants";

export default function WhatsAppButton() {
  const whatsappUrl = getWhatsAppUrl(
    "Olá! Gostaria de falar com a equipa da Lisis Tecnologias e Serviços sobre os vossos serviços."
  );

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Iniciar conversa no WhatsApp: ${CONTACTS.whatsapp.display}`}
        id="floating-whatsapp-btn"
        className="whatsapp-float group"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          color: "#ffffff",
          padding: "12px 18px",
          borderRadius: "9999px",
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        <span
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MessageCircle size={22} style={{ fill: "currentColor" }} />
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: "0 0 8px #ffffff",
            }}
          />
        </span>
        <span className="hidden sm:inline" style={{ letterSpacing: "0.01em" }}>
          WhatsApp
        </span>
      </a>

      <style jsx>{`
        .whatsapp-float:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.55);
        }
        .whatsapp-float:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
    </aside>
  );
}
