/* import { ThemeProvider } from "@/components/theme-provider" */
import "./globals.css";
import LocalFont from "next/font/local";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toaster from "@/components/toaster";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "manuelluvuvamo.com",
  description:
    "Fullstack Laravel Developer, SQL Trainner and Founder of Quick and Safe Shopping",
};

const calSans = LocalFont({
  src: "../assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

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
      <body>
        <Toaster />
        {/*   <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
        {children}
        {/*  </ThemeProvider> */}
      </body>
    </html>
  );
}
