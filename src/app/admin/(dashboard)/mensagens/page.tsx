import MessageCard from "@/components/admin/MessageCard";
import { adminGet } from "@/lib/admin/session";
import type { ContactMessage } from "@/lib/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Mensagens" };

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { arquivo?: string };
}) {
  const showArchive = searchParams.arquivo === "1";
  const messages = await adminGet<ContactMessage[]>(
    `/admin/messages?archived=${showArchive ? "true" : "false"}`
  );

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="eyebrow mb-2">Contacto</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {showArchive ? "Todas as mensagens" : "Caixa de entrada"}
          </h1>
        </div>

        <Link
          href={showArchive ? "/admin/mensagens" : "/admin/mensagens?arquivo=1"}
          className="text-sm link-muted"
        >
          {showArchive ? "Ver só a caixa de entrada" : "Ver todas (com arquivo)"}
        </Link>
      </header>

      {messages.length === 0 ? (
        <p className="py-12 text-sm text-muted-foreground">
          {showArchive ? "Nenhuma mensagem." : "Caixa de entrada vazia."}
        </p>
      ) : (
        <ul className="space-y-3">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </ul>
      )}
    </div>
  );
}
