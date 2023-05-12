import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstUser = await prisma.user.upsert({
    where: { username: 'usuario' },
    update: {},
    create: {
      username: 'usuario',
      password: 'teste'
    },
  });

  console.log({ firstUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
