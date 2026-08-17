"use client";

import { changePassword, type ActionResult } from "@/lib/admin/actions";
import { cn } from "@/lib/utils";
import { useRef, useState, useTransition } from "react";

const CONTROL =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-accent";

export default function ChangePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const outcome = await changePassword(formData);
      setResult(outcome);
      if (outcome.ok) {
        formRef.current?.reset();
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium">
          Password actual
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className={CONTROL}
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium">
          Nova password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={CONTROL}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium">
          Confirmar
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={CONTROL}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
        >
          {pending ? "A alterar…" : "Alterar password"}
        </button>
        {result?.message && (
          <p className={cn("text-sm", result.ok ? "text-muted-foreground" : "text-destructive")}>
            {result.message}
          </p>
        )}
      </div>
    </form>
  );
}
