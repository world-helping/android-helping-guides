"use client";

import { useId, useState } from "react";

type OpenGalleryButtonProps = {
  hint?: string;
  shareAfterPick?: boolean;
};

export function OpenGalleryButton({
  hint,
  shareAfterPick = false,
}: OpenGalleryButtonProps) {
  const inputId = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function shareSelectedFile() {
    if (!selectedFile) return;

    const shareData: ShareData = {
      files: [selectedFile],
      title: "Фотография",
    };

    if (!navigator.share || !navigator.canShare?.(shareData)) {
      setStatus(
        "Этот браузер не может поделиться выбранным фото. Откройте фото в «Галерее» или «Фото» и нажмите «Поделиться».",
      );
      return;
    }

    try {
      await navigator.share(shareData);
      setStatus("Открылось меню «Поделиться».");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("Отправка отменена.");
        return;
      }

      setStatus("Не удалось открыть меню «Поделиться». Попробуйте выбрать фото ещё раз.");
    }
  }

  return (
    <div className="rounded-xl border-2 border-border bg-card p-4">
      <label
        htmlFor={inputId}
        className="flex min-h-13 w-full cursor-pointer items-center justify-center rounded-xl bg-accent px-4 py-4 text-center text-lg font-bold text-white no-underline transition hover:bg-accent-hover focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-accent"
      >
        Открыть галерею
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0] ?? null;
            setSelectedFile(file);
            setStatus(
              file && shareAfterPick
                ? "Фото выбрано. Теперь нажмите «Поделиться выбранным фото»."
                : null,
            );
          }}
        />
      </label>
      {shareAfterPick && selectedFile ? (
        <button
          type="button"
          className="mt-3 flex min-h-13 w-full items-center justify-center rounded-xl border-2 border-accent bg-card px-4 py-4 text-center text-lg font-bold text-accent transition hover:bg-accent/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={shareSelectedFile}
        >
          Поделиться выбранным фото
        </button>
      ) : null}
      {hint ? <p className="mt-3 text-base text-muted">{hint}</p> : null}
      {status ? (
        <p className="mt-3 text-base text-muted" aria-live="polite">
          {status}
        </p>
      ) : null}
    </div>
  );
}
