import { API_BASE_URL } from "@/lib/api";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/admin/session";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Inicia e termina a sessão do dashboard.
 *
 * As credenciais vão daqui para a API Java; os tokens que voltam ficam em
 * cookies httpOnly, fora do alcance do JavaScript da página.
 */

const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(1, "Escreve a password."),
});

export async function POST(request: Request) {
  let credentials;
  try {
    credentials = loginSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ message: "Preenche o email e a password." }, { status: 400 });
  }

  let apiResponse: Response;
  try {
    apiResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "Não foi possível contactar a API. Está a correr?" },
      { status: 502 }
    );
  }

  if (!apiResponse.ok) {
    const error = await apiResponse.json().catch(() => null);
    return NextResponse.json(
      { message: error?.message ?? "Credenciais inválidas." },
      { status: apiResponse.status === 401 ? 401 : 400 }
    );
  }

  const tokens = await apiResponse.json();
  const response = NextResponse.json({ user: tokens.user });
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expiresIn,
  });
  response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.refreshExpiresIn,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Sessão terminada." });
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}
