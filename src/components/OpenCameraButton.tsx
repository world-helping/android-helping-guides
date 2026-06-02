import { QuickLinkButton } from "@/components/QuickLinkButton";
import type { AppQuickLink } from "@/lib/guides";

const openCameraLink: AppQuickLink = {
  label: "Открыть камеру",
  href: "intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_CAMERA;end",
};

type OpenCameraButtonProps = {
  hint?: string;
};

export function OpenCameraButton({ hint }: OpenCameraButtonProps) {
  return <QuickLinkButton link={{ ...openCameraLink, hint }} />;
}
