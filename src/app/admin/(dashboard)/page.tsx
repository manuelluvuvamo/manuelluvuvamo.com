import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import { RESOURCES } from "@/lib/admin/resources";
import { adminGet, currentUser } from "@/lib/admin/session";
import Link from "next/link";

/** Contadores por recurso, na ordem em que aparecem na navegação. */
const CARDS: { statKey: string; slug: string }[] = [
  { statKey: "projects", slug: "projectos" },
  { statKey: "posts", slug: "posts" },
  { statKey: "articles", slug: "artigos" },
  { statKey: "essays", slug: "ensaios" },
  { statKey: "vlogs", slug: "vlogs" },
  { statKey: "quotes", slug: "frases" },
  { statKey: "experiences", slug: "experiencias" },
  { statKey: "education", slug: "formacao" },
  { statKey: "certifications", slug: "certificacoes" },
  { statKey: "skills", slug: "competencias" },
  { statKey: "socialLinks", slug: "redes" },
];

export default async function AdminHomePage() {
  const [user, stats] = await Promise.all([
    currentUser(),
    adminGet<Record<string, number>>("/admin/dashboard/stats"),
  ]);

  const unread = stats.unreadMessages ?? 0;

  return (
    <div className="space-y-12">
      <header>
        <p className="eyebrow mb-2">Visão geral</p>
        <h1 className="text-2xl font-semibold tracking-tight">Olá, {firstName(user.name)}.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {unread > 0 ? (
            <>
              Tens{" "}
              <Link href="/admin/mensagens" className="link underline">
                {unread} {unread === 1 ? "mensagem por ler" : "mensagens por ler"}
              </Link>
              .
            </>
          ) : (
            "Sem mensagens por ler."
          )}
        </p>
      </header>

      <section>
        <h2 className="eyebrow mb-4">Conteúdo</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CARDS.map((card) => (
            <li key={card.slug}>
              <Link
                href={`/admin/${card.slug}`}
                className="block rounded-lg border border-border p-4 transition-colors hover:border-accent/50 hover:bg-muted"
              >
                <span className="block text-2xl font-semibold tabular-nums">
                  {stats[card.statKey] ?? 0}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {RESOURCES[card.slug].label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="eyebrow mb-4">Segurança</h2>
        <div className="max-w-md">
          <p className="mb-4 text-sm text-muted-foreground">
            Se ainda estás com a password definida por variável de ambiente, troca-a agora.
          </p>
          <ChangePasswordForm />
        </div>
      </section>
    </div>
  );
}

function firstName(name?: string): string {
  return name?.trim().split(/\s+/)[0] ?? "Manuel";
}
