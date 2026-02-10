import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ToastProvider } from "@/components/ui/Toast";
import { BRAND, TAGLINE } from "@/lib/constants";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: `${BRAND} | ${TAGLINE}`,
  description:
    "VD Publishing is an independent editorial and publishing studio providing end-to-end publishing services — from editorial work and design to ISBN assignment and global distribution."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-bg text-text">
        <SiteHeader />
        <ToastProvider>
          <main>{children}</main>
          <SiteFooter />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
