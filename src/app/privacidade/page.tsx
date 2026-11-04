import type { Metadata } from "next";
import { CONTACTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade e protecção de dados da Lisis Tecnologias e Serviços.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="arch-card p-8 sm:p-12 bg-bg-surface space-y-6">
          <span className="mono-index block">DOCUMENTO LEGAL // PRIVACIDADE</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-700 text-text">
            Política de Privacidade
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            A Lisis Tecnologias e Serviços respeita a privacidade de todas as instituições, empresas e cidadãos que utilizam o nosso portal web e os nossos sistemas digitais.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-heading font-700 text-text">
              1. Recolha e Finalidade dos Dados
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Os dados recolhidos através do formulário de contacto (nome, correio electrónico, telefone e mensagem) destinam-se exclusivamente à elaboração de propostas técnicas, resposta a pedidos de informação e prestação de suporte comercial pela equipa da Lisis Tecnologias.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-heading font-700 text-text">
              2. Confidencialidade e Segurança
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Não comercializamos nem partilhamos dados de clientes ou utilizadores com terceiros. Aplicamos protocolos seguros de transmissão (HTTPS/SSL) e controlo restrito de acesso interno.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-heading font-700 text-text">
              3. Direitos do Titular e Contacto
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Para solicitar a actualização ou remoção dos seus dados de contacto, envie uma comunicação para{" "}
              <a href={CONTACTS.email.href} className="text-primary hover:underline">
                {CONTACTS.email.address}
              </a>{" "}
              ou contacte-nos através do número {CONTACTS.phone.display}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

