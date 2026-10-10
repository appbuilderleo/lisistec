const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Testing contact message / lead reception...');
  const count = await prisma.contactMessage.count();
  console.log(`Current leads count: ${count}`);

  if (count === 0) {
    const lead1 = await prisma.contactMessage.create({
      data: {
        name: 'Carlos Macuácua',
        email: 'carlos.macuacua@empresa.co.mz',
        phone: '+258841234567',
        company: 'Macuácua Distribuidora Lda',
        subject: 'Implementação do Sistema Stoka POS',
        message: 'Bom dia equipa da Lisis. Vimos o vosso sistema Stoka e gostaríamos de solicitar uma proposta comercial para 3 lojas na Matola com integração de faturação e stock.',
        status: 'NOVO',
        priority: 'ALTA',
        source: 'site_contact',
        estimatedValue: 75000,
        read: false,
      },
    });

    await prisma.leadActivity.create({
      data: {
        leadId: lead1.id,
        type: 'NOVO_LEAD',
        description: `Novo contacto recebido através do formulário do site (${lead1.email})`,
      },
    });

    const lead2 = await prisma.contactMessage.create({
      data: {
        name: 'Dra. Sandra Nhantumbo',
        email: 'sandra.nhantumbo@clinica.mz',
        phone: '+258829876543',
        company: 'Centro Médico Nhantumbo',
        subject: 'Website Institucional e Agendamentos',
        message: 'Olá, gostámos muito do design do vosso projeto MedSpa. Pretendemos desenvolver um website semelhante para a nossa clínica com integração de WhatsApp para agendamentos de consultas.',
        status: 'EM_CONTACTO',
        priority: 'MEDIA',
        source: 'site_contact',
        estimatedValue: 45000,
        read: true,
      },
    });

    await prisma.leadActivity.create({
      data: {
        leadId: lead2.id,
        type: 'NOVO_LEAD',
        description: `Novo contacto recebido através do formulário do site (${lead2.email})`,
      },
    });

    await prisma.leadNote.create({
      data: {
        leadId: lead2.id,
        authorName: 'Administrador Lisis',
        content: 'Contactei a Dra. Sandra via WhatsApp. Enviada apresentação da empresa e agendada chamada para alinhamento de requisitos.',
      },
    });

    console.log('Sample leads successfully created for CRM demonstration!');
  } else {
    console.log(`Existing leads found: ${count}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
