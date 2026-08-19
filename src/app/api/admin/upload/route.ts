import { API_BASE_URL } from "@/lib/api";
import { ACCESS_COOKIE } from "@/lib/admin/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Recebe o ficheiro do painel e reenvia-o para a API.
 *
 * O token vive num cookie httpOnly, fora do alcance do JavaScript da página —
 * por isso o upload passa por aqui em vez de ir directo à API.
 */
export async function POST(request: Request) {
  const token = cookies().get(ACCESS_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ message: "Sessão expirada. Volta a entrar." }, { status: 401 });
  }

  const incoming = await request.formData();
  const file = incoming.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Nenhum ficheiro recebido." }, { status: 400 });
  }

  const payload = new FormData();
  payload.append("file", file, file.name);

  let apiResponse: Response;
  try {
    apiResponse = await fetch(`${API_BASE_URL}/admin/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: payload,
      cache: "no-store",
    });
  } catch {
    // Um ficheiro muito acima do limite faz o servidor cortar a ligação a meio
    // do envio: não há resposta para ler, só um erro de rede. O painel já
    // verifica o tamanho antes de enviar, por isso aqui é mais provável ser
    // mesmo a API estar em baixo — mas convém não esconder a outra hipótese.
    return NextResponse.json(
      {
        message:
          "A API não respondeu. Se a imagem for muito grande, reduz-lhe o tamanho; " +
          "caso contrário, o serviço pode estar em baixo.",
      },
      { status: 502 }
    );
  }

  const body = await apiResponse.json().catch(() => null);

  if (!apiResponse.ok) {
    return NextResponse.json(
      { message: body?.message ?? "Não foi possível carregar a imagem." },
      { status: apiResponse.status }
    );
  }

  // O documento guarda o caminho relativo, nunca o endereço da API.
  return NextResponse.json({
    url: `/media/${body.id}`,
    filename: body.filename,
    size: body.size,
  });
}
