type OpenContactsButtonProps = {
  hint?: string;
};

export function OpenContactsButton({ hint }: OpenContactsButtonProps) {
  return (
    <div className="rounded-xl border-2 border-border bg-card p-4">
      <div className="rounded-xl bg-background px-4 py-4 text-center text-lg font-bold text-foreground">
        Откройте «Контакты» вручную
      </div>
      <p className="mt-3 text-base text-muted">
        Браузер не может надёжно открыть приложение «Контакты». Найдите его на
        главном экране или в списке приложений.
      </p>
      {hint ? <p className="mt-2 text-base text-muted">{hint}</p> : null}
    </div>
  );
}
