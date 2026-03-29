import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  { name: "Arroz", quantity: "1 pacote", isPurchased: false },
  { name: "Feijao", quantity: "2 pacotes", isPurchased: false },
  { name: "Leite", quantity: "6 caixas", isPurchased: true },
  { name: "Cafe", quantity: "1 pacote", isPurchased: false },
  { name: "Banana", quantity: "1 penca", isPurchased: true },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: products,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed falhou", error);
    await prisma.$disconnect();
    process.exit(1);
  });
