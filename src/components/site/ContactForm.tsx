"use client";

import { useState } from "react";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

const FIELD =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-subtle focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({ kind: "error", message: body.message ?? "Não foi possível enviar." });
        return;
      }

      form.reset();
      setStatus({ kind: "ok", message: body.message });
    } catch {
      setStatus({
        kind: "error",
        message: "Falhou o envio. Verifica a ligação e tenta outra vez.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-reading space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Nome
          </label>
          <input id="name" name="name" required maxLength={120} className={FIELD} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required className={FIELD} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
          Assunto <span className="font-normal text-subtle">(opcional)</span>
        </label>
        <input id="subject" name="subject" maxLength={200} className={FIELD} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Mensagem
        </label>
        <textarea id="message" name="message" required rows={6} maxLength={5000} className={FIELD} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status.kind === "sending" ? "A enviar…" : "Enviar mensagem"}
        </button>

        {status.message && (
          <p
            role="status"
            className={
              status.kind === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"
            }
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
