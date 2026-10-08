const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding de dados...');

  // Seeding Projects
  const projects = [
    {
      title: 'Lisis Assist - IA de Atendimento Inteligente',
      slug: 'lisis-assist',
      description: 'Plataforma de inteligência artificial generativa com suporte a canais WhatsApp, Web e CRM, reduzindo o tempo de resposta em 85% para empresas em Moçambique.',
      category: 'Inteligência Artificial',
      image: '/images/portfolio/lisis-assist.jpg',
      tags: ['IA', 'WhatsApp API', 'Next.js', 'NLP', 'CockroachDB'],
      featured: true,
      liveUrl: 'https://lisis.co.mz/solucoes#lisis-assist'
    },
    {
      title: 'Lisis School - Gestão Escolar Integrada',
      slug: 'lisis-school',
      description: 'Sistema completo de gestão académica e financeira para escolas e faculdades, incluindo pautas digitais, matrículas online e portal de encarregados de educação.',
      category: 'Sistemas Web / SaaS',
      image: '/images/portfolio/lisis-school.jpg',
      tags: ['EduTech', 'SaaS', 'TypeScript', 'Relatórios', 'M-Pesa'],
      featured: true,
      liveUrl: 'https://lisis.co.mz/solucoes#lisis-school'
    },
    {
      title: 'Stoka - Gestão Inteligente de Stocks e POS',
      slug: 'stoka-pos',
      description: 'Controlo de inventário em tempo real, ponto de venda moderno, faturação rápida e relatórios de lucratividade para retalho e armazéns.',
      category: 'Sistemas de Gestão',
      image: '/images/portfolio/stoka.jpg',
      tags: ['POS', 'Inventário', 'Cloud', 'Gestão Financeira'],
      featured: true,
      liveUrl: 'https://lisis.co.mz/solucoes#stoka'
    },
    {
      title: 'Gateway Integrado de Pagamentos Móveis (M-Pesa & e-Mola)',
      slug: 'gateway-mpesa-emola',
      description: 'Módulo de integração segura e automatizada de pagamentos móveis para e-commerce e faturamento corporativo no mercado moçambicano.',
      category: 'Integrações & API',
      image: '/images/portfolio/gateway.jpg',
      tags: ['FinTech', 'API REST', 'Segurança', 'M-Pesa', 'e-Mola'],
      featured: false,
      liveUrl: null
    }
  ];

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
    console.log(`Projeto sincronizado: ${proj.title}`);
  }

  // Seeding Blog Posts
  const posts = [
    {
      title: 'A Revolução da Inteligência Artificial nos Negócios em Moçambique',
      slug: 'revolucao-ia-negocios-mocambique',
      excerpt: 'Descubra como empresas moçambicanas estão a utilizar agentes inteligentes para acelerar o suporte e aumentar as vendas no WhatsApp.',
      content: 'A transformação digital em África vive um momento sem precedentes. Com a penetração acelerada da internet móvel e a centralidade do WhatsApp na comunicação pessoal e corporativa, as empresas que adotam automação e inteligência artificial destacam-se imediatamente da concorrência...',
      coverImage: '/images/blog/ia-negocios.jpg',
      published: true,
      publishedAt: new Date('2026-03-15T10:00:00Z'),
      tags: ['Inteligência Artificial', 'Tecnologia', 'Moçambique', 'Inovação']
    },
    {
      title: 'Como Otimizar a Gestão de Stocks e Prevenir Perdas com o Stoka',
      slug: 'como-otimizar-gestao-stocks-stoka',
      excerpt: 'Estratégias práticas e ferramentas digitais para gerir inventários em tempo real, automatizar reposições e manter o fluxo de caixa saudável.',
      content: 'O controlo de inventário é a espinha dorsal de qualquer negócio comercial. Desvios, rutura de stock e produtos fora de validade representam prejuízos que podem ser facilmente eliminados com um sistema de controlo centralizado...',
      coverImage: '/images/blog/gestao-stocks.jpg',
      published: true,
      publishedAt: new Date('2026-03-22T14:30:00Z'),
      tags: ['Gestão', 'Stoka', 'POS', 'Empreendedorismo']
    },
    {
      title: 'Modernização do Setor Educacional: Da Pauta de Papel ao Lisis School',
      slug: 'modernizacao-educacional-lisis-school',
      excerpt: 'Como instituições de ensino estão a eliminar a burocracia manual e aproximar pais e professores através da tecnologia.',
      content: 'A gestão manual de notas, frequências e cobranças de propinas consome centenas de horas de professores e secretarias. Com a digitalização através do Lisis School, relatórios são gerados em segundos e o acompanhamento dos alunos torna-se instantâneo...',
      coverImage: '/images/blog/edutech.jpg',
      published: true,
      publishedAt: new Date('2026-03-29T09:00:00Z'),
      tags: ['EduTech', 'Lisis School', 'Educação', 'Transformação Digital']
    }
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`Artigo sincronizado: ${post.title}`);
  }

  console.log('Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
