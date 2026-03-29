import { NextResponse } from "next/server";

import { listProductsSafe } from "@/lib/products";

export async function GET() {
  const { products, error } = await listProductsSafe();

  if (error) {
    return NextResponse.json(
      {
        products,
        error,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    products,
  });
}
