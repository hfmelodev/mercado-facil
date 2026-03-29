import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "icon";
};

const variants = {
  default: "bg-zinc-950 text-white hover:bg-zinc-800",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

const sizes = {
  default: "h-11 px-4 py-2",
  sm: "h-9 px-3 py-2 text-sm",
  icon: "size-10",
};

export function Button({
  asChild = false,
  className,
  size = "default",
  type = "button",
  variant = "default",
  ...props
}: Readonly<ButtonProps>) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium text-sm transition-colors disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      type={type}
      {...props}
    />
  );
}
