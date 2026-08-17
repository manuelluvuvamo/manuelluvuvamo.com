import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import Toaster from "@/components/toaster";
import { getContent } from "@/lib/api";

/** Casca do portfólio público. O dashboard em /admin tem a sua própria. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { socialLinks } = await getContent();

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter socialLinks={socialLinks} />
    </div>
  );
}
