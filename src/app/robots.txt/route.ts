import { site } from "@/content/business";

export const dynamic = "force-static";

/** Staging blocks crawling; only a SITE_ENV=production build (separately authorized launch) opens it. */
export function GET() {
  const body =
    process.env.SITE_ENV === "production"
      ? `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
      : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
