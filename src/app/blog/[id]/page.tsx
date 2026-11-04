import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blogData";
import { getWhatsAppUrl } from "@/lib/constants";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) {
    return { title: "Artigo não encontrado" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.id}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Voltar às Publicações</span>
          </Link>
        </div>

        {/* Header */}
        <header className="arch-card p-8 sm:p-10 bg-bg-surface mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="mono-index">{post.code}</span>
            <span className="tag">{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-700 text-text leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-text-muted pt-4 border-t border-border">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary" />
              {post.readTime} de leitura
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-primary" />
              Equipa de Engenharia Lisis
            </span>
          </div>
        </header>

        {/* Body Content */}
        <div className="arch-card p-8 sm:p-12 bg-bg-surface space-y-8">
          <p className="text-lg sm:text-xl text-text font-500 leading-relaxed border-l-2 border-primary pl-5">
            {post.content.intro}
          </p>

          {post.content.sections.map((sec) => (
            <section key={sec.heading} className="space-y-4">
              <h2 className="text-2xl font-heading font-700 text-text">
                {sec.heading}
              </h2>
              {sec.body.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-text-muted text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="p-6 rounded-xl bg-bg-elevated border border-border">
            <p className="font-mono text-xs uppercase tracking-wider text-primary font-600 mb-2">
              Conclusão Técnica
            </p>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </div>

        {/* Article CTA */}
        <div className="mt-10 arch-card p-8 bg-bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-700 text-xl text-text mb-1">
              Quer implementar esta solução na sua organização?
            </h3>
            <p className="text-text-muted text-sm">
              Fale com a equipa da Lisis Tecnologias e receba um diagnóstico
              personalizado.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(
              `Olá! Li o artigo "${post.title}" no site da Lisis e gostaria de conversar sobre um projecto.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm shrink-0"
          >
            <span>Falar no WhatsApp</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </article>
    </div>
  );
}

