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
    display: "Seg – Sex: 08h – 17h",
  },
};

/**
 * Gera URL direto do WhatsApp com mensagem pré-formatada.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultText =
    "Olá! Gostaria de solicitar uma proposta de serviços com a Lisis Tecnologias e Serviços.";
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${CONTACTS.whatsapp.number}?text=${text}`;
}
