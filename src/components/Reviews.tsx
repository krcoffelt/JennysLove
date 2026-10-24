"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/content/reviews";
import { business } from "@/content/business";
import { ArrowIcon, SectionLabel } from "./ui";

/** Calma-style testimonial row: swipe on touch, arrow buttons on desktop, no autoplay. */
export function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const btn =
    "grid size-11 place-items-center rounded-full bg-heart text-paper transition-[background-color,opacity] duration-200 hover:bg-heart-dark disabled:cursor-default disabled:opacity-30";

  return (
    <section aria-labelledby="words-title" className="pb-24 md:pb-32">
      <div className="site-container flex items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 id="words-title" className="text-3xl leading-tight md:text-[2.6rem]">
            Words from the heart
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => step(-1)} disabled={edge.start} className={btn} aria-label="Previous reviews">
            <ArrowIcon className="size-5 -scale-x-100" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edge.end} className={btn} aria-label="Next reviews">
            <ArrowIcon className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        tabIndex={0}
        aria-label="Client reviews from Google"
        // Side padding lines the first card up with the page container at every width.
        className="mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto scroll-smooth px-5 pb-4 outline-none [scrollbar-width:none] md:scroll-px-10 md:px-10 xl:scroll-px-[calc((100%_-_77.5rem)/2_+_2.5rem)] xl:px-[calc((100%_-_77.5rem)/2_+_2.5rem)] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-heart"
      >
        {reviews.map((r) => (
          <li key={r.name} className="flex w-[85%] shrink-0 snap-start sm:w-[22rem]">
            <figure className="flex w-full flex-col justify-between rounded-xl bg-paper p-8">
              <div>
                <span aria-hidden="true" className="block font-serif text-6xl leading-[0.6] text-heart">
                  “
                </span>
                <blockquote className="mt-5 font-serif text-lg leading-relaxed">{r.text}</blockquote>
              </div>
              <figcaption className="mt-8 font-sans text-[0.95rem]">
                <span className="block font-semibold text-heart">{r.name}</span>
                <span className="text-ink-soft">Google review</span>
              </figcaption>
            </figure>
          </li>
        ))}
        <li className="flex w-[85%] shrink-0 snap-start sm:w-[22rem]">
          <a
            href={business.googleProfile.value}
            target="_blank"
            rel="noopener"
            className="group flex w-full flex-col justify-between rounded-xl bg-heart p-8 text-paper transition-colors duration-200 hover:bg-heart-dark"
          >
            <p className="font-serif text-2xl leading-snug">Read every review on Google.</p>
            <span className="mt-8 inline-flex items-center gap-2 font-sans text-[0.95rem]">
              See reviews
              <ArrowIcon className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
