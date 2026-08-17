"use client";

import { useEffect, useRef } from "react";

/**
 * Conta duas coisas diferentes:
 *
 * - **visualização** — o artigo foi aberto;
 * - **leitura** — o leitor chegou ao fim do texto.
 *
 * A separação é o que torna o número útil: cem aberturas com três leituras
 * dizem algo que "cem visitas" nunca diria.
 *
 * Cada uma conta no máximo uma vez por separador, para que recarregar a
 * página não inflacione o número.
 */
export default function PostMetrics({ slug }: { slug: string }) {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    report(slug, "view");

    const target = sentinel.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        report(slug, "read");
        observer.disconnect();
      }
      // Sem `threshold`: basta o marcador tocar o ecrã. Exigir visibilidade
      // total num elemento desta altura é frágil — o rácio de intersecção
      // arredonda e pode nunca chegar a 1, e a leitura nunca contaria.
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [slug]);

  // Marcador de fim de artigo: invisível, mas com altura suficiente para o
  // observador o ver com fiabilidade.
  return <div ref={sentinel} aria-hidden className="h-4 w-full" />;
}

function report(slug: string, event: "view" | "read") {
  const key = `pf:${event}:${slug}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // Sem sessionStorage (navegação privada restrita) conta na mesma.
  }

  // Vai ao próprio site, não à API: sem CORS, e sem o endereço da API no
  // bundle do browser. keepalive faz o pedido sobreviver à saída da página.
  fetch(`/api/metrics/${encodeURIComponent(slug)}/${event}`, {
    method: "POST",
    keepalive: true,
  }).catch(() => {
    // Uma contagem perdida não é motivo para incomodar o leitor.
  });
}
