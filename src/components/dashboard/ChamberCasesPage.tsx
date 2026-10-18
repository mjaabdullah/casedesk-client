"use client";

import { Button } from "@heroui/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  formatHearingDate,
  getDefendantLabel,
} from "@/lib/case-labels";
import type { CaseListItem, CaseStatus, CaseType } from "@/types/case";

interface ChamberCasesPageProps {
  cases?: CaseListItem[];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const caseTypes: CaseType[] = [
  "দেওয়ানি",
  "ফৌজদারি",
  "পারিবারিক",
  "শ্রম",
  "প্রশাসনিক",
];
const caseStatuses: CaseStatus[] = ["চলমান", "নিষ্পত্তি", "স্থগিত", "বাতিল"];

const controlClassName =
  "min-h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground";

export function ChamberCasesPage({
  cases,
  isLoading = false,
  error,
  onRetry,
}: ChamberCasesPageProps) {
  const [search, setSearch] = useState("");
  const [caseType, setCaseType] = useState<CaseType | "all">("all");
  const [status, setStatus] = useState<CaseStatus | "all">("all");

  const filteredCases = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();

    return (cases ?? []).filter((caseItem) => {
      if (caseType !== "all" && caseItem.caseType !== caseType) return false;
      if (status !== "all" && caseItem.status !== status) return false;
      if (!normalizedSearch) return true;

      return [
        caseItem.currentCourt.caseNumber,
        caseItem.caseType,
        caseItem.currentCourt.court,
        caseItem.plaintiff,
        caseItem.defendant,
        caseItem.status,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedSearch));
    });
  }, [cases, caseType, search, status]);

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-muted">Chamber workspace</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          Chamber Cases
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Cases associated with your chamber, regardless of which lawyer
          personally owns them.
        </p>
      </section>

      <section className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-[minmax(240px,1fr)_minmax(160px,220px)_minmax(160px,220px)]">
        <div className="relative">
          <label htmlFor="chamber-case-search" className="sr-only">
            Search chamber cases
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="chamber-case-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search case, parties, court..."
            className={`${controlClassName} pl-9`}
          />
        </div>
        <div>
          <label htmlFor="chamber-case-type" className="sr-only">
            Filter by case type
          </label>
          <select
            id="chamber-case-type"
            value={caseType}
            onChange={(event) => {
              const selected = caseTypes.find(
                (type) => type === event.target.value,
              );
              setCaseType(selected ?? "all");
            }}
            className={controlClassName}
          >
            <option value="all">All case types</option>
            {caseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="chamber-case-status" className="sr-only">
            Filter by case status
          </label>
          <select
            id="chamber-case-status"
            value={status}
            onChange={(event) => {
              const selected = caseStatuses.find(
                (caseStatus) => caseStatus === event.target.value,
              );
              setStatus(selected ?? "all");
            }}
            className={controlClassName}
          >
            <option value="all">All statuses</option>
            {caseStatuses.map((caseStatus) => (
              <option key={caseStatus} value={caseStatus}>
                {caseStatus}
              </option>
            ))}
          </select>
        </div>
      </section>

      {isLoading ? (
        <div
          className="space-y-3"
          role="status"
          aria-label="Loading chamber cases"
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-lg border border-border bg-card"
            />
          ))}
        </div>
      ) : error ? (
        <section
          role="alert"
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-semibold text-foreground">
            Could not load chamber cases
          </h3>
          <p className="mt-2 text-sm text-muted">{error}</p>
          {onRetry ? (
            <Button className="mt-4" variant="secondary" onPress={onRetry}>
              Try again
            </Button>
          ) : null}
        </section>
      ) : cases === undefined ? (
        <section
          role="status"
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-semibold text-foreground">
            Chamber cases are not connected
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            This page is ready to display all cases returned for the current
            chamber. No case API is called and no sample cases are shown.
          </p>
        </section>
      ) : filteredCases.length === 0 ? (
        <section className="rounded-xl border border-border bg-card p-8 text-center">
          <h3 className="font-semibold text-foreground">
            {cases.length ? "No matching cases" : "No chamber cases"}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {cases.length
              ? "Try adjusting the search or filters."
              : "No cases were returned for this chamber."}
          </p>
        </section>
      ) : (
        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-foreground/5 text-xs font-semibold uppercase tracking-wide text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Case number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Court
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Plaintiff
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Defendant / Accused
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Next hearing
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem._id} className="align-top">
                    <td className="px-4 py-4 font-medium text-foreground">
                      {caseItem.currentCourt.caseNumber}
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      {caseItem.caseType}
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      {caseItem.currentCourt.court}
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      {caseItem.plaintiff}
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      <span className="sr-only">
                        {getDefendantLabel(caseItem.caseType)}:{" "}
                      </span>
                      {caseItem.defendant}
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      {caseItem.status}
                    </td>
                    <td className="px-4 py-4 text-foreground">
                      {formatHearingDate(caseItem.nextHearingDate) ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/cases/${encodeURIComponent(caseItem._id)}`}
                        className="whitespace-nowrap font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
