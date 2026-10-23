import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function HeartGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 14" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 13.5 1.6 7.3A3.9 3.9 0 0 1 7.2 1.9L8 2.7l.8-.8a3.9 3.9 0 0 1 5.6 5.4Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4v6.5a2 2 0 0 0 2 2h8.5M12.5 9.5l3 3-3 3" />
    </svg>
  );
}

export function SectionLabel({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "light" }) {
  return (
    <p
      className={`flex items-center gap-2 font-sans text-sm tracking-wide ${
        tone === "light" ? "text-cream/80" : "text-ink-soft"
      }`}
    >
      <HeartGlyph className="h-3 w-3 text-heart" />
      {children}
    </p>
  );
}

type PillProps = {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  event?: string;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

/** Calma-style pill: circular icon on the left, label on the right. */
export function PillLink({ href, children, tone = "light", event, className = "", ...rest }: PillProps) {
  const base =
    "group inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 pl-1.5 pr-6 font-sans text-[0.95rem] font-medium transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px";
  const tones =
    tone === "dark"
      ? "bg-cream text-ink shadow-[0_1px_0_rgb(0_0_0/0.05)] hover:bg-paper"
      : "bg-paper text-ink hover:bg-blush/50 hover:shadow-[0_8px_24px_-12px_rgb(43_33_31/0.35)]";
  const dot = tone === "dark" ? "bg-wine text-cream" : "bg-heart text-paper";
  const inner = (
    <>
      <span className={`grid size-9 place-items-center rounded-full ${dot} transition-transform duration-200 group-hover:rotate-[-8deg]`}>
        <ArrowIcon className="size-4" />
      </span>
      {children}
    </>
  );
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={href} data-event={event} className={`${base} ${tones} ${className}`}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} data-event={event} className={`${base} ${tones} ${className}`} {...rest}>
      {inner}
    </a>
  );
}

export function TextLink({ href, children, event, className = "" }: { href: string; children: ReactNode; event?: string; className?: string }) {
  return (
    <a
      href={href}
      data-event={event}
      className={`inline-flex min-h-11 items-center underline decoration-line decoration-1 underline-offset-[6px] transition-colors duration-200 hover:decoration-heart ${className}`}
    >
      {children}
    </a>
  );
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  return (
    <Tag className={`reveal ${className}`} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}

export function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-heart" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-heart" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
