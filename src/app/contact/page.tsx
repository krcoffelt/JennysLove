import type { Metadata } from "next";
import { business } from "@/content/business";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon, ClockIcon, PinIcon, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Contact Jenny’s Love Accounting | Kansas City" },
  description: "Send Jenny a message, call or visit Jenny’s Love Accounting at 5032 NE Parvin Rd, Kansas City, MO.",
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
      />

      <section aria-label="Ways to reach Jenny" className="site-container pb-24 md:pb-32">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="sr-only">Send a message</h2>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal>
              <a
                href={business.phone.value.href}
                data-event="phone_click"
                className="group flex min-h-48 flex-col justify-between rounded-xl bg-heart p-8 text-paper transition-colors duration-300 hover:bg-heart-dark"
              >
                <span className="font-sans text-xs uppercase tracking-[0.16em] text-paper/80">Call Jenny</span>
                <span className="mt-10 flex items-end justify-between gap-4">
                  <span className="font-serif text-4xl">{business.phone.value.display}</span>
                  <ArrowIcon className="mb-1 size-7 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>

            <Reveal delay={80} className="rounded-xl bg-paper p-8">
              <dl className="space-y-6 font-sans text-[0.95rem]">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-ink-soft">Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${business.email.value}`} data-event="email_click" className="break-all font-serif text-xl underline decoration-line underline-offset-[6px] hover:decoration-heart">
                      {business.email.value}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-ink-soft">Office</dt>
                  <dd className="mt-2 flex gap-3">
                    <PinIcon />
                    <span>
                      {a.street}, {a.city}, {a.region} {a.postalCode}
                      <br />
                      <a href={a.directions} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-[6px] hover:decoration-heart">
                        Get directions
                      </a>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-ink-soft">Hours</dt>
                  {business.hours.value.map((h) => (
                    <dd key={h.days} className="mt-2 flex gap-3">
                      <ClockIcon />
                      <span>
                        <span className="font-semibold">{h.days}</span> · {h.time} Central
                      </span>
                    </dd>
                  ))}
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
