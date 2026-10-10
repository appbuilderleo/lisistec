const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando limpeza de dados de teste do CRM...');

  // 1. Eliminar notas de leads
  const deletedNotes = await prisma.leadNote.deleteMany({});
  console.log(`Notas de leads eliminadas: ${deletedNotes.count}`);

  // 2. Eliminar registos de atividades
  const deletedActivities = await prisma.leadActivity.deleteMany({});
  console.log(`Atividades de leads eliminadas: ${deletedActivities.count}`);

  // 3. Eliminar clientes
  const deletedClients = await prisma.client.deleteMany({});
  console.log(`Clientes eliminados: ${deletedClients.count}`);

  // 4. Eliminar mensagens de contacto / leads
  const deletedLeads = await prisma.contactMessage.deleteMany({});
  console.log(`Contactos / Leads eliminados: ${deletedLeads.count}`);

  // 5. Verificar que o administrador e os restantes dados do site foram preservados
  const adminCount = await prisma.adminUser.count();
  const blogCount = await prisma.blogPost.count();
  const projectCount = await prisma.project.count();

  console.log('--- Verificação de Integridade ---');
  console.log(`Administradores preservados: ${adminCount}`);
  console.log(`Artigos de blog preservados: ${blogCount}`);
  console.log(`Projetos de portfólio preservados: ${projectCount}`);
  console.log('Limpeza concluída com sucesso. CRM pronto para produção!');
}

main()
  .catch((e) => {
    console.error('Erro ao limpar dados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
