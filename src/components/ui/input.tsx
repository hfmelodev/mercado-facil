import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: Readonly<InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-950 shadow-sm outline-none transition-colors",
        "placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      type={type}
      {...props}
    />
  );
}
