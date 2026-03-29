import { ImageResponse } from "next/og";

import { BrandIcon } from "@/lib/brand-icon";

type RouteContext = {
  params: Promise<{
    size: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { size } = await context.params;
  const parsedSize = Number.parseInt(size, 10);
  const safeSize = Number.isFinite(parsedSize) ? parsedSize : 192;
  const boundedSize = Math.min(Math.max(safeSize, 64), 1024);

  return new ImageResponse(<BrandIcon size={boundedSize} />, {
    width: boundedSize,
    height: boundedSize,
  });
}
