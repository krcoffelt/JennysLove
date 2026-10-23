import tax from "./posts/how-to-prepare-for-tax-season-a-2026-guide.json";
import bookkeeping from "./posts/best-bookkeeping-services-for-small-business-in-2026.json";

export type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; rows: string[][] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  blocks: Block[];
};

/**
 * Preserved from the live site (both URLs keep 200). Content is unchanged.
 * Before launch: confirm a human byline and have the tax article reviewed
 * against current IRS sources (rebuild brief §5, §9).
 */
export const posts: Post[] = ([tax, bookkeeping] as Post[]).sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export const author = { name: "Jenny’s Love Accounting", approval: "pending human byline" };

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function readingMinutes(post: Post) {
  const words = post.blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : b.rows.flat().join(" ")))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
