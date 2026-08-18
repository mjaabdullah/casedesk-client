/**
 * Types for the CaseDesk `/cases` listing page.
 *
 * IMPORTANT: The `/cases` page only ever receives the REDUCED Case shape
 * described below. Do not assume any other field from the full Case
 * document is available here.
 */

export type CaseType =
  | "দেওয়ানি"
  | "ফৌজদারি"
  | "পারিবারিক"
  | "শ্রম"
  | "প্রশাসনিক";

export type CaseStatus = "চলমান" | "নিষ্পত্তি" | "স্থগিত" | "বাতিল";

export interface CaseSection {
  actName: string;
  sectionNumbers: string[];
}

export interface CaseCourtInfo {
  court: string;
  caseNumber: string;
  judge?: string;
  transferDate?: string;
  isCurrent: boolean;
}

/** The reduced Case object returned by the `/cases` listing endpoint. */
export interface CaseListItem {
  _id: string;
  caseType: CaseType;
  status: CaseStatus;
  nextHearingDate: string | null;
  nextHearingPurpose: string | null;
  sections: CaseSection[];
  updatedAt: string;
  plaintiff: string;
  defendant: string;
  currentCourt: CaseCourtInfo;
}

export interface CaseListResponse {
  cases: CaseListItem[];
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalCount?: number;
}

export type CaseSortOption = "updated_desc" | "updated_asc" | "hearing_asc";

/** Query state that drives the `/cases` listing request. */
export interface CaseListParams {
  search: string;
  caseType: CaseType | "all";
  status: CaseStatus | "all";
  sort: CaseSortOption;
  page: number;
  pageSize: number;
}
