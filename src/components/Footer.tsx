import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { FooterCta } from "./FooterCta";
import { HeartGlyph } from "./ui";

export function Footer() {
  const a = business.address.value;
  return (
    <footer className="bg-wine text-cream">
      <FooterCta />

      <div className="site-container">
        <div className="grid gap-12 border-t border-cream/15 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <Image
                src="/media/heart-mark.png"
                alt=""
                width={266}
                height={289}
                className="mt-1 h-10 w-auto shrink-0 brightness-0 invert"
              />
              <p className="font-serif text-2xl leading-snug md:text-[1.7rem]">
                Just one small business helping out another.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 font-sans text-[0.95rem] sm:grid-cols-3 md:col-span-7">
            <FooterCol title="Pages">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/our-services">Services</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterCol>
            <FooterCol title="Contact">
              <li>
                <a href={business.phone.value.href} data-event="phone_click" className="inline-flex min-h-10 items-center hover:text-blush">
                  {business.phone.value.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email.value}`} data-event="email_click" className="inline-flex min-h-10 items-center break-all hover:text-blush">
                  {business.email.value}
                </a>
              </li>
            </FooterCol>
            <FooterCol title="Visit">
              <li className="leading-relaxed text-cream/85">
                {a.street}
                <br />
                {a.city}, {a.region} {a.postalCode}
              </li>
              <li>
                <a href={a.directions} className="inline-flex min-h-10 items-center underline decoration-cream/30 underline-offset-4 hover:decoration-cream" target="_blank" rel="noopener">
                  Get directions
                </a>
              </li>
            </FooterCol>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/15 py-7 font-sans text-xs uppercase tracking-[0.12em] text-cream/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name.value}</p>
          <p>Kansas City, Missouri</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 flex items-center gap-2 text-cream/60">
        <HeartGlyph className="h-2.5 w-2.5 text-heart" />
        {title}
      </p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-10 items-center hover:text-blush">
        {children}
      </Link>
    </li>
  );
}
