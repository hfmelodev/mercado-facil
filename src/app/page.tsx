import { AppShell } from "@/components/app-shell";
import { isDatabaseConfigured, listProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, databaseConfigured] = await Promise.all([
    listProducts(),
    Promise.resolve(isDatabaseConfigured()),
  ]);

  return (
    <AppShell
      databaseConfigured={databaseConfigured}
      initialProducts={products}
    />
  );
}
