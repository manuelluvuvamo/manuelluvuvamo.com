"use client";

import { deleteMessage, setMessageArchived, setMessageRead } from "@/lib/admin/actions";
import { longDate } from "@/lib/format";
import type { ContactMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function MessageCard({ message }: { message: ContactMessage }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const id = message.id!;

  function act(work: () => Promise<unknown>) {
    startTransition(async () => {
      await work();
      router.refresh();
    });
  }

  return (
    <li
      className={cn(
        "rounded-lg border p-4 transition-colors",
        message.read ? "border-border" : "border-accent/40 bg-muted/40"
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm font-medium">
          {message.name}
          {!message.read && (
            <span className="ml-2 align-middle text-[11px] font-normal text-accent">nova</span>
          )}
          {message.archived && (
            <span className="ml-2 align-middle text-[11px] font-normal text-subtle">arquivada</span>
          )}
        </p>
        <time className="font-mono text-xs text-subtle" suppressHydrationWarning>
          {longDate(message.createdAt)}
        </time>
      </div>

      <p className="mt-0.5 text-sm text-muted-foreground">
        <a href={`mailto:${message.email}`} className="link-muted underline">
          {message.email}
        </a>
        {message.subject ? ` · ${message.subject}` : ""}
      </p>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{message.message}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3 text-sm">
        <button
          type="button"
          disabled={pending}
          onClick={() => act(() => setMessageRead(id, !message.read))}
          className="link-muted disabled:opacity-50"
        >
          {message.read ? "Marcar por ler" : "Marcar como lida"}
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={() => act(() => setMessageArchived(id, !message.archived))}
          className="link-muted disabled:opacity-50"
        >
          {message.archived ? "Repor" : "Arquivar"}
        </button>

        <a href={`mailto:${message.email}`} className="link-muted">
          Responder
        </a>

        {confirmingDelete ? (
          <span className="flex items-center gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={() => act(() => deleteMessage(id))}
              className="font-medium text-destructive disabled:opacity-50"
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="link-muted"
            >
              Cancelar
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            Eliminar
          </button>
        )}
      </div>
    </li>
  );
}
