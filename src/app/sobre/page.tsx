import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Users, CheckCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Somos uma equipa jovem, apaixonada por tecnologia e comprometida em impulsionar a digitalização de Moçambique. Conheça a nossa missão, visão e valores.",
  alternates: { canonical: "/sobre" },
};

const values = [
  {
    icon: Target,
    title: "Missão",
    desc: "Transformar ideias em soluções digitais que impulsionam negócios e melhoram vidas em Moçambique e além.",
  },
  {
    icon: Eye,
    title: "Visão",
    desc: "Ser a empresa de tecnologia de referência em Moçambique, reconhecida pela inovação e excelência das nossas soluções.",
  },
  {
    icon: Heart,
    title: "Valores",
    desc: "Inovação, integridade, foco no cliente e compromisso com a qualidade em tudo o que fazemos.",
  },
];

const team = [
  { name: "Leo Appbuilder", role: "CEO & Fundador", initials: "LA", color: "#00D4AA" },
  { name: "Maria Silva", role: "CTO", initials: "MS", color: "#0088FF" },
  { name: "João Matos", role: "Lead Developer", initials: "JM", color: "#9333EA" },
  { name: "Ana Costa", role: "UI/UX Designer", initials: "AC", color: "#F59E0B" },
];

const reasons = [
  "Equipa local com conhecimento do mercado moçambicano",
  "Tecnologias modernas e soluções escaláveis",
  "Suporte técnico dedicado e personalizado",
  "Preços competitivos e propostas transparentes",
  "Experiência em múltiplos sectores de negócio",
  "Metodologia ágil com entregas rápidas",
];

export default function SobrePage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-grid" aria-labelledby="sobre-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-tag">Sobre a Lisis</div>
              <h1
                id="sobre-heading"
                className="text-4xl lg:text-5xl font-heading font-700 text-white mt-4 mb-6"
              >
                Uma equipa apaixonada por{" "}
                <span className="text-gradient">tecnologia</span>
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Somos uma equipa jovem, apaixonada por tecnologia e comprometida
                em impulsionar a digitalização de Moçambique. Nascemos com a
                missão de tornar a tecnologia acessível e impactante para
                empresas de todas as dimensões.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                Desde a nossa fundação, temos trabalhado lado a lado com os
                nossos clientes, entendendo os seus desafios e construindo
                soluções que realmente fazem a diferença.
              </p>
              <a
                href={getWhatsAppUrl("Olá! Gostaria de falar com a Lisis Tecnologias e Serviços sobre oportunidades de parceria e projectos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                id="sobre-cta-btn"
              >
                Falar no WhatsApp <ArrowRight size={18} />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5+", label: "Projetos Entregues", icon: "🚀" },
                { value: "3+", label: "Anos de Experiência", icon: "⭐" },
                { value: "100%", label: "Foco no Cliente", icon: "🤝" },
                { value: "4", label: "Produtos Próprios", icon: "💡" },
              ].map(({ value, label, icon }) => (
                <div key={label} className="glass-card p-6 text-center">
                  <span className="text-3xl mb-2 block" aria-hidden="true">{icon}</span>
                  <span className="text-3xl font-heading font-700 text-primary block">{value}</span>
                  <span className="text-sm text-text-muted mt-1 block">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="values-heading" className="text-3xl font-heading font-700 text-white">
              O que nos <span className="text-gradient">guia</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-8 text-center">
                <div className="service-icon mx-auto mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-heading font-700 text-white mb-3">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <Users size={14} /> A Nossa Equipa
            </div>
            <h2 id="team-heading" className="text-3xl font-heading font-700 text-white mt-4">
              As pessoas por <span className="text-gradient">trás da Lisis</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, initials, color }) => (
              <article key={name} className="glass-card p-6 text-center" aria-label={`${name}, ${role}`}>
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-heading font-700 text-white mx-auto mb-4"
                  style={{ background: `${color}25`, border: `2px solid ${color}40` }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <h3 className="font-heading font-700 text-white">{name}</h3>
                <p className="text-text-muted text-sm mt-1">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-10 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="section-tag">Porque a Lisis</div>
                <h2 id="why-heading" className="text-3xl font-heading font-700 text-white mt-4 mb-6">
                  Porque escolher <span className="text-gradient">a Lisis?</span>
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Somos mais do que uma empresa de tecnologia — somos o parceiro
                  de crescimento digital que o seu negócio precisa.
                </p>
              </div>
              <ul className="space-y-4">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-muted text-sm">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
