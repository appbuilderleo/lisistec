export const CONTACTS = {
  // Chamadas telefónicas oficiais
  phone: {
    raw: "+258844647599",
    display: "+258 84 464 7599",
    href: "tel:+258844647599",
  },
  // WhatsApp oficial para propostas e atendimento
  whatsapp: {
    number: "258874647599",
    raw: "+258874647599",
    display: "+258 87 464 7599",
  },
  // Email oficial
  email: {
    address: "appbuilderleo@gmail.com",
    href: "mailto:appbuilderleo@gmail.com",
  },
  // Localização
  location: {
    city: "Maputo",
    country: "Moçambique",
    display: "Maputo, Moçambique",
    mapsUrl: "https://maps.google.com/?q=Maputo+Mozambique",
  },
  // Horário de funcionamento
  hours: {
    display: "Seg a Sex: 08h00 às 17h00",
  },
};

export const COMPANY_STATS = [
  {
    code: "01",
    value: 7,
    suffix: "+",
    label: "Anos de Experiência",
    description: "Engenharia de software, sistemas e design em Moçambique desde 2019.",
  },
  {
    code: "02",
    value: 15,
    suffix: "+",
    label: "Projectos Entregues",
    description: "Portais governamentais, ERPs, sistemas POS, websites e marcas em operação.",
  },
  {
    code: "03",
    value: 8,
    suffix: "+",
    label: "Entidades de Referência",
    description: "Ministérios, universidades, consultoras e redes de retalho atendidas.",
  },
  {
    code: "04",
    value: 4,
    suffix: "",
    label: "Produtos Próprios",
    description: "STOKA POS, Lisis School, Lisis Assist e CRM Corporativo.",
  },
];

export interface ClientEntity {
  id: string;
  name: string;
  shortName: string;
  sector: string;
  scope: string;
  badge: string;
}

export const TRUSTED_CLIENTS: ClientEntity[] = [
  {
    id: "mined",
    name: "Governo de Moçambique · Ministério da Educação",
    shortName: "Ministério da Educação",
    sector: "Sector Público & Educação",
    scope: "Plataformas académicas, digitalização de processos e sistemas educativos",
    badge: "GOV.MZ",
  },
  {
    id: "minec",
    name: "Governo de Moçambique · Ministério da Economia",
    shortName: "Ministério da Economia",
    sector: "Sector Público & Economia",
    scope: "Portais de promoção económica, investimento e vitrines institucionais",
    badge: "GOV.MZ",
  },
  {
    id: "cemoqe",
    name: "CEMOQE-MOÇ",
    shortName: "CEMOQE-MOÇ",
    sector: "Certificação & Qualidade",
    scope: "Sistemas digitais, presença institucional e ferramentas operacionais",
    badge: "INSTITUCIONAL",
  },
  {
    id: "amec",
    name: "AMEC",
    shortName: "AMEC",
    sector: "Associação & Institucional",
    scope: "Plataforma digital, comunicação institucional e gestão de associados",
    badge: "INSTITUCIONAL",
  },
  {
    id: "uem",
    name: "Universidade Eduardo Mondlane",
    shortName: "Universidade Eduardo Mondlane",
    sector: "Ensino Superior & Investigação",
    scope: "Sistemas académicos, portais de informação e ferramentas universitárias",
    badge: "ACADEMIA",
  },
  {
    id: "cesta-cheia",
    name: "Cesta Cheia Supermercado",
    shortName: "Cesta Cheia Supermercado",
    sector: "Retalho & Distribuição",
    scope: "Gestão comercial, ponto de venda (POS), controlo de stock e faturação",
    badge: "RETALHO",
  },
  {
    id: "ccn",
    name: "CCN Consultores",
    shortName: "CCN Consultores",
    sector: "Consultoria Empresarial",
    scope: "Portal corporativo e sistema integrado CRM para gestão de clientes e propostas",
    badge: "CORPORATIVO",
  },
  {
    id: "ml-services",
    name: "ML Services",
    shortName: "ML Services",
    sector: "Serviços & Operações",
    scope: "Identidade visual, presença digital e automação de processos de negócio",
    badge: "SERVIÇOS",
  },
];

/**
 * Gera URL direto do WhatsApp com mensagem pré-formatada.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultText =
    "Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços.";
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${CONTACTS.whatsapp.number}?text=${text}`;
}
