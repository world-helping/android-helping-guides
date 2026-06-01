import { GuideCard } from "@/components/GuideCard";
import { guides } from "@/lib/guides";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-[var(--accent)] p-6 text-white">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
          Простые инструкции для вашего телефона
        </h1>
        <p className="mt-3 text-lg leading-relaxed opacity-95">
          Крупный текст, понятные шаги и кнопки быстрого перехода в нужные
          приложения. Откройте нужную тему ниже.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">
          Все гайды
        </h2>
        <ul className="flex list-none flex-col gap-4 p-0">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <GuideCard guide={guide} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
