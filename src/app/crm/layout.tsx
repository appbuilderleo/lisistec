import { Metadata } from "next";
import CrmSidebar from "./CrmSidebar";

export const metadata: Metadata = {
  title: "Lisis CRM | Gestão Integrada de Clientes",
  description: "Subsistema de gestão de leads, clientes e oportunidades da Lisis Tecnologias e Serviços.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CrmSidebar>{children}</CrmSidebar>;
}
