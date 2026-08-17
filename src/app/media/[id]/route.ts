import { API_BASE_URL } from "@/lib/api";
import { NextResponse } from "next/server";

/**
 * Serve as imagens guardadas na API.
 *
 * Existe para que os documentos guardem caminhos relativos (`/media/<id>`) em
 * vez do endereço da API. Assim a mesma base de dados serve local, homologação
 * e produção sem nomes de servidor colados ao conteúdo — e o markdown dos
 * artigos pode referir imagens sem saber onde a API vive.
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE_URL}/public/files/${params.id}`, { cache: "no-store" });
  } catch {
    return new NextResponse("Serviço de imagens indisponível.", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Imagem não encontrada.", { status: upstream.status === 404 ? 404 : 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
      // O identificador é imutável: o conteúdo daquele endereço nunca muda.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
