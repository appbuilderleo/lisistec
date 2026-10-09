"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Ocorreu um erro. Por favor tente novamente.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Sem ligação. Verifique a sua internet e tente novamente.");
      setStatus("error");
    }
  };

  const handleWhatsAppDirect = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    let msg = "Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços.";
    if (form.name.trim()) {
      msg = `Olá! Meu nome é ${form.name.trim()}.\n` +
        (form.email.trim() ? `Email: ${form.email.trim()}\n` : "") +
        (form.phone.trim() ? `Telefone: ${form.phone.trim()}\n` : "") +
        (form.message.trim() ? `Mensagem: ${form.message.trim()}` : "Gostaria de solicitar uma proposta de serviços.");
    }
    window.open(getWhatsAppUrl(msg), "_blank");
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-5">
          <CheckCircle size={40} className="text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-heading font-700 text-white mb-3">
          Mensagem enviada!
        </h3>
        <p className="text-text-muted mb-6 max-w-sm">
          Obrigado pelo contacto. Se preferir resposta imediata, inicie agora uma conversa no WhatsApp.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={getWhatsAppUrl("Olá! Acabei de enviar um formulário no site e gostaria de conversar no WhatsApp.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", borderColor: "rgba(37,211,102,0.4)" }}
            id="contact-success-whatsapp-btn"
          >
            <MessageCircle size={18} />
            Continuar no WhatsApp
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="btn-secondary cursor-pointer"
            id="contact-send-another-btn"
          >
            Enviar outra mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulário de contacto"
    >
      {/* Error message */}
      {status === "error" && (
        <div
          className="flex items-start gap-3 p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/30"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="form-label">
            Nome completo <span className="text-red-400" aria-label="obrigatório">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="O seu nome"
            className="form-input"
            aria-required="true"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="form-label">
            Email <span className="text-red-400" aria-label="obrigatório">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="o.seu@email.com"
            className="form-input"
            aria-required="true"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label htmlFor="contact-phone" className="form-label">
          Telefone (opcional)
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+258 84 000 0000"
          className="form-input"
        />
      </div>

      {/* Message */}
      <div className="mb-8">
        <label htmlFor="contact-message" className="form-label">
          Mensagem <span className="text-red-400" aria-label="obrigatório">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Descreva o seu projecto ou questão..."
          className="form-input resize-none"
          aria-required="true"
          minLength={10}
        />
        <p className="text-xs text-text-faint mt-1 text-right">
          {form.message.length}/2000
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => handleWhatsAppDirect()}
          className="btn-primary flex-1 justify-center text-base py-3.5 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            borderColor: "rgba(37,211,102,0.4)",
            color: "#ffffff",
          }}
          id="contact-whatsapp-btn"
        >
          <MessageCircle size={20} aria-hidden="true" />
          Solicitar no WhatsApp
        </button>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-secondary flex-1 justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          id="contact-submit-btn"
          aria-disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={20} className="animate-spin" aria-hidden="true" />
              A enviar...
            </>
          ) : (
            <>
              <Send size={20} aria-hidden="true" />
              Enviar Formulário
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-text-faint text-center mt-4">
        Ao enviar, concorda com a nossa{" "}
        <a href="/privacidade" className="text-primary hover:underline">
          Política de Privacidade
        </a>.
      </p>
    </form>
  );
}
