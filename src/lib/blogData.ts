export interface BlogPost {
  id: string;
  code: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
    }[];
    conclusion: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "ia-negocios",
    code: "ART // 01",
    title: "Digitalização de processos em instituições públicas e empresas moçambicanas",
    excerpt:
      "Como portais governamentais, sistemas de gestão documental e plataformas académicas estão a reduzir tempos de resposta e custos operacionais em Maputo e nas províncias.",
    date: "14 Out 2026",
    readTime: "6 min",
    category: "Transformação Digital",
    tags: ["Sector Público", "Sistemas", "Moçambique"],
    content: {
      intro:
        "Ao longo dos últimos sete anos, o cenário tecnológico em Moçambique evoluiu de websites meramente informativos para plataformas transaccionais que suportam operações diárias de ministérios, universidades e empresas privadas.",
      sections: [
        {
          heading: "1. Da presença estática aos serviços digitais integrados",
          body: [
            "Instituições públicas e académicas enfrentam diariamente o desafio de atender milhares de cidadãos, estudantes e investidores. Quando matrículas, submissão de requerimentos ou consultas de informação dependem exclusivamente de atendimento presencial, formam-se filas e atrasos administrativos.",
            "A implementação de portais estruturados permite descentralizar o acesso à informação, garantindo que documentos, editais, oportunidades de investimento e registos académicos estejam disponíveis 24 horas por dia a partir de qualquer província.",
          ],
        },
        {
          heading: "2. Requisitos técnicos para o contexto moçambicano",
          body: [
            "Desenvolver software para operar em Moçambique exige atenção rigorosa ao desempenho em redes móveis (3G/4G) e à clareza das interfaces em ecrãs de telemóvel.",
            "Arquitecturas modernas baseadas em Next.js, compressão optimizada de activos e bases de dados distribuídas garantem tempos de carregamento inferiores a dois segundos, mesmo sob picos de tráfego durante períodos de inscrição ou grandes eventos como a FACIM.",
          ],
        },
        {
          heading: "3. Formação de equipas e continuidade operacional",
          body: [
            "O sucesso de um projecto tecnológico depende directamente da adesão das equipas internas. Por isso, cada entrega deve incluir documentação técnica, formação prática dos operadores e acordos de nível de serviço (SLA) com suporte local em Maputo.",
          ],
        },
      ],
      conclusion:
        "A modernização tecnológica traz retorno imediato quando o software é desenhado à medida dos processos reais da instituição, combinando segurança de dados, simplicidade de uso e acompanhamento técnico próximo.",
    },
  },
  {
    id: "sistema-gestao",
    code: "ART // 02",
    title: "Gestão de stock e Ponto de Venda (POS) no retalho alimentar e supermercados",
    excerpt:
      "Aspectos críticos para evitar quebras de inventário, acelerar o fecho de caixa e controlar múltiplas lojas em tempo real com sistemas POS modernos.",
    date: "02 Out 2026",
    readTime: "5 min",
    category: "Sistemas ERP & POS",
    tags: ["POS / PDV", "Supermercados", "Stock"],
    content: {
      intro:
        "No sector de supermercados, mercearias e distribuição alimentar, a margem do negócio depende da velocidade de atendimento nas caixas e da precisão absoluta do controlo de inventário.",
      sections: [
        {
          heading: "1. Agilidade no terminal de Ponto de Venda",
          body: [
            "Em horas de ponta, um sistema de caixa lento gera filas e perda de vendas. Um terminal POS moderno, como o STOKA desenvolvido pela Lisis Tecnologias, é projectado para leitura instantânea de códigos de barras, cálculo rápido de trocos, múltiplos métodos de pagamento e emissão imediata de talão.",
          ],
        },
        {
          heading: "2. Prevenção de roturas e desvios de stock",
          body: [
            "Sem registo automatizado de entradas e saídas, o gestor descobre a falta de um produto apenas quando a prateleira já está vazia. Com alertas de stock mínimo e histórico por operador, a administração acompanha margens, validades e reposições em tempo real.",
          ],
        },
        {
          heading: "3. Visão centralizada para a gerência",
          body: [
            "Mesmo à distância, o proprietário ou director comercial consegue consultar o volume de vendas do dia, os artigos com maior rotação e o fecho de cada turno de caixa a partir do computador ou telemóvel.",
          ],
        },
      ],
      conclusion:
        "Investir num sistema POS e de gestão de stock adaptado à realidade fiscal e comercial moçambicana protege a tesouraria da empresa e cria a base necessária para abrir novas filiais com segurança.",
    },
  },
  {
    id: "tendencias-ti-2025",
    code: "ART // 03",
    title: "Sistemas CRM na gestão comercial de empresas de consultoria e serviços",
    excerpt:
      "Porque substituir folhas de cálculo isoladas por um CRM centralizado aumenta a taxa de adjudicação de propostas técnicas e protege o histórico institucional.",
    date: "19 Set 2026",
    readTime: "5 min",
    category: "Gestão Comercial",
    tags: ["CRM", "Consultoria", "B2B"],
    content: {
      intro:
        "Empresas de consultoria, engenharia e serviços corporativos lidam com ciclos de venda longos, múltiplos decisores e propostas técnicas detalhadas.",
      sections: [
        {
          heading: "1. O risco da informação dispersa",
          body: [
            "Quando o histórico de contactos, propostas enviadas e actas de reunião fica guardado em ficheiros locais ou no correio electrónico individual de cada consultor, a empresa perde visibilidade sobre o funil de vendas.",
          ],
        },
        {
          heading: "2. Controlo de pipeline e prazos de concurso",
          body: [
            "Um sistema CRM corporativo organiza cada oportunidade por etapa: prospecção, levantamento técnico, proposta submetida, negociação e adjudicação. Toda a equipa autorizada consulta o estado real de cada cliente num painel único.",
          ],
        },
      ],
      conclusion:
        "A adopção de um CRM dedicado transforma o departamento comercial numa operação previsível, auditável e orientada por indicadores reais.",
    },
  },
  {
    id: "react-native-mozambique",
    code: "ART // 04",
    title: "Engenharia de aplicações móveis com sincronização offline em Moçambique",
    excerpt:
      "Estratégias de arquitectura para construir aplicações Android e iOS que continuam a funcionar no terreno mesmo quando a ligação à internet oscila.",
    date: "04 Set 2026",
    readTime: "6 min",
    category: "Engenharia Mobile",
    tags: ["Mobile", "Offline First", "Arquitectura"],
    content: {
      intro:
        "Equipas de campo, agentes comerciais e técnicos de inspecção deslocam-se frequentemente por zonas onde a cobertura de dados móveis é intermitente.",
      sections: [
        {
          heading: "1. Arquitectura Offline-First",
          body: [
            "Uma aplicação móvel profissional não pode bloquear nem perder dados quando o sinal cai. Ao utilizar armazenamento local estruturado no dispositivo e filas de sincronização, o utilizador regista operações normalmente e o sistema envia os dados assim que a ligação é restabelecida.",
          ],
        },
        {
          heading: "2. Eficiência no consumo de bateria e dados",
          body: [
            "Respostas de API compactas, sincronização diferencial e interfaces leves garantem que a aplicação funcione com fluidez mesmo em smartphones de gama média utilizados em operações de grande escala.",
          ],
        },
      ],
      conclusion:
        "Projectar aplicações móveis a pensar nas condições reais do terreno é o que separa um protótipo de uma ferramenta de trabalho robusta.",
    },
  },
  {
    id: "seo-mozambique",
    code: "ART // 05",
    title: "A importância do Manual de Identidade Visual (Brandbook) para instituições",
    excerpt:
      "Como garantir que o logotipo, as cores oficiais e o estacionário da sua organização mantêm rigor técnico em qualquer gráfica, viatura ou plataforma digital.",
    date: "18 Ago 2026",
    readTime: "4 min",
    category: "Design & Branding",
    tags: ["Brandbook", "Identidade Visual", "Design Vetorial"],
    content: {
      intro:
        "Muitas organizações enfrentam o problema de ver o seu logotipo distorcido, com cores diferentes em cada impressão ou ilegível quando aplicado em fardas e viaturas.",
      sections: [
        {
          heading: "1. Construção vetorial e grelha de proporções",
          body: [
            "Um logotipo corporativo deve ser desenhado em formato 100% vetorial, com margens de segurança e limites mínimos de redução testados para ecrãs e serigrafia.",
          ],
        },
        {
          heading: "2. Códigos de cor universais (Pantone, CMYK, RGB e HEX)",
          body: [
            "O Manual de Identidade Visual fixa as referências exactas de cor para impressão offset, impressão digital e ecrãs web, eliminando improvisos por parte de fornecedores externos.",
          ],
        },
      ],
      conclusion:
        "Um Brandbook bem estruturado protege o património visual da instituição e assegura coerência em todos os pontos de contacto com o público.",
    },
  },
  {
    id: "seguranca-dados",
    code: "ART // 06",
    title: "Segurança de dados, controlo de acessos e backups em sistemas empresariais",
    excerpt:
      "Boas práticas essenciais para proteger bases de dados financeiras, registos académicos e informações confidenciais contra perdas e acessos não autorizados.",
    date: "02 Ago 2026",
    readTime: "5 min",
    category: "Segurança & Cloud",
    tags: ["Segurança", "Backups", "Infraestrutura"],
    content: {
      intro:
        "À medida que empresas e instituições digitalizam a sua facturação e os seus arquivos, a segurança da infraestrutura torna-se uma responsabilidade de direcção.",
      sections: [
        {
          heading: "1. Autenticação e níveis de permissão",
          body: [
            "Cada colaborador deve aceder apenas aos módulos necessários para a sua função. Registos de auditoria (logs) permitem saber exactamente quem criou, alterou ou aprovou cada operação no sistema.",
          ],
        },
        {
          heading: "2. Rotinas automatizadas de cópia de segurança",
          body: [
            "Backups diários encriptados em servidores geograficamente redundantes garantem que, perante qualquer avaria de equipamento local, a operação pode ser restaurada em poucos minutos sem perda de histórico.",
          ],
        },
      ],
      conclusion:
        "Segurança não é um extra opcional: é a fundação de qualquer sistema de gestão corporativo ou governamental.",
    },
  },
];

