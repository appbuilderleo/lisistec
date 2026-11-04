import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Terminal,
  Database,
  Layers,
  Smartphone,
  Palette,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { blogPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Publicações Técnicas & Artigos | Lisis Tecnologias",
  description:
    "Análises técnicas sobre desenvolvimento de software, sistemas ERP/POS/CRM, portais governamentais e identidade visual corporativa em Moçambique.",
  alternates: { canonical: "/blog" },
};

const postIcons: Record<string, typeof Terminal> = {
  "ia-negocios": Terminal,
  "sistema-gestao": Database,
  "tendencias-ti-2025": Layers,
  "react-native-mozambique": Smartphone,
  "seo-mozambique": Palette,
  "seguranca-dados": ShieldCheck,
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section
        className="py-16 lg:py-24 bg-grid border-b border-border"
        aria-labelledby="blog-page-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">
              <BookOpen size={14} /> Caderno Técnico // Publicações
            </div>
            <h1
              id="blog-page-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-text leading-tight mb-6"
            >
              Engenharia, gestão e{" "}
              <span className="text-gradient">transformação digital.</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Artigos técnicos redigidos pela equipa da Lisis Tecnologias sobre
              sistemas de gestão, portais institucionais, aplicações móveis e
              branding em Moçambique.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-20" aria-label="Artigos do blog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <article
            className="arch-card mb-12 p-7 sm:p-10 bg-bg-surface"
            aria-labelledby="featured-post-title"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 p-8 rounded-2xl bg-bg-elevated border border-border flex flex-col justify-between min-h-[240px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="tag">Destaque Editorial</span>
                  <span className="mono-index">{featured.code}</span>
                </div>
                <div className="my-6">
                  <div className="service-icon w-14 h-14 mb-4">
                    <Terminal size={26} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-primary font-600">
                    {featured.category}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-text-muted pt-4 border-t border-border">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-primary" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-primary" />
                    {featured.readTime} de leitura
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <h2
                  id="featured-post-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-heading font-700 text-text leading-tight"
                >
                  <Link
                    href={`/blog/${featured.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/blog/${featured.id}`}
                    className="btn-primary text-sm"
                    id="blog-post-featured-btn"
                  >
                    <span>Ler Artigo Completo</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Rest of Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map(({ id, code, title, excerpt, date, readTime, category, tags }) => {
              const Icon = postIcons[id] || Terminal;
              return (
                <article
                  key={id}
                  className="arch-card p-6 sm:p-7 bg-bg-surface flex flex-col justify-between"
                  aria-labelledby={`blog-post-${id}-title`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5 pb-4 border-b border-border">
                      <div className="service-icon w-11 h-11">
                        <Icon size={20} />
                      </div>
                      <span className="mono-index text-xs">{code}</span>
                    </div>

                    <p className="font-mono text-xs uppercase tracking-wider text-primary font-600 mb-2">
                      {category}
                    </p>

                    <h2
                      id={`blog-post-${id}-title`}
                      className="text-xl font-heading font-700 text-text mb-3 leading-snug"
                    >
                      <Link
                        href={`/blog/${id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {title}
                      </Link>
                    </h2>

                    <p className="text-text-muted text-sm mb-5 leading-relaxed">
                      {excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-bg-elevated border border-border text-text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} aria-hidden="true" /> {date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" /> {readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${id}`}
                      className="text-primary text-xs font-mono font-600 hover:underline inline-flex items-center gap-1"
                      aria-label={`Ler artigo: ${title}`}
                      id={`blog-post-${id}-btn`}
                    >
                      <span>Ler</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12" aria-labelledby="blog-newsletter-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="arch-card p-8 sm:p-10 bg-bg-surface text-center">
            <span className="mono-index block mb-2">
              BOLETIM TÉCNICO // LISIS TECNOLOGIAS
            </span>
            <h2
              id="blog-newsletter-heading"
              className="text-2xl font-heading font-700 text-text mb-3"
            >
              Receba artigos técnicos e estudos de caso no seu email
            </h2>
            <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
              Publicações periódicas sobre engenharia de software, gestão
              empresarial e transformação digital em Moçambique.
            </p>
            <form
              action="/api/newsletter"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Subscrever newsletter"
            >
              <input
                type="email"
                name="email"
                placeholder="O seu email corporativo"
                required
                className="form-input flex-1"
                id="blog-newsletter-email"
                aria-label="Email para newsletter"
              />
              <button
                type="submit"
                className="btn-primary shrink-0"
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
