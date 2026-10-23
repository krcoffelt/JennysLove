"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business } from "@/content/business";

const nav = [
  { href: "/about", label: "About" },
  { href: "/our-services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/") || (href === "/blog" && pathname.startsWith("/post/"));

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md">
      <div className="site-container">
        <div className="flex h-[4.5rem] items-center justify-between gap-6 border-b border-line md:h-20">
          <Link href="/" className="-ml-1 shrink-0 rounded p-1" aria-label="Jenny’s Love Accounting, home">
            <Image
              src="/media/jennys-love-logo.png"
              alt=""
              width={560}
              height={181}
              priority
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 font-sans text-[0.95rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="relative inline-flex min-h-11 items-center px-3 text-ink transition-colors duration-200 hover:text-heart aria-[current=page]:text-heart"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="ml-3">
                <a
                  href={business.phone.value.href}
                  data-event="phone_click"
                  className="inline-flex min-h-11 items-center rounded-full bg-heart px-5 text-paper transition-colors duration-200 hover:bg-heart-dark"
                >
                  {business.phone.value.display}
                </a>
              </li>
            </ul>
          </nav>

          <button
            ref={buttonRef}
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 font-sans text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-200 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-ink transition-transform duration-200 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="md:hidden">
        <nav aria-label="Mobile" className="site-container border-b border-line pb-6 pt-2">
          <ul className="font-serif text-2xl">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.href} className="border-b border-line last:border-0">
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="flex min-h-14 items-center aria-[current=page]:text-heart">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={business.phone.value.href}
            data-event="phone_click"
            className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-heart font-sans text-paper"
          >
            Call {business.phone.value.display}
          </a>
        </nav>
      </div>
    </header>
  );
}
