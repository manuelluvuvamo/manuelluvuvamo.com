import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Converte o markdown guardado no CMS em HTML, já com realce de sintaxe.
 * Corre no servidor, em tempo de build ou de revalidação — o cliente
 * recebe HTML puro, sem qualquer runtime de markdown.
 *
 * HTML embutido no markdown é ignorado de propósito: o conteúdo entra pelo
 * dashboard e não há razão para abrir essa porta.
 */

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "one-dark-pro",
  // O fundo dos blocos vem do globals.css, não de estilos inline do shiki.
  keepBackground: false,
  onVisitLine(element) {
    // Impede que linhas vazias colapsem no modo grid.
    if (element.children.length === 0) {
      element.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(element) {
    element.properties.className = [
      ...((element.properties.className as string[]) ?? []),
      "line--highlighted",
    ];
  },
};

export async function renderMarkdown(markdown?: string | null): Promise<string> {
  if (!markdown?.trim()) {
    return "";
  }

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
