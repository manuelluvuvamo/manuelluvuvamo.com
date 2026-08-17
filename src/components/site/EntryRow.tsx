import { longDate } from "@/lib/format";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Linha de listagem partilhada por posts, artigos e ensaios.
 * `href` externo abre noutro separador; interno navega no site.
 */
export default function EntryRow({
  href,
  title,
  excerpt,
  date,
  meta,
  external = false,
}: {
  href: string;
  title: string;
  excerpt?: string;
  date?: string | null;
  meta?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[15px] font-medium tracking-tight transition-colors group-hover:text-accent">
          {title}
          {external && <ArrowUpRight size={14} className="ml-1 inline-block align-baseline" />}
        </h3>
        {date && (
          <time
            dateTime={date}
            className="shrink-0 font-mono text-xs text-subtle"
            suppressHydrationWarning
          >
            {longDate(date)}
          </time>
        )}
      </div>

      {excerpt && (
        <p className="mt-1.5 max-w-reading text-sm leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      )}

      {meta && (
        <p className="mt-2.5 font-mono text-[11px] uppercase tracking-wide text-subtle">{meta}</p>
      )}
    </>
  );

  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="row group">
          {body}
        </a>
      ) : (
        <Link href={href} className="row group">
          {body}
        </Link>
      )}
    </li>
  );
}
