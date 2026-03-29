"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import { useId, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionFeedback } from "@/lib/types";
import { type CreateProductInput, createProductSchema } from "@/validations/product";

type ProductFormProps = {
  disabled?: boolean;
  onCreate: (values: CreateProductInput) => Promise<ActionFeedback>;
};

export function ProductForm({ disabled = false, onCreate }: Readonly<ProductFormProps>) {
  const nameId = useId();
  const quantityId = useId();
  const [message, setMessage] = useState<ActionFeedback | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      quantity: "",
    },
  });

  const handleSubmit = form.handleSubmit(values => {
    setMessage(null);

    startTransition(async () => {
      const result = await onCreate(values);
      setMessage(result);

      if (result.success) {
        form.reset({
          name: "",
          quantity: "",
        });
      }
    });
  });

  const isBusy = disabled || isPending;

  return (
    <Card className="border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg text-white">Adicionar produto</CardTitle>
        <CardDescription className="text-zinc-300">
          Cadastre os itens de casa e acompanhe a compra em tempo real no celular.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="text-zinc-200" htmlFor={nameId}>
              Produto
            </Label>
            <Input
              id={nameId}
              placeholder="Ex: Arroz integral"
              className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20"
              disabled={isBusy}
              {...form.register("name")}
            />
            {form.formState.errors.name ? <p className="text-red-300 text-sm">{form.formState.errors.name.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-200" htmlFor={quantityId}>
              Quantidade
            </Label>
            <Input
              id={quantityId}
              placeholder="Ex: 2 unidades, 1 kg, 3 caixas"
              className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20"
              disabled={isBusy}
              {...form.register("quantity")}
            />
            {form.formState.errors.quantity ? (
              <p className="text-red-300 text-sm">{form.formState.errors.quantity.message}</p>
            ) : null}
          </div>

          <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-400" disabled={isBusy} type="submit">
            {isBusy ? <LoaderCircle className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Adicionar a lista
          </Button>

          {message ? (
            <p className={message.success ? "text-emerald-300 text-sm" : "text-red-300 text-sm"}>{message.message}</p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
