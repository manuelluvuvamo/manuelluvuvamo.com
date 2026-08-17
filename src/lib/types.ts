/**
 * Espelho, em TypeScript, dos documentos que a API Java devolve.
 * Manter alinhado com backend/src/main/java/ao/manuelluvuvamo/portfolio/domain.
 */

export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface BaseDocument {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Profile extends BaseDocument {
  key?: string;
  fullName: string;
  headline?: string;
  headlineEn?: string;
  shortBio?: string;
  shortBioEn?: string;
  longBio?: string;
  longBioEn?: string;
  currentRole?: string;
  currentCompany?: string;
  currentCompanyUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  resumePtUrl?: string;
  resumeEnUrl?: string;
  availableForWork?: boolean;
  availabilityNote?: string;
}

export interface SocialLink extends BaseDocument {
  label: string;
  url: string;
  icon?: string;
  username?: string;
  orderIndex?: number;
  visible?: boolean;
}

export type ProjectCategory = "PROFESSIONAL" | "EXPERIMENT" | "OPEN_SOURCE";

export interface Project extends BaseDocument {
  title: string;
  slug: string;
  summary: string;
  description?: string;
  url?: string;
  repositoryUrl?: string;
  coverImage?: string;
  tech?: string[];
  role?: string;
  year?: number;
  category?: ProjectCategory;
  featured?: boolean;
  status?: ContentStatus;
  orderIndex?: number;
}

export interface Post extends BaseDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  readingMinutes?: number;
  publishedAt?: string;
  featured?: boolean;
  status?: ContentStatus;
  /** Quantas vezes o artigo foi aberto. */
  viewCount?: number;
  /** Quantas vezes foi lido até ao fim. */
  readCount?: number;
}

export interface Article extends BaseDocument {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  externalUrl?: string;
  source?: string;
  tags?: string[];
  publishedAt?: string;
  status?: ContentStatus;
}

export type VlogPlatform = "YOUTUBE" | "INSTAGRAM" | "TIKTOK" | "LINKEDIN" | "OTHER";

export interface Vlog extends BaseDocument {
  title: string;
  slug: string;
  description?: string;
  videoUrl: string;
  platform?: VlogPlatform;
  thumbnailUrl?: string;
  durationSeconds?: number;
  tags?: string[];
  publishedAt?: string;
  featured?: boolean;
  status?: ContentStatus;
}

export interface Essay extends BaseDocument {
  title: string;
  slug: string;
  subtitle?: string;
  content: string;
  tags?: string[];
  publishedAt?: string;
  status?: ContentStatus;
}

export interface Quote extends BaseDocument {
  text: string;
  author?: string;
  context?: string;
  featured?: boolean;
  orderIndex?: number;
  status?: ContentStatus;
}

export interface Experience extends BaseDocument {
  company: string;
  role: string;
  location?: string;
  companyUrl?: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  description?: string;
  highlights?: string[];
  projects?: string[];
  orderIndex?: number;
}

export interface Education extends BaseDocument {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  institutionUrl?: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  description?: string;
  grade?: string | null;
  orderIndex?: number;
}

export interface Certification extends BaseDocument {
  title: string;
  issuer: string;
  issuedAt?: string;
  expiresAt?: string;
  credentialUrl?: string;
  description?: string;
  featured?: boolean;
  orderIndex?: number;
}

export interface Skill extends BaseDocument {
  name: string;
  category: string;
  level?: number;
  featured?: boolean;
  orderIndex?: number;
}

export interface ContactMessage extends BaseDocument {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  archived?: boolean;
}

/** O que /api/v1/public/bootstrap devolve, e a forma do seed local. */
export interface PortfolioContent {
  profile: Profile;
  socialLinks: SocialLink[];
  projects: Project[];
  posts: Post[];
  articles: Article[];
  vlogs: Vlog[];
  essays: Essay[];
  quotes: Quote[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}
