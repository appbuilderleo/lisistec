import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "web-platform",
    title: "Plataforma Web Empresarial",
    category: "Sites e Plataformas Web",
    description: "Portal corporativo com gestão de conteúdo e área de cliente.",
    tags: ["Next.js", "CockroachDB", "Vercel"],
    gradient: "from-blue-600/30 to-primary/20",
  },
  {
    id: "mobile-app",
    title: "App de Gestão Comercial",
    category: "Aplicações Móveis",
    description: "Aplicação móvel para gestão de vendas e inventário em tempo real.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    gradient: "from-purple-600/30 to-blue-500/20",
  },
  {
    id: "erp-system",
    title: "Sistema ERP Integrado",
    category: "Sistemas de Gestão",
    description: "ERP completo para empresa de médio porte com módulos financeiros e RH.",
    tags: ["React", "Express", "MySQL"],
    gradient: "from-primary/30 to-green-500/20",
  },
  {
    id: "ui-design",
    title: "Design UX para FinTech",
    category: "Design e UX/UI",
    description: "Redesign completo de aplicação financeira com foco em usabilidade.",
    tags: ["Figma", "Design System", "Prototyping"],
    gradient: "from-orange-500/30 to-primary/20",
  },
];

export default function PortfolioPreview() {
  return (
    <section
      className="py-24 relative"
      aria-labelledby="portfolio-heading"
      id="portfolio-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-tag">Portfólio</div>
            <h2
              id="portfolio-heading"
              className="text-4xl lg:text-5xl font-heading font-700 text-white mt-4"
            >
              Projetos em{" "}
              <span className="text-gradient">destaque</span>
            </h2>
            <p className="text-text-muted mt-4 max-w-xl">
              Conheça alguns dos trabalhos que desenvolvemos para os nossos clientes.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="btn-secondary flex-shrink-0"
            id="portfolio-view-all-btn"
          >
            Ver todos
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(({ id, title, category, description, tags, gradient }) => (
            <article
              key={id}
              className="glass-card overflow-hidden group cursor-pointer"
              aria-labelledby={`project-${id}-title`}
            >
              {/* Visual preview */}
              <div
                className={`h-48 bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden`}
              >
                {/* Mock UI elements */}
                <div className="absolute inset-4 rounded-lg border border-white/10 flex flex-col gap-2 p-3 opacity-60 group-hover:opacity-90 transition-opacity">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex gap-2 mt-1">
                    <div className="h-2 w-16 bg-white/20 rounded" />
                    <div className="h-2 w-10 bg-white/15 rounded" />
                    <div className="h-2 w-12 bg-white/15 rounded" />
                  </div>
                  <div className="flex-1 flex gap-2 mt-1">
                    <div className="w-1/3 rounded bg-white/10" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="h-3 bg-white/20 rounded" />
                      <div className="h-3 w-3/4 bg-white/15 rounded" />
                      <div className="h-3 w-1/2 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>
                <ExternalLink
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-70 transition-opacity relative z-10"
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="tag text-xs mb-3 inline-block">
                  {category}
                </span>
                <h3
                  id={`project-${id}-title`}
                  className="text-xl font-heading font-700 text-white mb-2"
                >
                  {title}
                </h3>
                <p className="text-text-muted text-sm mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md bg-bg-surface border border-border text-text-muted"
                    >
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
  );
}
