import ProjectThumb from "@/components/site/ProjectThumb";
import type { Project } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <li>
      <Link href={`/projectos/${project.slug}`} className="row group flex gap-4">
        <ProjectThumb title={project.title} slug={project.slug} src={project.coverImage} />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[15px] font-medium tracking-tight transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-subtle">{project.year}</span>
          </div>

          <p className="mt-1.5 max-w-reading text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          {project.tech && project.tech.length > 0 && (
            <p className="mt-2.5 font-mono text-[11px] uppercase tracking-wide text-subtle">
              {project.tech.join(" · ")}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}

/** Ligação externa curta, usada quando o projecto vive fora do site. */
export function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm link"
    >
      {label}
      <ArrowUpRight size={14} />
    </a>
  );
}
