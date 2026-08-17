import type { Field } from "@/lib/admin/resources";

/**
 * Traduz o que vem do formulário HTML (só strings) para o JSON que a API
 * espera. Campos vazios são omitidos, para não gravar "" onde o documento
 * deve ficar sem valor.
 */
export function buildPayload(fields: Field[], formData: FormData): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  for (const field of fields) {
    const raw = formData.get(field.name);

    if (field.type === "boolean") {
      // Uma checkbox desligada não aparece no FormData.
      payload[field.name] = raw === "on" || raw === "true";
      continue;
    }

    const value = typeof raw === "string" ? raw.trim() : "";
    if (value === "") {
      continue;
    }

    switch (field.type) {
      case "number": {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
          payload[field.name] = parsed;
        }
        break;
      }
      case "datetime":
        // <input type="datetime-local"> dá hora local sem fuso.
        payload[field.name] = new Date(value).toISOString();
        break;
      case "tags":
        payload[field.name] = splitAndClean(value, ",");
        break;
      case "lines":
        payload[field.name] = splitAndClean(value, "\n");
        break;
      default:
        payload[field.name] = value;
    }
  }

  return payload;
}

function splitAndClean(value: string, separator: string): string[] {
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Converte o valor guardado para o que o input HTML consegue mostrar. */
export function toInputValue(field: Field, value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  switch (field.type) {
    case "tags":
      return Array.isArray(value) ? value.join(", ") : String(value);
    case "lines":
      return Array.isArray(value) ? value.join("\n") : String(value);
    case "date":
      return String(value).slice(0, 10);
    case "datetime": {
      const date = new Date(String(value));
      if (Number.isNaN(date.getTime())) return "";
      // datetime-local precisa de "YYYY-MM-DDTHH:mm" em hora local.
      const offset = date.getTimezoneOffset() * 60_000;
      return new Date(date.getTime() - offset).toISOString().slice(0, 16);
    }
    default:
      return String(value);
  }
}
