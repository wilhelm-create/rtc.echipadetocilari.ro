"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const subject = String(data.get("subject") || "Mesaj de pe site");
    const message = String(data.get("message") || "");

    const body = [
      `Nume: ${name}`,
      `Email: ${email}`,
      `Telefon: ${phone}`,
      "",
      message,
    ].join("\n");

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("sent");
    form.reset();
  }

  return (
    <form
      id="formular"
      onSubmit={onSubmit}
      className="scroll-mt-28 space-y-5 rounded-3xl border border-rtc-green/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume complet" name="name" required autoComplete="name" />
        <Field
          label="Adresa de email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
        />
        <Field label="Subiect" name="subject" required />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-rtc-green"
        >
          Mesaj <span className="text-rtc-coral">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-rtc-green/15 bg-rtc-cream px-4 py-3 text-base text-foreground outline-none transition focus:border-rtc-coral focus:ring-2 focus:ring-rtc-coral/20"
        />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-rtc-coral px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rtc-coral/90 sm:w-auto"
      >
        Trimite mesajul
      </button>
      {status === "sent" ? (
        <p className="text-sm text-rtc-green" role="status">
          Se deschide aplicația ta de email. Dacă nu se deschide, scrie-ne la{" "}
          <a className="font-semibold underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-rtc-green"
      >
        {label}
        {required ? <span className="text-rtc-coral"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full rounded-xl border border-rtc-green/15 bg-rtc-cream px-4 py-3 text-base text-foreground outline-none transition focus:border-rtc-coral focus:ring-2 focus:ring-rtc-coral/20"
      />
    </div>
  );
}
