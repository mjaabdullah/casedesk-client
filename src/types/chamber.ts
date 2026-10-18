import type { CaseListItem } from "@/types/case";

export interface ChamberMember {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Chamber {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  email?: string | null;
  description?: string | null;
  members?: ChamberMember[];
}

export interface ChamberCasesResponse {
  cases: CaseListItem[];
  totalCount?: number;
}
