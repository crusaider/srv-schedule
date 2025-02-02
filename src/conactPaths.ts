const stripTrailingSlash = (url: string) => url.replace(/\/$/, "");

const stripLeadingSlash = (url: string) => url.replace(/^\//, "");

const stripSlashes = (url: string) =>
  stripTrailingSlash(stripLeadingSlash(url));

const ignoreEmpty = (url: string) => url !== "";

/**
 * Concatenates multiple path segments into a single path string.
 *
 * @param args - The path segments to concatenate.
 * @returns The concatenated path string.
 */
export const concatPaths = (...args: string[]) =>
  args.map(stripSlashes).filter(ignoreEmpty).join("/");
