import Link from "next/link";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Headphones,
  GitMerge,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Desenvolvimento Web",
    description:
      "Criamos websites e aplicações web modernas, rápidas e escaláveis usando as mais recentes tecnologias.",
    features: ["Next.js & React", "APIs RESTful", "CMS & E-commerce"],
    color: "from-blue-500/20 to-primary/10",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Aplicações Móveis",
    description:
      "Desenvolvemos apps nativas e híbridas para iOS e Android que os seus utilizadores vão adorar.",
    features: ["React Native", "iOS & Android", "UI/UX Premium"],
    color: "from-purple-500/20 to-primary/10",
  },
  {
    id: "sistemas",
    icon: LayoutDashboard,
    title: "Sistemas de Gestão",
    description:
      "ERP, CRM e sistemas de gestão personalizados para automatizar e otimizar os seus processos empresariais.",
    features: ["ERP Customizado", "Relatórios em tempo real", "Multi-utilizador"],
    color: "from-primary/20 to-blue-500/10",
  },
  {
    id: "consultoria",
    icon: Headphones,
    title: "Consultoria e Suporte",
    description:
      "Apoio técnico especializado e consultoria estratégica em tecnologia para o seu negócio crescer.",
    features: ["Suporte 24/7", "Formação técnica", "Assessoria TI"],
    color: "from-orange-500/20 to-primary/10",
  },
  {
    id: "integracao",
    icon: GitMerge,
    title: "Integração de Sistemas",
    description:
      "Conectamos os seus sistemas existentes para criar fluxos de trabalho automatizados e eficientes.",
    features: ["APIs & Webhooks", "Automação", "Migração de dados"],
    color: "from-green-500/20 to-primary/10",
  },
];

export default function ServicesPreview() {
  return (
    <section
      className="py-24 relative"
      aria-labelledby="services-heading"
      id="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">Os Nossos Serviços</div>
          <h2
            id="services-heading"
            className="text-4xl lg:text-5xl font-heading font-700 text-white mt-4 mb-4"
          >
            Soluções completas para o{" "}
            <span className="text-gradient">seu negócio</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Oferecemos um conjunto completo de serviços de tecnologia para
            transformar e acelerar o crescimento da sua empresa.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ id, icon: Icon, title, description, features, color }) => (
            <article
              key={id}
              className="glass-card p-8 group relative overflow-hidden"
              aria-labelledby={`service-${id}-title`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="service-icon mb-5">
                  <Icon size={24} />
                </div>

                <h3
                  id={`service-${id}-title`}
                  className="text-xl font-heading font-700 text-white mb-3"
                >
                  {title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {description}
                </p>

                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-text-muted"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/servicos#${id}`}
                  className="inline-flex items-center gap-2 text-sm text-primary font-600 hover:gap-3 transition-all group/link"
                  aria-label={`Saber mais sobre ${title}`}
                >
                  Saber mais
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </article>
          ))}

          {/* CTA Card */}
          <article className="glass-card p-8 flex flex-col items-center justify-center text-center border-dashed">
            <div
              className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4"
              aria-hidden="true"
            >
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-white font-heading font-700 text-lg mb-2">
              Tem um projecto?
            </h3>
            <p className="text-text-muted text-sm mb-5">
              Vamos conversar sobre como podemos ajudar.
            </p>
            <Link
              href="/contacto"
              className="btn-primary text-sm py-2.5"
              id="services-cta-btn"
            >
              Falar Connosco
              <ArrowRight size={16} />
            </Link>
          </article>
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            href="/servicos"
            className="btn-secondary"
            id="all-services-btn"
          >
            Ver Todos os Serviços
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
