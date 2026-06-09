import { GuideCard } from "@/components/GuideCard";
import { getCatalogGuides, getSubGuides } from "@/lib/guides";

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
          {getCatalogGuides().map((guide) => (
            <li key={guide.slug} className="flex flex-col gap-3">
              <GuideCard guide={guide} />
              {getSubGuides(guide.slug).map((subGuide) => (
                <GuideCard key={subGuide.slug} guide={subGuide} nested />
              ))}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
