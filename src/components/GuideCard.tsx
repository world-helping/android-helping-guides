import Link from "next/link";
import { GuideIcon } from "@/components/GuideIcon";
import type { Guide } from "@/lib/guides";

export function GuideCard({
  guide,
  nested = false,
}: {
  guide: Guide;
  nested?: boolean;
}) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={`block rounded-2xl border-2 bg-[var(--card)] no-underline shadow-sm transition hover:border-[var(--accent)] hover:shadow-md focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
        nested
          ? "ml-5 border-dashed p-4"
          : "border-[var(--border)] p-5"
      }`}
    >
      <div className="flex items-start gap-4">
        <GuideIcon guide={guide} />
        <div className="min-w-0 flex-1">
          <h2
            className={`font-bold leading-snug text-[var(--foreground)] ${
              nested ? "text-lg" : "text-xl"
            }`}
          >
            {guide.title}
          </h2>
          <p
            className={`mt-2 text-[var(--muted)] ${
              nested ? "text-base" : "text-lg"
            }`}
          >
            {guide.shortDescription}
          </p>
          <p className="mt-3 text-base font-semibold text-[var(--accent)]">
            Открыть инструкцию →
          </p>
        </div>
      </div>
    </Link>
  );
}
