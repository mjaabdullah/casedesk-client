import { Scale } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[#D4A017] shadow-sm">
          <Scale className="h-6 w-6" />
        </div>
        <div
          className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-slate-200 border-t-[#D4A017] animate-spin"
          aria-label="Loading"
        />
        <p className="mt-5 text-lg font-semibold text-slate-900">
          Loading CaseDesk...
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Preparing your legal workspace.
        </p>
      </div>
    </div>
  );
}
