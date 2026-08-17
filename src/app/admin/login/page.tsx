import LoginForm from "@/components/admin/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar no painel",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { proximo?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <header className="mb-8">
          <p className="eyebrow mb-2">Painel</p>
          <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gestão de conteúdos de manuelluvuvamo.com.
          </p>
        </header>

        <LoginForm redirectTo={sanitize(searchParams.proximo)} />
      </div>
    </main>
  );
}

/** Só aceita caminhos internos do painel, para não servir de trampolim. */
function sanitize(next?: string): string {
  if (!next || !next.startsWith("/admin") || next.startsWith("//")) {
    return "/admin";
  }
  return next === "/admin/login" ? "/admin" : next;
}
