import Link from "next/link";
import { Bot, GraduationCap, Package, ArrowRight, Zap } from "lucide-react";

const solutions = [
  {
    id: "assist",
    icon: Bot,
    name: "Lisis Assist",
    tagline: "Assistente via Inteligência Artificial",
    description:
      "Assistente virtual com IA para automatizar atendimento ao cliente, responder perguntas e otimizar processos de suporte empresarial 24/7.",
    features: [
      "Atendimento automatizado 24/7",
      "Integração com WhatsApp",
      "Análise de sentimentos",
      "Relatórios de interação",
    ],
    color: "#00D4AA",
    badge: "IA",
    href: "/solucoes#assist",
  },
  {
    id: "school",
    icon: GraduationCap,
    name: "Lisis School",
    tagline: "Gestão Escolar Completa",
    description:
      "Plataforma completa de gestão escolar para controlar matrículas, notas, turmas, professores e comunicação com pais e encarregados.",
    features: [
      "Matrículas online",
      "Portal para pais",
      "Gestão de notas",
      "Comunicação integrada",
    ],
    color: "#0088FF",
    badge: "EduTech",
    href: "/solucoes#school",
  },
  {
    id: "stoka",
    icon: Package,
    name: "Stoka",
    tagline: "Gestão de Stock e PDV",
    description:
      "Sistema de gestão de inventário e ponto de venda para pequenos e médios negócios. Controle total do seu stock em tempo real.",
    features: [
      "PDV intuitivo",
      "Controlo de stock em tempo real",
      "Relatórios de vendas",
      "Multi-loja",
    ],
    color: "#9333EA",
    badge: "Commerce",
    href: "/solucoes#stoka",
  },
];

export default function SolutionsPreview() {
  return (
    <section
      className="py-24 relative"
      aria-labelledby="solutions-heading"
      id="solutions-section"
      style={{
        background:
          "linear-gradient(180deg, transparent, rgba(0,212,170,0.02), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">
            <Zap size={14} />
            Soluções Próprias
          </div>
          <h2
            id="solutions-heading"
            className="text-4xl lg:text-5xl font-heading font-700 text-white mt-4 mb-4"
          >
            Soluções que fazem a{" "}
            <span className="text-gradient">diferença</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Produtos e plataformas criadas para aumentar a produtividade e gerar
            resultados reais para o seu negócio.
          </p>
        </div>

        {/* Solutions Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map(({ id, icon: Icon, name, tagline, description, features, color, badge, href }) => (
            <article
              key={id}
              className="glass-card p-8 flex flex-col group"
              aria-labelledby={`solution-${id}-title`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <span
                  className="tag text-xs"
                  style={{
                    background: `${color}15`,
                    borderColor: `${color}30`,
                    color,
                  }}
                >
                  {badge}
                </span>
              </div>

              <h3
                id={`solution-${id}-title`}
                className="text-2xl font-heading font-700 text-white mb-1"
              >
                {name}
              </h3>
              <p
                className="text-sm font-600 mb-4"
                style={{ color }}
              >
                {tagline}
              </p>
              <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                {description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}20` }}
                      aria-hidden="true"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: color }}
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={href}
                className="inline-flex items-center gap-2 font-600 text-sm hover:gap-3 transition-all group/link"
                style={{ color }}
                aria-label={`Saber mais sobre ${name}`}
                id={`solution-${id}-btn`}
              >
                Saber mais
                <ArrowRight
                  size={16}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/solucoes" className="btn-secondary" id="all-solutions-btn">
            Ver Todas as Soluções
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
