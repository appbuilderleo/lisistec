"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { getWhatsAppUrl, TRUSTED_CLIENTS } from "@/lib/constants";

const categories = [
  "Todos",
  "Governo & Institucional",
  "Sistemas de Gestão & POS",
  "Sites & Plataformas Web",
  "Design & Identidade Visual",
];

const projects = [
  {
    id: "maputo-facim",
    code: "PRJ // 01",
    title: "Portal Oficial Maputo FACIM",
    category: "Governo & Institucional",
    client: "Província de Maputo · Promoção Económica",
    description:
      "Portal digital bilingue (Português e Inglês) que promove as potencialidades económicas, oportunidades de investimento e sectores produtivos da Província de Maputo.",
    tags: ["Portal Governamental", "Multilíngue", "Investimento", "Next.js"],
    image: "/projects/facim-hero.png",
    url: "https://maputofacim-kappa.vercel.app/en",
    year: "2025",
  },
  {
    id: "ccn-consultores",
    code: "PRJ // 02",
    title: "Portal Corporativo CCN Consultores",
    category: "Sites & Plataformas Web",
    client: "CCN Consultores Moçambique",
    description:
      "Plataforma institucional oficial da CCN Consultores Moçambique. Apresenta áreas de actuação estratégica, estudos económicos, equipa técnica e captação de oportunidades.",
    tags: ["Consultoria", "Portal Institucional", "Next.js", "SEO"],
    image: "/projects/ccn-hero.png",
    url: "https://ccnconsultores.com/",
    year: "2025",
  },
  {
    id: "crm-ccn",
    code: "PRJ // 03",
    title: "CRM Integrado CCN Consultores",
    category: "Sistemas de Gestão & POS",
    client: "CCN Consultores Moçambique",
    description:
      "Sistema privado de gestão de relacionamento com clientes (CRM) para controlo de leads, histórico de interacções, propostas comerciais e indicadores da equipa.",
    tags: ["Sistema CRM", "Gestão Comercial", "Autenticação", "Dashboard"],
    image: "/projects/crm-hero.png",
    url: "https://crm.ccnconsultores.com/login",
    year: "2025",
  },
  {
    id: "stoka",
    code: "PRJ // 04",
    title: "STOKA · Ponto de Venda & Gestão de Stock",
    category: "Sistemas de Gestão & POS",
    client: "Retalho & Supermercados (Cesta Cheia / Comércio)",
    description:
      "Sistema comercial de ponto de venda (POS), controlo de stock multi-armazém e fecho de caixa desenhado para supermercados, mercearias e lojas em Moçambique.",
    tags: ["Ponto de Venda", "Controlo de Stock", "Faturação", "Retalho"],
    image: "/projects/stoka-hero.png",
    url: "https://stoka-three.vercel.app/",
    year: "2025",
  },
  {
    id: "frutas",
    code: "PRJ // 05",
    title: "Frutas · Distribuição de Frutas Selecionadas",
    category: "Sites & Plataformas Web",
    client: "Agronegócio, Supermercados & Restauração",
    description:
      "Plataforma digital de distribuição de frutas frescas selecionadas com experiência visual interactiva, catálogo de produtos, cesto de encomendas e integração directa com WhatsApp.",
    tags: ["E-Commerce Alimentar", "Catálogo Digital", "Encomendas WhatsApp"],
    image: "/projects/frutas-hero.png",
    url: "https://frutas-zeta.vercel.app/",
    year: "2026",
  },
  {
    id: "vilaflor",
    code: "PRJ // 06",
    title: "Vila Flor · Casa de Praia Colonial em Ponta do Ouro",
    category: "Sites & Plataformas Web",
    client: "Hospitalidade & Turismo de Luxo em Moçambique",
    description:
      "Plataforma digital exclusiva para casa de praia colonial pé na areia em Ponta do Ouro. Apresenta acomodações de alto padrão, galeria imersiva, guia de experiências e integração oficial com Airbnb Superhost.",
    tags: ["Turismo & Hotelaria", "Ponta do Ouro", "Alojamento de Luxo", "Next.js"],
    image: "/projects/vilaflor-hero.png",
    url: "https://vilaflor.vercel.app/",
    year: "2026",
  },
  {
    id: "medspa",
    code: "PRJ // 07",
    title: "MEDSPA · Clínica de Medicina Integrativa",
    category: "Sites & Plataformas Web",
    client: "MEDSPA Moçambique",
    description:
      "Plataforma digital de clínica especializada em Medicina Funcional e Integrativa, com catálogo de especialidades e agendamento directo de consultas via WhatsApp.",
    tags: ["Saúde", "Marcação de Consultas", "Portal Clínico"],
    image: "/projects/medspa-hero.png",
    url: "https://medspa-kappa.vercel.app/",
    year: "2025",
  },
  {
    id: "muliba",
    code: "PRJ // 08",
    title: "MULIBA · Gastronomia & Encomendas Online",
    category: "Sites & Plataformas Web",
    client: "Restaurante Muliba",
    description:
      "Plataforma de restauração com menu digital interactivo, sistema de encomendas online para entrega/recolha e reserva de mesas em tempo real.",
    tags: ["Menu Digital", "Encomendas Online", "Reservas", "E-Commerce"],
    image: "/projects/muliba-hero.png",
    url: "https://muliba.vercel.app/",
    year: "2025",
  },
  {
    id: "convite",
    code: "PRJ // 09",
    title: "Plataforma de Credenciamento & Convite RSVP",
    category: "Sites & Plataformas Web",
    client: "Eventos & Protocolo",
    description:
      "Aplicação interactiva para eventos e cerimónias com confirmação de presença (RSVP) em tempo real, cronograma, localização GPS e gestão de convidados.",
    tags: ["RSVP em Tempo Real", "Eventos", "Mobile First"],
    image: "/projects/convite-hero.png",
    url: "https://convite-two-beige.vercel.app/",
    year: "2025",
  },
  {
    id: "branding-lisis",
    code: "PRJ // 10",
    title: "Arquitectura de Marca & Ecossistema Lisis Tech",
    category: "Design & Identidade Visual",
    client: "Lisis Tecnologias e Serviços",
    description:
      "Sistema de identidade visual corporativa, construção geométrica do símbolo delta, paleta cromática oficial e estacionário institucional.",
    tags: ["Branding Corporativo", "Identidade Visual", "Manual de Marca"],
    image: "/galeria/Branding_lisis.jpg",
    url: "/galeria",
    year: "2026",
  },
  {
    id: "cyan-software-logo",
    code: "PRJ // 11",
    title: "Logo & Identidade Tech: Cyan Software",
    category: "Design & Identidade Visual",
    client: "Empresa de Software & Cloud",
    description:
      "Desenho de logotipo vetorial e isotipo geométrico de alta precisão para empresa de engenharia de software e soluções cloud.",
    tags: ["Logo Design", "Isotipo Geométrico", "Vetor"],
    image: "/galeria/Cyan_logo_for_software_company_2K_20261013090832.jpg",
    url: "/galeria",
    year: "2026",
  },
  {
    id: "real-estate-brand",
    code: "PRJ // 12",
    title: "Brandbook & Mockups: Imobiliária Premium",
    category: "Design & Identidade Visual",
    client: "Consultoria Imobiliária & Investimentos",
    description:
      "Manual de normas de identidade visual (brandbook), paleta cromática, tipografia institucional e estacionário corporativo 3D.",
    tags: ["Brandbook", "Imobiliária", "Papelaria 3D"],
    image: "/galeria/Real_estate_brand_identity_mockup_2K_20261013084614.jpg",
    url: "/galeria",
    year: "2026",
  },
  {
    id: "red-tow-truck-branding",
    code: "PRJ // 13",
    title: "Branding de Frota & Sinalética: Red Tow Truck",
    category: "Design & Identidade Visual",
    client: "Assistência Rodoviária & Logística",
    description:
      "Construção visual e aplicação técnica de marca em viaturas de assistência 24h, fardamento operacional e sinalética exterior.",
    tags: ["Branding de Frota", "Sinalética", "Logística"],
    image: "/galeria/Red_tow_truck_logo_branding_2K_20261013085529.jpg",
    url: "/galeria",
    year: "2026",
  },
  {
    id: "cleaning-services-brand",
    code: "PRJ // 14",
    title: "Manual & Identidade: Limpeza & Facilities",
    category: "Design & Identidade Visual",
    client: "Serviços Corporativos & Higienização",
    description:
      "Logotipo vetorial e manual de aplicações práticas para equipas de higienização corporativa, fardamento e viaturas.",
    tags: ["Manual de Identidade", "Facilities", "Fardamento"],
    image: "/galeria/Cleaning_service_company_logo_2K_20261013131346.jpg",
    url: "/galeria",
    year: "2026",
  },
];

export default function PortfolioCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProjects =
    selectedCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Institutional Clients Section */}
      <section
        className="py-14 border-b border-border bg-bg-surface/40"
        aria-labelledby="portfolio-clients-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="mono-index block mb-2">
                ENTIDADES ATENDIDAS // +7 ANOS DE HISTÓRICO
              </span>
              <h2
                id="portfolio-clients-heading"
                className="text-2xl sm:text-3xl font-heading font-700 text-text"
              >
                Organizações com as quais já prestámos serviços
              </h2>
            </div>
            <span className="font-mono text-xs text-primary font-600">
              15+ Projectos Entregues em Moçambique
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUSTED_CLIENTS.map((client) => (
              <div
                key={client.id}
                className="p-4 rounded-xl bg-bg-surface border border-border flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="tag">{client.badge}</span>
                  <Building2 size={15} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-700 text-sm text-text mt-1">
                    {client.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">{client.scope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Filter & Projects Grid */}
      <section className="py-16 lg:py-20" aria-label="Catálogo de projectos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Spotlight Banner for 9:16 Design Gallery */}
          <div className="mb-12 p-6 sm:p-8 rounded-2xl arch-card bg-bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="tag">
                <Sparkles size={12} /> Galeria Vertical (Formato 9:16)
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-700 text-text">
                Caderno Visual de Logotipos, Brandbooks e Mockups 3D
              </h2>
              <p className="text-text-muted text-sm max-w-2xl leading-relaxed">
                Aceda à galeria dedicada em resolução vertical 9:16 para
                inspeccionar detalhes de construção vetorial, papelaria e
                branding de frotas.
              </p>
            </div>
            <Link
              href="/galeria"
              className="btn-primary text-sm px-6 py-3 shrink-0"
              id="portfolio-to-gallery-banner-btn"
            >
              <span>Abrir Galeria (9:16)</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-2 mb-10"
            role="tablist"
            aria-label="Filtrar projectos por categoria"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-600 transition-all cursor-pointer border ${
                    active
                      ? "bg-primary text-[#040D1A] border-primary shadow-neon"
                      : "bg-bg-surface border-border text-text-muted hover:text-text hover:border-primary/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map(
              ({ id, code, title, category, client, description, tags, image, year, url }) => {
                const isInternal = url.startsWith("/");

                return (
                  <article
                    key={id}
                    className="arch-card overflow-hidden group flex flex-col bg-bg-surface"
                    aria-labelledby={`project-page-${id}`}
                  >
                    {/* Real Image Header */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-[#06101E]">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-[#040D1A]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] font-600 text-[#00D4AA]">
                          {code}
                        </span>
                      </div>

                      <span className="absolute top-3 right-3 font-mono text-[11px] text-white bg-[#040D1A]/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/15">
                        {year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="tag">{category}</span>
                        </div>
                        <p className="font-mono text-[11px] text-primary uppercase tracking-wider mb-1">
                          {client}
                        </p>
                        <h3
                          id={`project-page-${id}`}
                          className="text-xl font-heading font-700 text-text mb-2.5"
                        >
                          {title}
                        </h3>
                        <p className="text-text-muted text-sm mb-5 leading-relaxed">
                          {description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
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

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border mt-auto">
                        {isInternal ? (
                          <Link
                            href={url}
                            className="btn-primary text-xs py-2.5 px-4"
                            id={`portfolio-visit-${id}`}
                          >
                            <span>Ver na Galeria</span>
                            <ArrowRight size={14} />
                          </Link>
                        ) : (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-2.5 px-4"
                            id={`portfolio-visit-${id}`}
                          >
                            <span>Aceder ao Site</span>
                            <ExternalLink size={14} />
                          </a>
                        )}

                        <a
                          href={getWhatsAppUrl(
                            `Olá! Vi o projecto ${title} no portfólio da Lisis e gostaria de solicitar uma proposta semelhante.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-heading font-600 text-xs text-text-secondary hover:text-primary transition-colors"
                          id={`portfolio-wa-${id}`}
                        >
                          <span>Pedir Proposta</span>
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>
      </section>
    </>
  );
}

