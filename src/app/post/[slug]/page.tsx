import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/business";
import { author, formatDate, getPost, posts, readingMinutes, slugify, type Block } from "@/content/posts";
import { PillLink, SectionLabel } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.datePublished, modifiedTime: post.dateModified },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const toc = post.blocks.filter((b): b is { type: "h2"; text: string } => b.type === "h2");

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            url: `${site.url}/post/${post.slug}`,
            mainEntityOfPage: `${site.url}/post/${post.slug}`,
            author: { "@type": "Organization", name: author.name, url: site.url },
            publisher: { "@id": `${site.url}/#business` },
          }),
        }}
      />

      <header className="site-container pb-12 pt-12 md:pb-16 md:pt-20">
        <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-ink-soft hover:text-heart">
          <span aria-hidden="true">←</span> All articles
        </Link>
        <h1 className="mt-6 max-w-4xl text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-[3.8rem]">{post.title}</h1>
        <p className="mt-6 font-sans text-sm text-ink-soft">
          By {author.name}
          <span className="mx-2">·</span>
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          <span className="mx-2">·</span>
          {readingMinutes(post)} min read
        </p>
      </header>

      <div className="site-container pb-24 md:pb-32">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="In this article" className="lg:sticky lg:top-28">
              <SectionLabel>In this article</SectionLabel>
              <ol className="mt-4 space-y-1 font-sans text-sm">
                {toc.map((h) => (
                  <li key={h.text}>
                    <a href={`#${slugify(h.text)}`} className="inline-flex min-h-9 items-center py-1 text-ink-soft hover:text-heart">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="prose-jl min-w-0 max-w-[42rem] lg:col-span-8 lg:col-start-5">
            {post.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}

            <div className="!mt-16 rounded-xl bg-wine p-8 text-cream md:p-10">
              <p className="font-serif text-3xl leading-tight">Want a hand with your books?</p>
              <p className="mt-3 font-sans text-cream/75">Jenny is a call or email away.</p>
              <div className="mt-7">
                <PillLink href="/contact" tone="dark" event="consultation_cta_click">
                  Contact Jenny
                </PillLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case "h2":
      return (
        <h2 id={slugify(b.text)} className="scroll-mt-28">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3>{b.text}</h3>;
    case "p":
      return <p>{inline(b.text)}</p>;
    case "ul":
    case "ol": {
      const L = b.type;
      return (
        <L>
          {b.items.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </L>
      );
    }
    case "table": {
      const [head, ...rows] = b.rows;
      return (
        <div className="overflow-x-auto rounded-lg border border-line" role="region" aria-label="Table" tabIndex={0}>
          <table className="w-full min-w-[34rem] border-collapse font-sans text-[0.9rem]">
            <thead className="bg-cream-2">
              <tr>
                {head.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 text-left font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-line">
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-3 align-top">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

/** Minimal inline renderer for the preserved article text: **bold** and [label](href). */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={m.index}>{m[1]}</strong>);
    else {
      const href = m[3];
      const internal = href.startsWith("/");
      out.push(
        internal ? (
          <Link key={m.index} href={href}>
            {m[2].replace(/\*\*/g, "")}
          </Link>
        ) : (
          <a key={m.index} href={href} rel="noopener">
            {m[2].replace(/\*\*/g, "")}
          </a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
