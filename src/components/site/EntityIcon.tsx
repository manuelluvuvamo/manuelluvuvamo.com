import {
  Briefcase,
  Building2,
  Code2,
  Compass,
  Cpu,
  Database,
  Globe,
  GraduationCap,
  Layers,
  PenLine,
  Rocket,
  Server,
  Shield,
  Terminal,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Nomes aceites em lib/icons.ts, ligados aos desenhos correspondentes. */
const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  briefcase: Briefcase,
  code: Code2,
  terminal: Terminal,
  server: Server,
  database: Database,
  cpu: Cpu,
  layers: Layers,
  graduation: GraduationCap,
  users: Users,
  compass: Compass,
  rocket: Rocket,
  wrench: Wrench,
  shield: Shield,
  globe: Globe,
  pen: PenLine,
};

/**
 * Desenha o ícone escolhido no painel. Sem nome — ou com um nome que já não
 * existe na lista — não desenha nada, em vez de mostrar um símbolo errado.
 */
export default function EntityIcon({
  name,
  size = 16,
  className,
}: {
  name?: string | null;
  size?: number;
  className?: string;
}) {
  const Icon = name ? ICONS[name] : undefined;
  if (!Icon) return null;
  return <Icon size={size} className={className} aria-hidden />;
}

export function hasIcon(name?: string | null): boolean {
  return Boolean(name && ICONS[name]);
}
