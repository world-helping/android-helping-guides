import Image from "next/image";
import type { Guide } from "@/lib/guides";

type GuideIconProps = {
  guide: Pick<Guide, "icon" | "iconSrc">;
  size?: "card" | "header";
};

export function GuideIcon({ guide, size = "card" }: GuideIconProps) {
  const dimension = size === "header" ? 48 : 40;

  if (guide.iconSrc) {
    return (
      <Image
        src={guide.iconSrc}
        alt=""
        width={dimension}
        height={dimension}
        className="rounded-xl"
        aria-hidden
      />
    );
  }

  return (
    <span className={size === "header" ? "text-5xl" : "text-4xl"} aria-hidden>
      {guide.icon}
    </span>
  );
}
