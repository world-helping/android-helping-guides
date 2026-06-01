import Link from "next/link";
import { notFound } from "next/navigation";
import { QuickLinkButton } from "@/components/QuickLinkButton";
import { StepList } from "@/components/StepList";
import { getGuideBySlug, guides } from "@/lib/guides";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Не найдено" };
  return {
    title: guide.title,
    description: guide.shortDescription,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <article className="space-y-8">
      <nav>
        <Link
          href="/"
          className="inline-flex min-h-[2.75rem] items-center text-lg font-semibold text-[var(--accent)] no-underline hover:underline"
        >
          ← На главную
        </Link>
      </nav>

      <header className="flex items-start gap-4">
        <span className="text-5xl" aria-hidden>
          {guide.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
            {guide.title}
          </h1>
          <p className="mt-2 text-lg text-[var(--muted)]">
            {guide.shortDescription}
          </p>
        </div>
      </header>

      <section aria-labelledby="quick-links-heading">
        <h2
          id="quick-links-heading"
          className="mb-4 text-xl font-bold text-[var(--foreground)]"
        >
          Быстрые ссылки
        </h2>
        <p className="mb-4 text-lg text-[var(--muted)]">
          Нажмите кнопку — телефон попробует открыть нужное приложение. Если
          ничего не произошло, выполните шаги ниже вручную.
        </p>
        <div className="flex flex-col gap-4">
          {guide.quickLinks.map((link) => (
            <QuickLinkButton key={link.label + link.href} link={link} />
          ))}
        </div>
      </section>

      <section aria-labelledby="steps-heading">
        <h2
          id="steps-heading"
          className="mb-4 text-xl font-bold text-[var(--foreground)]"
        >
          Пошаговая инструкция
        </h2>
        <StepList steps={guide.steps} />
      </section>

      {guide.tips && guide.tips.length > 0 ? (
        <section
          className="rounded-2xl border-2 border-[var(--success)] bg-emerald-50 p-5"
          aria-labelledby="tips-heading"
        >
          <h2
            id="tips-heading"
            className="mb-3 text-xl font-bold text-emerald-900"
          >
            Полезно знать
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-lg text-emerald-900">
            {guide.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
