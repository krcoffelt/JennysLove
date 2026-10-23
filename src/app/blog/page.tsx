import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ArrowIcon, Reveal } from "@/components/ui";
import { formatDate, posts, readingMinutes } from "@/content/posts";

export const metadata: Metadata = {
  title: { absolute: "Blog | Jenny’s Love Accounting & Bookkeeping" },
  description: "Plain-spoken bookkeeping resources for Kansas City small business owners.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Blog"
        title={
          <>
            Bookkeeping resources for <em className="text-heart">small businesses.</em>
          </>
        }
      />

      <section aria-label="Articles" className="site-container pb-24 md:pb-32">
        <ul className="border-t border-line">
          {posts.map((p) => (
            <Reveal as="li" key={p.slug} className="border-b border-line">
              <Link href={`/post/${p.slug}`} className="group grid gap-4 py-10 transition-colors duration-200 hover:bg-paper/60 md:grid-cols-12 md:gap-6 md:px-3 md:py-12">
                <span className="font-sans text-sm text-ink-soft md:col-span-3">
                  <time dateTime={p.datePublished}>{formatDate(p.datePublished)}</time>
                  <span className="mx-2">·</span>
                  {readingMinutes(p)} min read
                </span>
                <span className="md:col-span-7">
                  <span className="block font-serif text-3xl leading-tight transition-colors duration-200 group-hover:text-heart md:text-[2.2rem]">{p.title}</span>
                  <span className="mt-3 block max-w-xl font-sans text-[0.95rem] text-ink-soft">{p.description}</span>
                </span>
                <span aria-hidden="true" className="hidden justify-self-end pt-2 text-ink-soft transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-heart md:col-span-1 md:col-start-12 md:block">
                  <ArrowIcon className="size-6" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
