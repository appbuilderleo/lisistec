import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { CONTACTS, getWhatsAppUrl } from "@/lib/constants";

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
  { label: "Design & Identidade Visual", href: "/servicos#design" },
  { label: "Desenvolvimento Web & Portais", href: "/servicos#web" },
  { label: "Aplicações Móveis (iOS & Android)", href: "/servicos#mobile" },
  { label: "Sistemas de Gestão (ERP / POS)", href: "/servicos#sistemas" },
  { label: "Consultoria TI & Infraestrutura", href: "/servicos#consultoria" },
  { label: "Integração de Sistemas & APIs", href: "/servicos#integracao" },
];

const solutions = [
  { label: "STOKA · Ponto de Venda & Stock", href: "/solucoes#stoka" },
  { label: "CRM CCN Consultores", href: "/solucoes#crm-ccn" },
  { label: "Portal Maputo FACIM", href: "/solucoes#maputo-facim" },
  { label: "Lisis School · Gestão Académica", href: "/solucoes#school" },
  { label: "Lisis Assist · Atendimento Digital", href: "/solucoes#assist" },
];

const company = [
  { label: "Sobre a Lisis (+7 Anos)", href: "/sobre" },
  { label: "Portfólio em Produção", href: "/portfolio" },
  { label: "Galeria de Design (9:16)", href: "/galeria" },
  { label: "Artigos & Publicações", href: "/blog" },
  { label: "Contactos & Propostas", href: "/contacto" },
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
      className="relative border-t border-border mt-24 bg-bg-surface transition-colors duration-300"
      role="contentinfo"
    >
      {/* Top gradient hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-5 group"
              aria-label="Lisis Tecnologias e Serviços - Página Inicial"
            >
              <div className="w-10 h-10 rounded-xl bg-[#061325] border border-[#00D4AA]/30 flex items-center justify-center p-1.5">
                <Image
                  src="/logolisisnova.png"
                  alt="Lisis Tecnologias e Serviços"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-700 text-lg leading-none text-text">
                  LISIS TECNOLOGIAS
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-primary mt-0.5">
                  Engenharia Digital · Moçambique
                </span>
              </div>
            </Link>

            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-sm">
              Mais de 7 anos de experiência e mais de 15 projectos entregues para ministérios, universidades, consultoras e empresas de retalho em Moçambique.
            </p>

            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-primary shrink-0" />
                <span>
                  Chamadas:{" "}
                  <a href={CONTACTS.phone.href} className="text-text hover:text-primary font-500 transition-colors">
                    {CONTACTS.phone.display}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={15} className="text-[#25D366] shrink-0" />
                <span>
                  WhatsApp:{" "}
                  <a
                    href={getWhatsAppUrl("Olá! Gostaria de falar com a Lisis Tecnologias e Serviços.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline font-600"
                  >
                    {CONTACTS.whatsapp.display}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-primary shrink-0" />
                <span>
                  Email:{" "}
                  <a href={CONTACTS.email.href} className="text-text hover:text-primary transition-colors">
                    {CONTACTS.email.address}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary shrink-0 mt-1" />
                <span>{CONTACTS.location.display} · {CONTACTS.hours.display}</span>
              </li>
            </ul>

            <div className="flex items-center gap-2.5 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-bg-elevated border border-border hover:border-primary text-text-muted hover:text-primary flex items-center justify-center transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Serviços */}
          <div className="lg:col-span-3">
            <h3 className="text-text font-mono font-600 text-xs uppercase tracking-wider mb-5">
              01 // Serviços
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

          {/* Soluções & Empresa */}
          <div className="lg:col-span-2">
            <h3 className="text-text font-mono font-600 text-xs uppercase tracking-wider mb-5">
              02 // Soluções
            </h3>
            <ul className="space-y-2.5 mb-7">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-text font-mono font-600 text-xs uppercase tracking-wider mb-4">
              03 // Institucional
            </h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Proposal & Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-text font-mono font-600 text-xs uppercase tracking-wider mb-3">
              04 // Iniciar Projecto
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Precisa de um caderno de encargos, sistema à medida ou proposta técnica para concurso ou empresa?
            </p>
            <a
              href={getWhatsAppUrl("Olá! Gostaria de solicitar uma proposta técnica com a Lisis Tecnologias e Serviços.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-sm py-2.5 mb-6"
            >
              <span>Pedir Proposta Técnica</span>
              <ArrowUpRight size={15} />
            </a>

            <div className="p-4 rounded-xl bg-bg-elevated border border-border">
              <p className="font-heading font-600 text-xs text-text mb-1">
                Boletim Técnico Lisis
              </p>
              <p className="text-text-muted text-xs mb-3">
                Actualizações sobre engenharia de software e transformação digital em Moçambique.
              </p>
              <form
                action="/api/newsletter"
                method="POST"
                className="flex gap-2"
                aria-label="Subscrever newsletter"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="O seu email corporativo"
                  required
                  className="form-input text-xs py-2 px-3 bg-bg-surface"
                  aria-label="Email para newsletter"
                  id="footer-newsletter-email"
                />
                <button
                  type="submit"
                  className="btn-secondary text-xs py-2 px-3 shrink-0"
                  id="footer-newsletter-submit"
                >
                  Subscrever
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-text-faint">
          <p>
            © {new Date().getFullYear()} Lisis Tecnologias e Serviços. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacidade" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
            <Link href="/crm/login" className="hover:text-primary transition-colors">
              Área de Gestão (CRM)
            </Link>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" aria-hidden="true" />
            <span>Maputo, Moçambique · Desde 2019</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
