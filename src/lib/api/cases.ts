import type { CaseListParams, CaseListResponse } from "@/types/case";

export async function fetchCases(
  params: CaseListParams,
  signal?: AbortSignal,
): Promise<CaseListResponse> {
  const query = new URLSearchParams({
    search: params.search,
    caseType: params.caseType,
    status: params.status,
    sort: params.sort,
    page: String(params.page),
    pageSize: String(params.pageSize),
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cases?${query.toString()}`,
    {
      method: "GET",
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load cases (status ${response.status})`);
  }

  return (await response.json()) as CaseListResponse;
}
