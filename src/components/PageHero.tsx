import type { ReactNode } from "react";
import { SectionLabel } from "./ui";

/** Interior page opener: label in the left column, headline and short intro on the right. */
export function PageHero({ label, title, intro, children }: { label: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="site-container pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 md:pt-4">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <div className="md:col-span-8">
          <h1 className="text-[2.6rem] leading-[1.07] sm:text-[3.4rem] lg:text-[4.2rem]">{title}</h1>
          {intro ? <p className="mt-6 max-w-xl font-serif text-xl leading-snug text-ink-soft md:text-2xl">{intro}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
