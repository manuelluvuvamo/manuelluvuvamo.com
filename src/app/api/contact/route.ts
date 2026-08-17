import { API_BASE_URL } from "@/lib/api";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Recebe o formulário de contacto do site.
 *
 * A mensagem é guardada na API Java (fica na caixa de entrada do dashboard)
 * e, se WEBHOOK_URL estiver definido, também chega ao Discord — assim há
 * aviso imediato sem depender de ir ver o dashboard.
 */

const bodySchema = z.object({
  name: z.string().min(1, "Diz-me como te chamas."),
  email: z.string().email("Esse email não parece válido."),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, "Escreve a mensagem.").max(5000),
});

export async function POST(request: Request) {
  let payload;
  try {
    payload = bodySchema.parse(await request.json());
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? error.errors[0]?.message ?? "Dados inválidos."
        : "Dados inválidos.";
    return NextResponse.json({ message }, { status: 400 });
  }

  const stored = await storeMessage(payload);
  if (!stored.ok) {
    return NextResponse.json({ message: stored.message }, { status: 502 });
  }

  // O aviso é um extra: se falhar, a mensagem já está guardada.
  await notifyDiscord(payload).catch(() => undefined);

  return NextResponse.json({ message: "Mensagem recebida. Respondo assim que puder." });
}

async function storeMessage(payload: z.infer<typeof bodySchema>) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { ok: false as const, message: error?.message ?? "Não foi possível guardar a mensagem." };
    }

    return { ok: true as const };
  } catch {
    return {
      ok: false as const,
      message: "O servidor está indisponível. Escreve-me directamente por email.",
    };
  }
}

async function notifyDiscord(payload: z.infer<typeof bodySchema>) {
  const webhook = process.env.WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: payload.subject || "Mensagem de contacto",
          color: 2326507,
          fields: [
            { name: "Nome", value: payload.name, inline: true },
            { name: "E-mail", value: payload.email, inline: true },
            { name: "Mensagem", value: payload.message.slice(0, 1000) },
          ],
        },
      ],
    }),
  });
}
