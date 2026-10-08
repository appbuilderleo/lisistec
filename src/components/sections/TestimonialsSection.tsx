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
      className="py-24 relative"
      aria-labelledby="testimonials-heading"
      id="testimonials"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,212,170,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">Testemunhos</div>
          <h2
            id="testimonials-heading"
            className="text-4xl font-heading font-700 text-white mt-4"
          >
            O que dizem os nossos{" "}
            <span className="text-gradient">clientes</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="glass-card p-10 text-center relative" role="region" aria-label="Testemunho actual" aria-live="polite">
          <Quote
            size={40}
            className="text-primary/30 mx-auto mb-6"
            aria-hidden="true"
          />

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6" role="img" aria-label={`${t.rating} estrelas`}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={18} className="text-primary fill-primary" aria-hidden="true" />
            ))}
          </div>

          <blockquote className="text-text text-lg leading-relaxed mb-8 max-w-2xl mx-auto italic">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-blue-500/30 border border-primary/30 flex items-center justify-center text-xl font-heading font-700 text-white"
              aria-hidden="true"
            >
              {t.name[0]}
            </div>
            <div>
              <p className="font-heading font-700 text-white">{t.name}</p>
              <p className="text-text-muted text-sm">
                {t.role} · {t.company}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
            aria-label="Testemunho anterior"
            id="testimonial-prev-btn"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Seleccionar testemunho">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === active ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
                aria-label={`Testemunho ${i + 1}`}
                aria-selected={i === active}
                role="tab"
                id={`testimonial-tab-${i}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
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
