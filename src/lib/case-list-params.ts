import type {
  CaseListParams,
  CaseSortOption,
  CaseStatus,
  CaseType,
} from "@/types/case";

const ALLOWED_CASE_TYPES: CaseType[] = [
  "দেওয়ানি",
  "ফৌজদারি",
  "পারিবারিক",
  "শ্রম",
  "প্রশাসনিক",
];

const ALLOWED_STATUSES: CaseStatus[] = [
  "চলমান",
  "নিষ্পত্তি",
  "স্থগিত",
  "বাতিল",
];

const ALLOWED_SORTS: CaseSortOption[] = [
  "updated_desc",
  "updated_asc",
  "hearing_asc",
];

export const DEFAULT_CASE_LIST_PARAMS: CaseListParams = {
  search: "",
  caseType: "all",
  status: "all",
  sort: "updated_desc",
  page: 1,
  pageSize: 12,
};

interface SearchParamsLike {
  get(name: string): string | null;
}

function parsePositiveInt(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : fallback;
}

export function parseCaseListParams(
  searchParams: SearchParamsLike,
): CaseListParams {
  const search =
    searchParams.get("search")?.trim() || DEFAULT_CASE_LIST_PARAMS.search;

  const caseTypeRaw = searchParams.get("caseType");
  const caseType =
    caseTypeRaw && (ALLOWED_CASE_TYPES as string[]).includes(caseTypeRaw)
      ? (caseTypeRaw as CaseType)
      : DEFAULT_CASE_LIST_PARAMS.caseType;

  const statusRaw = searchParams.get("status");
  const status =
    statusRaw && (ALLOWED_STATUSES as string[]).includes(statusRaw)
      ? (statusRaw as CaseStatus)
      : DEFAULT_CASE_LIST_PARAMS.status;

  const sortRaw = searchParams.get("sort");
  const sort =
    sortRaw && (ALLOWED_SORTS as string[]).includes(sortRaw)
      ? (sortRaw as CaseSortOption)
      : DEFAULT_CASE_LIST_PARAMS.sort;

  return {
    search,
    caseType,
    status,
    sort,
    page: parsePositiveInt(
      searchParams.get("page"),
      DEFAULT_CASE_LIST_PARAMS.page,
    ),
    pageSize: DEFAULT_CASE_LIST_PARAMS.pageSize,
  };
}

export function serializeCaseListParams(params: CaseListParams): string {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set("search", params.search);
  if (params.caseType !== "all") searchParams.set("caseType", params.caseType);
  if (params.status !== "all") searchParams.set("status", params.status);
  if (params.sort !== DEFAULT_CASE_LIST_PARAMS.sort)
    searchParams.set("sort", params.sort);
  if (params.page !== 1) searchParams.set("page", String(params.page));

  return searchParams.toString();
}
