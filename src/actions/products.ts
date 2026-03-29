"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import { createProduct, isDatabaseConfigured, removeProduct, setProductPurchased } from "@/lib/products";
import type { ActionFeedback, ProductItem } from "@/lib/types";
import { deleteProductSchema, updatePurchasedSchema } from "@/validations/product";

type ActionResult<T = undefined> = ActionFeedback & {
  data?: T;
};

function configurationError() {
  return {
    success: false,
    message: "Configure a variável DATABASE_URL para salvar a lista no PostgreSQL.",
  } satisfies ActionFeedback;
}

function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? "Dados inválidos.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}

export async function createProductAction(input: unknown): Promise<ActionResult<ProductItem>> {
  if (!isDatabaseConfigured()) {
    return configurationError();
  }

  try {
    const product = await createProduct(input);
    revalidatePath("/");

    return {
      success: true,
      message: "Produto adicionado na lista.",
      data: product,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function setProductPurchasedAction(input: unknown): Promise<ActionResult<ProductItem>> {
  if (!isDatabaseConfigured()) {
    return configurationError();
  }

  try {
    const data = updatePurchasedSchema.parse(input);
    const product = await setProductPurchased(data.id, data.isPurchased);
    revalidatePath("/");

    return {
      success: true,
      message: data.isPurchased ? "Item movido para o carrinho." : "Item voltou para pendentes.",
      data: product,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function deleteProductAction(input: unknown): Promise<ActionResult> {
  if (!isDatabaseConfigured()) {
    return configurationError();
  }

  try {
    const data = deleteProductSchema.parse(input);
    await removeProduct(data.id);
    revalidatePath("/");

    return {
      success: true,
      message: "Produto removido da lista.",
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
