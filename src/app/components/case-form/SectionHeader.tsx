import { Plus } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
};

export function SectionHeader({
  title,
  description,
  actionLabel,
  onAction,
  actionDisabled = false,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          disabled={actionDisabled}
          className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F8F9FB] px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[#D4A017] hover:text-[#D4A017] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
