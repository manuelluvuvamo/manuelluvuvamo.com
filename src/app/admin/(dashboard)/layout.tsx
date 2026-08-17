import AdminNav from "@/components/admin/AdminNav";
import { adminGet, currentUser } from "@/lib/admin/session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Painel", template: "%s · Painel" },
  robots: { index: false, follow: false },
};

/** O painel é sempre dinâmico: nada aqui deve ficar em cache. */
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, stats] = await Promise.all([
    currentUser(),
    adminGet<Record<string, number>>("/admin/dashboard/stats"),
  ]);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="border-b border-border lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <AdminNav user={user} unreadMessages={stats.unreadMessages ?? 0} />
      </aside>

      <main className="min-w-0 px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
