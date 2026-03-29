import { Badge } from "@/components/ui/badge";

type ListSummaryProps = {
  pendingCount: number;
  purchasedCount: number;
};

export function ListSummary({ pendingCount, purchasedCount }: Readonly<ListSummaryProps>) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">{pendingCount} pendente(s)</Badge>
      <Badge>{purchasedCount} no carrinho</Badge>
    </div>
  );
}
