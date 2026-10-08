"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-nav py-3 shadow-card" : "py-5 bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Lisis Tecnologias e Serviços - Página Inicial"
          >
            <div className="relative w-10 h-10">
              {/* SVG Logo - Triangle with neon glow */}
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <polygon
                  points="20,4 36,34 4,34"
                  fill="none"
                  stroke="#00D4AA"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="20,12 30,30 10,30"
                  fill="rgba(0,212,170,0.15)"
                  stroke="#00D4AA"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-heading font-700 text-white tracking-wide">
                LISIS
              </span>
              <span className="block text-[10px] text-text-muted tracking-widest uppercase">
                Tecnologias
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? "active" : ""}`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contacto"
              className="btn-primary text-sm py-2.5 px-5"
              id="nav-cta-btn"
            >
              Solicitar Proposta
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
          {/* Close button */}
          <button
            className="absolute top-6 right-6 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={28} />
          </button>

          {/* Logo in mobile menu */}
          <div className="mb-8">
            <svg viewBox="0 0 40 40" fill="none" className="w-14 h-14 mx-auto">
              <polygon
                points="20,4 36,34 4,34"
                fill="none"
                stroke="#00D4AA"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <polygon
                points="20,12 30,30 10,30"
                fill="rgba(0,212,170,0.15)"
                stroke="#00D4AA"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <ul className="flex flex-col items-center gap-6" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-2xl font-heading font-600 transition-colors ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-text-muted hover:text-primary"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link href="/contacto" className="btn-primary" id="mobile-cta-btn">
              Solicitar Proposta
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
