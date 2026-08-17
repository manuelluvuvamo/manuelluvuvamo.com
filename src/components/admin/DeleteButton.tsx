"use client";

import type { ActionResult } from "@/lib/admin/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

/**
 * Eliminar pede confirmação explícita em vez de um `confirm()` do browser:
 * o segundo clique é uma decisão, não um reflexo.
 */
export default function DeleteButton({
  action,
  label = "Eliminar",
  redirectTo,
}: {
  action: () => Promise<ActionResult>;
  label?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [armed, setArmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.message ?? "Não foi possível eliminar.");
        setArmed(false);
        return;
      }
      router.refresh();
      if (redirectTo) {
        router.push(redirectTo);
      }
    });
  }

  if (!armed) {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setArmed(true)}
          className="text-sm text-muted-foreground transition-colors hover:text-destructive"
        >
          {label}
        </button>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">Tens a certeza?</span>
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="font-medium text-destructive disabled:opacity-50"
      >
        {pending ? "A eliminar…" : "Sim, eliminar"}
      </button>
      <button
        type="button"
        onClick={() => setArmed(false)}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Cancelar
      </button>
    </div>
  );
}
