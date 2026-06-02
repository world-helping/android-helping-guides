import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { RegisterServiceWorker } from "@/components/RegisterServiceWorker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  applicationName: "Помощь с телефоном",
  manifest: "/manifest.webmanifest",
  title: {
    default: "Помощь с телефоном",
    template: "%s · Помощь с телефоном",
  },
  description:
    "Простые пошаговые инструкции для Android: чёрный список, камера, отправка фото, баланс.",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Помощь",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} min-h-screen antialiased`}>
        <RegisterServiceWorker />
        <header className="border-b border-border bg-card shadow-sm">
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
            <Link
              href="/"
              className="text-xl font-bold text-foreground no-underline hover:text-accent"
            >
              📱 Помощь с телефоном
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-6 pb-12">{children}</main>
        <footer className="border-t border-border bg-card py-6 text-center text-sm text-muted">
          <p>Пошаговые подсказки для Android · world-helping</p>
        </footer>
      </body>
    </html>
  );
}
