import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Conheça os projetos desenvolvidos pela Lisis Tecnologias: sites, plataformas web, aplicações móveis, sistemas de gestão e design UI/UX.",
  alternates: { canonical: "/portfolio" },
};

const categories = ["Todos", "Sites e Plataformas Web", "Aplicações Móveis", "Sistemas de Gestão", "Design e UX/UI"];

const projects = [
  {
    id: "corporate-portal",
    title: "Portal Corporativo TradeCom",
    category: "Sites e Plataformas Web",
    description: "Plataforma web completa com área de clientes, catálogo de produtos e integração de pagamentos.",
    tags: ["Next.js", "CockroachDB", "Stripe"],
    gradient: "from-blue-600/30 to-primary/20",
    year: "2024",
  },
  {
    id: "school-mgmt",
    title: "Lisis School - Escola Horizonte",
    category: "Sistemas de Gestão",
    description: "Implementação do sistema Lisis School para escola com 800 alunos e 60 professores.",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-primary/30 to-blue-500/20",
    year: "2024",
  },
  {
    id: "stock-app",
    title: "Stoka - Supermercado Modelo",
    category: "Sistemas de Gestão",
    description: "Sistema de gestão de stock e PDV para rede de 3 supermercados em Maputo.",
    tags: ["React Native", "Express", "CockroachDB"],
    gradient: "from-purple-600/30 to-blue-500/20",
    year: "2023",
  },
  {
    id: "fintech-ui",
    title: "Redesign App FinTech MozBank",
    category: "Design e UX/UI",
    description: "Redesign completo da experiência mobile para aplicação bancária com 50k utilizadores.",
    tags: ["Figma", "Prototyping", "User Testing"],
    gradient: "from-orange-500/30 to-primary/20",
    year: "2023",
  },
  {
    id: "delivery-app",
    title: "App de Delivery Rápido",
    category: "Aplicações Móveis",
    description: "Aplicação de entrega de comida e mercearia com rastreamento em tempo real.",
    tags: ["React Native", "Google Maps", "Firebase"],
    gradient: "from-green-500/30 to-primary/20",
    year: "2024",
  },
  {
    id: "landing-tech",
    title: "Landing Page TechStartup",
    category: "Sites e Plataformas Web",
    description: "Landing page de alta conversão para startup de tecnologia, com animações e SEO optimizado.",
    tags: ["Next.js", "Framer Motion", "Vercel"],
    gradient: "from-primary/20 to-purple-500/20",
    year: "2025",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-dots" aria-labelledby="portfolio-page-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit">Portfólio</div>
          <h1
            id="portfolio-page-heading"
            className="text-4xl lg:text-6xl font-heading font-700 text-white mt-4 mb-6"
          >
            Projetos em <span className="text-gradient">destaque</span>
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">
            Conheça alguns dos trabalhos que desenvolvemos para os nossos clientes.
          </p>
        </div>
      </section>

      {/* Categories Filter (visual only) */}
      <section className="py-6 border-b border-border" aria-label="Categorias de projetos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-600 cursor-pointer transition-all ${
                  i === 0
                    ? "bg-primary text-bg border border-primary"
                    : "border border-border text-text-muted hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16" aria-label="Projetos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(({ id, title, category, description, tags, gradient, year }) => (
              <article
                key={id}
                className="glass-card overflow-hidden group"
                aria-labelledby={`project-page-${id}`}
              >
                {/* Visual */}
                <div className={`h-48 bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-4 rounded-lg border border-white/10 flex flex-col gap-2 p-3 opacity-50 group-hover:opacity-80 transition-opacity">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    </div>
                    <div className="flex gap-2 mt-1">
                      <div className="h-2 w-16 bg-white/20 rounded" />
                      <div className="h-2 w-10 bg-white/15 rounded" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 mt-2">
                      <div className="h-3 bg-white/20 rounded" />
                      <div className="h-3 w-3/4 bg-white/15 rounded" />
                      <div className="h-3 w-1/2 bg-white/10 rounded" />
                    </div>
                  </div>
                  <ExternalLink size={20} className="text-white opacity-0 group-hover:opacity-60 transition-opacity relative z-10" aria-hidden="true" />
                  <span className="absolute top-3 right-3 text-xs text-white/50 bg-black/30 px-2 py-0.5 rounded">{year}</span>
                </div>

                <div className="p-6">
                  <span className="tag text-xs mb-3 inline-block">{category}</span>
                  <h2 id={`project-page-${id}`} className="text-lg font-heading font-700 text-white mb-2">
                    {title}
                  </h2>
                  <p className="text-text-muted text-sm mb-4">{description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-bg-surface border border-border text-text-muted">
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

      {/* CTA */}
      <section className="py-16" aria-label="Iniciar projecto">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass-card p-10">
            <h2 className="text-2xl font-heading font-700 text-white mb-4">
              Tem um projeto em mente?
            </h2>
            <p className="text-text-muted mb-6">
              Vamos criar algo incrível juntos. Fale connosco e receba uma proposta personalizada.
            </p>
            <a
              href={getWhatsAppUrl("Olá! Gostaria de iniciar um projecto e solicitar uma proposta com a Lisis Tecnologias.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="portfolio-cta-btn"
            >
              Solicitar Proposta no WhatsApp <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
