"use client";

import { LoaderCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ProductItem as ProductItemType } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductItemProps = {
  busy: boolean;
  product: ProductItemType;
  onDelete: (id: string) => void;
  onTogglePurchased: (id: string, isPurchased: boolean) => void;
};

export function ProductItem({ busy, product, onDelete, onTogglePurchased }: Readonly<ProductItemProps>) {
  const quantityLabel = product.quantity?.trim();

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-3xl border px-4 py-4 transition-colors",
        product.isPurchased ? "border-emerald-100 bg-emerald-50/70" : "border-zinc-200 bg-white"
      )}
    >
      <Checkbox
        checked={product.isPurchased}
        disabled={busy}
        onCheckedChange={checked => onTogglePurchased(product.id, checked === true)}
        aria-label={product.isPurchased ? `Desmarcar ${product.name}` : `Marcar ${product.name} como comprado`}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <p className={cn("font-medium text-sm text-zinc-950", product.isPurchased && "text-zinc-500 line-through")}>
              {product.name}
            </p>
            {quantityLabel ? <p className="text-sm text-zinc-500">Quantidade: {quantityLabel}</p> : null}
          </div>

          <Button
            aria-label={`Excluir ${product.name}`}
            className="shrink-0"
            disabled={busy}
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => onDelete(product.id)}
          >
            {busy ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
