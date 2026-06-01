import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Помощь с телефоном",
    template: "%s · Помощь с телефоном",
  },
  description:
    "Простые пошаговые инструкции для Android: чёрный список, камера, отправка фото, баланс.",
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
        <header className="border-b border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
            <Link
              href="/"
              className="text-xl font-bold text-[var(--foreground)] no-underline hover:text-[var(--accent)]"
            >
              📱 Помощь с телефоном
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-6 pb-12">{children}</main>
        <footer className="border-t border-[var(--border)] bg-[var(--card)] py-6 text-center text-sm text-[var(--muted)]">
          <p>Пошаговые подсказки для Android · world-helping</p>
        </footer>
      </body>
    </html>
  );
}
