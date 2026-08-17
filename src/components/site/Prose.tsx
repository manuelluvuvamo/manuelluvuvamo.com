import { cn } from "@/lib/utils";

/**
 * Envolve o HTML já renderizado pelo pipeline de markdown.
 * O conteúdo é escrito por mim no dashboard, nunca por terceiros.
 */
export default function Prose({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-reading dark:prose-invert",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
        "prose-img:rounded-lg prose-img:border prose-img:border-border",
        "prose-blockquote:border-l-accent prose-blockquote:font-normal prose-blockquote:not-italic",
        "prose-pre:border-0 prose-pre:p-0",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
