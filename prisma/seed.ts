import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // seed example user (use hashed password in real seed)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password: 'changeme' }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
