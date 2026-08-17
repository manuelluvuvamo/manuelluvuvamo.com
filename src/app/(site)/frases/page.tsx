import PageHeader from "@/components/site/PageHeader";
import { getContent } from "@/lib/api";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Frases",
  description: "Frases e ideias que guardo sobre software, aprendizagem e comunidade.",
};

export default async function QuotesPage() {
  const { quotes } = await getContent();

  return (
    <main className="shell py-16">
      <PageHeader
        eyebrow="Frases"
        title="Coisas que vou guardando"
        intro="Ideias que me ajudaram a decidir alguma coisa — minhas e de outros."
      />

      {quotes.length === 0 ? (
        <p className="py-12 text-sm text-muted-foreground">Ainda não há frases publicadas.</p>
      ) : (
        <ul className="divide-y divide-border">
          {quotes.map((quote) => (
            <li key={quote.id ?? quote.text} className="py-8">
              <blockquote>
                <p className="max-w-reading text-lg leading-relaxed tracking-tight text-balance">
                  “{quote.text}”
                </p>
                {(quote.author || quote.context) && (
                  <footer className="mt-3 text-sm text-subtle">
                    {quote.author ?? "Manuel Luvuvamo"}
                    {quote.context ? ` · ${quote.context}` : ""}
                  </footer>
                )}
              </blockquote>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
