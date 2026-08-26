"use client";

import {
  compareHearingDates,
  formatHearingDate,
  formatUpdatedDate,
  getDefendantLabel,
  summarizeSections,
} from "@/lib/case-labels";
import type { CaseListItem, CaseStatus } from "@/types/case";
import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import Link from "next/link";

/** Semantic chip colors per status — never raw color classes. */
const STATUS_CHIP_COLOR: Record<
  CaseStatus,
  "accent" | "success" | "warning" | "danger"
> = {
  চলমান: "accent",
  নিষ্পত্তি: "success",
  স্থগিত: "warning",
  বাতিল: "danger",
};

/** Left accent bar color per status — same semantic palette as the chip. */
const STATUS_ACCENT_BAR: Record<CaseStatus, string> = {
  চলমান: "bg-accent",
  নিষ্পত্তি: "bg-success",
  স্থগিত: "bg-warning",
  বাতিল: "bg-danger",
};

interface CaseCardProps {
  caseItem: CaseListItem;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  const {
    _id,
    caseType,
    status,
    nextHearingDate,
    nextHearingPurpose,
    sections,
    updatedAt,
    plaintiff,
    defendant,
    currentCourt,
  } = caseItem;

  const hearingDate = formatHearingDate(nextHearingDate);
  const updatedLabel = formatUpdatedDate(updatedAt);
  const defendantLabel = getDefendantLabel(caseType);
  const {
    actName,
    summary: sectionsSummary,
    extraActsCount,
  } = summarizeSections(sections);

  return (
    <Card className="relative flex h-full flex-col justify-between overflow-hidden border-border bg-card">
      {/* Status accent bar — quick at-a-glance status scanning down the grid */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 ${STATUS_ACCENT_BAR[status]}`}
      />

      <Card.Content className="flex flex-col gap-3 p-5 pl-6">
        {/* 1 & 2. Case Type + Status */}
        <div className="flex items-center justify-between gap-2">
          <Chip variant="soft" color="default" className="shrink-0">
            {caseType}
          </Chip>
          <Chip
            variant="soft"
            color={STATUS_CHIP_COLOR[status]}
            className="shrink-0"
          >
            {status}
          </Chip>
        </div>

        {/* 3. Case Number — the card's primary identifier */}
        <p className="wrap-break-word text-lg font-semibold leading-snug tracking-tight text-foreground">
          {currentCourt.caseNumber}
        </p>

        {/* 4. Court + judge — single quiet line, no longer a separate labeled block */}
        <p className="text-sm leading-relaxed text-muted">
          {currentCourt.court}
        </p>

        <div className="border-t border-border" />

        {/* 5, 6, 7, 8, 9 — compact 2-column grid instead of stacked, divider-heavy blocks */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              বাদী
            </p>
            <p className="line-clamp-2 break-words text-sm font-medium text-foreground">
              {plaintiff}
            </p>
          </div>

          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {defendantLabel}
            </p>
            <p className="line-clamp-2 wrap-break-word text-sm font-medium text-foreground">
              {defendant}
            </p>
          </div>

          <div className={`col-span-2 space-y-0.5 `}>
            <p
              className={`text-[11px] font-semibold uppercase tracking-wider ${
                compareHearingDates(nextHearingDate) > 0
                  ? "text-red-400"
                  : "text-muted"
              } `}
            >
              {compareHearingDates(nextHearingDate) > 0
                ? "পূর্বের তারিখ"
                : "পরবর্তী তারিখ"}
            </p>
            {hearingDate ? (
              <>
                <p className="text-sm font-medium text-foreground">
                  {hearingDate}
                </p>
                {nextHearingPurpose ? (
                  <p className="text-xs text-muted">{nextHearingPurpose}</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-muted">তারিখ নির্ধারিত হয়নি</p>
            )}
          </div>

          {actName ? (
            <div className="col-span-2 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                আইন ও ধারা
              </p>
              <p className="text-sm font-medium text-foreground">{actName}</p>
              <span className="inline-block rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                {sectionsSummary}
                {extraActsCount > 0
                  ? ` · +${extraActsCount} more act${extraActsCount > 1 ? "s" : ""}`
                  : ""}
              </span>
            </div>
          ) : null}
        </div>
      </Card.Content>

      <Card.Footer className="flex items-center justify-between gap-3 border-t border-border p-5 pl-6 pt-4">
        {/* 10. Updated date */}
        <p className="text-xs text-muted">
          {updatedLabel ? `সর্বশেষ আপডেট: ${updatedLabel}` : ""}
        </p>

        {/* 11. View Details — styled as a HeroUI button, rendered as a real Next.js link */}
        <Link
          href={`/cases/${_id}`}
          className={buttonVariants({ variant: "primary", size: "sm" })}
        >
          View Details
        </Link>
      </Card.Footer>
    </Card>
  );
}
