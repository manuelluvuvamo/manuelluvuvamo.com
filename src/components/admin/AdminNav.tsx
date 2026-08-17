"use client";

import { RESOURCES } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const CONTENT = ["projectos", "posts", "artigos", "ensaios", "vlogs", "frases"];
const PROFILE = ["experiencias", "formacao", "certificacoes", "competencias", "redes"];

export default function AdminNav({
  user,
  unreadMessages,
}: {
  user: { name: string; email: string };
  unreadMessages: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const link = (href: string, label: string, badge?: number) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        key={href}
        href={href}
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
          active ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {label}
        {badge ? (
          <span className="rounded-full bg-accent px-1.5 text-[11px] font-medium text-accent-foreground">
            {badge}
          </span>
        ) : null}
      </Link>
    );
  };

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <div>
        <Link href="/admin" className="text-sm font-semibold tracking-tight">
          Painel
        </Link>
        <p className="mt-0.5 text-xs text-subtle">manuelluvuvamo.com</p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        <div className="space-y-0.5">
          {link("/admin", "Visão geral")}
          {link("/admin/mensagens", "Mensagens", unreadMessages)}
        </div>

        <div className="space-y-0.5">
          <p className="eyebrow px-3 pb-1.5">Conteúdo</p>
          {CONTENT.map((slug) => link(`/admin/${slug}`, RESOURCES[slug].label))}
        </div>

        <div className="space-y-0.5">
          <p className="eyebrow px-3 pb-1.5">Perfil</p>
          {link("/admin/perfil", "Identidade")}
          {PROFILE.map((slug) => link(`/admin/${slug}`, RESOURCES[slug].label))}
        </div>
      </nav>

      <div className="space-y-2 border-t border-border pt-4">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-subtle">{user.email}</p>
        <div className="flex items-center gap-3 pt-1">
          <Link href="/" className="text-xs link-muted">
            Ver site
          </Link>
          <button type="button" onClick={logout} className="text-xs link-muted">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
