import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Conheça os projetos reais desenvolvidos pela Lisis Tecnologias: CCN Consultores, CRM CCN, Maputo FACIM, STOKA, MEDSPA, Convite Digital e MULIBA.",
  alternates: { canonical: "/portfolio" },
};

const categories = [
  "Todos",
  "Sites e Plataformas Web",
  "Sistemas de Gestão",
  "E-Commerce & Retalho",
  "Aplicações Interativas",
];

const projects = [
  {
    id: "ccn-consultores",
    title: "CCN Consultores Moçambique",
    category: "Sites e Plataformas Web",
    description:
      "Site institucional oficial da Empresa de Consultoria CCN Consultores Moçambique. Apresenta de forma elegante os serviços corporativos, equipa técnica e áreas de actuação estratégica.",
    tags: ["Consultoria", "Next.js", "Design Corporativo", "SEO"],
    gradient: "from-teal-500/30 to-blue-600/20",
    url: "https://ccnconsultores.com/",
    year: "2025",
  },
  {
    id: "crm-ccn",
    title: "CRM CCN Consultores",
    category: "Sistemas de Gestão",
    description:
      "Sistema integrado de gestão de clientes (CRM) para controlo de leads, histórico de interações, propostas comerciais e tarefas da equipa de consultores.",
    tags: ["CRM", "Gestão de Clientes", "Autenticação", "Dashboard"],
    gradient: "from-blue-600/30 to-purple-600/20",
    url: "https://crm.ccnconsultores.com/login",
    year: "2025",
  },
  {
    id: "maputo-facim",
    title: "Portal Maputo FACIM",
    category: "Sites e Plataformas Web",
    description:
      "Portal digital internacional que exibe as potencialidades económicas, oportunidades de investimento e atracções da Província de Maputo em Português e Inglês.",
    tags: ["Multilíngue", "Investimentos", "Província de Maputo", "Turismo"],
    gradient: "from-purple-600/30 to-teal-500/20",
    url: "https://maputofacim-kappa.vercel.app/en",
    year: "2025",
  },
  {
    id: "stoka",
    title: "STOKA - Gestão de Vendas & PDV",
    category: "Sistemas de Gestão",
    description:
      "Sistema de gestão de vendas para comércio local, integrando ponto de venda (PDV) e sistema de pagamentos. Ideal para mercearias e retalho local.",
    tags: ["Ponto de Venda", "Stock", "Pagamentos", "Retalho"],
    gradient: "from-teal-600/30 to-emerald-500/20",
    url: "https://stoka-three.vercel.app/",
    year: "2025",
  },
  {
    id: "medspa",
    title: "MEDSPA - Clínica Integrativa",
    category: "Sites e Plataformas Web",
    description:
      "Site de clínica especializada em Medicina Funcional e Integrativa, com catálogo de tratamentos e sistema direto de agendamento de consultas pelo WhatsApp.",
    tags: ["Saúde", "Agendamento WhatsApp", "Medicina Integrativa"],
    gradient: "from-cyan-600/30 to-blue-500/20",
    url: "https://medspa-kappa.vercel.app/",
    year: "2025",
  },
  {
    id: "convite",
    title: "Convite Digital Interativo",
    category: "Aplicações Interativas",
    description:
      "Convite de casamento digital eletrónico com confirmação de presença (RSVP) em tempo real, cronograma, mapa GPS e detalhes do evento.",
    tags: ["Convite Digital", "RSVP em Tempo Real", "Mobile First"],
    gradient: "from-amber-500/30 to-pink-500/20",
    url: "https://convite-two-beige.vercel.app/",
    year: "2025",
  },
  {
    id: "muliba",
    title: "MULIBA - Gastronomia & Restaurante",
    category: "E-Commerce & Retalho",
    description:
      "Site de restaurante moderno com cardápio digital incorporado, sistema de pedidos online de comida e reserva de mesas em tempo real.",
    tags: ["Cardápio Digital", "Pedidos Online", "Reserva de Mesas"],
    gradient: "from-rose-600/30 to-amber-500/20",
    url: "https://muliba.vercel.app/",
    year: "2025",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-dots" aria-labelledby="portfolio-page-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit">Portfólio em Produção</div>
          <h1
            id="portfolio-page-heading"
            className="text-4xl lg:text-6xl font-heading font-700 text-white mt-4 mb-6"
          >
            Projetos em <span className="text-gradient">destaque</span>
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">
            Conheça as plataformas, sistemas e websites desenvolvidos pela Lisis Tecnologias que estão no ar. Clique nos links para aceder diretamente a cada projecto em nova aba.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16" aria-label="Projetos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(({ id, title, category, description, tags, gradient, year, url }) => (
              <article
                key={id}
                className="glass-card overflow-hidden group flex flex-col"
                aria-labelledby={`project-page-${id}`}
              >
                {/* Visual Header */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-44 bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden p-6 text-center text-white font-heading font-700 text-lg transition-transform`}
                  title={`Aceder a ${title} (abre em nova aba)`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <span className="relative z-10 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex items-center gap-2">
                    {title}
                    <ExternalLink size={16} />
                  </span>
                  <span className="absolute top-3 right-3 text-xs text-white/70 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                    {year}
                  </span>
                </a>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="tag text-xs mb-3 inline-block w-fit">{category}</span>
                  <h2 id={`project-page-${id}`} className="text-xl font-heading font-700 text-white mb-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {title}
                    </a>
                  </h2>
                  <p className="text-text-muted text-sm mb-4 leading-relaxed flex-1">{description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-bg-surface border border-border text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm py-2.5 px-4 justify-center"
                      id={`portfolio-visit-${id}`}
                    >
                      Aceder ao Site <ExternalLink size={15} />
                    </a>

                    <a
                      href={getWhatsAppUrl(`Olá! Vi o projecto ${title} e gostaria de solicitar uma proposta para uma solução similar.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-2 px-3 justify-center"
                      id={`portfolio-wa-${id}`}
                    >
                      Pedir Proposta Similar via WhatsApp
                    </a>
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
              Vamos criar algo incrível juntos. Fale connosco e receba uma proposta personalizada diretamente no WhatsApp.
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
