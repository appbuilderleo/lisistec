import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { CONTACTS, getWhatsAppUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto & Pedidos de Proposta",
  description:
    "Entre em contacto com a Lisis Tecnologias e Serviços em Maputo. Ligue para +258 84 464 7599, fale no WhatsApp (+258 87 464 7599) ou envie email para appbuilderleo@gmail.com.",
  alternates: { canonical: "/contacto" },
};

const contactInfo = [
  {
    icon: Phone,
    label: "Chamadas Telefónicas",
    value: CONTACTS.phone.display,
    href: CONTACTS.phone.href,
    badge: "Linha Directa",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Oficial",
    value: CONTACTS.whatsapp.display,
    href: getWhatsAppUrl(
      "Olá! Gostaria de falar com a equipa da Lisis Tecnologias e Serviços."
    ),
    badge: "Resposta Imediata",
    isWhatsApp: true,
  },
  {
    icon: Mail,
    label: "Correio Electrónico",
    value: CONTACTS.email.address,
    href: CONTACTS.email.href,
    badge: "Cadernos de Encargos",
  },
  {
    icon: MapPin,
    label: "Sede Operacional",
    value: CONTACTS.location.display,
    href: CONTACTS.location.mapsUrl,
  },
  {
    icon: Clock,
    label: "Horário de Expediente",
    value: CONTACTS.hours.display,
    href: null,
  },
];

const faqs = [
  {
    q: "Como solicitar uma proposta técnica ou cotação para concurso?",
    a: "Pode enviar os termos de referência ou caderno de encargos pelo formulário desta página, por email ou directamente pelo WhatsApp. A nossa equipa responde em menos de 24 horas úteis.",
  },
  {
    q: "A Lisis presta suporte técnico e formação presencial após a entrega?",
    a: "Sim. Todos os sistemas entregues incluem formação prática para os utilizadores e administradores, documentação técnica e opções de contrato de manutenção evolutiva e suporte (SLA).",
  },
  {
    q: "Desenvolvem projectos fora da cidade de Maputo?",
    a: "Sim. Atendemos instituições públicas, universidades e empresas em todas as províncias de Moçambique, combinando sessões presenciais e acompanhamento remoto contínuo.",
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero */}
      <section
        className="py-16 lg:py-20 bg-dots border-b border-border"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">Canais Oficiais // Contacto</div>
            <h1
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-700 text-text leading-tight mb-6"
            >
              Inicie uma conversa com a nossa{" "}
              <span className="text-gradient">equipa de engenharia.</span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed">
              Solicite uma proposta técnica, demonstração dos sistemas STOKA ou
              Lisis School, ou agende uma reunião presencial em Maputo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="py-16"
        aria-label="Informações de contacto e formulário"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Contact Info Sidebar (5 cols) */}
            <aside
              className="lg:col-span-5 space-y-6"
              aria-label="Informações de contacto"
            >
              <div className="arch-card p-7 sm:p-8 bg-bg-surface">
                <span className="mono-index block mb-2">
                  DIRECTÓRIO // CONTACTOS
                </span>
                <h2 className="text-xl font-heading font-700 text-text mb-6">
                  Dados oficiais da empresa
                </h2>
                <ul className="space-y-5">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label} className="flex items-start gap-4">
                        <div
                          className="service-icon w-11 h-11 shrink-0"
                          style={
                            item.isWhatsApp
                              ? {
                                  background: "rgba(37,211,102,0.12)",
                                  borderColor: "rgba(37,211,102,0.35)",
                                  color: "#25D366",
                                }
                              : undefined
                          }
                        >
                          <Icon size={19} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-xs font-mono text-text-muted uppercase tracking-wider">
                              {item.label}
                            </p>
                            {item.badge && (
                              <span
                                className="text-[10px] font-mono px-2 py-0.5 rounded font-600"
                                style={
                                  item.isWhatsApp
                                    ? {
                                        background: "rgba(37,211,102,0.18)",
                                        color: "#25D366",
                                      }
                                    : {
                                        background: "var(--primary-tint)",
                                        color: "var(--primary)",
                                      }
                                }
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-text hover:text-primary transition-colors text-sm font-600 inline-flex items-center gap-1"
                              style={
                                item.isWhatsApp
                                  ? { color: "#25D366" }
                                  : undefined
                              }
                              target={
                                item.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                item.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              <span>{item.value}</span>
                              {item.href.startsWith("http") && (
                                <ArrowUpRight size={13} />
                              )}
                            </a>
                          ) : (
                            <p className="text-text text-sm font-500">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* SLA / Institutional Guarantee Card */}
              <div className="arch-card p-7 bg-bg-surface space-y-3">
                <div className="flex items-center gap-2.5 text-primary">
                  <ShieldCheck size={20} />
                  <h3 className="font-heading font-700 text-base text-text">
                    Atendimento a Concursos & Instituições
                  </h3>
                </div>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  Fornecemos propostas técnicas estruturadas, documentação fiscal
                  regularizada e referências comprovadas de mais de 7 anos de
                  prestação de serviços ao Estado e sector privado.
                </p>
              </div>
            </aside>

            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="arch-card p-8 sm:p-10 bg-bg-surface">
                <span className="mono-index block mb-2">
                  FORMULÁRIO DIRECTO // PROPOSTAS
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-700 text-text mb-2">
                  Envie os detalhes do seu projecto
                </h2>
                <p className="text-text-muted text-sm mb-8">
                  Preencha os campos abaixo para registar o seu pedido no nosso
                  sistema ou envie directamente para o nosso WhatsApp.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 pt-16 border-t border-border">
            <div className="max-w-2xl mb-10">
              <span className="mono-index block mb-2">
                DÚVIDAS FREQUENTES // CONTRATAÇÃO
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-700 text-text">
                Perguntas frequentes
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {faqs.map(({ q, a }) => (
                <div key={q} className="arch-card p-6 bg-bg-surface">
                  <h3 className="font-heading font-700 text-base text-text mb-2.5">
                    {q}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
