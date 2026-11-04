import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições de utilização do portal da Lisis Tecnologias e Serviços.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="arch-card p-8 sm:p-12 bg-bg-surface space-y-6">
          <span className="mono-index block">DOCUMENTO LEGAL // TERMOS DE USO</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-700 text-text">
            Termos de Utilização
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Ao aceder ao portal oficial da Lisis Tecnologias e Serviços, o utilizador concorda com os termos descritos neste documento.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-heading font-700 text-text">
              1. Propriedade Intelectual
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Todo o conteúdo deste website, incluindo textos técnicos, logotipos, código-fonte, marcas de produtos próprios (STOKA, Lisis School, Lisis Assist) e peças da galeria de design, constitui propriedade intelectual da Lisis Tecnologias e Serviços ou dos respectivos clientes autorizados.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-heading font-700 text-text">
              2. Propostas e Contratação de Serviços
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              As especificações apresentadas no portal têm carácter informativo. Cada projecto de engenharia de software, sistema de gestão ou identidade visual é formalizado mediante proposta técnica e contrato de prestação de serviços específico.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

