import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  ArrowUpRight,
  ShoppingCart,
  HeartPulse,
  HeartHandshake,
  UtensilsCrossed,
  Palmtree,
  Apple,
  Hotel,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const projects = [
  {
    id: "stoka",
    code: "PRJ // 01",
    title: "STOKA: Gestão de Vendas, Stock e PDV",
    category: "Retalho & Supermercados",
    description:
      "Sistema comercial completo que integra ponto de venda (POS), controlo de stock multi-armazém, alerta de rotura e relatórios de caixa para supermercados e lojas em Moçambique.",
    tags: ["Ponto de Venda", "Gestão de Stock", "Faturação", "Retalho"],
    url: "https://stoka-three.vercel.app/",
    icon: ShoppingCart,
    heroImage: "/projects/stoka-hero.png",
  },
  {
    id: "livehotel",
    code: "PRJ // 02",
    title: "LIVE HOTEL: Santuário Costeiro & Resort",
    category: "Hospitalidade & Resorts",
    description:
      "Plataforma cinematográfica imersiva para resort costeiro de alto padrão. Narrativa visual com suites oceanfront, santuário de bem-estar e motor de reservas diretas.",
    tags: ["Hotelaria de Luxo", "Resort", "Motor de Reservas", "Cinematográfico"],
    url: "https://livehotel.vercel.app/",
    icon: Hotel,
    heroImage: "/projects/livehotel-hero.png",
  },
  {
    id: "vilaflor",
    code: "PRJ // 03",
    title: "VILA FLOR: Casa de Praia em Ponta do Ouro",
    category: "Turismo & Alojamento",
    description:
      "Plataforma digital exclusiva para casa de praia colonial pé na areia em Ponta do Ouro. Apresenta acomodações de alto padrão, galeria imersiva e integração oficial com Airbnb Superhost.",
    tags: ["Turismo & Hotelaria", "Ponta do Ouro", "Alojamento", "Next.js"],
    url: "https://vilaflor.vercel.app/",
    icon: Palmtree,
    heroImage: "/projects/vilaflor-hero.png",
  },
  {
    id: "frutas",
    code: "PRJ // 04",
    title: "FRUTAS: Distribuição & E-Commerce",
    category: "Comércio & Distribuição",
    description:
      "Plataforma digital de distribuição de frutas selecionadas com catálogo dinâmico de produtos, cesto de compras e canal direto de pedidos automatizados via WhatsApp.",
    tags: ["E-Commerce", "Agronegócio", "WhatsApp Checkout", "Catálogo"],
    url: "https://frutas-zeta.vercel.app/",
    icon: Apple,
    heroImage: "/projects/frutas-hero.png",
  },
  {
    id: "medspa",
    code: "PRJ // 05",
    title: "MEDSPA: Clínica de Medicina Integrativa",
    category: "Saúde & Clínicas",
    description:
      "Plataforma digital para clínica de especialidades médicas. Apresenta especialidades clínicas, equipa médica e marcação directa de consultas integrada ao atendimento via WhatsApp.",
    tags: ["Portal Clínico", "Marcação de Consultas", "Saúde"],
    url: "https://medspa-kappa.vercel.app/",
    icon: HeartPulse,
    heroImage: "/projects/medspa-hero.png",
  },
  {
    id: "muliba",
    code: "PRJ // 06",
    title: "MULIBA: Gastronomia & Encomendas Online",
    category: "Restauração & Comércio",
    description:
      "Plataforma digital para restauração com menu interactivo por categorias, encomendas para entrega ou recolha e sistema de reserva de mesas em tempo real.",
    tags: ["Menu Digital", "Encomendas Online", "Reservas"],
    url: "https://muliba.vercel.app/",
    icon: UtensilsCrossed,
    heroImage: "/projects/muliba-hero.png",
  },
];

export default function PortfolioPreview() {
  return (
    <section
      className="py-24 lg:py-28 relative border-t border-border"
      aria-labelledby="portfolio-heading"
      id="portfolio-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-tag mb-4">04 // Portfólio Seleccionado</div>
            <h2
              id="portfolio-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-700 text-text"
            >
              Mais de 15 projectos <span className="text-gradient">entregues.</span>
            </h2>
            <p className="text-text-muted mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
              Inspeccione aplicações web e sistemas comerciais desenhados e
              colocados em produção pela equipa da Lisis Tecnologias.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="btn-secondary shrink-0"
            id="portfolio-view-all-btn"
          >
            <span>Explorar Todo o Portfólio</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* 6-Item Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(
            ({ id, code, title, category, description, tags, url, icon: Icon, heroImage }) => (
              <article
                key={id}
                className="arch-card overflow-hidden flex flex-col bg-bg-surface"
                aria-labelledby={`project-${id}-title`}
              >
                {/* Clean Screenshot Preview */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Abrir ${title} em nova aba`}
                  className="group relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-[#06101E]"
                >
                  <Image
                    src={heroImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/75 via-transparent to-transparent" />

                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#040D1A]/85 backdrop-blur-md border border-white/15 font-mono text-[11px] font-600 text-[#00D4AA]">
                      {code}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#040D1A]/80 backdrop-blur-md border border-white/15 font-mono text-[11px] text-white">
                      {category}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#040D1A]/85 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-xs font-mono text-white">
                    <span className="w-2 h-2 rounded-full bg-[#00D4AA]" />
                    <span>Online</span>
                    <ExternalLink size={12} className="text-[#00D4AA]" />
                  </div>
                </a>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                        <Icon size={18} />
                      </div>
                      <h3
                        id={`project-${id}-title`}
                        className="font-heading font-700 text-xl text-text"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {title}
                        </a>
                      </h3>
                    </div>

                    <p className="text-text-muted text-sm leading-relaxed mb-5">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-bg-elevated border border-border text-text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs py-2.5 px-4"
                      id={`project-${id}-live-btn`}
                    >
                      <span>Ver Projecto Online</span>
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href={getWhatsAppUrl(
                        `Olá! Vi o projecto ${title} e gostaria de solicitar uma proposta semelhante para a minha empresa.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-heading font-600 text-xs text-text-secondary hover:text-primary transition-colors"
                      id={`project-${id}-whatsapp-btn`}
                    >
                      <span>Pedir Proposta</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
