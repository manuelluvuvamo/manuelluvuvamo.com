"use client";

import ImageField from "@/components/admin/ImageField";
import type { ActionResult } from "@/lib/admin/actions";
import { toInputValue } from "@/lib/admin/payload";
import type { Field } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const CONTROL =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-subtle focus:border-accent";

export default function ResourceForm({
  fields,
  initial = {},
  action,
  submitLabel = "Guardar",
  redirectTo,
}: {
  fields: Field[];
  initial?: Record<string, unknown>;
  action: (formData: FormData) => Promise<ActionResult>;
  submitLabel?: string;
  /** Para onde ir depois de gravar. Sem isto, fica na página. */
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const outcome = await action(formData);
      setResult(outcome);

      if (outcome.ok) {
        router.refresh();
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={cn(field.full || isWide(field) ? "sm:col-span-2" : "")}>
            {field.type === "boolean" ? (
              <label className="flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  name={field.name}
                  defaultChecked={Boolean(initial[field.name])}
                  className="h-4 w-4 rounded border-input accent-accent"
                />
                {field.label}
              </label>
            ) : (
              <>
                <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium">
                  {field.label}
                  {field.required && <span className="ml-1 text-accent">*</span>}
                </label>
                {renderControl(field, initial[field.name])}
              </>
            )}

            {field.help && <p className="mt-1.5 text-xs text-subtle">{field.help}</p>}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "A guardar…" : submitLabel}
        </button>

        {result?.message && (
          <p
            role="status"
            className={cn("text-sm", result.ok ? "text-muted-foreground" : "text-destructive")}
          >
            {result.message}
          </p>
        )}
      </div>
    </form>
  );
}

function isWide(field: Field): boolean {
  return field.type === "markdown" || field.type === "textarea" || field.type === "lines";
}

function renderControl(field: Field, value: unknown) {
  const defaultValue = toInputValue(field, value);

  if (field.type === "image") {
    return (
      <ImageField name={field.name} defaultValue={defaultValue} placeholder={field.placeholder} />
    );
  }

  if (field.type === "select") {
    return (
      <select id={field.name} name={field.name} defaultValue={defaultValue} className={CONTROL}>
        {!field.required && <option value="">—</option>}
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "markdown" || field.type === "textarea" || field.type === "lines") {
    return (
      <textarea
        id={field.name}
        name={field.name}
        required={field.required}
        defaultValue={defaultValue}
        placeholder={field.placeholder}
        rows={field.type === "markdown" ? 18 : 4}
        className={cn(CONTROL, field.type === "markdown" && "font-mono text-[13px] leading-relaxed")}
      />
    );
  }

  return (
    <input
      id={field.name}
      name={field.name}
      type={inputType(field)}
      required={field.required}
      defaultValue={defaultValue}
      placeholder={field.placeholder}
      className={CONTROL}
    />
  );
}

function inputType(field: Field): string {
  switch (field.type) {
    case "number":
      return "number";
    case "date":
      return "date";
    case "datetime":
      return "datetime-local";
    default:
      return "text";
  }
}
