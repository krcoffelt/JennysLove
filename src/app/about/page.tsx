import Image from "next/image";
import type { Metadata } from "next";
import { business } from "@/content/business";
import { PillLink, Reveal, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Meet Jenny",
  description:
    "Jenny brings 20+ years of accounting experience to Kansas City small businesses. A partner, not just a bookkeeper.",
  alternates: { canonical: "/about" },
};

/** Proposed engagement steps, pending owner confirmation of the actual workflow. */
const steps = [
  { title: "Talk", body: "Tell Jenny where your books are today and what’s keeping you up at night." },
  { title: "Plan", body: "Agree on the help you need, ongoing or a one-time project." },
  { title: "Rest easy", body: "Your books stay organized, and Jenny is a call away when questions come up." },
];

export default function AboutPage() {
  return (
    <>
      <section className="site-container pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <SectionLabel>Meet Jenny</SectionLabel>
            <h1 className="mt-5 text-[2.6rem] leading-[1.07] sm:text-[3.4rem] lg:text-[4.2rem]">
              A partner, <em className="text-heart">not just</em> a bookkeeper.
            </h1>

            <div className="mt-10 max-w-lg space-y-5 font-serif text-xl leading-relaxed text-ink-soft">
              <p>Hi everyone! I’ve been in the accounting industry for over 20 years, working with small companies and large ones.</p>
              <p>
                What I’ve learned is that for a business to succeed, you need that <span className="text-ink">one person</span> who will go the extra mile to help you stay organized and grow.
              </p>
              <p>It has been my pleasure to be that person for lots of companies.</p>
            </div>
            <p className="mt-8 font-serif text-2xl italic text-heart">Jenny</p>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <Image
              src="/media/jenny-portrait.jpg"
              alt="Jenny, owner of Jenny’s Love Accounting"
              width={700}
              height={875}
              priority
              sizes="(min-width: 1240px) 480px, (min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-label="Why Jenny’s Love" className="bg-wine text-cream">
        <div className="site-container py-20 md:py-28">
          <Reveal>
            <p className="max-w-4xl font-serif text-3xl leading-snug md:text-[2.75rem] md:leading-[1.2]">
              Your business is your livelihood, and maybe your employees’ too. It makes sense that it’s always on your mind.{" "}
              <em className="text-blush">Jenny’s Love is here to help, so you can rest easy.</em>
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="how-title" className="site-container py-24 md:py-32">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>How it works</SectionLabel>
          </div>
          <h2 id="how-title" className="text-3xl leading-tight md:col-span-8 md:text-[2.6rem]">
            Simple from the very first call.
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="rounded-xl bg-paper p-8">
              <h3 className="text-3xl">{s.title}</h3>
              <p className="mt-3 font-sans text-[0.95rem] leading-relaxed text-ink-soft">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <PillLink href="/contact" event="consultation_cta_click">
            Contact Jenny
          </PillLink>
          <a href={business.phone.value.href} data-event="phone_click" className="inline-flex min-h-11 items-center font-sans text-[0.95rem] underline decoration-line underline-offset-[6px] hover:decoration-heart">
            or call {business.phone.value.display}
          </a>
        </div>
      </section>
    </>
  );
}
