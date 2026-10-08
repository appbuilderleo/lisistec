"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Settings, HeadphonesIcon } from "lucide-react";

const typewriterWords = [
  "Soluções Digitais",
  "Aplicações Móveis",
  "Sistemas de Gestão",
  "Inovação Tecnológica",
];

const quickServices = [
  {
    icon: Code2,
    label: "Desenvolvimento de Software",
    desc: "Web apps modernas e escaláveis",
  },
  {
    icon: Smartphone,
    label: "Soluções Web e Mobile",
    desc: "Apps para iOS e Android",
  },
  {
    icon: Settings,
    label: "Consultoria em Tecnologia",
    desc: "Estratégia e transformação digital",
  },
  {
    icon: HeadphonesIcon,
    label: "Suporte e Manutenção",
    desc: "Suporte técnico especializado",
  },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex];

    if (!isDeleting && charIndex < currentWord.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % typewriterWords.length);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-grid"
      aria-label="Secção principal"
      id="hero"
    >
      {/* Animated background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <div className="section-tag mb-6" role="text">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Smart Solutions. Real Growth.
            </div>

            {/* Headline */}
            <h1 className="hero-headline mb-4">
              <span className="text-white">Transformamos </span>
              <span className="text-gradient-hero">ideias </span>
              <span className="text-white">em</span>
              <br />
              <span
                className="text-primary"
                style={{ textShadow: "0 0 30px rgba(0,212,170,0.4)" }}
              >
                {displayText}
                <span className="typed-cursor" aria-hidden="true" />
              </span>
            </h1>

            <p className="hero-sub mt-6 mb-8 max-w-lg">
              Tecnologia, inovação e pessoas para um futuro mais eficiente.
              Soluções digitais feitas em Moçambique, para o mundo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/servicos"
                className="btn-primary"
                id="hero-services-btn"
              >
                Conheça os nossos serviços
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/portfolio"
                className="btn-secondary"
                id="hero-portfolio-btn"
              >
                Ver Portfólio
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Central floating card */}
            <div
              className="glass-card p-8 w-80 animate-float relative z-10"
              style={{ animationDelay: "0s" }}
            >
              {/* Mock code window */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-text-faint font-mono">
                  lisis.app
                </span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex gap-2">
                  <span className="text-blue-400">const</span>
                  <span className="text-primary">solution</span>
                  <span className="text-white">=</span>
                  <span className="text-yellow-400">await</span>
                </div>
                <div className="pl-4 flex gap-1">
                  <span className="text-text-muted">lisis</span>
                  <span className="text-white">.</span>
                  <span className="text-primary">build</span>
                  <span className="text-white">{"({"}</span>
                </div>
                <div className="pl-8">
                  <span className="text-text-muted">client:</span>
                  <span className="text-green-400"> "you"</span>
                  <span className="text-white">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-text-muted">goal:</span>
                  <span className="text-green-400"> "growth"</span>
                  <span className="text-white">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-white">{"});"}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary">✓ Build successful</span>
                </div>
              </div>
            </div>

            {/* Floating badge cards */}
            <div
              className="glass-card px-4 py-3 absolute -top-4 -left-4 animate-float flex items-center gap-3"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Code2 size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-white font-600">Web App</div>
                <div className="text-[10px] text-text-muted">Entregue ✓</div>
              </div>
            </div>

            <div
              className="glass-card px-4 py-3 absolute -bottom-4 -right-4 animate-float flex items-center gap-3"
              style={{ animationDelay: "2s" }}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Smartphone size={16} className="text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-white font-600">Mobile App</div>
                <div className="text-[10px] text-text-muted">Em progresso</div>
              </div>
            </div>

            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full opacity-20 animate-pulse-neon pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Quick Services Bar (From Sitemap) */}
        <div className="mt-16 pt-8 border-t border-border/40 w-full" id="stats">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickServices.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="glass-card p-5 flex items-center gap-4 hover:border-primary/40 transition-all group cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-bg transition-all flex-shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-sm font-heading font-600 text-white group-hover:text-primary transition-colors">
                    {label}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
