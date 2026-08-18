"use client";

import { fetchCases } from "@/lib/api/cases";
import type { CaseListParams } from "@/types/case";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCases(params: CaseListParams) {
  return useQuery({
    queryKey: ["cases", params],
    queryFn: ({ signal }) => fetchCases(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });
}
