import Link from "next/link";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-labelledby="cta-heading"
      id="cta-section"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(0,136,255,0.05) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-20 blur-3xl rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00D4AA, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="glass-card p-12 lg:p-16">
          <div className="section-tag mx-auto w-fit mb-6">Vamos começar</div>
          <h2
            id="cta-heading"
            className="text-4xl lg:text-5xl font-heading font-700 text-white mb-6 leading-tight"
          >
            Pronto para{" "}
            <span className="text-gradient">transformar</span>
            <br />o seu negócio?
          </h2>
          <p className="text-text-muted text-lg mb-10 max-w-2xl mx-auto">
            Estamos prontos para ajudar o seu negócio a crescer com tecnologia
            de ponta. Fale connosco hoje e receba uma proposta personalizada.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contacto"
              className="btn-primary text-base py-3.5 px-8"
              id="cta-contact-btn"
            >
              <MessageSquare size={20} />
              Solicitar Proposta Grátis
            </Link>
            <a
              href="tel:+258841234567"
              className="btn-secondary text-base py-3.5 px-8"
              id="cta-phone-btn"
            >
              <Phone size={20} />
              Ligar Agora
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-border">
            {[
              "✓ Proposta gratuita",
              "✓ Sem compromisso",
              "✓ Resposta em 24h",
              "✓ Suporte dedicado",
            ].map((item) => (
              <span key={item} className="text-sm text-text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
