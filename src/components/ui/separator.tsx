import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Separator({ className, ...props }: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("h-px w-full bg-zinc-200", className)} {...props} />;
}
