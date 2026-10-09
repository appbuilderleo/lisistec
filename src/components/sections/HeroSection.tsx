"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Settings, HeadphonesIcon } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

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
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid"
      style={{ paddingTop: "96px", paddingBottom: "64px" }}
      aria-label="Secção principal"
      id="hero"
    >
      {/* Animated background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Two-column layout */}
        <div className="hero-two-col" style={{ display: "grid", alignItems: "center", gap: "64px" }}>

          {/* Left: Text Content */}
          <div>
            <div className="section-tag" style={{ marginBottom: "24px" }} role="text">
              <span
                aria-hidden="true"
                style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00D4AA", display: "inline-block", animation: "pulse-neon 3s ease-in-out infinite" }}
              />
              Smart Solutions. Real Growth.
            </div>

            <h1 className="hero-headline" style={{ marginBottom: "16px" }}>
              <span style={{ color: "#ffffff" }}>Transformamos </span>
              <span className="text-gradient-hero">ideias </span>
              <span style={{ color: "#ffffff" }}>em</span>
              <br />
              <span style={{ color: "#00D4AA", textShadow: "0 0 30px rgba(0,212,170,0.4)" }}>
                {displayText}
                <span className="typed-cursor" aria-hidden="true" />
              </span>
            </h1>

            <p className="hero-sub" style={{ marginTop: "24px", marginBottom: "32px", maxWidth: "520px" }}>
              Tecnologia, inovação e pessoas para um futuro mais eficiente.
              Soluções digitais feitas em Moçambique, para o mundo.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <a
                href={getWhatsAppUrl("Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                id="hero-proposal-btn"
              >
                Solicitar Proposta
                <ArrowRight size={18} />
              </a>
              <Link href="/servicos" className="btn-secondary" id="hero-services-btn">
                Conheça os nossos serviços
              </Link>
            </div>
          </div>

          {/* Right: Visual (hidden on mobile) */}
          <div className="hero-visual" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Central floating card */}
            <div className="glass-card animate-float" style={{ padding: "32px", width: "320px", position: "relative", zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(239,68,68,0.7)", display: "block" }} />
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(234,179,8,0.7)", display: "block" }} />
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(34,197,94,0.7)", display: "block" }} />
                <span style={{ marginLeft: "8px", fontSize: "12px", color: "#4A5E7A", fontFamily: "monospace" }}>lisis.app</span>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ color: "#60a5fa" }}>const</span>
                  <span style={{ color: "#00D4AA" }}>solution</span>
                  <span style={{ color: "#ffffff" }}>=</span>
                  <span style={{ color: "#facc15" }}>await</span>
                </div>
                <div style={{ paddingLeft: "16px" }}>
                  <span style={{ color: "#8B9CC0" }}>lisis</span><span style={{ color: "#ffffff" }}>.</span><span style={{ color: "#00D4AA" }}>build</span><span style={{ color: "#ffffff" }}>{`({`}</span>
                </div>
                <div style={{ paddingLeft: "32px" }}><span style={{ color: "#8B9CC0" }}>client:</span><span style={{ color: "#4ade80" }}> &quot;you&quot;</span><span style={{ color: "#ffffff" }}>,</span></div>
                <div style={{ paddingLeft: "32px" }}><span style={{ color: "#8B9CC0" }}>goal:</span><span style={{ color: "#4ade80" }}> &quot;growth&quot;</span><span style={{ color: "#ffffff" }}>,</span></div>
                <div style={{ paddingLeft: "16px" }}><span style={{ color: "#ffffff" }}>{`});`}</span></div>
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00D4AA", display: "block", animation: "pulse-neon 3s infinite" }} />
                  <span style={{ color: "#00D4AA" }}>✓ Build successful</span>
                </div>
              </div>
            </div>

            {/* Badge: Web App */}
            <div className="glass-card" style={{ padding: "12px 16px", position: "absolute", top: "-16px", left: "-16px", display: "flex", alignItems: "center", gap: "12px", animation: "float 6s ease-in-out 1s infinite" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(0,212,170,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Code2 size={16} style={{ color: "#00D4AA" }} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Web App</div>
                <div style={{ fontSize: "10px", color: "#8B9CC0" }}>Entregue ✓</div>
              </div>
            </div>

            {/* Badge: Mobile App */}
            <div className="glass-card" style={{ padding: "12px 16px", position: "absolute", bottom: "-16px", right: "-16px", display: "flex", alignItems: "center", gap: "12px", animation: "float 6s ease-in-out 2s infinite" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Smartphone size={16} style={{ color: "#60a5fa" }} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600 }}>Mobile App</div>
                <div style={{ fontSize: "10px", color: "#8B9CC0" }}>Em progresso</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Services Bar */}
        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(0,212,170,0.15)" }} id="stats">
          <div className="services-grid">
            {quickServices.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="glass-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px", cursor: "default" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00D4AA", flexShrink: 0 }}>
                  <Icon size={22} />
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#ffffff" }}>{label}</p>
                  <p style={{ fontSize: "12px", color: "#8B9CC0", marginTop: "2px" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-two-col { grid-template-columns: 1fr; }
        .hero-visual { display: none; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        @media (min-width: 1024px) {
          .hero-two-col { grid-template-columns: 1fr 1fr; }
          .hero-visual { display: flex; }
        }
      `}</style>
    </section>
  );
}
