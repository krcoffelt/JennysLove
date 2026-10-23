"use client";

import { useRef, useState, type FormEvent } from "react";
import { services } from "@/content/services";
import { business } from "@/content/business";
import { ArrowIcon } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const MESSAGE_MAX = 1000;

/** Analytics hook: page context only, never field contents. */
function track(event: string) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event, page: window.location.pathname });
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email, like name@example.com.";
  if (!message) errors.message = "Please add a short message.";
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const onFocus = () => {
    if (!started.current) {
      started.current = true;
      track("form_start");
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return; // no duplicate submissions
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      track("form_error");
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }

    setStatus("sending");
    data.set("page", window.location.pathname);
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      track("inquiry_accepted");
      form.reset();
      setTimeout(() => doneRef.current?.focus(), 0);
    } catch {
      // Keep everything the person typed so they can try again.
      setStatus("error");
      track("form_error");
      setTimeout(() => summaryRef.current?.focus(), 0);
    }
  }

  if (status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-xl bg-paper p-8 outline-none md:p-12">
        <p className="font-serif text-3xl leading-tight md:text-4xl">
          Thank you. <em className="text-heart">Your message is on its way.</em>
        </p>
        <p className="mt-4 max-w-md font-sans text-ink-soft">
          Jenny will be in touch soon. Need her sooner? Call{" "}
          <a href={business.phone.value.href} data-event="phone_click" className="text-ink underline underline-offset-4">
            {business.phone.value.display}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 inline-flex min-h-11 items-center font-sans text-[0.95rem] underline decoration-line underline-offset-[6px] hover:decoration-heart">
          Send another message
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors) as [keyof Errors, string][];
  const field =
    "mt-2 block w-full min-h-12 rounded-lg bg-cream px-4 py-3 font-sans text-[1rem] text-ink outline-none ring-1 ring-transparent transition-shadow duration-200 placeholder:text-ink-soft/60 focus:ring-2 focus:ring-heart aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-heart";
  const label = "font-sans text-[0.95rem] font-medium";

  return (
    <form
      name="contact"
      method="POST"
      action="/__forms.html"
      noValidate
      onSubmit={onSubmit}
      onFocus={onFocus}
      className="rounded-xl bg-paper p-6 sm:p-8 md:p-10"
    >
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot: hidden from people, filled by bots. */}
      <p className="hidden" aria-hidden="true">
        <label>
          Leave this empty <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div ref={summaryRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {status === "error" && (
          <p className="mb-6 rounded-lg bg-blush px-4 py-3 font-sans text-[0.95rem]">
            Sorry, your message didn’t send. Please try again, or call {business.phone.value.display}.
          </p>
        )}
        {errorList.length > 0 && (
          <div className="mb-6 rounded-lg bg-blush px-4 py-3 font-sans text-[0.95rem]">
            <p className="font-semibold">Please fix {errorList.length === 1 ? "this" : "these"}:</p>
            <ul className="mt-1 list-disc pl-5">
              {errorList.map(([k, msg]) => (
                <li key={k}>
                  <a href={`#cf-${k}`} className="underline underline-offset-2">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Name
          </label>
          <input id="cf-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} className={field} />
          {errors.name && <p id="cf-name-err" className="mt-1.5 font-sans text-sm text-heart">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Email
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} className={field} />
          {errors.email && <p id="cf-email-err" className="mt-1.5 font-sans text-sm text-heart">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            Phone <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="cf-business" className={label}>
            Business <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input id="cf-business" name="business" autoComplete="organization" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-service" className={label}>
            What can Jenny help with?
          </label>
          <select id="cf-service" name="service" defaultValue="Not sure yet" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22none%22 stroke=%22%235d524d%22 stroke-width=%221.6%22><path d=%22M5 8l5 5 5-5%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}>
            <option>Not sure yet</option>
            {services.map((s) => (
              <option key={s.id}>{s.title}</option>
            ))}
            <option>Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={label}>
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX}
            required
            aria-invalid={!!errors.message}
            aria-describedby={`cf-message-note${errors.message ? " cf-message-err" : ""}`}
            className={`${field} resize-y`}
          />
          {errors.message && <p id="cf-message-err" className="mt-1.5 font-sans text-sm text-heart">{errors.message}</p>}
          <p id="cf-message-note" className="mt-2 font-sans text-sm text-ink-soft">
            Please don’t include account numbers, tax IDs, passwords or financial documents.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs font-sans text-xs leading-relaxed text-ink-soft">
          Your details go to Jenny through our website host and are only used to reply to you.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-12 items-center gap-3 self-start rounded-full bg-ink py-1.5 pl-1.5 pr-6 font-sans text-[0.95rem] font-medium text-cream transition-colors duration-200 hover:bg-heart disabled:opacity-60 sm:self-auto"
        >
          <span className="grid size-9 place-items-center rounded-full bg-heart text-paper transition-colors duration-200 group-hover:bg-wine">
            <ArrowIcon className="size-4" />
          </span>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
