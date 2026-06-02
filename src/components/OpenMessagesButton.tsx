import { QuickLinkButton } from "@/components/QuickLinkButton";
import type { AppQuickLink } from "@/lib/guides";

const openSmsLink: AppQuickLink = {
  label: "Открыть сообщения (SMS)",
  href: "sms:",
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
