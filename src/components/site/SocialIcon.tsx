import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail,
  email: Mail,
};

/** Resolve o nome de ícone guardado no CMS; cai num globo se não o conhecer. */
export default function SocialIcon({ name, size = 16 }: { name?: string; size?: number }) {
  const Icon = ICONS[name?.toLowerCase() ?? ""] ?? Globe;
  return <Icon size={size} aria-hidden />;
}
