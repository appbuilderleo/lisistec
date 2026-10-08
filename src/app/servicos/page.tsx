import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Smartphone, LayoutDashboard, Headphones, GitMerge, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Oferecemos desenvolvimento web, aplicações móveis, sistemas de gestão, consultoria em TI e integração de sistemas em Moçambique.",
  alternates: { canonical: "/servicos" },
};

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Desenvolvimento Web",
    description:
      "Criamos websites e aplicações web modernas, rápidas e escaláveis. Desde landing pages a plataformas enterprise completas.",
    features: [
      "Sites institucionais e landing pages",
      "Aplicações web progressivas (PWA)",
      "E-commerce e lojas online",
      "Portais empresariais e intranets",
      "APIs e microserviços",
      "Integração com CMS",
    ],
    tech: ["Next.js", "React", "Node.js", "TypeScript"],
    color: "#0088FF",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Aplicações Móveis",
    description:
      "Desenvolvemos apps nativas e híbridas para iOS e Android com experiências de utilizador excepcionais.",
    features: [
      "Apps iOS e Android nativas",
      "Apps híbridas (React Native)",
      "UI/UX design centrado no utilizador",
      "Integração com APIs e backends",
      "Push notifications",
      "Publicação nas lojas (App Store / Play Store)",
    ],
    tech: ["React Native", "Expo", "Swift", "Kotlin"],
    color: "#9333EA",
  },
  {
    id: "sistemas",
    icon: LayoutDashboard,
    title: "Sistemas de Gestão",
    description:
      "ERP, CRM e sistemas personalizados para automatizar e otimizar os processos da sua empresa.",
    features: [
      "ERP customizado para o seu negócio",
      "CRM e gestão de clientes",
      "Sistemas de inventário e stock",
      "Gestão financeira e contabilidade",
      "Relatórios e dashboards em tempo real",
      "Multi-utilizador e multi-filial",
    ],
    tech: ["React", "PostgreSQL", "CockroachDB", "Node.js"],
    color: "#00D4AA",
  },
  {
    id: "consultoria",
    icon: Headphones,
    title: "Consultoria e Suporte",
    description:
      "Apoio técnico especializado e consultoria estratégica para guiar a transformação digital do seu negócio.",
    features: [
      "Diagnóstico e auditoria tecnológica",
      "Planeamento de arquitectura de sistemas",
      "Suporte técnico on-site e remoto",
      "Formação de equipas",
      "Segurança e backup de dados",
      "Monitorização e manutenção",
    ],
    tech: ["AWS", "Docker", "Linux", "CI/CD"],
    color: "#F59E0B",
  },
  {
    id: "integracao",
    icon: GitMerge,
    title: "Integração de Sistemas",
    description:
      "Conectamos os seus sistemas existentes para criar fluxos de trabalho automatizados e eficientes.",
    features: [
      "Integração de APIs de terceiros",
      "Webhooks e automações",
      "Migração de dados",
      "Sincronização entre sistemas",
      "Integração com ERPs existentes",
      "Conectores personalizados",
    ],
    tech: ["REST APIs", "GraphQL", "Zapier", "n8n"],
    color: "#10B981",
  },
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-dots" aria-labelledby="services-page-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit">Os Nossos Serviços</div>
          <h1
            id="services-page-heading"
            className="text-4xl lg:text-6xl font-heading font-700 text-white mt-4 mb-6"
          >
            Os nossos <span className="text-gradient">serviços</span>
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto mb-8">
            Soluções completas para o seu negócio. Desde o conceito ao
            lançamento e suporte contínuo.
          </p>
          <Link href="/contacto" className="btn-primary" id="services-page-cta">
            Solicitar Proposta <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16" aria-label="Detalhes dos serviços">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map(({ id, icon: Icon, title, description, features, tech, color }, index) => (
            <article
              key={id}
              id={id}
              className="glass-card p-8 lg:p-10 scroll-mt-28"
              aria-labelledby={`service-detail-${id}`}
            >
              <div className={`grid lg:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={26} style={{ color }} />
                    </div>
                    <h2
                      id={`service-detail-${id}`}
                      className="text-2xl font-heading font-700 text-white"
                    >
                      {title}
                    </h2>
                  </div>
                  <p className="text-text-muted leading-relaxed mb-6">{description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tech.map((t) => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                  </div>
                  <Link
                    href="/contacto"
                    className="btn-primary text-sm"
                    id={`service-${id}-contact-btn`}
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}
                  >
                    Solicitar este serviço <ArrowRight size={16} />
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <ul className="space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color }} aria-hidden="true" />
                        <span className="text-text-muted text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
