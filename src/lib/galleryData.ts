export interface GalleryItem {
  id: string;
  title: string;
  category: "Criação de Logo" | "Manual de Identidade Visual" | "Branding" | "Design Gráfico";
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  clientOrConcept: string;
  year: string;
  color: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "cyan-software-logo",
    title: "Logo & Identidade Tech — Cyan Software",
    category: "Criação de Logo",
    subtitle: "Logotipo Corporativo & Isotipo Futurista",
    description:
      "Design de logotipo vetorial com linhas geométricas e estética neon futurista para empresa de desenvolvimento de software e soluções cloud. Transmite precisão, tecnologia e confiança.",
    image: "/galeria/Cyan_logo_for_software_company_2K_20261013090832.jpg",
    tags: ["Logo Design", "Software & Cloud", "Isotipo Geométrico", "Neon Cyan"],
    clientOrConcept: "Empresa de Software & TI",
    year: "2026",
    color: "#00F2FE",
  },
  {
    id: "real-estate-identity",
    title: "Identidade Visual & Mockups — Imobiliária Premium",
    category: "Manual de Identidade Visual",
    subtitle: "Brandbook Completo & Papelaria Corporativa 3D",
    description:
      "Manual de normas de identidade visual desenvolvido para agência imobiliária corporativa. Contém paleta de cores primárias e de apoio, tipografia institucional, grid de proporções e mockups realistas de papelaria.",
    image: "/galeria/Real_estate_brand_identity_mockup_2K_20261013084614.jpg",
    tags: ["Manual de Identidade", "Imobiliária", "Brandbook", "Papelaria 3D"],
    clientOrConcept: "Agência Imobiliária & Investimentos",
    year: "2026",
    color: "#F59E0B",
  },
  {
    id: "branding-lisis",
    title: "Branding Institucional & Posicionamento — Lisis Tech",
    category: "Branding",
    subtitle: "Construção de Marca Tecnológica & Ecossistema Digital",
    description:
      "Estratégia e arquitetura de marca completa para a Lisis Tecnologias e Serviços. Conceito focado em inovação, solidez técnica, autoridade visual e impacto memorável em suportes físicos e digitais.",
    image: "/galeria/Branding_lisis.jpg",
    tags: ["Branding Corporativo", "Identidade de Marca", "Posicionamento", "Lisis Tech"],
    clientOrConcept: "Lisis Tecnologias e Serviços",
    year: "2026",
    color: "#00D4AA",
  },
  {
    id: "red-tow-truck-logo",
    title: "Logotipo Automóvel & Reboque — Red Tow Truck",
    category: "Criação de Logo",
    subtitle: "Identidade Visual de Alto Impacto para Logística",
    description:
      "Criação de marca expressiva e emblemática para serviços de assistência rodoviária e reboque de emergência 24h. O contraste cromático vermelho e preto garante visualização imediata a longa distância.",
    image: "/galeria/Red_tow_truck_logo._2K_20261013084648.jpg",
    tags: ["Logotipo", "Setor Automóvel", "Reboque & Logística", "Alto Impacto"],
    clientOrConcept: "Serviços de Assistência e Reboque",
    year: "2026",
    color: "#EF4444",
  },
  {
    id: "designing-tow-truck-process",
    title: "Processo Criativo & Grid Geométrico de Construção",
    category: "Design Gráfico",
    subtitle: "Estudos de Geometria, Proporções e Curvas Vetoriais",
    description:
      "Exibição dos bastidores do processo criativo de design. Mostra a construção milimétrica com linhas guia, grids áureos e estudos de legibilidade em escalas reduzidas e gigantes.",
    image: "/galeria/Designing_red_tow_truck_logo_2K_20261013085532.jpg",
    tags: ["Grid de Construção", "Processo Criativo", "Design Vetorial", "Geometria"],
    clientOrConcept: "Estudo de Marca & Construção",
    year: "2026",
    color: "#3B82F6",
  },
  {
    id: "red-tow-truck-branding",
    title: "Aplicações de Frota & Sinalética Institucional",
    category: "Branding",
    subtitle: "Desdobramento em Viaturas, Fardas e Suportes Físicos",
    description:
      "Implementação prática da marca em viaturas de reboque, uniformes de trabalho, cartões de contacto e materiais publicitários. Garante uma presença de mercado coerente, profissional e inconfundível.",
    image: "/galeria/Red_tow_truck_logo_branding_2K_20261013085529.jpg",
    tags: ["Branding de Frota", "Sinalética", "Mockup Realista", "Aplicações de Marca"],
    clientOrConcept: "Branding e Frota Comercial",
    year: "2026",
    color: "#E11D48",
  },
  {
    id: "cleaning-company-branding",
    title: "Logo & Identidade — Limpeza Corporativa & Facilities",
    category: "Criação de Logo",
    subtitle: "Logotipo Vetorial & Símbolo de Higiene e Frescura",
    description:
      "Conceção visual e logotipo moderno para empresa especializada em serviços de limpeza corporativa e residencial. O design transmite frescura, higiene impecável, organização e elevado rigor técnico.",
    image: "/galeria/Cleaning_company_logo_branding_2K_20261013131338.jpg",
    tags: ["Limpeza Profissional", "Facilities", "Logo Vetorial", "Higiene & Frescura"],
    clientOrConcept: "Empresa de Limpeza & Facilities",
    year: "2026",
    color: "#06B6D4",
  },
  {
    id: "cleaning-service-identity",
    title: "Manual & Aplicações — Serviços de Higienização",
    category: "Manual de Identidade Visual",
    subtitle: "Aplicações em Fardas, Materiais de Limpeza e Veículos",
    description:
      "Manual de identidade visual e desdobramento prático da marca para equipas operacionais de higienização. Garante uma imagem de alta confiança, apresentação impecável de funcionários e credibilidade perante o cliente.",
    image: "/galeria/Cleaning_service_company_logo_2K_20261013131346.jpg",
    tags: ["Manual de Identidade", "Fardamento", "Mockups Reais", "Comunicação de Marca"],
    clientOrConcept: "Serviços Especializados de Higienização",
    year: "2026",
    color: "#10B981",
  },
  {
    id: "house-real-estate-branding",
    title: "Branding Arquitetónico — Habitação & Construção",
    category: "Branding",
    subtitle: "Símbolo Residencial & Construção de Marca Imobiliária",
    description:
      "Identidade corporativa refinada desenhada para o setor imobiliário, arquitetura e engenharia civil. Combina geometria habitacional moderna com tipografia sólida para atrair investidores e clientes exigentes.",
    image: "/galeria/House_logo_branding_design_2K_20261013132636.jpg",
    tags: ["Construção Civil", "Imobiliária & Habitação", "Arquitetura", "Branding Premium"],
    clientOrConcept: "Habitação, Engenharia & Construção",
    year: "2026",
    color: "#F59E0B",
  },
];

export const designServicePillars = [
  {
    id: "logo-creation",
    title: "Criação de Logotipos",
    shortTitle: "Logo Design",
    description:
      "Criamos símbolos e logotipos únicos, vetoriais e memoráveis que transmitem imediatamente a autoridade, os valores e o propósito do seu negócio.",
    features: [
      "Conceção de logotipo vetorial exclusivo",
      "Variações horizontal, vertical e ícone (isotipo)",
      "Ficheiros finais em alta resolução (AI, SVG, PNG, PDF)",
      "Versões para fundo claro, escuro e monocromático",
    ],
    color: "#00F2FE",
  },
  {
    id: "brand-guidelines",
    title: "Manual de Identidade Visual",
    shortTitle: "Brandbook & Normas",
    description:
      "O guia definitivo da sua marca. Definimos as regras oficiais para que a sua empresa mantenha coerência absoluta em qualquer suporte de comunicação.",
    features: [
      "Definição da paleta de cores (RGB, CMYK, HEX e Pantone)",
      "Tipografia institucional e hierarquia de fontes",
      "Área de proteção e limites de redução do logo",
      "Regras de uso correto e proibições de aplicação",
    ],
    color: "#F59E0B",
  },
  {
    id: "branding-strategy",
    title: "Branding & Posicionamento",
    shortTitle: "Branding Completo",
    description:
      "Construímos a personalidade, o tom de voz e o ecossistema visual da sua marca para destacar a sua empresa da concorrência e conquistar clientes fiéis.",
    features: [
      "Arquitetura e tom de voz da marca",
      "Papelaria institucional (cartões, papel timbrado, pastas)",
      "Mockups 3D hiper-realistas para apresentações",
      "Alinhamento estratégico com o seu público-alvo",
    ],
    color: "#00D4AA",
  },
  {
    id: "graphic-design",
    title: "Design Gráfico & Suportes Digitais",
    shortTitle: "Design de Suportes",
    description:
      "Peças visuais com acabamento refinado para campanhas publicitárias, redes sociais, frotas, eventos corporativos e materiais promocionais impressos.",
    features: [
      "Artes profissionais para redes sociais e websites",
      "Design de outdoors, flyers, catálogos e folhetos",
      "Decoração de viaturas e fardamento empresarial",
      "Brindes institucionais e sinalética para escritório",
    ],
    color: "#9333EA",
  },
];
