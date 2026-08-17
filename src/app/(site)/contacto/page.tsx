import ContactForm from "@/components/site/ContactForm";
import PageHeader from "@/components/site/PageHeader";
import SocialIcon from "@/components/site/SocialIcon";
import { getContent } from "@/lib/api";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contacto",
  description: "Fala comigo sobre projectos, mentoria ou colaboração.",
};

export default async function ContactPage() {
  const { profile, socialLinks } = await getContent();

  return (
    <main className="shell py-16">
      <PageHeader
        eyebrow="Contacto"
        title="Falar comigo"
        intro="Projectos, mentoria, uma dúvida técnica ou só uma ideia que queiras discutir — escreve. Leio tudo e respondo."
      />

      <div className="grid gap-12 py-12 lg:grid-cols-[1fr_16rem]">
        <ContactForm />

        <aside className="space-y-8 lg:border-l lg:border-border lg:pl-8">
          <div>
            <h2 className="eyebrow mb-3">Directo</h2>
            <ul className="space-y-2 text-sm">
              {profile.email && (
                <li>
                  <a href={`mailto:${profile.email}`} className="link-muted break-all">
                    {profile.email}
                  </a>
                </li>
              )}
              {profile.location && <li className="text-muted-foreground">{profile.location}</li>}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div>
              <h2 className="eyebrow mb-3">Redes</h2>
              <ul className="space-y-2">
                {socialLinks
                  .filter((link) => !link.url.startsWith("mailto:"))
                  .map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm link-muted"
                      >
                        <SocialIcon name={link.icon} size={15} />
                        {link.username ?? link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
