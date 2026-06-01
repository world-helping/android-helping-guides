import Image from "next/image";
import type { GuideStep } from "@/lib/guides";
import { StepText } from "@/components/StepText";

export function StepList({ steps }: { steps: GuideStep[] }) {
  return (
    <ol className="list-none space-y-4 p-0">
      {steps.map((step, index) => (
        <li
          key={index}
          className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] p-4"
        >
          <div className="flex gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white"
              aria-hidden
            >
              {index + 1}
            </span>
            <StepText step={step} />
          </div>

          {step.image ? (
            <figure
              className={
                step.image.variant === "icon"
                  ? "mt-4 flex justify-center"
                  : "mt-4"
              }
            >
              <Image
                src={step.image.src}
                alt={step.image.alt}
                width={step.image.variant === "icon" ? 96 : 480}
                height={step.image.variant === "icon" ? 96 : 1040}
                unoptimized={step.image.variant === "screenshot"}
                className={
                  step.image.variant === "icon"
                    ? "h-24 w-24 rounded-2xl shadow-md"
                    : "mx-auto h-auto w-full max-w-full rounded-xl border border-[var(--border)] shadow-sm"
                }
                sizes={
                  step.image.variant === "icon"
                    ? "96px"
                    : "(max-width: 672px) 100vw, 560px"
                }
                priority={index < 2}
              />
              <figcaption className="sr-only">{step.image.alt}</figcaption>
            </figure>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
