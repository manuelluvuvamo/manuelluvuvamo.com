import { API_BASE_URL } from "@/lib/api";
import { NextResponse } from "next/server";

/**
 * Reencaminha as contagens de leitura para a API.
 *
 * O browser fala com o próprio site em vez de falar com a API directamente.
 * Isso evita CORS — o que importa porque cada preview do Vercel tem um
 * domínio diferente, e a contagem falharia em silêncio em todos eles.
 */

const EVENTS = new Set(["view", "read"]);

export async function POST(
  _request: Request,
  { params }: { params: { slug: string; event: string } }
) {
  if (!EVENTS.has(params.event)) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    await fetch(
      `${API_BASE_URL}/public/posts/${encodeURIComponent(params.slug)}/${params.event}`,
      { method: "POST", cache: "no-store" }
    );
  } catch {
    // Uma contagem perdida não é motivo para devolver erro a quem está a ler.
  }

  return new NextResponse(null, { status: 204 });
}
