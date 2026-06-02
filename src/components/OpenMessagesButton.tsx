import { QuickLinkButton } from "@/components/QuickLinkButton";
import type { AppQuickLink } from "@/lib/guides";

const openSmsLink: AppQuickLink = {
  label: "Открыть сообщения (SMS)",
  href: "intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_MESSAGING;end",
};

const newSmsLink: AppQuickLink = {
  label: "Новое SMS",
  href: "sms:",
};

type SmsButtonProps = {
  hint?: string;
};

export function OpenSmsButton({ hint }: SmsButtonProps) {
  return <QuickLinkButton link={{ ...openSmsLink, hint }} />;
}

export function NewSmsButton({ hint }: SmsButtonProps) {
  return <QuickLinkButton link={{ ...newSmsLink, hint }} />;
}
