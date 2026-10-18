type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-muted">{description}</p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
