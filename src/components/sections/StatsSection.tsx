"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANY_STATS } from "@/lib/constants";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1200;
          const step = Math.max(1, Math.ceil(target / (duration / 16)));
          const timer = setInterval(() => {
            start = Math.min(start + step, target);
            setCount(start);
            if (start >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.4 }
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
      className="py-16 lg:py-20 relative border-y border-border bg-bg-surface/60"
      aria-label="Indicadores de maturidade da Lisis Tecnologias"
      id="about-stats"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {COMPANY_STATS.map(({ code, value, suffix, label, description }, idx) => (
            <article
              key={code}
              className={`py-6 sm:py-2 ${idx === 0
                  ? "sm:pr-8"
                  : idx === COMPANY_STATS.length - 1
                    ? "sm:pl-8"
                    : "sm:px-8"
                }`}
              aria-label={`${label}: ${value}${suffix}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="mono-index">MÉTRICA // {code}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              </div>
              <span className="stat-value">
                <CountUp target={value} suffix={suffix} />
              </span>
              <h2 className="font-heading font-700 text-base text-text mt-3 mb-1.5">
                {label}
              </h2>
              <p className="text-xs text-text-muted leading-relaxed">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
