import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import type { Restaurant } from "@/lib/zod";
import type { PaginationApi } from "@/types/pagination";
import { paginationParams } from "@/types/pagination/params";

export async function GET(request: NextRequest) {
  /** Get pagination params from query */
  const searchParams = {
    page: request.nextUrl.searchParams.get("page"),
    limit: request.nextUrl.searchParams.get("limit"),
  };

  /** Parse and validate pagination params object */
  const params = paginationParams.parse(searchParams);

  /**
   * Get restaurants from database
   * @see {@link https://www.prisma.io/docs/concepts/components/prisma-client/transactions#the-transaction-api}
   */
  const [restaurants, count] = await prisma.$transaction([
    prisma.restaurant.findMany({
      orderBy: {
        name: "asc",
      },
      skip: (params.page - 1) * params.limit,
      take: params.limit,
    }),
    prisma.restaurant.count(),
  ]);

  /** Return target restaurants and all restaurants count */
  const response: PaginationApi<Restaurant> = {
    results: restaurants,
    count,
  };

  return NextResponse.json(response);
}
