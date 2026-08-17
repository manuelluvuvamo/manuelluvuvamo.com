import { NextResponse, type NextRequest } from "next/server";

/**
 * Guarda do dashboard.
 *
 * Corre antes de qualquer página /admin: se o access token expirou mas o
 * refresh ainda é válido, renova-o aqui e deixa o pedido seguir. Sem
 * nenhum dos dois, manda para o login.
 */

const ACCESS_COOKIE = "pf_at";
const REFRESH_COOKIE = "pf_rt";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8080/api/v1";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  // Já autenticado não precisa de ver o formulário de login.
  if (pathname === "/admin/login") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const renewed = await renew(refreshToken);
    if (renewed) {
      const response = NextResponse.next();
      setSessionCookies(response, renewed);
      return response;
    }
  }

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("proximo", pathname);
  const response = NextResponse.redirect(login);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}

type Tokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
};

async function renew(refreshToken: string): Promise<Tokens | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    return response.ok ? ((await response.json()) as Tokens) : null;
  } catch {
    return null;
  }
}

function setSessionCookies(response: NextResponse, tokens: Tokens) {
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
}

export const config = {
  matcher: ["/admin/:path*"],
};
