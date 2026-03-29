import type { Product } from "@prisma/client";

import { db } from "@/lib/db";
import { type ProductItem, sortProducts } from "@/lib/types";
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

export async function listProducts() {
  if (!isDatabaseConfigured()) {
    return [] satisfies ProductItem[];
  }

  const products = await db.product.findMany({
    orderBy: [{ isPurchased: "asc" }, { createdAt: "asc" }],
  });

  return products.map(serializeProduct);
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
