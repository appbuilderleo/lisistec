const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const tables = await prisma.$queryRawUnsafe("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log("Existing tables:", tables);
    for (const t of tables) {
      try {
        const count = await prisma.$queryRawUnsafe(`SELECT count(*) FROM "${t.table_name}"`);
        console.log(`Table ${t.table_name} count:`, count);
      } catch (err) {
        console.log(`Could not count ${t.table_name}:`, err.message);
      }
    }
  } catch (e) {
    console.error("Error checking tables:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
