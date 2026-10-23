import { site } from "@/content/business";
import { posts } from "@/content/posts";

export const dynamic = "force-static";

export function GET() {
  const pages = ["/", "/about", "/our-services", "/contact", "/blog"].map((p) => ({ loc: `${site.url}${p === "/" ? "" : p}`, lastmod: undefined as string | undefined }));
  const articles = posts.map((p) => ({ loc: `${site.url}/post/${p.slug}`, lastmod: p.dateModified.slice(0, 10) }));
  const urls = [...pages, ...articles]
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
