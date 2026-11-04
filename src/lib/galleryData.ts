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
    title: "Logo & Identidade Tech: Cyan Software",
    category: "Criação de Logo",
    subtitle: "Logotipo Corporativo & Isotipo Geométrico",
    description:
      "Logotipo vetorial construído sobre grelha geométrica precisa para empresa de engenharia de software e infraestrutura cloud. Símbolo desenhado para máxima legibilidade em interfaces digitais e suportes físicos.",
    image: "/galeria/Cyan_logo_for_software_company_2K_20261013090832.jpg",
    tags: ["Logo Design", "Software & Cloud", "Isotipo Geométrico", "Vetor"],
    clientOrConcept: "Empresa de Software & TI",
    year: "2026",
    color: "#00D4AA",
  },
  {
    id: "real-estate-identity",
    title: "Identidade Visual & Mockups: Imobiliária Premium",
    category: "Manual de Identidade Visual",
    subtitle: "Brandbook Completo & Papelaria Corporativa 3D",
    description:
      "Manual de normas de identidade visual desenvolvido para consultoria imobiliária. Define paleta cromática oficial, tipografia institucional, grelha de construção e estacionário corporativo completo.",
    image: "/galeria/Real_estate_brand_identity_mockup_2K_20261013084614.jpg",
    tags: ["Manual de Identidade", "Imobiliária", "Brandbook", "Papelaria 3D"],
    clientOrConcept: "Agência Imobiliária & Investimentos",
    year: "2026",
    color: "#F59E0B",
  },
  {
    id: "branding-lisis",
    title: "Branding Institucional & Posicionamento: Lisis Tech",
    category: "Branding",
    subtitle: "Arquitetura de Marca Tecnológica & Ecossistema Digital",
    description:
      "Sistema visual e posicionamento institucional da Lisis Tecnologias e Serviços. Símbolo delta focado em engenharia de precisão, solidez técnica e presença corporativa em suportes físicos e digitais.",
    image: "/galeria/Branding_lisis.jpg",
    tags: ["Branding Corporativo", "Identidade de Marca", "Posicionamento", "Lisis Tech"],
    clientOrConcept: "Lisis Tecnologias e Serviços",
    year: "2026",
    color: "#00D4AA",
  },
  {
    id: "red-tow-truck-logo",
    title: "Logotipo Automóvel & Reboque: Red Tow Truck",
    category: "Criação de Logo",
    subtitle: "Identidade Visual de AltoContraste para Logística",
    description:
      "Marca emblemática para operações de assistência rodoviária e reboque 24h. O contraste cromático entre vermelho industrial e antracite garante leitura imediata em autoestradas e frotas.",
    image: "/galeria/Red_tow_truck_logo._2K_20261013084648.jpg",
    tags: ["Logotipo", "Sector Automóvel", "Reboque & Logística", "Sinalética"],
    clientOrConcept: "Serviços de Assistência e Reboque",
    year: "2026",
    color: "#EF4444",
  },
  {
    id: "designing-tow-truck-process",
    title: "Processo Criativo & Grelha Geométrica de Construção",
    category: "Design Gráfico",
    subtitle: "Estudos de Geometria, Proporções e Curvas Vetoriais",
    description:
      "Documentação técnica do processo de desenho vetorial. Apresenta a construção com linhas guia, proporções matemáticas e testes de redução para impressão e serigrafia.",
    image: "/galeria/Designing_red_tow_truck_logo_2K_20261013085532.jpg",
    tags: ["Grelha de Construção", "Processo Criativo", "Design Vetorial", "Geometria"],
    clientOrConcept: "Estudo de Marca & Construção",
    year: "2026",
    color: "#0EA5E9",
  },
  {
    id: "red-tow-truck-branding",
    title: "Aplicações de Frota & Sinalética Institucional",
    category: "Branding",
    subtitle: "Desdobramento em Viaturas, Fardas e Suportes Físicos",
    description:
      "Aplicação técnica da marca em viaturas de assistência, fardamento operacional, cartões corporativos e sinalética exterior. Garante uniformidade visual em toda a operação no terreno.",
    image: "/galeria/Red_tow_truck_logo_branding_2K_20261013085529.jpg",
    tags: ["Branding de Frota", "Sinalética", "Mockup Realista", "Aplicações de Marca"],
    clientOrConcept: "Branding e Frota Comercial",
    year: "2026",
    color: "#E11D48",
  },
  {
    id: "cleaning-company-branding",
    title: "Logo & Identidade: Limpeza Corporativa & Facilities",
    category: "Criação de Logo",
    subtitle: "Logotipo Vetorial & Símbolo de Higiene e Rigor",
    description:
      "Conceção visual e logotipo para empresa de gestão de condomínios e limpeza profissional. Geometria limpa que comunica organização, rigor operacional e confiança institucional.",
    image: "/galeria/Cleaning_company_logo_branding_2K_20261013131338.jpg",
    tags: ["Limpeza Profissional", "Facilities", "Logo Vetorial", "Corporativo"],
    clientOrConcept: "Empresa de Limpeza & Facilities",
    year: "2026",
    color: "#06B6D4",
  },
  {
    id: "cleaning-service-identity",
    title: "Manual & Aplicações: Serviços de Higienização",
    category: "Manual de Identidade Visual",
    subtitle: "Aplicações em Fardas, Equipamentos e Viaturas",
    description:
      "Manual de identidade visual e padronização de equipas técnicas de higienização. Inclui especificações para bordados, serigrafia em equipamentos e envelopamento de viaturas.",
    image: "/galeria/Cleaning_service_company_logo_2K_20261013131346.jpg",
    tags: ["Manual de Identidade", "Fardamento", "Mockups Reais", "Padronização"],
    clientOrConcept: "Serviços Especializados de Higienização",
    year: "2026",
    color: "#10B981",
  },
  {
    id: "house-real-estate-branding",
    title: "Branding Arquitetónico: Habitação & Construção",
    category: "Branding",
    subtitle: "Símbolo Residencial & Identidade para Engenharia Civil",
    description:
      "Identidade corporativa desenhada para empresas de engenharia civil, arquitetura e promoção imobiliária. Combina traços estruturais com tipografia sólida para projectos de grande escala.",
    image: "/galeria/House_logo_branding_design_2K_20261013132636.jpg",
    tags: ["Construção Civil", "Imobiliária & Habitação", "Arquitetura", "Engenharia"],
    clientOrConcept: "Habitação, Engenharia & Construção",
    year: "2026",
    color: "#F59E0B",
  },
];

export const designServicePillars = [
  {
    id: "logo-creation",
    code: "01",
    title: "Criação de Logotipos Vetoriais",
    shortTitle: "Logo Design",
    description:
      "Desenhamos símbolos e logotipos exclusivos com construção geométrica rigorosa, prontos para registo oficial e aplicação em qualquer escala.",
    features: [
      "Conceção de logotipo vetorial original",
      "Versões horizontal, vertical e símbolo isolado (isotipo)",
      "Ficheiros editáveis e fechados (AI, EPS, SVG, PDF, PNG)",
      "Adaptação para fundos claros, escuros e monocromáticos",
    ],
    color: "#00D4AA",
  },
  {
    id: "brand-guidelines",
    code: "02",
    title: "Manual de Identidade Visual",
    shortTitle: "Brandbook & Normas",
    description:
      "Documento técnico que fixa as regras de utilização da marca para garantir que gráficas, fornecedores e equipas mantenham coerência visual absoluta.",
    features: [
      "Códigos de cor oficiais (Pantone, CMYK, RGB e HEX)",
      "Tipografia institucional primária e secundária",
      "Grelha de construção, área de reserva e redução mínima",
      "Regras de aplicação correta e usos não permitidos",
    ],
    color: "#0EA5E9",
  },
  {
    id: "branding-strategy",
    code: "03",
    title: "Estacionário & Posicionamento",
    shortTitle: "Branding Corporativo",
    description:
      "Desdobramento completo da identidade visual nos materiais diários de trabalho e apresentação comercial da sua instituição ou empresa.",
    features: [
      "Cartões de visita, papel timbrado, envelopes e pastas",
      "Assinaturas de email, modelos de propostas e relatórios",
      "Crachás institucionais e apresentações executivas",
      "Mockups 3D realistas para validação antes de impressão",
    ],
    color: "#F59E0B",
  },
  {
    id: "graphic-design",
    code: "04",
    title: "Sinalética, Frotas & Suportes",
    shortTitle: "Design de Suportes",
    description:
      "Preparação de artes finais com especificações técnicas de corte e impressão para viaturas, fachadas, eventos, feiras (como a FACIM) e suportes digitais.",
    features: [
      "Decoração de frotas comerciais e viaturas de serviço",
      "Fardamento profissional, EPIs e brindes corporativos",
      "Roll-ups, stands de exposição, outdoors e sinalética interna",
      "Templates e sistemas visuais para comunicação digital",
    ],
    color: "#10B981",
  },
];
