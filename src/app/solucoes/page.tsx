import type { Metadata } from "next";
import Link from "next/link";
import { Bot, GraduationCap, Package, ArrowRight, CheckCircle, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Conheça as nossas soluções digitais: Lisis Assist (IA), Lisis School (gestão escolar) e Stoka (gestão de stock e PDV).",
  alternates: { canonical: "/solucoes" },
};

const solutions = [
  {
    id: "assist",
    icon: Bot,
    name: "Lisis Assist",
    tagline: "Assistente via Inteligência Artificial",
    description:
      "O Lisis Assist é um assistente virtual inteligente que automatiza o atendimento ao cliente, responde perguntas frequentes e encaminha casos complexos para a sua equipa. Disponível 24 horas por dia, 7 dias por semana.",
    features: [
      "Atendimento automático 24/7",
      "Integração nativa com WhatsApp Business",
      "Processamento de linguagem natural em Português",
      "Análise de sentimentos das conversas",
      "Dashboard com métricas de atendimento",
      "Escalada inteligente para agentes humanos",
      "Base de conhecimento personalizável",
      "Relatórios semanais automáticos",
    ],
    useCases: ["Empresas de serviços", "E-commerce", "Bancos e finanças", "Saúde"],
    color: "#00D4AA",
    badge: "IA & Automação",
  },
  {
    id: "school",
    icon: GraduationCap,
    name: "Lisis School",
    tagline: "Plataforma Completa de Gestão Escolar",
    description:
      "O Lisis School é uma plataforma moderna de gestão escolar que digitaliza toda a administração académica: matrículas, notas, turmas, professores e comunicação com encarregados de educação.",
    features: [
      "Portal de matrículas online",
      "Gestão de turmas e horários",
      "Lançamento e consulta de notas",
      "Portal para pais e encarregados",
      "Comunicação interna (mensagens e avisos)",
      "Gestão de propinas e pagamentos",
      "Geração de boletins e certificados",
      "App móvel para professores e pais",
    ],
    useCases: ["Escolas primárias", "Escolas secundárias", "Centros de formação", "Universidades"],
    color: "#0088FF",
    badge: "EduTech",
  },
  {
    id: "stoka",
    icon: Package,
    name: "Stoka",
    tagline: "Gestão de Stock e Ponto de Venda",
    description:
      "O Stoka é um sistema completo de gestão de inventário e ponto de venda (PDV) desenhado para pequenos e médios negócios moçambicanos. Simples, rápido e acessível.",
    features: [
      "Interface de PDV intuitiva",
      "Controlo de stock em tempo real",
      "Gestão de fornecedores",
      "Relatórios de vendas e lucros",
      "Emissão de recibos digitais",
      "Suporte a múltiplas lojas",
      "Alertas de stock mínimo",
      "Integração com impressoras fiscais",
    ],
    useCases: ["Supermercados", "Farmácias", "Lojas de roupa", "Restaurantes"],
    color: "#9333EA",
    badge: "Commerce",
  },
];

export default function SolucoesPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-grid" aria-labelledby="solutions-page-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit">
            <Zap size={14} /> As Nossas Soluções
          </div>
          <h1
            id="solutions-page-heading"
            className="text-4xl lg:text-6xl font-heading font-700 text-white mt-4 mb-6"
          >
            Produtos que fazem a{" "}
            <span className="text-gradient">diferença</span>
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">
            Plataformas e ferramentas desenvolvidas pela Lisis para resolver
            problemas reais do mercado moçambicano.
          </p>
        </div>
      </section>

      {/* Solutions Detail */}
      <section className="py-16" aria-label="Detalhes das soluções">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {solutions.map(({ id, icon: Icon, name, tagline, description, features, useCases, color, badge }) => (
            <article
              key={id}
              id={id}
              className="glass-card p-8 lg:p-12 scroll-mt-28"
              aria-labelledby={`solution-detail-${id}`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start gap-4 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `2px solid ${color}30` }}
                >
                  <Icon size={30} style={{ color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h2
                      id={`solution-detail-${id}`}
                      className="text-3xl font-heading font-700 text-white"
                    >
                      {name}
                    </h2>
                    <span
                      className="tag"
                      style={{ background: `${color}15`, borderColor: `${color}30`, color }}
                    >
                      {badge}
                    </span>
                  </div>
                  <p className="font-600 text-sm" style={{ color }}>{tagline}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-1">
                  <p className="text-text-muted leading-relaxed mb-6">{description}</p>

                  <div className="mb-6">
                    <h3 className="text-white font-heading font-600 text-sm uppercase tracking-wider mb-3">
                      Ideal para
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {useCases.map((u) => (
                        <span key={u} className="text-xs px-3 py-1 rounded-full bg-bg-surface border border-border text-text-muted">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contacto"
                    className="btn-primary text-sm"
                    id={`solution-${id}-contact-btn`}
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}
                  >
                    Solicitar Demo <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Features */}
                <div className="lg:col-span-2">
                  <h3 className="text-white font-heading font-600 text-sm uppercase tracking-wider mb-4">
                    Funcionalidades
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {features.map((f) => (
                      <div key={f} className="flex items-start gap-3 p-3 rounded-lg bg-bg-surface/50 border border-border">
                        <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color }} aria-hidden="true" />
                        <span className="text-text-muted text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* In development teaser */}
      <section className="py-16" aria-label="Projectos em desenvolvimento">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 text-center border-dashed">
            <div className="section-tag mx-auto w-fit mb-4">Em Breve</div>
            <h2 className="text-2xl font-heading font-700 text-white mb-3">
              Mais soluções a caminho 🚀
            </h2>
            <p className="text-text-muted max-w-lg mx-auto mb-6">
              Estamos a desenvolver novos produtos para responder às necessidades
              do mercado moçambicano. Subscreva a nossa newsletter para ser o
              primeiro a saber.
            </p>
            <Link href="/contacto" className="btn-secondary" id="coming-soon-newsletter-btn">
              Receber Novidades <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
