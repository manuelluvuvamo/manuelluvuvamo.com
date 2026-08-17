import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";

/**
 * Datas em português europeu.
 *
 * O locale pt do date-fns devolve os meses em minúscula ("janeiro"); aqui só
 * o nome do mês sobe a maiúscula — as preposições ficam como devem ficar.
 */

/** "15 de Janeiro de 2025" */
export function longDate(value?: string | null): string {
  const date = toDate(value);
  if (!date) return "";
  const month = capitalize(format(date, "MMMM", { locale: pt }));
  return `${format(date, "d")} de ${month} de ${format(date, "yyyy")}`;
}

/** "Set 2021" — usado nas linhas de experiência e formação. */
export function monthYear(value?: string | null): string {
  const date = toDate(value);
  if (!date) return "";
  // O pt abrevia com ponto ("set."), que não queremos aqui.
  const month = capitalize(format(date, "MMM", { locale: pt }).replace(/\.$/, ""));
  return `${month} ${format(date, "yyyy")}`;
}

export function year(value?: string | null): string {
  const date = toDate(value);
  return date ? format(date, "yyyy") : "";
}

/** "Set 2021 — Jul 2023" ou "Fev 2024 — actual" */
export function period(start?: string | null, end?: string | null, current?: boolean): string {
  const from = monthYear(start);
  if (!from) return "";
  return `${from} — ${current || !end ? "actual" : monthYear(end)}`;
}

export function isoDate(value?: string | null): string | undefined {
  return toDate(value)?.toISOString();
}

function toDate(value?: string | null): Date | null {
  if (!value) return null;
  // A API devolve Instant (ISO completo) e LocalDate ("2024-02-19").
  const date = value.length === 10 ? parseISO(`${value}T00:00:00`) : parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** 1240 → "1,2 mil". Números pequenos ficam como estão. */
export function compactNumber(value: number): string {
  return new Intl.NumberFormat("pt-PT", { notation: "compact", maximumFractionDigits: 1 }).format(
    value
  );
}
