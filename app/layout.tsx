import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ToastProvider } from "@/components/ui/Toast";
import { BRAND, TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND} | ${TAGLINE}`,
  description:
    "VD Publishing is an independent editorial and publishing studio providing end-to-end publishing services — from editorial work and design to ISBN assignment and global distribution."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
