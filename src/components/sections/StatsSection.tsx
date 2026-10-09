"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5,   suffix: "+", label: "Projetos Entregues",  description: "Soluções digitais de sucesso" },
  { value: 3,   suffix: "+", label: "Anos de Experiência", description: "Foco em tecnologia" },
  { value: 100, suffix: "%", label: "Foco no Cliente",     description: "Satisfação garantida" },
  { value: 4,   suffix: "",  label: "Soluções Próprias",   description: "Produtos inovadores" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start = Math.min(start + step, target);
            setCount(start);
            if (start >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="counter">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section
      style={{ padding: "80px 0", position: "relative" }}
      aria-label="Estatísticas da Lisis"
      id="about-stats"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          background: "linear-gradient(180deg, transparent, rgba(0,212,170,0.03), transparent)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
          {stats.map(({ value, suffix, label, description }) => (
            <article
              key={label}
              className="glass-card"
              style={{ padding: "32px", textAlign: "center" }}
              aria-label={`${label}: ${value}${suffix}`}
            >
              <span className="stat-value">
                <CountUp target={value} suffix={suffix} />
              </span>
              <h3 style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", marginTop: "12px", marginBottom: "4px" }}>
                {label}
              </h3>
              <p style={{ color: "#8B9CC0", fontSize: "12px" }}>{description}</p>
              <div className="section-divider" style={{ margin: "16px auto 0" }} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
