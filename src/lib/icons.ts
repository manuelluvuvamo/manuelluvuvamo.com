/**
 * Ícones que podem ser escolhidos no painel.
 *
 * Só dados aqui — nenhum componente. O formulário do painel precisa da lista
 * para montar o selector, e não deve arrastar os desenhos dos ícones com ela.
 * O mapa de nome para componente vive em components/site/EntityIcon.tsx.
 *
 * A lista é deliberadamente curta. O lucide-react tem mais de mil ícones; se
 * aceitássemos qualquer nome, o browser teria de carregar a biblioteca toda
 * para desenhar um.
 */
export const ICON_OPTIONS: { value: string; label: string }[] = [
  { value: "building", label: "Empresa" },
  { value: "briefcase", label: "Pasta / trabalho" },
  { value: "code", label: "Código" },
  { value: "terminal", label: "Terminal" },
  { value: "server", label: "Servidor" },
  { value: "database", label: "Base de dados" },
  { value: "cpu", label: "Hardware" },
  { value: "layers", label: "Camadas / arquitectura" },
  { value: "graduation", label: "Ensino / formação" },
  { value: "users", label: "Equipa" },
  { value: "compass", label: "Mentoria" },
  { value: "rocket", label: "Lançamento" },
  { value: "wrench", label: "Manutenção" },
  { value: "shield", label: "Segurança" },
  { value: "globe", label: "Web" },
  { value: "pen", label: "Escrita" },
];
