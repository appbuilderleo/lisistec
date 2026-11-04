"use client";

import Link from "next/link";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grid pt-24 pb-16 px-4">
      <div className="arch-card p-10 sm:p-14 bg-bg-surface max-w-lg w-full text-center">
        <div className="service-icon w-14 h-14 mx-auto mb-5">
          <Compass size={26} />
        </div>
        <span className="mono-index block mb-2">ERRO // 404</span>
        <h1 className="text-3xl sm:text-4xl font-heading font-700 text-text mb-3">
          Endereço não encontrado
        </h1>
        <p className="text-text-muted text-sm sm:text-base mb-8 leading-relaxed">
          A página solicitada não existe ou foi movida. Utilize os botões abaixo
          para regressar ao portal da Lisis Tecnologias.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary text-sm" id="not-found-home-btn">
            <Home size={16} />
            <span>Página Inicial</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn-secondary text-sm cursor-pointer"
            id="not-found-back-btn"
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
