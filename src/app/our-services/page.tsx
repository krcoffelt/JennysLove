import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { HeartGlyph, PillLink, Reveal, SectionLabel } from "@/components/ui";
import { extras, services, software } from "@/content/services";

export const metadata: Metadata = {
  title: { absolute: "Bookkeeping Services in Kansas City | Jenny’s Love" },
  description:
    "Monthly bookkeeping, payables, receivables, payroll support and QuickBooks training for Kansas City small businesses.",
  alternates: { canonical: "/our-services" },
};

const faqs = [
  {
    q: "Will you work in the software I already use?",
    a: "Most likely. Jenny works in QuickBooks Online and Desktop, Xero, Sage, Patriot, Gusto, ADP and more. See the full list above.",
  },
  {
    q: "What does it cost?",
    a: "Every business is different, so pricing depends on what you need. Call or email Jenny for a quote.",
  },
  {
    q: "How do we get started?",
    a: "Reach out by phone or email. You’ll talk through where your books are today and what kind of help would make the biggest difference.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            Practical support for your <em className="text-heart">business books.</em>
          </>
        }
      >
        <div className="mt-9">
          <PillLink href="/contact" event="consultation_cta_click">
            Contact Jenny
          </PillLink>
        </div>
      </PageHero>

      <div className="site-container pb-16 md:pb-24">
        <Image
          src="/media/receipts-wide.jpg"
          alt="Hands sorting receipts beside a calculator on a wooden desk"
          width={1600}
          height={800}
          priority
          sizes="(min-width: 1240px) 1160px, 100vw"
          className="aspect-[2/1] w-full rounded-lg object-cover md:aspect-[5/2]"
        />
      </div>

      <section aria-label="Service details" className="site-container pb-24 md:pb-32">
        <ol className="border-t border-line">
          {services.map((s) => (
            <Reveal as="li" key={s.id} className="border-b border-line">
              <article id={s.id} className="grid scroll-mt-28 gap-6 py-10 md:grid-cols-12 md:py-14">
                <div className="md:col-span-5">
                  <h2 className="text-3xl leading-tight md:text-[2.4rem]">{s.title}</h2>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="font-serif text-xl leading-snug">{s.summary}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-3 font-sans text-[0.95rem] text-ink-soft sm:grid-cols-2">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <HeartGlyph className="mt-[0.45rem] h-2.5 w-2.5 shrink-0 text-heart" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <p className="font-serif text-2xl">And a few extras</p>
          <ul className="flex flex-wrap gap-2">
            {extras.map((x) => (
              <li key={x} className="rounded-full bg-paper px-4 py-2 font-sans text-sm">
                {x}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="software-title" className="bg-wine text-cream">
        <div className="site-container py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel tone="light">Software</SectionLabel>
            </div>
            <h2 id="software-title" className="text-3xl leading-tight md:col-span-8 md:text-[2.6rem]">
              No need to switch systems. Jenny works in yours.
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {software.map((g) => (
              <div key={g.group} className="border-t border-cream/20 pt-5">
                <h3 className="font-sans text-xs uppercase tracking-[0.16em] text-cream/60">{g.group}</h3>
                <ul className="mt-4 space-y-2 font-serif text-lg">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="site-container py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>Questions</SectionLabel>
            <h2 id="faq-title" className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
              Good to know
            </h2>
          </div>
          <div className="border-t border-line md:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-paper transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 font-sans text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
