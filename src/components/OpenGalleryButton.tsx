import { QuickLinkButton } from "@/components/QuickLinkButton";
import type { AppQuickLink } from "@/lib/guides";

const openGalleryLink: AppQuickLink = {
  label: "Открыть галерею",
  href: "intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_GALLERY;end",
};

type OpenGalleryButtonProps = {
  hint?: string;
};

export function OpenGalleryButton({ hint }: OpenGalleryButtonProps) {
  return <QuickLinkButton link={{ ...openGalleryLink, hint }} />;
}
