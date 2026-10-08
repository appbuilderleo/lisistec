import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Entre em contacto com a Lisis Tecnologias e Serviços. Estamos em Maputo, Moçambique, prontos para ajudar o seu negócio a crescer com tecnologia.",
  alternates: { canonical: "/contacto" },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@lisis-servicos.com",
    href: "mailto:info@lisis-servicos.com",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+258 84 123 4567",
    href: "tel:+258841234567",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Maputo, Moçambique",
    href: "https://maps.google.com/?q=Maputo+Mozambique",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg – Sex: 08h – 17h",
    href: null,
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="py-20 bg-dots" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-tag mx-auto w-fit">Contacto</div>
          <h1
            id="contact-heading"
            className="text-4xl lg:text-6xl font-heading font-700 text-white mt-4 mb-6"
          >
            Vamos <span className="text-gradient">conversar</span>
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">
            Estamos prontos para ajudar o seu negócio a crescer. Preencha o
            formulário ou contacte-nos directamente.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 pb-24" aria-label="Informações de contacto e formulário">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <aside className="lg:col-span-2 space-y-4" aria-label="Informações de contacto">
              <div className="glass-card p-8">
                <h2 className="text-xl font-heading font-700 text-white mb-6">
                  Dados da empresa
                </h2>
                <ul className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="service-icon w-10 h-10 flex-shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-600 uppercase tracking-wider mb-1">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-white hover:text-primary transition-colors text-sm font-500"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-white text-sm font-500">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="glass-card p-8">
                <h3 className="text-white font-heading font-600 mb-4">
                  Redes Sociais
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "LinkedIn", icon: "in", href: "#" },
                    { label: "Instagram", icon: "📷", href: "#" },
                    { label: "Twitter/X", icon: "𝕏", href: "#" },
                    { label: "YouTube", icon: "▶", href: "#" },
                  ].map(({ label, icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-text-muted hover:text-primary cursor-pointer"
                      aria-label={label}
                    >
                      <span className="text-base" aria-hidden="true">{icon}</span>
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="glass-card overflow-hidden h-48 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,212,170,0.05), rgba(0,136,255,0.05))",
                }}
                role="img"
                aria-label="Localização: Maputo, Moçambique"
              >
                <div className="text-center">
                  <MapPin size={32} className="text-primary mx-auto mb-2" aria-hidden="true" />
                  <p className="text-white font-heading font-600">Maputo</p>
                  <p className="text-text-muted text-sm">Moçambique 🇲🇿</p>
                </div>
              </div>
            </aside>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass-card p-8 lg:p-10">
                <h2 className="text-2xl font-heading font-700 text-white mb-2">
                  Envie uma mensagem
                </h2>
                <p className="text-text-muted text-sm mb-8">
                  Preencha o formulário e entraremos em contacto em até 24 horas.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
