"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";

type OpenGalleryButtonProps = {
  label?: string;
  hint?: string;
};

type SelectedImagePreview = {
  url: string;
  name: string;
};

export function OpenGalleryButton({
  label = "Открыть галерею",
  hint,
}: OpenGalleryButtonProps) {
  const inputId = useId();
  const [preview, setPreview] = useState<SelectedImagePreview | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview.url);
    };
  }, [preview]);

  return (
    <div className="rounded-xl border-2 border-border bg-card p-4">
      <label
        htmlFor={inputId}
        className="flex min-h-13 w-full cursor-pointer items-center justify-center rounded-xl bg-accent px-4 py-4 text-center text-lg font-bold text-white no-underline transition hover:bg-accent-hover focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-accent"
      >
        {label}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onClick={(event) => {
            event.currentTarget.value = "";
          }}
          onChange={(event) => {
            const file = event.currentTarget.files?.[0] ?? null;
            setPreview(
              file
                ? {
                    url: URL.createObjectURL(file),
                    name: file.name || "Выбранное фото",
                  }
                : null,
            );
          }}
        />
      </label>
      {preview ? (
        <div className="mt-4 overflow-hidden rounded-xl border-2 border-border bg-background">
          <Image
            src={preview.url}
            alt={preview.name}
            width={640}
            height={480}
            unoptimized
            className="max-h-80 w-full object-contain"
          />
          <p className="border-t border-border px-3 py-2 text-base text-muted">
            Выбрано: {preview.name}
          </p>
        </div>
      ) : null}
      {hint ? <p className="mt-3 text-base text-muted">{hint}</p> : null}
    </div>
  );
}
