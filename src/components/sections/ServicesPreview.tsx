import Link from "next/link";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Headphones,
  GitMerge,
  ArrowRight,
  ArrowUpRight,
  Palette,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

const services = [
  {
    id: "sistemas",
    code: "01",
    icon: LayoutDashboard,
    title: "Sistemas de Gestão (ERP, CRM & POS)",
    description:
      "Plataformas à medida para controlo de facturação, inventário multi-loja, gestão académica, fluxos ministeriais e pipelines comerciais.",
    features: [
      "ERP e Ponto de Venda (POS) para retalho",
      "CRM e portais de gestão institucional",
      "Dashboards analíticos em tempo real",
    ],
    link: "/servicos#sistemas",
  },
  {
    id: "web",
    code: "02",
    icon: Globe,
    title: "Portais Institucionais & Aplicações Web",
    description:
      "Websites corporativos, portais governamentais bilingues e plataformas web de alto desempenho optimizadas para segurança e SEO.",
    features: [
      "Arquitectura Next.js & React de alta velocidade",
      "Portais para ministérios, feiras e consultoras",
      "Conformidade técnica e alojamento resiliente",
    ],
    link: "/servicos#web",
  },
  {
    id: "design",
    code: "03",
    icon: Palette,
    title: "Design, Logotipos & Identidade Visual",
    description:
      "Construção de marcas corporativas completas: desenho vetorial de logotipos, manuais de normas (brandbooks), estacionário e sinalética de frota.",
    features: [
      "Logotipos 100% vetoriais e registo de marca",
      "Manual de Identidade Visual (Pantone, CMYK, RGB)",
      "Mockups 3D, fardamento e decoração de viaturas",
    ],
    link: "/galeria",
  },
  {
    id: "mobile",
    code: "04",
    icon: Smartphone,
    title: "Aplicações Móveis (iOS & Android)",
    description:
      "Aplicações móveis nativas e multiplataforma desenhadas para operar com fluidez mesmo em cenários de conectividade variável em Moçambique.",
    features: [
      "Apps iOS e Android com sincronização offline",
      "Integração com pagamentos móveis e notificações",
      "Interfaces intuitivas focadas na retenção",
    ],
    link: "/servicos#mobile",
  },
  {
    id: "integracao",
    code: "05",
    icon: GitMerge,
    title: "Integração de Sistemas & APIs",
    description:
      "Interligação segura entre softwares legados, bases de dados, sistemas bancários, ERPs e plataformas de atendimento automático no WhatsApp.",
    features: [
      "APIs RESTful, Webhooks e microsserviços",
      "Migração estruturada e saneamento de dados",
      "Automação de processos operacionais",
    ],
    link: "/servicos#integracao",
  },
  {
    id: "consultoria",
    code: "06",
    icon: Headphones,
    title: "Consultoria TI & Suporte Dedicado",
    description:
      "Acompanhamento técnico contínuo, auditoria de infraestrutura, formação de equipas operacionais e manutenção evolutiva de sistemas críticos.",
    features: [
      "SLAs de resposta rápida presencial e remota",
      "Capacitação de equipas técnicas e utilizadores",
      "Segurança, backups e monitorização contínua",
    ],
    link: "/servicos#consultoria",
  },
];

export default function ServicesPreview() {
  return (
    <section
      className="py-24 lg:py-28 relative"
      aria-labelledby="services-heading"
      id="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Editorial Column (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="section-tag">01 // Capacidades Técnicas</div>
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl font-heading font-700 text-text leading-tight"
            >
              Da arquitectura de software ao{" "}
              <span className="text-gradient">posicionamento visual</span> da
              sua marca.
            </h2>
            <p className="text-text-muted text-base leading-relaxed">
              Não entregamos peças isoladas. Construímos a infraestrutura
              tecnológica e a identidade institucional que permitem a
              ministérios, universidades e empresas operar com eficiência.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/servicos"
                className="btn-primary justify-between"
                id="all-services-btn"
              >
                <span>Ver Catálogo Completo de Serviços</span>
                <ArrowRight size={17} />
              </Link>
              <a
                href={getWhatsAppUrl(
                  "Olá! Gostaria de agendar um diagnóstico técnico ou solicitar proposta de serviços com a Lisis Tecnologias."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary justify-between"
                id="services-whatsapp-cta"
              >
                <span>Solicitar Caderno de Encargos</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          {/* Right Services Matrix (8 cols) */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {services.map(({ id, code, icon: Icon, title, description, features, link }) => (
              <article
                key={id}
                className="arch-card p-7 flex flex-col justify-between bg-bg-surface"
                aria-labelledby={`service-${id}-title`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="service-icon">
                      <Icon size={22} />
                    </div>
                    <span className="mono-index text-xs px-2.5 py-1 rounded bg-bg-elevated border border-border">
                      MOD // {code}
                    </span>
                  </div>

                  <h3
                    id={`service-${id}-title`}
                    className="font-heading font-700 text-xl text-text mb-3"
                  >
                    {title}
                  </h3>

                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {description}
                  </p>

                  <ul className="space-y-2 mb-6 pt-4 border-t border-border">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-xs text-text-secondary font-500"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                          aria-hidden="true"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-border mt-auto">
                  <Link
                    href={link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-600 text-text-secondary hover:text-primary transition-colors"
                  >
                    <span>{id === "design" ? "Explorar Galeria" : "Especificações"}</span>
                    <ArrowRight size={13} />
                  </Link>

                  <a
                    href={getWhatsAppUrl(
                      `Olá! Gostaria de solicitar uma proposta para o serviço: ${title}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-heading font-700 text-primary hover:underline"
                    id={`service-${id}-whatsapp-btn`}
                  >
                    <span>Pedir Proposta</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
