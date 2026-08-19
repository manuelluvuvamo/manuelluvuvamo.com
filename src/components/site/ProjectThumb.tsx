import { cn } from "@/lib/utils";

/**
 * Marca visual de um projecto.
 *
 * Com imagem de capa, mostra-a. Sem imagem, desenha um monograma com uma cor
 * derivada do slug — sempre a mesma para o mesmo projecto. Assim a lista fica
 * regular mesmo quando só alguns projectos têm fotografia, em vez de alternar
 * entre linhas com imagem e buracos.
 */
export default function ProjectThumb({
  title,
  slug,
  src,
  className,
}: {
  title: string;
  slug: string;
  src?: string;
  className?: string;
}) {
  const base = cn(
    "relative shrink-0 overflow-hidden rounded-md border border-border",
    className ?? "h-12 w-12"
  );

  if (src) {
    return (
      <div className={base}>
        {/* Endereços vindos do painel, de origens variáveis; <img> evita ter
            de declarar cada domínio em next.config. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(base, "flex items-center justify-center")}
      style={{ backgroundColor: `hsl(${matiz(slug)} 45% 92%)` }}
      aria-hidden
    >
      <span
        className="font-mono text-xs font-semibold uppercase tracking-tight"
        style={{ color: `hsl(${matiz(slug)} 55% 32%)` }}
      >
        {monograma(title)}
      </span>
    </div>
  );
}

/** Até duas iniciais: "Huawei Lead23" -> "HL", "Xilonga" -> "XI". */
function monograma(title: string): string {
  const palavras = title
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (palavras.length === 0) return "··";
  if (palavras.length === 1) return palavras[0].slice(0, 2);
  return palavras[0][0] + palavras[1][0];
}

/** Matiz estável a partir do slug, para a cor não mudar entre visitas. */
function matiz(slug: string): number {
  let soma = 0;
  for (let i = 0; i < slug.length; i++) {
    soma = (soma * 31 + slug.charCodeAt(i)) % 360;
  }
  return soma;
}
