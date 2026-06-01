import type { ReactNode } from "react";
import type { GuideStep } from "@/lib/guides";

function renderWithLinks(step: GuideStep) {
  const { text, textLinks } = step;
  if (!textLinks?.length) return text;

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const { match, href } of textLinks) {
    const index = text.indexOf(match, cursor);
    if (index === -1) continue;

    if (index > cursor) {
      parts.push(text.slice(cursor, index));
    }

    parts.push(
      <a
        key={`${href}-${index}`}
        href={href}
        className="font-semibold text-[var(--accent)] underline decoration-2 underline-offset-2 hover:text-[var(--accent-hover)]"
      >
        {match}
      </a>,
    );

    cursor = index + match.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length > 0 ? parts : text;
}

export function StepText({ step }: { step: GuideStep }) {
  return (
    <p className="m-0 pt-1 text-lg leading-relaxed text-[var(--foreground)]">
      {renderWithLinks(step)}
    </p>
  );
}
