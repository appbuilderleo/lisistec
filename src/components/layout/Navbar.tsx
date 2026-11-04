"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import { useTheme } from "@/components/layout/ThemeProvider";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/galeria", label: "Galeria" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 glass-nav ${
          isScrolled ? "py-2.5 shadow-card" : "py-4"
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
          aria-label="Navegação principal"
        >
          {/* Architectural Brand Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Lisis Tecnologias e Serviços - Página Inicial"
          >
            <div className="w-10 h-10 rounded-xl bg-[#061325] border border-[#00D4AA]/30 flex items-center justify-center p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logolisisnova.png"
                alt="Símbolo Lisis Tecnologias"
                width={36}
                height={36}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-700 text-lg leading-none tracking-tight text-text">
                LISIS
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-primary mt-0.5">
                Tecnologias
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-7" role="list">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions: Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-bg-elevated border border-border hover:border-primary text-text-muted hover:text-primary flex items-center justify-center transition-all cursor-pointer"
              aria-label={
                theme === "dark" ? "Activar modo claro" : "Activar modo escuro"
              }
              title={
                theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"
              }
              id="theme-toggle-desktop"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5"
              id="nav-cta-btn"
            >
              <span>Solicitar Proposta</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-bg-elevated border border-border text-text-muted hover:text-primary flex items-center justify-center transition-all cursor-pointer"
              aria-label={
                theme === "dark" ? "Activar modo claro" : "Activar modo escuro"
              }
              id="theme-toggle-mobile"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              className="w-10 h-10 rounded-xl bg-bg-elevated border border-border text-text-muted hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-label="Menu de navegação móvel"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-bg-elevated border border-border text-text-muted hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>

          {/* Brand Lockup in mobile menu */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-[#061325] border border-[#00D4AA]/30 flex items-center justify-center p-2">
              <Image
                src="/logolisisnova.png"
                alt="Lisis Tecnologias e Serviços"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading font-700 text-xl leading-none text-text">
                LISIS
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-primary mt-0.5">
                Tecnologias & Serviços
              </span>
            </div>
          </div>

          <ul className="flex flex-col items-center gap-4" role="list">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-xl font-heading font-600 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-text-secondary hover:text-primary"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-xs">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-secondary w-full text-sm py-2.5"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={16} /> Mudar para Modo Claro
                </>
              ) : (
                <>
                  <Moon size={16} /> Mudar para Modo Escuro
                </>
              )}
            </button>
            <a
              href={getWhatsAppUrl(
                "Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-sm py-3"
              id="mobile-cta-btn"
            >
              <span>Solicitar Proposta</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
