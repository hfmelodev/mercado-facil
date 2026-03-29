import { EmptyState } from "@/components/empty-state";
import { ProductItem as ProductCard } from "@/components/product-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductItem } from "@/lib/types";

type ProductSectionProps = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  products: ProductItem[];
  onDelete: (id: string) => void;
  onTogglePurchased: (id: string, isPurchased: boolean) => void;
  pendingIds: string[];
};

export function ProductSection({
  description,
  emptyDescription,
  emptyTitle,
  onDelete,
  onTogglePurchased,
  pendingIds,
  products,
  title,
}: Readonly<ProductSectionProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-zinc-500">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {products.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              busy={pendingIds.includes(product.id)}
              product={product}
              onDelete={onDelete}
              onTogglePurchased={onTogglePurchased}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
