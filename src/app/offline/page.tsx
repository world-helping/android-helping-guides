import Link from "next/link";

export const metadata = {
  title: "Нет подключения",
};

export default function OfflinePage() {
  return (
    <section className="space-y-6 rounded-2xl border-2 border-border bg-card p-6 text-center">
      <div className="text-6xl" aria-hidden>
        📱
      </div>
      <h1 className="text-2xl font-bold leading-tight">Нет подключения</h1>
      <p className="text-lg text-muted">
        Похоже, интернет сейчас недоступен. Уже открытые инструкции могут
        сохраниться на телефоне и открываться быстрее в следующий раз.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 text-lg font-bold text-white no-underline"
      >
        Попробовать открыть главную
      </Link>
    </section>
  );
}
