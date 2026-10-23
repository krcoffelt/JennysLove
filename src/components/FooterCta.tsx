"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { PillLink } from "./ui";

/** Closing call to action — omitted on /contact, where it would repeat the page itself. */
export function FooterCta() {
  if (usePathname() === "/contact") return null;
  return (
    <>
      <div className="relative h-[42vw] max-h-[28rem] min-h-56 overflow-hidden bg-cream">
        <Image src="/media/desk-calculator.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-wine/0 via-wine/35 to-wine" />
      </div>
      <div className="site-container flex flex-col items-center pb-24 pt-10 text-center md:pb-32 md:pt-6">
        <Image src="/media/heart-mark.png" alt="" width={266} height={289} className="mb-8 h-14 w-auto opacity-90 brightness-0 invert" />
        <h2 className="max-w-2xl text-[2.4rem] leading-[1.1] md:text-6xl">Let’s talk about your books.</h2>
        <p className="mt-5 max-w-md font-sans text-cream/75">A quick call is the easiest place to start.</p>
        <div className="mt-9">
          <PillLink href="/contact" tone="dark" event="consultation_cta_click">
            Contact Jenny
          </PillLink>
        </div>
      </div>
    </>
  );
}
