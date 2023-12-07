/**
 * The type of the response from the API when fetching data related to pagination
 * @example
 * ```ts
 * // Response from API
 * {
 *   results: [{id: "string", ...}], // Most schemas have an id field
 *   count: 100, // All rows count (not just the rows on the current page)
 * }
 * ```
 */
type PaginationApi<T extends { id: string }> = {
  results: T[];
  count: number;
};

export type { PaginationApi };
