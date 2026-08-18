"use client";

import { CaseFilters } from "@/components/cases/CaseFilters";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { CasePagination } from "@/components/cases/CasePagination";
import { CaseSearch } from "@/components/cases/CaseSearch";
import { useCases } from "@/hooks/useCases";
import {
  parseCaseListParams,
  serializeCaseListParams,
} from "@/lib/case-list-params";
import type { CaseListParams } from "@/types/case";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const SEARCH_DEBOUNCE_MS = 300;

function CasesPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => parseCaseListParams(searchParams),
    [searchParams],
  );

  const { data, isLoading, isError, isFetching, refetch } = useCases(params);

  const cases = data?.cases ?? [];
  const totalPages = data?.totalPages ?? 0;

  function updateParams(patch: Partial<CaseListParams>) {
    const next: CaseListParams = {
      ...params,
      ...patch,
      page: patch.page ?? 1,
    };

    const query = serializeCaseListParams(next);
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  const [searchInput, setSearchInput] = useState(params.search);

  const [lastSyncedSearch, setLastSyncedSearch] = useState(params.search);
  if (params.search !== lastSyncedSearch) {
    setLastSyncedSearch(params.search);
    setSearchInput(params.search);
  }

  useEffect(() => {
    if (searchInput === params.search) return;
    const timeout = setTimeout(() => {
      updateParams({ search: searchInput });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const showGridAsStale = isFetching && !isLoading;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Explore Cases
          </h1>
          <p className="mt-1 text-sm text-muted">
            Browse and explore available legal cases.
          </p>
        </header>

        {/* Search + Filters + Sort */}
        <section className="mb-6 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <CaseSearch value={searchInput} onChange={setSearchInput} />
          <CaseFilters
            caseType={params.caseType}
            status={params.status}
            sort={params.sort}
            onCaseTypeChange={(caseType) => updateParams({ caseType })}
            onStatusChange={(status) => updateParams({ status })}
            onSortChange={(sort) => updateParams({ sort })}
          />
        </section>

        {/* Responsive case card grid */}
        <section
          className={`mb-8 transition-opacity ${showGridAsStale ? "opacity-60" : ""}`}
        >
          <CaseGrid
            cases={cases}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => refetch()}
          />
        </section>

        {/* Pagination */}
        {!isLoading && !isError && cases.length > 0 ? (
          <CasePagination
            page={params.page}
            totalPages={totalPages}
            onPageChange={(page) => updateParams({ page })}
          />
        ) : null}
      </div>
    </div>
  );
}

export default function CasesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <CaseGrid cases={[]} isLoading isError={false} onRetry={() => {}} />
          </div>
        </div>
      }
    >
      <CasesPageContent />
    </Suspense>
  );
}
