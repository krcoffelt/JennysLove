import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { business, site } from "@/content/business";
import { services } from "@/content/services";
import { ArrowIcon, ClockIcon, HeartGlyph, PillLink, PinIcon, Reveal, SectionLabel, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Kansas City Bookkeeping & Accounting | Jenny’s Love" },
  alternates: { canonical: "/" },
};

const values = [
  { title: "A partner, not just a bookkeeper", body: "Someone who goes the extra mile to keep you organized and growing." },
  { title: "One person who knows you", body: "Questions, worries or ideas. You always know who to call." },
  { title: "Your software, your way", body: "QuickBooks, Xero, Gusto, ADP and more. No switching required." },
  { title: "Right here in Kansas City", body: "A local office in the Northland, run by a neighbor who gets it." },
];

export default function Home() {
  const a = business.address.value;
  const hours = business.hours.value;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${site.url}/#business`,
            name: business.name.value,
            url: site.url,
            telephone: business.phone.value.display,
            email: business.email.value,
            image: `${site.url}/media/jennys-love-logo.png`,
            address: {
              "@type": "PostalAddress",
              streetAddress: a.street,
              addressLocality: a.city,
              addressRegion: a.region,
              postalCode: a.postalCode,
              addressCountry: "US",
            },
          }),
        }}
      />

      {/* Hero: "Meet ___" composition */}
      <section className="site-container pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="grid items-stretch gap-10 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col md:col-span-6 md:py-6">
            <h1 className="text-[2.7rem] leading-[1.05] sm:text-6xl lg:text-[4.6rem]">
              Kansas City bookkeeping, <em className="text-heart">with love.</em>
            </h1>
            <p className="mt-6 max-w-[30rem] font-serif text-xl leading-snug text-ink-soft md:text-2xl">
              Jenny’s Love keeps the books for small businesses, so you can get back to the work you love.
            </p>

            <div className="mt-10 md:mt-auto md:pt-16">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em]">Meet Jenny</p>
              <p className="mt-2 max-w-sm font-sans text-[0.95rem] leading-relaxed text-ink-soft">
                {business.experience.value}. One person who knows your business and picks up the phone.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <PillLink href="/contact" event="consultation_cta_click">
                  Contact Jenny
                </PillLink>
                <TextLink href="/our-services" className="font-sans text-[0.95rem]">
                  Explore services
                </TextLink>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <figure>
              <Image
                src="/media/documents-desk.jpg"
                alt="Hands reviewing business documents in a binder on a wooden desk"
                width={1000}
                height={1150}
                priority
                sizes="(min-width: 1240px) 580px, (min-width: 768px) 48vw, 100vw"
                className="aspect-[4/5] w-full rounded-lg object-cover md:max-h-[42rem]"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* How I help */}
      <section aria-labelledby="help-title" className="site-container pb-24 md:pb-32">
        <Reveal className="flex flex-col gap-4">
          <SectionLabel>How I help</SectionLabel>
          <h2 id="help-title" className="max-w-3xl text-3xl leading-tight md:text-[2.6rem]">
            You started your business to do what you love, not to balance the books.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 80}>
              <div className="group flex h-full min-h-[17rem] flex-col justify-between rounded-lg bg-wine p-7 text-cream transition-colors duration-300 hover:bg-wine-2 lg:min-h-[22rem]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl leading-tight">{v.title}</h3>
                  <HeartGlyph className="mt-1.5 h-3.5 w-3.5 shrink-0 text-heart transition-transform duration-300 group-hover:scale-125" />
                </div>
                <p className="mt-10 font-sans text-[0.95rem] leading-relaxed text-cream/80">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Services list */}
      <section aria-labelledby="services-title" className="site-container pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel>Services</SectionLabel>
          </Reveal>
          <Reveal className="md:col-span-8">
            <h2 id="services-title" className="text-3xl leading-tight md:text-[2.6rem]">
              Practical help with the everyday side of your books.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 border-t border-line">
          {services.map((s) => (
            <Reveal as="li" key={s.id} className="border-b border-line">
              <Link
                href={`/our-services#${s.id}`}
                className="group grid items-center gap-2 py-7 transition-colors duration-200 hover:bg-paper/60 md:grid-cols-12 md:gap-6 md:px-3"
              >
                <span className="font-serif text-2xl md:col-span-4">{s.title}</span>
                <span className="font-sans text-[0.95rem] text-ink-soft md:col-span-6 md:col-start-6">{s.summary}</span>
                <span className="hidden justify-self-end text-ink-soft transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-heart md:col-span-1 md:col-start-12 md:block">
                  <ArrowIcon className="size-6" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Band */}
      <section aria-label="Stress free" className="bg-wine text-cream">
        <div className="site-container flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <p className="font-serif text-4xl leading-none md:text-6xl">
            Stress. <em className="text-blush">Free.</em>
          </p>
          <PillLink href="/contact" tone="dark" event="consultation_cta_click" className="self-start md:self-auto">
            Contact Jenny
          </PillLink>
        </div>
      </section>

      {/* Visit */}
      <section aria-labelledby="visit-title" className="site-container py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <h2 id="visit-title" className="text-4xl italic leading-[1.1] md:text-5xl">
              Drop by, or give us a call.
            </h2>
            <dl className="mt-9 space-y-5 font-sans text-[0.95rem]">
              <div className="flex gap-4">
                <dt className="sr-only">Hours</dt>
                <ClockIcon />
                <dd>
                  {hours.map((h) => (
                    <span key={h.days} className="block">
                      <span className="font-semibold">{h.days}</span> · {h.time}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="sr-only">Address</dt>
                <PinIcon />
                <dd>
                  {a.street}, {a.city}, {a.region} {a.postalCode}
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <PillLink href={a.directions} target="_blank" rel="noopener">
                Get directions
              </PillLink>
              <TextLink href={business.phone.value.href} event="phone_click" className="font-sans text-[0.95rem]">
                {business.phone.value.display}
              </TextLink>
            </div>
          </Reveal>

          <Reveal className="relative md:col-span-6 md:col-start-7" delay={100}>
            <div className="relative ml-auto w-[88%] md:w-[82%]">
              <Image
                src="/media/kc-liberty-memorial.jpg"
                alt="The Liberty Memorial and downtown Kansas City skyline at sunset"
                width={1200}
                height={1000}
                sizes="(min-width: 1240px) 480px, (min-width: 768px) 40vw, 88vw"
                className="aspect-[6/5] w-full rounded-lg object-cover"
              />
            </div>
            <div className="relative -mt-24 w-[52%] md:absolute md:-bottom-14 md:left-0 md:mt-0 md:w-[42%]">
              <Image
                src="/media/receipts-desk.jpg"
                alt="Hands sorting receipts beside a calculator on a wooden desk"
                width={800}
                height={1000}
                sizes="(min-width: 1240px) 250px, (min-width: 768px) 22vw, 52vw"
                className="aspect-[4/5] w-full rounded-lg object-cover shadow-[0_30px_60px_-30px_rgb(61_23_25/0.55)] ring-8 ring-cream"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="words-title" className="site-container pb-24 md:pb-32">
        <Reveal className="flex flex-col gap-4">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 id="words-title" className="text-3xl leading-tight md:text-[2.6rem]">
            Words from the heart
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <Reveal as="article" className="rounded-xl bg-paper p-8 md:col-span-8 md:p-12">
            <span aria-hidden="true" className="block font-serif text-7xl leading-[0.6] text-heart">
              “
            </span>
            <blockquote className="mt-6 font-serif text-2xl leading-snug md:text-[1.9rem]">
              I have worked with Jenny’s Love for years now. We are thoroughly pleased with all their help and knowledge. We would highly recommend. Very professional and trustworthy.
            </blockquote>
            <p className="mt-10 font-sans text-[0.95rem]">
              <span className="block font-semibold text-heart">Bryan K.</span>
              <span className="text-ink-soft">Client</span>
            </p>
          </Reveal>

          <Reveal className="md:col-span-4" delay={100}>
            <a
              href={business.googleProfile.value}
              target="_blank"
              rel="noopener"
              className="group flex h-full min-h-56 flex-col justify-between rounded-xl bg-cream-2 p-8 transition-colors duration-200 hover:bg-blush"
            >
              <p className="font-serif text-2xl leading-snug">Read what more clients are saying on Google.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-sans text-[0.95rem]">
                See reviews
                <ArrowIcon className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
