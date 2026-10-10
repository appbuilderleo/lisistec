import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
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
      style={{ position: "relative", borderTop: "1px solid rgba(0,212,170,0.15)", marginTop: "96px", background: "rgba(2,12,27,0.98)" }}
      role="contentinfo"
    >
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #00D4AA, transparent)" }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 32px" }}>
        {/* Main Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }} aria-label="Lisis Tecnologias - Página Inicial">
              <Image src="/logolisisnova.png" alt="Lisis Tecnologias e Serviços" width={170} height={55} style={{ height: "40px", width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ color: "#8B9CC0", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "24px", maxWidth: "280px" }}>
              Transformamos ideias em soluções digitais. Tecnologia, inovação e pessoas para um futuro mais eficiente.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.875rem", color: "#8B9CC0" }}>
                <Phone size={15} style={{ color: "#00D4AA", flexShrink: 0 }} />
                <span>
                  Chamadas:{" "}
                  <a href={CONTACTS.phone.href} style={{ color: "#8B9CC0", textDecoration: "none", transition: "color 0.2s ease" }}>
                    {CONTACTS.phone.display}
                  </a>
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.875rem", color: "#8B9CC0" }}>
                <MessageCircle size={15} style={{ color: "#25D366", flexShrink: 0 }} />
                <span>
                  WhatsApp:{" "}
                  <a
                    href={getWhatsAppUrl("Olá! Gostaria de falar com a Lisis Tecnologias e Serviços.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#25D366", textDecoration: "none", transition: "color 0.2s ease", fontWeight: 500 }}
                  >
                    {CONTACTS.whatsapp.display}
                  </a>
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.875rem", color: "#8B9CC0" }}>
                <Mail size={15} style={{ color: "#00D4AA", flexShrink: 0 }} />
                <span>
                  Email:{" "}
                  <a href={CONTACTS.email.href} style={{ color: "#8B9CC0", textDecoration: "none", transition: "color 0.2s ease" }}>
                    {CONTACTS.email.address}
                  </a>
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.875rem", color: "#8B9CC0" }}>
                <MapPin size={15} style={{ color: "#00D4AA", flexShrink: 0, marginTop: "2px" }} />
                <span>Maputo, Moçambique</span>
              </li>
            </ul>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px" }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid rgba(0,212,170,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B9CC0", textDecoration: "none", transition: "all 0.2s ease" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.8rem", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Serviços
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluções + Empresa */}
          <div>
            <h3 style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.8rem", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Soluções
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">{item.label}</Link>
                </li>
              ))}
            </ul>
            <h3 style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.8rem", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Empresa
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.8rem", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Newsletter
            </h3>
            <p style={{ color: "#8B9CC0", fontSize: "0.875rem", marginBottom: "16px" }}>
              Receba dicas e novidades tecnológicas.
            </p>
            <form action="/api/newsletter" method="POST" style={{ display: "flex", flexDirection: "column", gap: "12px" }} aria-label="Subscrever newsletter">
              <input
                type="email"
                name="email"
                placeholder="O seu email"
                required
                className="form-input"
                style={{ fontSize: "0.875rem" }}
                aria-label="Email para newsletter"
                id="footer-newsletter-email"
              />
              <button type="submit" className="btn-primary" style={{ fontSize: "0.875rem", padding: "10px 20px", justifyContent: "center" }} id="footer-newsletter-submit">
                Subscrever
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(0,212,170,0.15)", paddingTop: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ color: "#4A5E7A", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} Lisis Tecnologias e Serviços. Todos os direitos reservados.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/privacidade" style={{ color: "#4A5E7A", fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s" }}>Política de Privacidade</Link>
            <Link href="/termos" style={{ color: "#4A5E7A", fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s" }}>Termos de Uso</Link>
            <Link href="/crm/login" style={{ color: "#4A5E7A", fontSize: "0.75rem", textDecoration: "none", transition: "color 0.2s" }}>Área de Gestão (CRM)</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00D4AA", animation: "pulse-neon 3s ease-in-out infinite" }} aria-hidden="true" />
            <span style={{ color: "#4A5E7A", fontSize: "0.75rem" }}>Feito em Moçambique 🇲🇿</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        }
      `}</style>
    </footer>
  );
}
