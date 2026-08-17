import { API_BASE_URL } from "@/lib/api";
import type { AuthenticatedUser } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Sessão do dashboard.
 *
 * Os tokens vivem em cookies httpOnly — o JavaScript da página nunca lhes
 * toca. O access token é curto; o middleware trata de o renovar a partir do
 * refresh token antes de o pedido chegar aqui.
 */

export const ACCESS_COOKIE = "pf_at";
export const REFRESH_COOKIE = "pf_rt";

export class UnauthorizedError extends Error {}

function accessToken(): string | undefined {
  return cookies().get(ACCESS_COOKIE)?.value;
}

/** Chamada autenticada à API. Lança UnauthorizedError se a sessão morreu. */
export async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = accessToken();
  if (!token) {
    throw new UnauthorizedError();
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    throw new UnauthorizedError();
  }

  return response;
}

/** Leitura para Server Components: sem sessão válida, volta ao login. */
export async function adminGet<T>(path: string): Promise<T> {
  try {
    const response = await adminFetch(path);
    if (!response.ok) {
      throw new Error(`A API respondeu ${response.status} em ${path}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      redirect("/admin/login");
    }
    throw error;
  }
}

export async function currentUser(): Promise<AuthenticatedUser> {
  return adminGet<AuthenticatedUser>("/auth/me");
}

/** Mensagem de erro legível a partir da resposta da API. */
export async function readError(response: Response): Promise<string> {
  const body = await response.json().catch(() => null);
  if (!body) {
    return `Falhou com o estado ${response.status}.`;
  }
  if (body.fields) {
    const first = Object.entries(body.fields)[0];
    if (first) {
      return `${first[0]}: ${first[1]}`;
    }
  }
  return body.message ?? `Falhou com o estado ${response.status}.`;
}
