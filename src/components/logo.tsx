import { ShoppingBasket } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/30">
        <ShoppingBasket className="size-5" />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-zinc-950">
          Mercado Fácil
        </p>
        <p className="text-sm text-zinc-500">
          Lista compartilhada, rápida e confiável
        </p>
      </div>
    </div>
  );
}
