"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        setErrorMsg(
          data.error || "Ocorreu um erro. Por favor tente novamente."
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg(
        "Sem ligação. Verifique a sua internet ou utilize o botão do WhatsApp abaixo."
      );
      setStatus("error");
    }
  };

  const handleWhatsAppDirect = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    let msg =
      "Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços.";
    if (form.name.trim()) {
      msg =
        `Olá! O meu nome é ${form.name.trim()}.\n` +
        (form.email.trim() ? `Email: ${form.email.trim()}\n` : "") +
        (form.phone.trim() ? `Telefone: ${form.phone.trim()}\n` : "") +
        (form.message.trim()
          ? `Mensagem: ${form.message.trim()}`
          : "Gostaria de solicitar uma proposta de serviços.");
    }
    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center py-14 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5">
          <CheckCircle size={34} className="text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-heading font-700 text-text mb-2">
          Pedido registado com sucesso
        </h3>
        <p className="text-text-muted text-sm mb-6 max-w-sm">
          Recebemos a sua mensagem. Se desejar atendimento imediato, continue a
          conversa connosco no WhatsApp.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={getWhatsAppUrl(
              "Olá! Acabei de enviar um pedido pelo site da Lisis Tecnologias e gostaria de falar com a equipa."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
            id="contact-success-whatsapp-btn"
          >
            <MessageCircle size={18} />
            <span>Continuar no WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn-secondary text-sm cursor-pointer"
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
      {status === "error" && (
        <div
          className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/30"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle
            size={18}
            className="text-rose-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-rose-500 text-sm">{errorMsg}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="contact-name" className="form-label">
            Nome ou Instituição{" "}
            <span className="text-rose-500" aria-label="obrigatório">
              *
            </span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Ex: João Mondlane / Empresa Lda"
            className="form-input"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="form-label">
            Email Corporativo{" "}
            <span className="text-rose-500" aria-label="obrigatório">
              *
            </span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="nome@empresa.co.mz"
            className="form-input"
            aria-required="true"
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="contact-phone" className="form-label">
          Telefone / WhatsApp (opcional)
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+258 84 / 87 000 0000"
          className="form-input"
        />
      </div>

      <div className="mb-7">
        <label htmlFor="contact-message" className="form-label">
          Descrição do Projecto ou Necessidade{" "}
          <span className="text-rose-500" aria-label="obrigatório">
            *
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Indique o tipo de sistema, portal web, aplicação móvel ou identidade visual que pretende desenvolver..."
          className="form-input resize-none"
          aria-required="true"
          minLength={10}
        />
        <p className="text-xs font-mono text-text-faint mt-1 text-right">
          {form.message.length}/2000
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5">
        <button
          type="button"
          onClick={handleWhatsAppDirect}
          className="btn-primary flex-1 py-3.5 text-sm cursor-pointer"
          id="contact-whatsapp-btn"
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span>Enviar Directo via WhatsApp</span>
        </button>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-secondary flex-1 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          id="contact-submit-btn"
          aria-disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              <span>A registar...</span>
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              <span>Submeter Formulário</span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-text-faint text-center mt-4">
        Os seus dados são tratados com confidencialidade segundo a nossa{" "}
        <Link href="/privacidade" className="text-primary hover:underline">
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
}
