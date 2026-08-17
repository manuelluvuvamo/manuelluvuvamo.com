import ResourceForm from "@/components/admin/ResourceForm";
import { saveProfile } from "@/lib/admin/actions";
import { PROFILE_FIELDS } from "@/lib/admin/resources";
import { adminGet } from "@/lib/admin/session";
import type { Profile } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Identidade" };

export default async function ProfilePage() {
  const profile = await adminGet<Profile>("/admin/profile");

  return (
    <div>
      <header className="mb-8 border-b border-border pb-6">
        <p className="eyebrow mb-2">Perfil</p>
        <h1 className="text-2xl font-semibold tracking-tight">Identidade</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O que aparece na página inicial, no cabeçalho de /sobre e nos metadados do site.
        </p>
      </header>

      <ResourceForm
        fields={PROFILE_FIELDS}
        initial={profile as unknown as Record<string, unknown>}
        action={saveProfile}
      />
    </div>
  );
}
