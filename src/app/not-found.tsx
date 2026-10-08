"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grid pt-20">
      <div className="text-center px-4">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <span
            className="text-[12rem] font-heading font-700 leading-none select-none"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,170,0.15) 0%, rgba(0,136,255,0.1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            aria-hidden="true"
          >
            404
          </span>
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-8xl">🔍</span>
          </div>
        </div>

        <h1 className="text-3xl font-heading font-700 text-white mb-4">
          Página não encontrada
        </h1>
        <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
          A página que procura não existe ou foi movida. Volte à página
          inicial para continuar a explorar.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary" id="not-found-home-btn">
            <Home size={18} />
            Página Inicial
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary cursor-pointer"
            id="not-found-back-btn"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
