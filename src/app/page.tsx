import { AppShell } from "@/components/app-shell";
import { isDatabaseConfigured, listProductsSafe } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ products, error }, databaseConfigured] = await Promise.all([
    listProductsSafe(),
    Promise.resolve(isDatabaseConfigured()),
  ]);

  return <AppShell databaseConfigured={databaseConfigured} initialLoadError={error} initialProducts={products} />;
}
