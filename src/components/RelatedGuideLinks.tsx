import Link from "next/link";
import { getGuideBySlug } from "@/lib/guides";
import { GuideIcon } from "@/components/GuideIcon";

type RelatedGuideLinksProps = {
  slugs: string[];
};

export function RelatedGuideLinks({ slugs }: RelatedGuideLinksProps) {
  const items = slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide) => guide !== undefined);

  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-guides-heading">
      <h2
        id="related-guides-heading"
        className="mb-4 text-xl font-bold text-[var(--foreground)]"
      >
        Подробные инструкции
      </h2>
      <ul className="flex list-none flex-col gap-3 p-0">
        {items.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="flex items-center gap-4 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] p-4 no-underline transition hover:border-[var(--accent)]"
            >
              <GuideIcon guide={guide} />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-[var(--foreground)]">
                  {guide.title}
                </p>
                <p className="mt-1 text-base font-semibold text-[var(--accent)]">
                  Открыть инструкцию →
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
