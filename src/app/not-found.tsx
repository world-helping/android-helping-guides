import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-2xl font-bold">Страница не найдена</h1>
      <p className="text-lg text-[var(--muted)]">
        Такого гайда нет. Вернитесь на главную и выберите тему из списка.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-lg font-bold text-white no-underline"
      >
        На главную
      </Link>
    </div>
  );
}
