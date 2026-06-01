import Link from "next/link";
import type { Guide } from "@/lib/guides";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="block rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-5 no-underline shadow-sm transition hover:border-[var(--accent)] hover:shadow-md focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl" aria-hidden>
          {guide.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold leading-snug text-[var(--foreground)]">
            {guide.title}
          </h2>
          <p className="mt-2 text-lg text-[var(--muted)]">{guide.shortDescription}</p>
          <p className="mt-3 text-base font-semibold text-[var(--accent)]">
            Открыть инструкцию →
          </p>
        </div>
      </div>
    </Link>
  );
}
