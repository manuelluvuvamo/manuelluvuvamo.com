import seed from "@/data/seed.json";
import type { PortfolioContent } from "@/lib/types";
import { cache } from "react";

/**
 * Leitura do conteudo publico.
 *
 * A fonte de verdade e a API Java. Se ela estiver em baixo, o site serve o
 * seed estatico do repositorio — o portfolio nunca fica offline por causa
 * do backend.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8080/api/v1";

/** Segundos entre revalidacoes das paginas publicas. */
const REVALIDATE_SECONDS = 300;

const FALLBACK = seed as unknown as PortfolioContent;

/** Quantas vezes insistir antes de desistir e servir o seed. */
const ATTEMPTS = 3;

/**
 * `cache` desduplica as chamadas dentro do mesmo render: o layout e a página
 * pedem o conteúdo, mas só sai um pedido à API.
 */
export const getContent = cache(async (): Promise<PortfolioContent> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return withDefaults(await fetchContent());
    } catch (error) {
      lastError = error;
      // Durante o build geram-se dezenas de páginas ao mesmo tempo e a ligação
      // pode ser cortada. Insistir evita que uma página caia para o seed
      // enquanto as vizinhas vêm da API — e o build fique inconsistente.
      if (attempt < ATTEMPTS) {
        await delay(attempt * 250);
      }
    }
  }

  console.warn(
    `[portfolio] Sem resposta da API (${API_BASE_URL}) após ${ATTEMPTS} tentativas; a servir o seed local.`,
    lastError instanceof Error ? lastError.message : lastError
  );
  return withDefaults(FALLBACK);
});

async function fetchContent(): Promise<PortfolioContent> {
  const response = await fetch(`${API_BASE_URL}/public/bootstrap`, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`A API respondeu ${response.status}`);
  }

  const content = (await response.json()) as PortfolioContent;

  // Uma resposta sem perfil é sinal de base vazia: o seed local serve melhor.
  if (!content?.profile?.fullName) {
    throw new Error("A API devolveu conteúdo vazio");
  }

  return content;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Garante que todas as listas existem, para as paginas nao terem de defender-se. */
function withDefaults(content: PortfolioContent): PortfolioContent {
  return {
    profile: content.profile,
    socialLinks: content.socialLinks ?? [],
    projects: content.projects ?? [],
    posts: content.posts ?? [],
    articles: content.articles ?? [],
    vlogs: content.vlogs ?? [],
    essays: content.essays ?? [],
    quotes: content.quotes ?? [],
    experiences: content.experiences ?? [],
    education: content.education ?? [],
    certifications: content.certifications ?? [],
    skills: content.skills ?? [],
  };
}

/** Envia o formulario de contacto. Devolve a mensagem a mostrar ao visitante. */
export async function submitContact(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return {
        ok: false,
        message: error?.message ?? "Não foi possível enviar a mensagem. Tenta novamente.",
      };
    }

    const body = await response.json();
    return { ok: true, message: body?.message ?? "Mensagem recebida. Obrigado pelo contacto." };
  } catch {
    return {
      ok: false,
      message: "Não foi possível contactar o servidor. Escreve-me directamente por email.",
    };
  }
}
