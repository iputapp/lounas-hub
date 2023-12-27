import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { Prisma, prisma } from "@/lib/prisma";
// import type { Restaurant } from "@/lib/zod";

/** Route params */
type RouteParams = {
  id: string;
};

export async function DELETE(request: NextRequest, context: { params: RouteParams }) {
  /**
   * Delete target restaurant from database
   * @see {@link https://www.prisma.io/docs/concepts/components/prisma-client/transactions#the-transaction-api}
   * @todo データベースの見直しが必要 (cascade delete等)
   */
  try {
    const [restaurant] = await prisma.$transaction([
      prisma.restaurant.delete({
        where: {
          id: context.params.id,
        },
      }),
    ]);
    return NextResponse.json({ message: "Restaurant deleted", results: [restaurant] });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025":
          return NextResponse.json({ status: { code: 404 }, error: error });
        default:
          break;
      }
    }
    return NextResponse.json({ error: error });
  }
}
