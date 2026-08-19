import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
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
 * O HTML embutido no markdown é preservado. Os artigos usam-no para links
 * com atributos e para sublinhados, e ignorá-lo fazia desaparecer os links
 * em silêncio — o texto ficava, a ligação não. É seguro porque o conteúdo
 * só entra por aqui: escrito por mim, no painel autenticado. Se um dia
 * houver autores externos, isto tem de passar a ser sanitizado.
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
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
