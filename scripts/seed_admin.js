const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('Verifying Admin User in CockroachDB...');
  const count = await prisma.adminUser.count();
  console.log(`Current admin count: ${count}`);

  if (count === 0) {
    const admin = await prisma.adminUser.create({
      data: {
        name: 'Administrador Lisis',
        email: 'admin@lisis.co.mz',
        passwordHash: hashPassword('Admin@Lisis2026!'),
        role: 'ADMIN',
      },
    });
    console.log('Default admin user successfully created:');
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
  } else {
    const admin = await prisma.adminUser.findFirst();
    console.log(`Admin user already exists: ${admin.email}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
