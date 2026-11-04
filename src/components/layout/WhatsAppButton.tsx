"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, ArrowUpRight, Sparkles, Code2, Palette, LayoutDashboard, Globe } from "lucide-react";
import { getWhatsAppUrl, CONTACTS } from "@/lib/constants";

function WhatsAppSvg({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.031 2c-5.516 0-9.999 4.486-9.999 10.002 0 1.766.461 3.49 1.337 5.012L2 22l5.122-1.343a9.956 9.956 0 0 0 4.906 1.292h.004c5.515 0 9.998-4.486 9.998-10.002 0-2.673-1.04-5.186-2.929-7.075A9.936 9.936 0 0 0 12.031 2Zm5.847 14.307c-.246.693-1.434 1.326-1.997 1.411-.513.077-1.163.109-1.877-.118-.434-.138-.99-.322-1.703-.63-2.997-1.294-4.955-4.312-5.105-4.512-.149-.2-1.219-1.621-1.219-3.093 0-1.472.771-2.196 1.045-2.495.274-.3.598-.375.797-.375.199 0 .398.002.573.01.184.009.43-.07.673.514.249.599.846 2.071.921 2.221.075.15.125.324.025.524-.1.2-.15.324-.299.499-.149.175-.314.391-.448.524-.15.149-.305.311-.131.611.174.299.774 1.277 1.662 2.069 1.142 1.018 2.104 1.333 2.403 1.483.299.15.473.125.648-.075.174-.2.747-.873.946-1.173.199-.3.398-.249.672-.149.274.1 1.743.822 2.042.972.299.15.498.225.573.35.075.125.075.723-.171 1.416Z" />
    </svg>
  );
}

const quickTopics = [
  {
    id: "software",
    icon: LayoutDashboard,
    label: "Sistema de Gestão (ERP / POS / CRM)",
    message:
      "Olá! Gostaria de solicitar uma proposta para um Sistema de Gestão (ERP, POS ou CRM) com a Lisis Tecnologias.",
  },
  {
    id: "web",
    icon: Globe,
    label: "Website ou Portal Institucional",
    message:
      "Olá! Gostaria de solicitar um orçamento para o desenvolvimento de um Website ou Portal Institucional.",
  },
  {
    id: "mobile",
    icon: Code2,
    label: "Aplicação Móvel (iOS & Android)",
    message:
      "Olá! Gostaria de falar com a equipa da Lisis sobre o desenvolvimento de uma Aplicação Móvel.",
  },
  {
    id: "branding",
    icon: Palette,
    label: "Design, Logotipo & Identidade Visual",
    message:
      "Olá! Gostaria de solicitar uma proposta para Criação de Logotipo e Manual de Identidade Visual.",
  },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      customMessage.trim() ||
      "Olá! Gostaria de falar com a equipa da Lisis Tecnologias e Serviços sobre um projecto.";
    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setCustomMessage("");
    setIsOpen(false);
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Atendimento rápido via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Expandable Concierge Popover */}
      {isOpen && (
        <div
          id="whatsapp-concierge-panel"
          role="dialog"
          aria-label="Central de atendimento WhatsApp Lisis"
          className="w-[340px] sm:w-[370px] rounded-2xl bg-bg-surface border border-border-strong shadow-2xl overflow-hidden transition-all duration-300"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                <WhatsAppSvg size={24} />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#075E54]"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="font-heading font-700 text-sm text-white leading-tight">
                  Lisis Tecnologias · Atendimento
                </p>
                <p className="text-xs text-emerald-100 mt-0.5 flex items-center gap-1.5">
                  <Sparkles size={11} />
                  <span>Engenharia & Consultoria · Maputo</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar janela do WhatsApp"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-bg-surface">
            <div className="p-3 rounded-xl bg-bg-elevated border border-border text-xs text-text-secondary leading-relaxed">
              Olá! Como podemos apoiar a sua instituição ou empresa hoje? Escolha um tema abaixo ou escreva a sua mensagem:
            </div>

            {/* Quick Topic Buttons */}
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted px-1">
                Assuntos Frequentes
              </p>
              {quickTopics.map(({ id, icon: Icon, label, message }) => (
                <a
                  key={id}
                  href={getWhatsAppUrl(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-bg-elevated hover:bg-primary/10 border border-border hover:border-primary text-xs font-500 text-text hover:text-primary transition-all group"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      size={15}
                      className="text-primary shrink-0 transition-transform group-hover:scale-110"
                    />
                    <span>{label}</span>
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-text-faint group-hover:text-primary shrink-0"
                  />
                </a>
              ))}
            </div>

            {/* Custom Message Form */}
            <form onSubmit={handleSendCustom} className="pt-2 border-t border-border">
              <label htmlFor="wa-custom-input" className="sr-only">
                Escreva a sua mensagem para o WhatsApp
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="wa-custom-input"
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Escreva a sua questão ou projecto..."
                  className="form-input text-xs py-2.5 px-3 flex-1"
                />
                <button
                  type="submit"
                  className="h-10 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-[#04140B] font-heading font-700 text-xs flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105 cursor-pointer"
                  aria-label="Enviar mensagem no WhatsApp"
                >
                  <span>Enviar</span>
                  <Send size={13} />
                </button>
              </div>
            </form>

            {/* Direct Number Footer */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-text-muted">
              <span>Linha directa: {CONTACTS.whatsapp.display}</span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-600 hover:underline inline-flex items-center gap-1"
              >
                Abrir WhatsApp <ArrowUpRight size={11} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="whatsapp-concierge-panel"
          aria-label={`Atendimento via WhatsApp: ${CONTACTS.whatsapp.display}`}
          id="floating-whatsapp-btn"
          className="group relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-full bg-gradient-to-r from-[#1DA851] to-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border border-white/20"
        >
          <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/15">
            {isOpen ? <X size={18} /> : <WhatsAppSvg size={19} />}
            {!isOpen && (
              <span
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#A7F3D0] ring-2 ring-[#1DA851]"
                aria-hidden="true"
              />
            )}
          </span>
          <span className="flex flex-col text-left leading-none pr-0.5">
            <span className="text-[10px] uppercase tracking-wider text-emerald-100 font-mono">
              Online · Maputo
            </span>
            <span className="text-xs sm:text-sm font-heading font-700 text-white mt-0.5">
              {isOpen ? "Fechar Chat" : "Falar no WhatsApp"}
            </span>
          </span>
        </button>
      </div>
    </aside>
  );
}
