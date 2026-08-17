import PageHeader from "@/components/site/PageHeader";
import { getContent } from "@/lib/api";
import { longDate } from "@/lib/format";
import type { Metadata } from "next";
import { Play } from "lucide-react";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Vlog",
  description: "Vídeos sobre desenvolvimento de software, carreira e a comunidade tech angolana.",
};

const PLATFORM_LABEL: Record<string, string> = {
  YOUTUBE: "YouTube",
  INSTAGRAM: "Instagram",
  TIKTOK: "TikTok",
  LINKEDIN: "LinkedIn",
  OTHER: "Vídeo",
};

export default async function VlogPage() {
  const { vlogs } = await getContent();

  return (
    <main className="shell py-16">
      <PageHeader
        eyebrow="Vlog"
        title="Em vídeo"
        intro="Conversas sobre desenvolvimento de software, carreira e o dia-a-dia de quem programa em Angola."
      />

      {vlogs.length === 0 ? (
        <p className="py-12 text-sm text-muted-foreground">
          Ainda não há vídeos publicados. Estão a caminho.
        </p>
      ) : (
        <ul className="grid gap-6 py-12 sm:grid-cols-2">
          {vlogs.map((vlog) => (
            <li key={vlog.slug}>
              <a
                href={vlog.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg border border-border transition-colors hover:border-accent/50"
              >
                <div className="relative flex aspect-video items-center justify-center bg-muted">
                  {vlog.thumbnailUrl ? (
                    // Miniaturas vêm de domínios variáveis (YouTube, CDN); <img> evita
                    // ter de listar cada host em next.config.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={vlog.thumbnailUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <Play size={28} className="text-subtle" aria-hidden />
                  )}
                </div>

                <div className="p-4">
                  <p className="eyebrow mb-2">
                    {PLATFORM_LABEL[vlog.platform ?? "OTHER"]}
                    {vlog.publishedAt ? ` · ${longDate(vlog.publishedAt)}` : ""}
                  </p>
                  <h2 className="text-[15px] font-medium tracking-tight transition-colors group-hover:text-accent">
                    {vlog.title}
                  </h2>
                  {vlog.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {vlog.description}
                    </p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
