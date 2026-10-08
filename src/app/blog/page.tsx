import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos, dicas e novidades sobre tecnologia, desenvolvimento de software, IA e transformação digital em Moçambique.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    id: "ia-negocios",
    title: "Como a tecnologia impulsiona os negócios em Moçambique",
    excerpt:
      "Descubra como empresas moçambicanas estão a usar tecnologia digital para crescer, reduzir custos e melhorar a experiência dos seus clientes.",
    date: "10 Abr 2025",
    readTime: "5 min",
    tags: ["Tecnologia", "Negócios", "Moçambique"],
    gradient: "from-primary/20 to-blue-500/10",
  },
  {
    id: "tendencias-ti-2025",
    title: "5 tendências de TI para 2025 que deve conhecer",
    excerpt:
      "Inteligência artificial, cloud computing, cybersecurity e mais. Conheça as tendências que vão moldar o sector de tecnologia em 2025.",
    date: "25 Mar 2025",
    readTime: "7 min",
    tags: ["TI", "Tendências", "2025"],
    gradient: "from-purple-500/20 to-primary/10",
  },
  {
    id: "sistema-gestao",
    title: "Vantagens de um sistema de gestão para a sua empresa",
    excerpt:
      "Saiba como um sistema ERP personalizado pode transformar a operação da sua empresa, reduzir erros e aumentar a produtividade.",
    date: "18 Mar 2025",
    readTime: "4 min",
    tags: ["ERP", "Gestão", "Produtividade"],
    gradient: "from-blue-500/20 to-primary/10",
  },
  {
    id: "react-native-mozambique",
    title: "Desenvolvimento mobile em Moçambique: desafios e oportunidades",
    excerpt:
      "Uma análise do mercado de apps móveis em Moçambique, os desafios de conectividade e como criar apps que funcionam mesmo offline.",
    date: "5 Mar 2025",
    readTime: "6 min",
    tags: ["Mobile", "React Native", "Mercado"],
    gradient: "from-orange-500/20 to-primary/10",
  },
  {
    id: "seo-mozambique",
    title: "SEO para empresas moçambicanas: guia prático",
    excerpt:
      "Como optimizar o seu site para aparecer no topo dos resultados de pesquisa no Google em Moçambique e aumentar o tráfego orgânico.",
    date: "20 Fev 2025",
    readTime: "8 min",
    tags: ["SEO", "Marketing Digital"],
    gradient: "from-green-500/20 to-primary/10",
  },
  {
    id: "seguranca-dados",
    title: "Segurança de dados: o que toda empresa deve saber",
    excerpt:
      "Proteja os dados da sua empresa e dos seus clientes. Um guia sobre boas práticas de cybersecurity para negócios de qualquer dimensão.",
    date: "10 Fev 2025",
    readTime: "5 min",
    tags: ["Segurança", "Cybersecurity", "Dados"],
    gradient: "from-red-500/20 to-primary/10",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-grid" aria-labelledby="blog-page-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit">Blog & Notícias</div>
          <h1
            id="blog-page-heading"
            className="text-4xl lg:text-6xl font-heading font-700 text-white mt-4 mb-6"
          >
            Fique por <span className="text-gradient">dentro</span>
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">
            Dicas, novidades e tendências do mundo digital. Conteúdo criado pela
            equipa Lisis para impulsionar o seu negócio.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16" aria-label="Artigos do blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <article
            className="glass-card mb-8 overflow-hidden group"
            aria-labelledby="featured-post-title"
          >
            <div className={`grid lg:grid-cols-2`}>
              <div className={`h-64 lg:h-auto bg-gradient-to-br ${posts[0].gradient} relative flex items-center justify-center`}>
                <div className="text-6xl" aria-hidden="true">📱</div>
                <span className="absolute top-4 left-4 tag">Destaque</span>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {posts[0].tags.map((t) => (
                    <span key={t} className="tag text-xs">{t}</span>
                  ))}
                </div>
                <h2 id="featured-post-title" className="text-2xl lg:text-3xl font-heading font-700 text-white mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-text-muted mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" aria-hidden="true" />
                    {posts[0].date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-primary" aria-hidden="true" />
                    {posts[0].readTime} de leitura
                  </span>
                </div>
                <Link
                  href={`/blog/${posts[0].id}`}
                  className="btn-primary self-start"
                  id={`blog-post-featured-btn`}
                >
                  Ler Artigo <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>

          {/* Rest of Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map(({ id, title, excerpt, date, readTime, tags, gradient }) => (
              <article
                key={id}
                className="glass-card overflow-hidden group flex flex-col"
                aria-labelledby={`blog-post-${id}-title`}
              >
                {/* Visual */}
                <div className={`h-40 bg-gradient-to-br ${gradient} relative flex items-center justify-center`}>
                  <div className="text-4xl" aria-hidden="true">
                    {id === "tendencias-ti-2025" ? "🚀" :
                     id === "sistema-gestao" ? "⚙️" :
                     id === "react-native-mozambique" ? "📱" :
                     id === "seo-mozambique" ? "🔍" : "🔐"}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tags.slice(0, 2).map((t) => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                  </div>
                  <h2
                    id={`blog-post-${id}-title`}
                    className="text-lg font-heading font-700 text-white mb-2 flex-1"
                  >
                    {title}
                  </h2>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">{excerpt}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} aria-hidden="true" /> {date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" /> {readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${id}`}
                      className="text-primary text-sm font-600 hover:underline inline-flex items-center gap-1"
                      aria-label={`Ler artigo: ${title}`}
                      id={`blog-post-${id}-btn`}
                    >
                      Ler <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16" aria-labelledby="blog-newsletter-heading">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="glass-card p-10">
            <Tag size={32} className="text-primary mx-auto mb-4" aria-hidden="true" />
            <h2 id="blog-newsletter-heading" className="text-2xl font-heading font-700 text-white mb-3">
              Subscreva a nossa newsletter
            </h2>
            <p className="text-text-muted mb-6">
              Receba os melhores artigos sobre tecnologia directamente no seu email.
            </p>
            <form
              action="/api/newsletter"
              method="POST"
              className="flex gap-3 max-w-md mx-auto"
              aria-label="Subscrever newsletter"
            >
              <input
                type="email"
                name="email"
                placeholder="O seu email"
                required
                className="form-input flex-1"
                id="blog-newsletter-email"
                aria-label="Email para newsletter"
              />
              <button
                type="submit"
                className="btn-primary flex-shrink-0"
                id="blog-newsletter-submit"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
