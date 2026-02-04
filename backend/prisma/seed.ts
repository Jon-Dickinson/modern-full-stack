import prisma from '../src/prisma.js';

async function main() {
  await prisma.item.deleteMany();

  await prisma.item.createMany({
    data: [
      { title: 'Set up development environment', status: 'closed' },
      { title: 'Build API endpoints', status: 'closed' },
      { title: 'Create frontend components', status: 'open' }
    ]
  });

  const items = await prisma.item.findMany({ orderBy: { createdAt: 'desc' } });
  console.log('Seeded items:', items);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
