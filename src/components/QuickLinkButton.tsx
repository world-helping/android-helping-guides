import type { QuickLink } from "@/lib/guides";

export function QuickLinkButton({ link }: { link: QuickLink }) {
  return (
    <div className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
      <a
        href={link.href}
        className="flex min-h-[3.25rem] w-full items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-4 text-center text-lg font-bold text-white no-underline transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        {link.label}
      </a>
      {link.hint ? (
        <p className="mt-3 text-base text-[var(--muted)]">{link.hint}</p>
      ) : null}
    </div>
  );
}
