"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5, suffix: "+", label: "Projetos Entregues", description: "Soluções digitais de sucesso" },
  { value: 3, suffix: "+", label: "Anos de Experiência", description: "Foco em tecnologia" },
  { value: 100, suffix: "%", label: "Foco no Cliente", description: "Satisfação garantida" },
  { value: 4, suffix: "", label: "Soluções Próprias", description: "Produtos inovadores" },
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
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section
      className="py-20 relative"
      aria-label="Estatísticas da Lisis"
      id="about-stats"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(0,212,170,0.03), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, suffix, label, description }) => (
            <article
              key={label}
              className="glass-card p-8 text-center group"
              aria-label={`${label}: ${value}${suffix}`}
            >
              <span className="stat-value text-4xl font-heading font-700 text-primary block">
                <CountUp target={value} suffix={suffix} />
              </span>
              <h3 className="text-white font-heading font-600 text-sm mt-3 mb-1">
                {label}
              </h3>
              <p className="text-text-muted text-xs">{description}</p>
              <div className="section-divider mx-auto mt-4" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
