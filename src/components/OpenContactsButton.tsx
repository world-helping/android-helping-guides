import { QuickLinkButton } from "@/components/QuickLinkButton";
import type { AppQuickLink } from "@/lib/guides";

const openContactsLink: AppQuickLink = {
  label: "Открыть контакты",
  href: "intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_CONTACTS;end",
};

type OpenContactsButtonProps = {
  hint?: string;
};

export function OpenContactsButton({ hint }: OpenContactsButtonProps) {
  return <QuickLinkButton link={{ ...openContactsLink, hint }} />;
}
