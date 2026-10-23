import type { Metadata } from "next";
import { business } from "@/content/business";
import { PageHero } from "@/components/PageHero";
import { ArrowIcon, ClockIcon, PinIcon, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Contact Jenny’s Love Accounting | Kansas City" },
  description: "Call, email or visit Jenny’s Love Accounting at 5032 NE Parvin Rd, Kansas City, MO.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = business.address.value;
  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Let’s talk about <em className="text-heart">your books.</em>
          </>
        }
        intro="Call, email or drop by the office — whatever’s easiest for you."
      />

      <section aria-label="Ways to reach Jenny" className="site-container pb-24 md:pb-32">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <a
              href={business.phone.value.href}
              data-event="phone_click"
              className="group flex h-full min-h-64 flex-col justify-between rounded-xl bg-wine p-8 text-cream transition-colors duration-300 hover:bg-wine-2 md:p-10"
            >
              <span className="font-sans text-xs uppercase tracking-[0.16em] text-cream/65">Call Jenny</span>
              <span className="mt-12 flex items-end justify-between gap-4">
                <span className="font-serif text-4xl md:text-5xl">{business.phone.value.display}</span>
                <ArrowIcon className="mb-2 size-7 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
          <Reveal delay={80}>
            <a
              href={`mailto:${business.email.value}`}
              data-event="email_click"
              className="group flex h-full min-h-64 flex-col justify-between rounded-xl border border-line bg-paper/70 p-8 transition-colors duration-300 hover:bg-paper md:p-10"
            >
              <span className="font-sans text-xs uppercase tracking-[0.16em] text-ink-soft">Email Jenny</span>
              <span className="mt-12 flex items-end justify-between gap-4">
                <span className="break-all font-serif text-3xl md:text-[2.6rem] md:leading-tight">{business.email.value}</span>
                <ArrowIcon className="mb-2 size-7 shrink-0 text-heart transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>

        <p className="mt-5 max-w-2xl font-sans text-sm text-ink-soft">
          Please don’t include account numbers, tax IDs or financial documents in a first email.
        </p>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="text-3xl italic md:text-4xl">Visit the office</h2>
            <p className="mt-6 flex gap-4 font-sans">
              <PinIcon />
              <span>
                {a.street}
                <br />
                {a.city}, {a.region} {a.postalCode}
              </span>
            </p>
            <a
              href={a.directions}
              target="_blank"
              rel="noopener"
              className="mt-4 ml-9 inline-flex min-h-11 items-center font-sans text-[0.95rem] underline decoration-line underline-offset-[6px] hover:decoration-heart"
            >
              Get directions
            </a>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7" delay={80}>
            <h2 className="text-3xl italic md:text-4xl">Hours</h2>
            <dl className="mt-6 font-sans">
              {business.hours.value.map((h) => (
                <div key={h.days} className="flex items-center justify-between gap-6 border-b border-line py-4 first:pt-0">
                  <dt className="flex items-center gap-4">
                    <ClockIcon />
                    {h.days}
                  </dt>
                  <dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-sans text-sm text-ink-soft">Central Time</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
