import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { WEBSITE_HOST_URL } from '@/lib/constants'
import LocalFont from "next/font/local";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toaster from "@/components/toaster";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

const meta = {
  title: 'Manuel Luvuvamo',
  description:
    'Software Developer: Systems Integration and Extensibility | SQL Trainer | React & React Native Learner | CEO & Founder - Quick and Safe Shopping: Import, Administrative Management, Payments and Digital Services.',
  image: `${WEBSITE_HOST_URL}/5.jpeg`,
}

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_HOST_URL),
  title: {
    default: meta.title,
    template: '%s | Manuel Luvuvamo',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'en-US',
    type: 'website',
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
    site: '@manuelluvuvamo',
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-pt"
      className={[inter.variable, calSans.variable].join(" ")}
      suppressHydrationWarning
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="DUZpFdCx-Ttq5-aHB7Z2hnDYvBLaegLqM2Bw4YOMnA4" />
      </Head>

      <body>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
        <SpeedInsights />

      </body>
    </html>
  );
}
