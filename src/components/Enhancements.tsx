"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * - Progressive reveal (opt-in, skipped for reduced motion; content is visible without JS).
 * - Proposed analytics taxonomy: elements with data-event push
 *   { event, page } to window.dataLayer if an approved tool defines it.
 *   No names, emails, messages or financial data are ever sent.
 */
export function Enhancements() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    // Anything already on screen shows immediately; only below-the-fold content animates.
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("is-in");
    });
    root.classList.add("reveal-on");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-event]");
      if (!el) return;
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({ event: el.dataset.event, page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
