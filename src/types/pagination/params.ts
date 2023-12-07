import { z } from "zod";

/**
 * Pagination params
 * @property page - Page number (min 1, default 1)
 * @property limit - Rows per page (min 10, max 50, default 10)
 * @example
 * ```ts
 * // Cast to number, if not number or not in range, return default value
 * paginationParams.parse({ page: "1", limit: "10" });
 * ```
 */
const paginationParams = z.object({
  /**
   * Page number
   * @description Page number starts from 1. (min 1)
   * @example
   * ```ts
   * // Cast to number, if not number or not in range, return 1
   * paginationParams.parse({ page: "1" });
   * ```
   */
  page: z.coerce.number().positive().catch(1),
  /**
   * Rows per page
   * @description Limit rows per page. (min 10, max 50)
   * @example
   * ```ts
   * // Cast to number, if not number or not in range, return 10
   * paginationParams.parse({ limit: "10" });
   * ```
   */
  limit: z.coerce.number().gte(10).lte(50).catch(10),
});

type PaginationParams = z.infer<typeof paginationParams>;

export { paginationParams };
export type { PaginationParams };
