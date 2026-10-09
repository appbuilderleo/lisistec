"use client";
import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Matsinhe",
    role: "Director Geral",
    company: "TradeCom Maputo",
    text: "A Lisis transformou completamente a nossa operação digital. O sistema de gestão que desenvolveram reduziu os nossos custos operacionais em 40% e melhorou a eficiência da equipa significativamente.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ana Ferrão",
    role: "Directora Académica",
    company: "Escola Privada Horizonte",
    text: "O Lisis School revolucionou a forma como gerimos a nossa escola. Agora os pais acompanham o progresso dos filhos em tempo real e a administração é muito mais ágil.",
    rating: 5,
  },
  {
    id: 3,
    name: "Hélder Machava",
    role: "Empresário",
    company: "Supermercado Modelo",
    text: "Com o Stoka consigo controlar o stock de todas as minhas lojas num só lugar. O suporte da Lisis é excelente — respondem sempre rapidamente quando precisamos.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const t = testimonials[active];

  return (
    <section
      style={{ padding: "96px 0", position: "relative" }}
      aria-labelledby="testimonials-heading"
      id="testimonials"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          background: "radial-gradient(ellipse at center, rgba(0,212,170,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: "896px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ margin: "0 auto 16px", display: "inline-flex" }}>Testemunhos</div>
          <h2
            id="testimonials-heading"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "#ffffff" }}
          >
            O que dizem os nossos <span className="text-gradient">clientes</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div
          className="glass-card"
          style={{ padding: "40px", textAlign: "center" }}
          role="region"
          aria-label="Testemunho actual"
          aria-live="polite"
        >
          <Quote size={40} style={{ color: "rgba(0,212,170,0.3)", margin: "0 auto 24px" }} aria-hidden="true" />

          {/* Stars */}
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "24px" }} role="img" aria-label={`${t.rating} estrelas`}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={18} style={{ color: "#00D4AA", fill: "#00D4AA" }} aria-hidden="true" />
            ))}
          </div>

          <blockquote style={{ color: "#E2EAF4", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "32px", maxWidth: "640px", marginLeft: "auto", marginRight: "auto", fontStyle: "italic" }}>
            &ldquo;{t.text}&rdquo;
          </blockquote>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(0,212,170,0.3), rgba(59,130,246,0.3))",
                border: "1px solid rgba(0,212,170,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#ffffff",
              }}
              aria-hidden="true"
            >
              {t.name[0]}
            </div>
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#ffffff" }}>{t.name}</p>
              <p style={{ color: "#8B9CC0", fontSize: "0.875rem" }}>{t.role} · {t.company}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "32px" }}>
          <button
            onClick={prev}
            style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(0,212,170,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B9CC0", background: "transparent", cursor: "pointer", transition: "all 0.2s ease" }}
            aria-label="Testemunho anterior"
            id="testimonial-prev-btn"
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{ display: "flex", gap: "8px" }} role="tablist" aria-label="Seleccionar testemunho">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  height: "8px",
                  width: i === active ? "24px" : "8px",
                  borderRadius: "999px",
                  background: i === active ? "#00D4AA" : "rgba(0,212,170,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
                aria-label={`Testemunho ${i + 1}`}
                aria-selected={i === active}
                role="tab"
                id={`testimonial-tab-${i}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(0,212,170,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B9CC0", background: "transparent", cursor: "pointer", transition: "all 0.2s ease" }}
            aria-label="Próximo testemunho"
            id="testimonial-next-btn"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
