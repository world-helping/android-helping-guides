import { QuickLinkButton } from "@/components/QuickLinkButton";
import type { AppQuickLink } from "@/lib/guides";

const openContactsLink: AppQuickLink = {
  label: "Открыть контакты",
  href: "intent://com.android.contacts/contacts#Intent;scheme=content;action=android.intent.action.VIEW;type=vnd.android.cursor.dir/contact;end",
};

type OpenContactsButtonProps = {
  hint?: string;
};

export function OpenContactsButton({ hint }: OpenContactsButtonProps) {
  return <QuickLinkButton link={{ ...openContactsLink, hint }} />;
}
