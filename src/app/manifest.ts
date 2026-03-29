import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mercado Facil",
    short_name: "Mercado",
    description: "Lista de compras compartilhada para cadastrar em casa e marcar no supermercado.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f7f8",
    theme_color: "#10b981",
    categories: ["shopping", "productivity"],
    lang: "pt-BR",
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
