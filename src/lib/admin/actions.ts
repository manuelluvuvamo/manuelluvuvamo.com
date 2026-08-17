"use server";

import { buildPayload } from "@/lib/admin/payload";
import { PROFILE_FIELDS, RESOURCES } from "@/lib/admin/resources";
import { adminFetch, readError, UnauthorizedError } from "@/lib/admin/session";
import { revalidatePath } from "next/cache";

/** Resultado uniforme das acções, para o formulário mostrar ao utilizador. */
export type ActionResult = { ok: boolean; message?: string; id?: string };

/** O site inteiro é pequeno: revalidar tudo é mais simples e mais seguro. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

async function run(work: () => Promise<ActionResult>): Promise<ActionResult> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { ok: false, message: "A sessão expirou. Volta a entrar." };
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
    };
  }
}

export async function saveResource(
  resourceSlug: string,
  id: string | null,
  formData: FormData
): Promise<ActionResult> {
  return run(async () => {
    const resource = RESOURCES[resourceSlug];
    if (!resource) {
      return { ok: false, message: "Recurso desconhecido." };
    }

    const response = await adminFetch(id ? `${resource.apiPath}/${id}` : resource.apiPath, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(resource.fields, formData)),
    });

    if (!response.ok) {
      return { ok: false, message: await readError(response) };
    }

    const saved = await response.json();
    revalidateSite();
    return {
      ok: true,
      id: saved.id,
      message: id ? "Alterações guardadas." : `${resource.singular} criado.`,
    };
  });
}

export async function deleteResource(resourceSlug: string, id: string): Promise<ActionResult> {
  return run(async () => {
    const resource = RESOURCES[resourceSlug];
    if (!resource) {
      return { ok: false, message: "Recurso desconhecido." };
    }

    const response = await adminFetch(`${resource.apiPath}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      return { ok: false, message: await readError(response) };
    }

    revalidateSite();
    return { ok: true, message: `${resource.singular} eliminado.` };
  });
}

export async function saveProfile(formData: FormData): Promise<ActionResult> {
  return run(async () => {
    const response = await adminFetch("/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(PROFILE_FIELDS, formData)),
    });

    if (!response.ok) {
      return { ok: false, message: await readError(response) };
    }

    revalidateSite();
    return { ok: true, message: "Perfil actualizado." };
  });
}

export async function setMessageRead(id: string, read: boolean): Promise<ActionResult> {
  return run(async () => {
    const response = await adminFetch(`/admin/messages/${id}/read?read=${read}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      return { ok: false, message: await readError(response) };
    }
    revalidatePath("/admin/mensagens");
    return { ok: true };
  });
}

export async function setMessageArchived(id: string, archived: boolean): Promise<ActionResult> {
  return run(async () => {
    const response = await adminFetch(`/admin/messages/${id}/archive?archived=${archived}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      return { ok: false, message: await readError(response) };
    }
    revalidatePath("/admin/mensagens");
    return { ok: true, message: archived ? "Mensagem arquivada." : "Mensagem reposta." };
  });
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  return run(async () => {
    const response = await adminFetch(`/admin/messages/${id}`, { method: "DELETE" });
    if (!response.ok) {
      return { ok: false, message: await readError(response) };
    }
    revalidatePath("/admin/mensagens");
    return { ok: true, message: "Mensagem eliminada." };
  });
}

export async function changePassword(formData: FormData): Promise<ActionResult> {
  return run(async () => {
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmation = String(formData.get("confirmPassword") ?? "");

    if (newPassword !== confirmation) {
      return { ok: false, message: "A confirmação não coincide com a nova password." };
    }

    const response = await adminFetch("/auth/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      return { ok: false, message: await readError(response) };
    }

    return { ok: true, message: "Password alterada." };
  });
}
