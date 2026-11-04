import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Target,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Code2,
  Database,
  Palette,
  Headphones,
} from "lucide-react";
import { getWhatsAppUrl, COMPANY_STATS, TRUSTED_CLIENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre a Lisis Tecnologias | +7 Anos de Engenharia Digital em Moçambique",
  description:
    "Com mais de 7 anos de experiência e mais de 15 projectos entregues, a Lisis Tecnologias desenvolve software, sistemas de gestão e identidades visuais para instituições públicas e empresas em Moçambique.",
  alternates: { canonical: "/sobre" },
};

const pillars = [
  {
    code: "01",
    icon: Target,
    title: "Missão",
    desc: "Construir sistemas digitais, plataformas institucionais e identidades visuais que modernizam a administração pública, o ensino superior e o sector empresarial em Moçambique.",
  },
  {
    code: "02",
    icon: Eye,
    title: "Visão",
    desc: "Consolidar a posição de parceiro tecnológico de referência para instituições governamentais, universidades e empresas moçambicanas que exigem engenharia fiável e suporte local.",
  },
  {
    code: "03",
    icon: ShieldCheck,
    title: "Compromisso Técnico",
    desc: "Rigor na arquitectura de dados, cumprimento de prazos contratuais, documentação clara, formação presencial das equipas e acompanhamento contínuo pós-entrega.",
  },
];

const engineeringUnits = [
  {
    code: "UNIDADE // 01",
    icon: Code2,
    name: "Engenharia Web & Portais",
    role: "Plataformas Governamentais & Corporativas",
    desc: "Arquitectura de portais institucionais bilingues, plataformas de investimento e aplicações web de alta disponibilidade.",
  },
  {
    code: "UNIDADE // 02",
    icon: Database,
    name: "Sistemas de Gestão & POS",
    role: "ERP, CRM, Académico & Retalho",
    desc: "Desenvolvimento de sistemas transaccionais para supermercados, escolas, universidades e consultoras.",
  },
  {
    code: "UNIDADE // 03",
    icon: Palette,
    name: "Design & Identidade Corporativa",
    role: "Logotipos Vetoriais & Brandbooks",
    desc: "Construção geométrica de marcas, manuais de normas técnicas, estacionário e sinalética de frotas.",
  },
  {
    code: "UNIDADE // 04",
    icon: Headphones,
    name: "Consultoria, Formação & SLA",
    role: "Suporte Técnico & Operações",
    desc: "Capacitação de utilizadores, migração de dados, auditoria de redes e suporte técnico dedicado em Maputo.",
  },
];

const reasons = [
  "Mais de 7 anos de actuação contínua no mercado moçambicano",
  "Mais de 15 projectos entregues e em operação real",
  "Experiência comprovada com Ministérios, Universidades e Sector Privado",
  "Domínio integrado de Engenharia de Software e Design de Identidade",
  "Produtos próprios validados no terreno (STOKA POS, Lisis School, CRM)",
  "Suporte técnico local em Maputo com formação directa das equipas",
];

export default function SobrePage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-grid border-b border-border" aria-labelledby="sobre-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="section-tag">Institucional // Desde 2019</div>
              <h1
                id="sobre-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-text leading-tight"
              >
                Mais de 7 anos a construir{" "}
                <span className="text-gradient">infraestrutura digital</span> em Moçambique.
              </h1>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                A Lisis Tecnologias e Serviços é uma empresa moçambicana de
                engenharia de software, sistemas de gestão e design corporativo
                sedeada em Maputo. Ao longo de mais de 7 anos de actividade,
                entregámos mais de 15 projectos de alta responsabilidade para o
                sector público, ensino superior, comércio e serviços.
              </p>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Trabalhamos lado a lado com direcções executivas e equipas
                técnicas para desenhar soluções que resolvem problemas reais de
                atendimento, controlo financeiro, gestão académica e
                posicionamento institucional.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={getWhatsAppUrl(
                    "Olá! Gostaria de falar com a direcção da Lisis Tecnologias sobre um projecto institucional ou parceria."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  id="sobre-cta-btn"
                >
                  <span>Falar com a Nossa Equipa</span>
                  <ArrowRight size={18} />
                </a>
                <Link href="/portfolio" className="btn-secondary">
                  <span>Ver Projectos Entregues</span>
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

            {/* Quantitative Stats Grid */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
              {COMPANY_STATS.map(({ code, value, suffix, label, description }) => (
                <div
                  key={code}
                  className="arch-card p-6 bg-bg-surface flex flex-col justify-between"
                >
                  <span className="mono-index text-xs mb-3 block">
                    INDICADOR // {code}
                  </span>
                  <div>
                    <span className="text-4xl font-heading font-700 text-primary block">
                      {value}
                      {suffix}
                    </span>
                    <h2 className="font-heading font-700 text-base text-text mt-2">
                      {label}
                    </h2>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Institutions & Clients Section */}
      <section className="py-20 border-b border-border bg-bg-surface/40" aria-labelledby="clients-list-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="section-tag mb-4">01 // Histórico de Entregas</div>
            <h2
              id="clients-list-heading"
              className="text-3xl sm:text-4xl font-heading font-700 text-text"
            >
              Instituições e empresas que confiaram na{" "}
              <span className="text-gradient">Lisis Tecnologias.</span>
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-3 leading-relaxed">
              O nosso portfólio inclui órgãos governamentais, instituições de
              ensino superior, entidades de certificação, empresas de
              consultoria e redes de supermercados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUSTED_CLIENTS.map((client, idx) => (
              <article
                key={client.id}
                className="arch-card p-6 bg-bg-surface flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="tag">{client.badge}</span>
                    <span className="mono-index text-xs">0{idx + 1}</span>
                  </div>
                  <div className="flex items-start gap-2.5 mb-2">
                    <Building2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <h3 className="font-heading font-700 text-base text-text leading-snug">
                      {client.name}
                    </h3>
                  </div>
                  <p className="font-mono text-[11px] text-primary uppercase tracking-wider mb-3">
                    {client.sector}
                  </p>
                </div>
                <p className="text-xs text-text-muted leading-relaxed pt-3 border-t border-border">
                  {client.scope}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 border-b border-border" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="section-tag mb-4">02 // Princípios Directores</div>
            <h2 id="values-heading" className="text-3xl sm:text-4xl font-heading font-700 text-text">
              O que orienta a nossa <span className="text-gradient">engenharia.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map(({ code, icon: Icon, title, desc }) => (
              <div key={title} className="arch-card p-8 bg-bg-surface">
                <div className="flex items-center justify-between mb-6">
                  <div className="service-icon">
                    <Icon size={22} />
                  </div>
                  <span className="mono-index">PILAR // {code}</span>
                </div>
                <h3 className="text-xl font-heading font-700 text-text mb-3">
                  {title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multidisciplinary Units */}
      <section className="py-20 border-b border-border bg-bg-surface/40" aria-labelledby="units-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="section-tag mb-4">03 // Estrutura Operacional</div>
            <h2 id="units-heading" className="text-3xl sm:text-4xl font-heading font-700 text-text">
              Núcleos de especialização <span className="text-gradient">técnica.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringUnits.map(({ code, icon: Icon, name, role, desc }) => (
              <article
                key={code}
                className="arch-card p-6 bg-bg-surface flex flex-col justify-between"
              >
                <div>
                  <span className="mono-index text-xs block mb-4">{code}</span>
                  <div className="service-icon mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-700 text-lg text-text">
                    {name}
                  </h3>
                  <p className="font-mono text-xs text-primary mt-1 mb-3">
                    {role}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="arch-card p-8 sm:p-12 lg:p-14 bg-bg-surface">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="section-tag">04 // Diferenciais Lisis</div>
                <h2
                  id="why-heading"
                  className="text-3xl sm:text-4xl font-heading font-700 text-text"
                >
                  Porquê escolher a <span className="text-gradient">Lisis Tecnologias?</span>
                </h2>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                  Combinamos capacidade técnica de desenvolvimento à medida com
                  conhecimento profundo das operações públicas e privadas em
                  Moçambique.
                </p>
                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl(
                      "Olá! Gostaria de agendar uma reunião com a equipa da Lisis Tecnologias."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    <span>Agendar Reunião Técnica</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid sm:grid-cols-2 gap-4">
                  {reasons.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 p-4 rounded-xl bg-bg-elevated border border-border"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-text-secondary text-xs sm:text-sm font-500">
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
