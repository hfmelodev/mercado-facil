import { Prisma, type Product } from "@prisma/client";

import { db } from "@/lib/db";
import { type ProductItem, type ProductsLoadResult, sortProducts } from "@/lib/types";
import { createProductSchema } from "@/validations/product";

function serializeProduct(product: Product): ProductItem {
  return {
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    isPurchased: product.isPurchased,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getProductPersistenceErrorMessage(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021") {
      return "O banco está acessível, mas a tabela de produtos ainda não existe. Rode `prisma migrate deploy` no banco de produção.";
    }

    if (error.code === "P2022") {
      return "O schema do banco está desatualizado em produção. Rode `prisma migrate deploy` para alinhar as colunas esperadas.";
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "Não foi possível iniciar a conexão com o PostgreSQL. Revise a `DATABASE_URL` e as credenciais do ambiente de produção.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Nao foi possivel carregar os produtos.";
}

export async function listProducts() {
  if (!isDatabaseConfigured()) {
    return [] satisfies ProductItem[];
  }

  const products = await db.product.findMany({
    orderBy: [{ isPurchased: "asc" }, { createdAt: "asc" }],
  });

  return products.map(serializeProduct);
}

export async function listProductsSafe(): Promise<ProductsLoadResult> {
  if (!isDatabaseConfigured()) {
    return {
      products: [],
      error: null,
    };
  }

  try {
    const products = await listProducts();

    return {
      products,
      error: null,
    };
  } catch (error) {
    const message = getProductPersistenceErrorMessage(error);

    console.error("[products:list]", error);

    return {
      products: [],
      error: message,
    };
  }
}

export async function createProduct(input: unknown) {
  const data = createProductSchema.parse(input);

  const product = await db.product.create({
    data: {
      name: data.name,
      quantity: data.quantity,
    },
  });

  return serializeProduct(product);
}

export async function setProductPurchased(id: string, isPurchased: boolean) {
  const product = await db.product.update({
    where: { id },
    data: { isPurchased },
  });

  return serializeProduct(product);
}

export async function removeProduct(id: string) {
  await db.product.delete({
    where: { id },
  });
}

export function orderProducts(products: ProductItem[]) {
  return sortProducts(products);
}
