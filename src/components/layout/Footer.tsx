import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

const services = [
  { label: "Desenvolvimento Web", href: "/servicos#web" },
  { label: "Aplicações Móveis", href: "/servicos#mobile" },
  { label: "Sistemas de Gestão", href: "/servicos#sistemas" },
  { label: "Consultoria e Suporte", href: "/servicos#consultoria" },
  { label: "Integração de Sistemas", href: "/servicos#integracao" },
];

const solutions = [
  { label: "Lisis Assist", href: "/solucoes#assist" },
  { label: "Lisis School", href: "/solucoes#school" },
  { label: "Stoka", href: "/solucoes#stoka" },
];

const company = [
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const socials = [
  { icon: LinkedinIcon, href: "https://linkedin.com/company/lisis-tecnologias", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://instagram.com/lisistecnologias", label: "Instagram" },
  { icon: TwitterIcon, href: "https://twitter.com/lisistec", label: "Twitter/X" },
  { icon: YoutubeIcon, href: "https://youtube.com/@lisistec", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t border-border mt-24"
      style={{ background: "rgba(2, 12, 27, 0.98)" }}
      role="contentinfo"
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00D4AA, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3 mb-5"
              aria-label="Lisis Tecnologias - Página Inicial"
            >
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
              <div>
                <span className="block font-heading font-700 text-white text-sm tracking-wide">
                  LISIS TECNOLOGIAS
                </span>
                <span className="block text-[10px] text-text-muted tracking-widest uppercase">
                  E Serviços
                </span>
              </div>
            </Link>

            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xs">
              Transformamos ideias em soluções digitais. Tecnologia, inovação e
              pessoas para um futuro mais eficiente.
            </p>

            {/* Contact Info */}
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <Mail size={15} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:info@lisis-servicos.com"
                  className="hover:text-primary transition-colors"
                >
                  info@lisis-servicos.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <Phone size={15} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+258841234567"
                  className="hover:text-primary transition-colors"
                >
                  +258 84 123 4567
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <MapPin size={15} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Maputo, Moçambique</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all hover:shadow-neon cursor-pointer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-white font-heading font-600 text-sm mb-5 uppercase tracking-wider">
              Serviços
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluções */}
          <div>
            <h3 className="text-white font-heading font-600 text-sm mb-5 uppercase tracking-wider">
              Soluções
            </h3>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-heading font-600 text-sm mb-5 mt-8 uppercase tracking-wider">
              Empresa
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-heading font-600 text-sm mb-2 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-text-muted text-sm mb-4">
              Receba dicas e novidades tecnológicas.
            </p>
            <form
              action="/api/newsletter"
              method="POST"
              className="space-y-3"
              aria-label="Subscrever newsletter"
            >
              <input
                type="email"
                name="email"
                placeholder="O seu email"
                required
                className="form-input text-sm"
                aria-label="Email para newsletter"
                id="footer-newsletter-email"
              />
              <button
                type="submit"
                className="btn-primary w-full text-sm py-2.5 justify-center"
                id="footer-newsletter-submit"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-text-faint text-xs">
            © {new Date().getFullYear()} Lisis Tecnologias e Serviços. Todos os
            direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacidade"
              className="text-text-faint text-xs hover:text-primary transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-text-faint text-xs hover:text-primary transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span className="text-text-faint text-xs">Feito em Moçambique 🇲🇿</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
