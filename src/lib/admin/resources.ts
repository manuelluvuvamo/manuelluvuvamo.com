/**
 * Definição declarativa do CMS.
 *
 * Cada recurso descreve a rota do dashboard, o caminho na API e os campos
 * do formulário. As páginas de listagem, criação e edição são genéricas e
 * lêem daqui — acrescentar um tipo de conteúdo é acrescentar uma entrada.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "image"
  | "tags"
  | "lines";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  /** Ocupa a largura toda em vez de meia coluna. */
  full?: boolean;
}

export interface ResourceConfig {
  /** Segmento da rota, ex.: /admin/projectos */
  slug: string;
  /** Caminho na API, ex.: /admin/projects */
  apiPath: string;
  label: string;
  singular: string;
  /** Para concordar o artigo: "Nova frase" em vez de "Novo frase". */
  feminine?: boolean;
  description?: string;
  /** Campo mostrado como título na listagem. */
  titleField: string;
  subtitleField?: string;
  /** Campo mostrado à direita na listagem (data, ordem, etc.). */
  metaField?: string;
  /** Contadores só de leitura, mostrados na listagem. */
  metrics?: { name: string; singular: string; plural: string }[];
  hasStatus?: boolean;
  fields: Field[];
}

const STATUS_FIELD: Field = {
  name: "status",
  label: "Estado",
  type: "select",
  options: [
    { value: "DRAFT", label: "Rascunho" },
    { value: "PUBLISHED", label: "Publicado" },
    { value: "ARCHIVED", label: "Arquivado" },
  ],
  help: "Só o que está publicado aparece no site.",
};

const SLUG_FIELD: Field = {
  name: "slug",
  label: "Slug",
  type: "text",
  help: "Deixa vazio para ser gerado a partir do título.",
};

const ORDER_FIELD: Field = {
  name: "orderIndex",
  label: "Ordem",
  type: "number",
  help: "Menor aparece primeiro.",
};

export const RESOURCES: Record<string, ResourceConfig> = {
  projectos: {
    slug: "projectos",
    apiPath: "/admin/projects",
    label: "Projectos",
    singular: "Projecto",
    description: "Trabalho profissional, open source e experiências.",
    titleField: "title",
    subtitleField: "summary",
    metaField: "year",
    hasStatus: true,
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      SLUG_FIELD,
      { name: "summary", label: "Resumo", type: "textarea", required: true, full: true, help: "Uma ou duas frases. Aparece nas listagens." },
      { name: "description", label: "Descrição", type: "markdown", full: true },
      { name: "url", label: "Endereço público", type: "text" },
      { name: "repositoryUrl", label: "Repositório", type: "text" },
      { name: "coverImage", label: "Imagem de capa", type: "image", full: true },
      { name: "role", label: "Papel", type: "text", placeholder: "Desenvolvedor backend" },
      { name: "tech", label: "Tecnologias", type: "tags", full: true, help: "Separadas por vírgula." },
      { name: "year", label: "Ano", type: "number" },
      {
        name: "category",
        label: "Categoria",
        type: "select",
        options: [
          { value: "PROFESSIONAL", label: "Trabalho profissional" },
          { value: "OPEN_SOURCE", label: "Open source" },
          { value: "EXPERIMENT", label: "Experiência" },
        ],
      },
      { name: "featured", label: "Destacar na página inicial", type: "boolean" },
      STATUS_FIELD,
      ORDER_FIELD,
    ],
  },

  posts: {
    slug: "posts",
    apiPath: "/admin/posts",
    label: "Blog",
    singular: "Post",
    description: "Artigos técnicos publicados em /blog.",
    titleField: "title",
    subtitleField: "excerpt",
    metaField: "publishedAt",
    metrics: [
      { name: "viewCount", singular: "abertura", plural: "aberturas" },
      { name: "readCount", singular: "leitura completa", plural: "leituras completas" },
    ],
    hasStatus: true,
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      SLUG_FIELD,
      { name: "excerpt", label: "Excerto", type: "textarea", required: true, full: true },
      { name: "content", label: "Conteúdo", type: "markdown", required: true, full: true },
      { name: "coverImage", label: "Imagem de capa", type: "image", full: true },
      { name: "readingMinutes", label: "Minutos de leitura", type: "number", help: "Vazio: calculado a partir do texto." },
      { name: "tags", label: "Etiquetas", type: "tags", full: true },
      { name: "publishedAt", label: "Publicado em", type: "datetime", help: "Vazio ao publicar: carimba o momento." },
      { name: "featured", label: "Destacar", type: "boolean" },
      STATUS_FIELD,
    ],
  },

  artigos: {
    slug: "artigos",
    apiPath: "/admin/articles",
    label: "Artigos",
    singular: "Artigo",
    description: "Textos para a comunidade, aqui ou publicados noutro sítio.",
    titleField: "title",
    subtitleField: "excerpt",
    metaField: "publishedAt",
    hasStatus: true,
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      SLUG_FIELD,
      { name: "excerpt", label: "Excerto", type: "textarea", full: true },
      { name: "content", label: "Conteúdo", type: "markdown", full: true, help: "Preenche isto ou o endereço externo." },
      { name: "externalUrl", label: "Endereço externo", type: "text" },
      { name: "source", label: "Onde foi publicado", type: "text", placeholder: "Artigo Semanal" },
      { name: "tags", label: "Etiquetas", type: "tags", full: true },
      { name: "publishedAt", label: "Publicado em", type: "datetime" },
      STATUS_FIELD,
    ],
  },

  vlogs: {
    slug: "vlogs",
    apiPath: "/admin/vlogs",
    label: "Vlogs",
    singular: "Vlog",
    description: "Vídeos do YouTube, Instagram e TikTok.",
    titleField: "title",
    subtitleField: "description",
    metaField: "publishedAt",
    hasStatus: true,
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      SLUG_FIELD,
      { name: "description", label: "Descrição", type: "textarea", full: true },
      { name: "videoUrl", label: "Endereço do vídeo", type: "text", required: true, full: true },
      {
        name: "platform",
        label: "Plataforma",
        type: "select",
        options: [
          { value: "YOUTUBE", label: "YouTube" },
          { value: "INSTAGRAM", label: "Instagram" },
          { value: "TIKTOK", label: "TikTok" },
          { value: "LINKEDIN", label: "LinkedIn" },
          { value: "OTHER", label: "Outra" },
        ],
      },
      { name: "thumbnailUrl", label: "Miniatura", type: "image", full: true },
      { name: "durationSeconds", label: "Duração (segundos)", type: "number" },
      { name: "tags", label: "Etiquetas", type: "tags", full: true },
      { name: "publishedAt", label: "Publicado em", type: "datetime" },
      { name: "featured", label: "Destacar", type: "boolean" },
      STATUS_FIELD,
    ],
  },

  ensaios: {
    slug: "ensaios",
    apiPath: "/admin/essays",
    label: "Ensaios",
    singular: "Ensaio",
    description: "Textos mais longos e opinativos.",
    titleField: "title",
    subtitleField: "subtitle",
    metaField: "publishedAt",
    hasStatus: true,
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      SLUG_FIELD,
      { name: "subtitle", label: "Subtítulo", type: "text", full: true },
      { name: "content", label: "Conteúdo", type: "markdown", required: true, full: true },
      { name: "tags", label: "Etiquetas", type: "tags", full: true },
      { name: "publishedAt", label: "Publicado em", type: "datetime" },
      STATUS_FIELD,
    ],
  },

  frases: {
    slug: "frases",
    apiPath: "/admin/quotes",
    label: "Frases",
    singular: "Frase",
    feminine: true,
    description: "Frases curtas mostradas no site.",
    titleField: "text",
    subtitleField: "context",
    hasStatus: true,
    fields: [
      { name: "text", label: "Frase", type: "textarea", required: true, full: true },
      { name: "author", label: "Autor", type: "text", help: "Vazio quando a frase é tua." },
      { name: "context", label: "Contexto", type: "text" },
      { name: "featured", label: "Destacar na página inicial", type: "boolean" },
      STATUS_FIELD,
      ORDER_FIELD,
    ],
  },

  experiencias: {
    slug: "experiencias",
    apiPath: "/admin/experiences",
    label: "Experiências",
    singular: "Experiência",
    feminine: true,
    description: "Percurso profissional mostrado em /sobre.",
    titleField: "role",
    subtitleField: "company",
    fields: [
      { name: "role", label: "Cargo", type: "text", required: true },
      { name: "company", label: "Empresa", type: "text", required: true },
      { name: "location", label: "Localidade", type: "text" },
      { name: "companyUrl", label: "Site da empresa", type: "text" },
      { name: "startDate", label: "Início", type: "date", required: true },
      { name: "endDate", label: "Fim", type: "date", help: "Vazio se ainda estás lá." },
      { name: "current", label: "Cargo actual", type: "boolean" },
      { name: "description", label: "Descrição", type: "textarea", full: true },
      { name: "highlights", label: "Responsabilidades", type: "lines", full: true, help: "Uma por linha." },
      { name: "projects", label: "Projectos", type: "tags", full: true },
      ORDER_FIELD,
    ],
  },

  formacao: {
    slug: "formacao",
    apiPath: "/admin/education",
    label: "Formação",
    singular: "Formação",
    feminine: true,
    titleField: "degree",
    subtitleField: "institution",
    fields: [
      { name: "degree", label: "Grau ou curso", type: "text", required: true },
      { name: "institution", label: "Instituição", type: "text", required: true },
      { name: "field", label: "Área", type: "text" },
      { name: "location", label: "Localidade", type: "text" },
      { name: "institutionUrl", label: "Site da instituição", type: "text" },
      { name: "startDate", label: "Início", type: "date", required: true },
      { name: "endDate", label: "Fim", type: "date" },
      { name: "current", label: "Em frequência", type: "boolean" },
      { name: "description", label: "Descrição", type: "textarea", full: true },
      { name: "grade", label: "Classificação final", type: "text" },
      ORDER_FIELD,
    ],
  },

  certificacoes: {
    slug: "certificacoes",
    apiPath: "/admin/certifications",
    label: "Certificações",
    singular: "Certificação",
    feminine: true,
    titleField: "title",
    subtitleField: "issuer",
    metaField: "issuedAt",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "issuer", label: "Entidade emissora", type: "text", required: true },
      { name: "issuedAt", label: "Emitida em", type: "date" },
      { name: "expiresAt", label: "Expira em", type: "date" },
      { name: "credentialUrl", label: "Endereço do certificado", type: "text", full: true },
      { name: "description", label: "Descrição", type: "textarea", full: true },
      { name: "featured", label: "Destacar", type: "boolean" },
      ORDER_FIELD,
    ],
  },

  competencias: {
    slug: "competencias",
    apiPath: "/admin/skills",
    label: "Competências",
    singular: "Competência",
    feminine: true,
    titleField: "name",
    subtitleField: "category",
    fields: [
      { name: "name", label: "Nome", type: "text", required: true },
      { name: "category", label: "Categoria", type: "text", required: true, placeholder: "Backend" },
      { name: "level", label: "Nível (1 a 5)", type: "number" },
      { name: "featured", label: "Mostrar no stack da página inicial", type: "boolean" },
      ORDER_FIELD,
    ],
  },

  redes: {
    slug: "redes",
    apiPath: "/admin/social-links",
    label: "Redes sociais",
    singular: "Rede social",
    feminine: true,
    titleField: "label",
    subtitleField: "username",
    fields: [
      { name: "label", label: "Nome", type: "text", required: true },
      { name: "url", label: "Endereço", type: "text", required: true, full: true },
      {
        name: "icon",
        label: "Ícone",
        type: "select",
        options: [
          { value: "github", label: "GitHub" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "twitter", label: "X / Twitter" },
          { value: "instagram", label: "Instagram" },
          { value: "youtube", label: "YouTube" },
          { value: "mail", label: "Email" },
        ],
      },
      { name: "username", label: "Utilizador", type: "text" },
      { name: "visible", label: "Visível no site", type: "boolean" },
      ORDER_FIELD,
    ],
  },
};

export const PROFILE_FIELDS: Field[] = [
  { name: "fullName", label: "Nome completo", type: "text", required: true },
  { name: "headline", label: "Título", type: "text", full: true },
  { name: "headlineEn", label: "Título (EN)", type: "text", full: true },
  { name: "shortBio", label: "Bio curta", type: "textarea", full: true, help: "Parágrafo de abertura da página inicial." },
  { name: "shortBioEn", label: "Bio curta (EN)", type: "textarea", full: true },
  { name: "longBio", label: "Bio completa", type: "markdown", full: true, help: "Texto da página /sobre." },
  { name: "longBioEn", label: "Bio completa (EN)", type: "markdown", full: true },
  { name: "currentRole", label: "Cargo actual", type: "text" },
  { name: "currentCompany", label: "Empresa actual", type: "text" },
  { name: "currentCompanyUrl", label: "Site da empresa", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "phone", label: "Telefone", type: "text" },
  { name: "location", label: "Localidade", type: "text" },
  { name: "avatarUrl", label: "Fotografia", type: "image", full: true },
  { name: "resumePtUrl", label: "Currículo PT", type: "text" },
  { name: "resumeEnUrl", label: "Currículo EN", type: "text" },
  { name: "availableForWork", label: "Disponível para trabalho", type: "boolean" },
  { name: "availabilityNote", label: "Nota de disponibilidade", type: "text", full: true },
];

export function resourceOrNull(slug: string): ResourceConfig | null {
  return RESOURCES[slug] ?? null;
}
