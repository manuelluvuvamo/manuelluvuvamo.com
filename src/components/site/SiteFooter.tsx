import SocialIcon from "@/components/site/SocialIcon";
import type { SocialLink } from "@/lib/types";
import Link from "next/link";

const SECONDARY = [{ label: "Frases", href: "/frases" }];

export default function SiteFooter({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Manuel Luvuvamo · Luanda, Angola
          </p>
          <div className="flex gap-4">
            {SECONDARY.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm link-muted">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-1">
          {socialLinks.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                title={link.username ?? link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <SocialIcon name={link.icon} />
                <span className="sr-only">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
