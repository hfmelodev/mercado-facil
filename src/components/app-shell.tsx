"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { toast } from "sonner";

import { createProductAction, deleteProductAction, setProductPurchasedAction } from "@/actions/products";
import { ListSummary } from "@/components/list-summary";
import { Logo } from "@/components/logo";
import { ProductForm } from "@/components/product-form";
import { ProductSection } from "@/components/product-section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { productsQueryKey } from "@/lib/query";
import { type ActionFeedback, type ProductItem, type ProductsResponse, sortProducts, splitProducts } from "@/lib/types";
import type { CreateProductInput } from "@/validations/product";

type AppShellProps = {
  databaseConfigured: boolean;
  initialLoadError: string | null;
  initialProducts: ProductItem[];
};

async function fetchProducts() {
  const response = await fetch("/api/products", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar a lista.");
  }

  const data = (await response.json()) as ProductsResponse;
  return sortProducts(data.products);
}

function getProductSearchText(product: ProductItem) {
  return `${product.name} ${product.quantity ?? ""}`.toLowerCase();
}

function matchesSearch(product: ProductItem, query: string) {
  if (!query) {
    return true;
  }

  return getProductSearchText(product).includes(query);
}

async function createProductMutation(values: CreateProductInput) {
  const result = await createProductAction(values);

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return {
    success: true as const,
    message: result.message,
    data: result.data,
  };
}

async function toggleProductMutation(input: { id: string; isPurchased: boolean }) {
  const result = await setProductPurchasedAction(input);

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return {
    success: true as const,
    message: result.message,
    data: result.data,
  };
}

async function deleteProductMutation(input: { id: string }) {
  const result = await deleteProductAction(input);

  if (!result.success) {
    throw new Error(result.message);
  }

  return {
    success: true as const,
    message: result.message,
  };
}

export function AppShell({ databaseConfigured, initialLoadError, initialProducts }: Readonly<AppShellProps>) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [busyIds, setBusyIds] = useState<string[]>([]);
  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();

  const productsQuery = useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
    initialData: sortProducts(initialProducts),
    enabled: databaseConfigured,
  });

  const runtimeLoadError = productsQuery.error?.message ?? null;
  const dataWarning = initialLoadError ?? runtimeLoadError;

  const products = productsQuery.data ?? [];
  const filteredProducts = products.filter(product => matchesSearch(product, normalizedSearch));
  const { pending, purchased } = splitProducts(filteredProducts);
  const allCounts = splitProducts(products);

  function markBusy(id: string) {
    setBusyIds(current => (current.includes(id) ? current : [...current, id]));
  }

  function unmarkBusy(id: string) {
    setBusyIds(current => current.filter(value => value !== id));
  }

  const createMutation = useMutation({
    mutationFn: createProductMutation,
    onSuccess(result) {
      const createdProduct = result.data;

      queryClient.setQueryData<ProductItem[]>(productsQueryKey, (current = []) => sortProducts([createdProduct, ...current]));
      toast.success(result.message);
    },
    onError() {
      toast.error("Nao foi possivel adicionar o produto.");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleProductMutation,
    async onMutate(variables) {
      const parsed = variables as { id: string; isPurchased: boolean };
      markBusy(parsed.id);
      await queryClient.cancelQueries({ queryKey: productsQueryKey });

      const previousProducts = queryClient.getQueryData<ProductItem[]>(productsQueryKey);

      queryClient.setQueryData<ProductItem[]>(productsQueryKey, (current = []) =>
        sortProducts(
          current.map(product => (product.id === parsed.id ? { ...product, isPurchased: parsed.isPurchased } : product))
        )
      );

      return {
        id: parsed.id,
        previousProducts,
      };
    },
    onError(_error, _variables, context) {
      if (context?.previousProducts) {
        queryClient.setQueryData(productsQueryKey, context.previousProducts);
      }

      toast.error("Nao foi possivel atualizar o item.");
    },
    onSuccess(result) {
      const updatedProduct = result.data;

      queryClient.setQueryData<ProductItem[]>(productsQueryKey, (current = []) =>
        sortProducts(current.map(product => (product.id === updatedProduct.id ? updatedProduct : product)))
      );
      toast.success(result.message);
    },
    onSettled(_data, _error, variables) {
      const parsed = variables as { id: string };
      unmarkBusy(parsed.id);
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductMutation,
    async onMutate(variables) {
      const parsed = variables as { id: string };
      markBusy(parsed.id);
      await queryClient.cancelQueries({ queryKey: productsQueryKey });

      const previousProducts = queryClient.getQueryData<ProductItem[]>(productsQueryKey);

      queryClient.setQueryData<ProductItem[]>(productsQueryKey, (current = []) =>
        current.filter(product => product.id !== parsed.id)
      );

      return {
        id: parsed.id,
        previousProducts,
      };
    },
    onError(_error, _variables, context) {
      if (context?.previousProducts) {
        queryClient.setQueryData(productsQueryKey, context.previousProducts);
      }

      toast.error("Não foi possível remover o produto.");
    },
    onSuccess(result) {
      toast.success(result.message);
    },
    onSettled(_data, _error, variables) {
      const parsed = variables as { id: string };
      unmarkBusy(parsed.id);
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });

  async function handleCreate(values: CreateProductInput): Promise<ActionFeedback> {
    try {
      const result = await createMutation.mutateAsync(values);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Não foi possível adicionar o produto.",
      };
    }
  }

  function handleTogglePurchased(id: string, isPurchased: boolean) {
    toggleMutation.mutate({ id, isPurchased });
  }

  function handleDelete(id: string) {
    deleteMutation.mutate({ id });
  }

  const searchMessage = normalizedSearch
    ? `Filtrando por "${deferredSearch.trim()}"`
    : "Busque por nome ou quantidade para encontrar os itens mais rápido.";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-4 rounded-4xl border border-white/70 bg-white/90 p-4 shadow-xl shadow-zinc-200/40 backdrop-blur sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-5">
          <Logo />
          <div className="space-y-3">
            <h1 className="max-w-2xl font-semibold text-3xl text-zinc-950 tracking-tight sm:text-4xl">
              Sua lista de supermercado pronta para cadastrar em casa e marcar no corredor da loja.
            </h1>
            <p className="max-w-xl text-sm text-zinc-600 leading-6 sm:text-base">
              Um fluxo simples para duas pessoas: uma adiciona os produtos e a outra acompanha tudo pelo celular sem depender de
              mensagens no WhatsApp.
            </p>
          </div>
          <ListSummary pendingCount={allCounts.pending.length} purchasedCount={allCounts.purchased.length} />

          <Card className="border-zinc-200/80 bg-zinc-50/80">
            <CardContent className="space-y-3 p-4">
              <div className="relative">
                <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 size-4 text-zinc-400" />
                <Input
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  placeholder="Buscar produto ou quantidade"
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-zinc-500">{searchMessage}</p>
            </CardContent>
          </Card>

          {!databaseConfigured ? (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="space-y-2 p-4">
                <p className="font-medium text-amber-900 text-sm">Banco ainda não configurado</p>
                <p className="text-amber-800 text-sm leading-6">
                  Crie um arquivo <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env</code> com a variavel{" "}
                  <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">DATABASE_URL</code> usando o exemplo do arquivo{" "}
                  <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">.env.example</code>.
                </p>
              </CardContent>
            </Card>
          ) : dataWarning ? (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="space-y-2 p-4">
                <p className="font-medium text-amber-900 text-sm">Nao foi possivel acessar o banco agora</p>
                <p className="text-amber-800 text-sm leading-6">
                  Verifique a <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">DATABASE_URL</code>, confirme que o
                  deploy executou <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">prisma migrate deploy</code> e
                  revise os logs da Vercel. Detalhe atual: {dataWarning}
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <ProductForm disabled={!databaseConfigured || createMutation.isPending} onCreate={handleCreate} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
        <ProductSection
          description="Tudo o que ainda precisa entrar no carrinho."
          emptyDescription={
            normalizedSearch
              ? "Nenhum item pendente corresponde a busca atual."
              : "Adicione seu primeiro item acima para comecar a lista."
          }
          emptyTitle={normalizedSearch ? "Nada encontrado" : "Nenhum item pendente"}
          pendingIds={busyIds}
          products={pending}
          title="Pendentes"
          onDelete={handleDelete}
          onTogglePurchased={handleTogglePurchased}
        />

        <div className="hidden lg:flex lg:h-full lg:items-stretch">
          <Separator className="h-auto w-px" />
        </div>

        <ProductSection
          description="Produtos ja pegos durante a compra."
          emptyDescription={
            normalizedSearch
              ? "Nenhum item comprado corresponde a busca atual."
              : "Quando voce marcar um item, ele aparecera aqui automaticamente."
          }
          emptyTitle={normalizedSearch ? "Nada encontrado" : "Carrinho vazio"}
          pendingIds={busyIds}
          products={purchased}
          title="No carrinho"
          onDelete={handleDelete}
          onTogglePurchased={handleTogglePurchased}
        />
      </section>
    </main>
  );
}
