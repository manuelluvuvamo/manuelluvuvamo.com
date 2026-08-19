"use client";

import { cn } from "@/lib/utils";
import { ImageOff, Upload } from "lucide-react";
import { useRef, useState } from "react";

const CONTROL =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-subtle focus:border-accent";

/**
 * Limite de tamanho, verificado aqui antes de enviar.
 *
 * São 4 MB e não os 5 MB que a API aceita porque, em produção, o pedido
 * passa por uma função do Vercel, que recusa corpos acima de ~4,5 MB antes
 * de o nosso código sequer correr. Verificar no browser também evita o caso
 * feio: um ficheiro muito grande faz o servidor cortar a ligação a meio do
 * envio, e aí não há resposta nenhuma para ler — só um erro de rede que não
 * explica nada.
 */
const MAX_BYTES = 4 * 1024 * 1024;
const MAX_LABEL = "4 MB";

function formatarTamanho(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1).replace(".", ",")} MB` : `${Math.round(bytes / 1024)} KB`;
}

/**
 * Campo de imagem: aceita um endereço escrito à mão ou um ficheiro carregado
 * do computador. O que fica guardado é sempre um endereço — carregar um
 * ficheiro apenas o preenche por ti.
 */
export default function ImageField({
  name,
  defaultValue = "",
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_BYTES) {
      setError(
        `A imagem tem ${formatarTamanho(file.size)} e o limite é ${MAX_LABEL}. ` +
          "Reduz-lhe o tamanho e tenta de novo."
      );
      if (fileInput.current) fileInput.current.value = "";
      return;
    }

    setPending(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append("file", file);

      const response = await fetch("/api/admin/upload", { method: "POST", body: payload });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(body.message ?? "Não foi possível carregar a imagem.");
        return;
      }

      setValue(body.url);
    } catch {
      setError("Falhou o carregamento. Verifica a ligação e tenta de novo.");
    } finally {
      setPending(false);
      // Permite voltar a escolher o mesmo ficheiro depois de um erro.
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder ?? "/media/… ou https://…"}
          className={CONTROL}
        />

        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={pending}
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-50"
        >
          <Upload size={15} />
          {pending ? "A carregar…" : "Carregar"}
        </button>

        <input
          ref={fileInput}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <p className="text-xs text-subtle">
          JPEG, PNG, WebP, GIF, AVIF ou SVG, até {MAX_LABEL}.
        </p>
      )}

      <Preview src={value} />
    </div>
  );
}

function Preview({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);

  if (!src.trim()) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex h-24 w-40 items-center justify-center overflow-hidden rounded-md border border-border bg-muted"
      )}
    >
      {broken ? (
        <span className="flex flex-col items-center gap-1 text-[11px] text-subtle">
          <ImageOff size={16} />
          sem pré-visualização
        </span>
      ) : (
        // Endereços arbitrários vindos do painel; <img> evita ter de declarar
        // cada domínio em next.config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt="Pré-visualização"
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
          onLoad={() => setBroken(false)}
        />
      )}
    </div>
  );
}
