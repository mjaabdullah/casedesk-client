"use client";

import type { CaseListItem } from "@/types/case";
import { Button } from "@heroui/react";
import { CaseCard } from "./CaseCard";
import { CaseCardSkeleton } from "./CaseCardSkeleton";

interface CaseGridProps {
  cases: CaseListItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const SKELETON_COUNT = 6;
const GRID_CLASSES = "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3";

export function CaseGrid({
  cases,
  isLoading,
  isError,
  onRetry,
}: CaseGridProps) {
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-foreground">
          মামলার তথ্য লোড করা যায়নি।
        </p>
        <p className="max-w-sm text-sm text-muted">
          অনুগ্রহ করে আবার চেষ্টা করুন। সমস্যা থেকে গেলে কিছুক্ষণ পর আবার চেষ্টা
          করুন।
        </p>
        <Button variant="primary" onPress={onRetry}>
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={GRID_CLASSES}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <CaseCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-foreground">
          কোনো মামলা পাওয়া যায়নি
        </p>
        <p className="max-w-sm text-sm text-muted">
          আপনার সার্চ বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
        </p>
      </div>
    );
  }

  return (
    <div className={GRID_CLASSES}>
      {cases.map((caseItem) => (
        <CaseCard key={caseItem._id} caseItem={caseItem} />
      ))}
    </div>
  );
}
