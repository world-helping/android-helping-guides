type OpenGalleryButtonProps = {
  hint?: string;
};

export function OpenGalleryButton({ hint }: OpenGalleryButtonProps) {
  return (
    <div className="rounded-xl border-2 border-border bg-card p-4">
      <label
        htmlFor="open-gallery-input"
        className="flex min-h-13 w-full cursor-pointer items-center justify-center rounded-xl bg-accent px-4 py-4 text-center text-lg font-bold text-white no-underline transition hover:bg-accent-hover focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-accent"
      >
        Открыть галерею
        <input
          id="open-gallery-input"
          type="file"
          accept="image/*"
          className="sr-only"
        />
      </label>
      {hint ? <p className="mt-3 text-base text-muted">{hint}</p> : null}
    </div>
  );
}
