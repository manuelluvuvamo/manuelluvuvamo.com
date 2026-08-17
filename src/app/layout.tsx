import { ThemeProvider } from "@/components/theme-provider";
import { WEBSITE_HOST_URL } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const calSans = LocalFont({
  src: "../assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
  display: "swap",
});

const meta = {
  title: "Manuel Luvuvamo",
  description:
    "Desenvolvedor de software, mentor tech e criador de soluções, em Luanda. Construo sistemas, mentoro programadores angolanos e escrevo sobre desenvolvimento de software.",
  image: `${WEBSITE_HOST_URL}/img/5.jpeg`,
};

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_HOST_URL),
  title: {
    default: `${meta.title} — Desenvolvedor de software`,
    template: "%s · Manuel Luvuvamo",
  },
  description: meta.description,
  authors: [{ name: "Manuel Luvuvamo", url: WEBSITE_HOST_URL }],
  creator: "Manuel Luvuvamo",
  keywords: [
    "Manuel Luvuvamo",
    "desenvolvedor de software",
    "Angola",
    "Luanda",
    "Laravel",
    "Next.js",
    "Spring Boot",
    "mentoria",
  ],
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: "pt_PT",
    type: "website",
    images: [{ url: meta.image }],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: "summary_large_image",
    site: "@manuelluvuvamo",
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-PT"
      className={[inter.variable, calSans.variable].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content="DUZpFdCx-Ttq5-aHB7Z2hnDYvBLaegLqM2Bw4YOMnA4"
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
