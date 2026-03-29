import { z } from "zod";

function emptyToUndefined(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do produto.").max(80, "Use no máximo 80 caracteres."),
  quantity: z.string().optional().transform(emptyToUndefined),
});

export const updatePurchasedSchema = z.object({
  id: z.string().uuid("Produto inválido."),
  isPurchased: z.boolean(),
});

export const deleteProductSchema = z.object({
  id: z.string().uuid("Produto inválido."),
});

export type CreateProductInput = z.input<typeof createProductSchema>;
