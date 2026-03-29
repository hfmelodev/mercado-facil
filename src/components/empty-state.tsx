import { PackageOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: Readonly<EmptyStateProps>) {
  return (
    <Card className="border-dashed bg-zinc-50/80">
      <CardContent className="flex flex-col items-center gap-3 px-5 py-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-zinc-400 shadow-sm">
          <PackageOpen className="size-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
