import { PillLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="site-container flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-sans text-sm text-ink-soft">404</p>
      <h1 className="mt-4 text-5xl md:text-6xl">
        This page wandered off.
      </h1>
      <p className="mt-5 max-w-md font-sans text-ink-soft">The link may be old or mistyped. Let’s get you back on track.</p>
      <div className="mt-9">
        <PillLink href="/">Back to home</PillLink>
      </div>
    </section>
  );
}
