/** Fetcher function for SWR
 * @see {@link https://swr.vercel.app/docs/data-fetching}
 */
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { fetcher };
