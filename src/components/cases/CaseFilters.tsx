"use client";

import { Label, ListBox, Select } from "@heroui/react";
import type { CaseListParams, CaseSortOption, CaseStatus, CaseType } from "@/types/case";

const CASE_TYPE_OPTIONS: { value: CaseType | "all"; label: string }[] = [
  { value: "all", label: "সকল" },
  { value: "দেওয়ানি", label: "দেওয়ানি" },
  { value: "ফৌজদারি", label: "ফৌজদারি" },
  { value: "পারিবারিক", label: "পারিবারিক" },
  { value: "শ্রম", label: "শ্রম" },
  { value: "প্রশাসনিক", label: "প্রশাসনিক" },
];

const STATUS_OPTIONS: { value: CaseStatus | "all"; label: string }[] = [
  { value: "all", label: "সকল" },
  { value: "চলমান", label: "চলমান" },
  { value: "নিষ্পত্তি", label: "নিষ্পত্তি" },
  { value: "স্থগিত", label: "স্থগিত" },
  { value: "বাতিল", label: "বাতিল" },
];

const SORT_OPTIONS: { value: CaseSortOption; label: string }[] = [
  { value: "updated_desc", label: "Recently Updated" },
  { value: "updated_asc", label: "Oldest Updated" },
  { value: "hearing_asc", label: "Upcoming Hearing" },
];

interface CaseFiltersProps {
  caseType: CaseListParams["caseType"];
  status: CaseListParams["status"];
  sort: CaseListParams["sort"];
  onCaseTypeChange: (value: CaseListParams["caseType"]) => void;
  onStatusChange: (value: CaseListParams["status"]) => void;
  onSortChange: (value: CaseListParams["sort"]) => void;
}

const TRIGGER_CLASSES = "w-full min-w-0 sm:w-auto sm:min-w-[160px] bg-background";

export function CaseFilters({
  caseType,
  status,
  sort,
  onCaseTypeChange,
  onStatusChange,
  onSortChange,
}: CaseFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <div className="flex w-full flex-col gap-1.5 sm:w-auto">
        <Label className="text-xs font-medium text-muted">মামলার ধরন</Label>
        <Select
          value={caseType}
          onChange={(value) => onCaseTypeChange(value as CaseListParams["caseType"])}
        >
          <Select.Trigger className={TRIGGER_CLASSES}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {CASE_TYPE_OPTIONS.map((option) => (
                <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                  {option.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="flex w-full flex-col gap-1.5 sm:w-auto">
        <Label className="text-xs font-medium text-muted">অবস্থা</Label>
        <Select
          value={status}
          onChange={(value) => onStatusChange(value as CaseListParams["status"])}
        >
          <Select.Trigger className={TRIGGER_CLASSES}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {STATUS_OPTIONS.map((option) => (
                <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                  {option.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="flex w-full flex-col gap-1.5 sm:w-auto">
        <Label className="text-xs font-medium text-muted">সাজান</Label>
        <Select value={sort} onChange={(value) => onSortChange(value as CaseSortOption)}>
          <Select.Trigger className={TRIGGER_CLASSES}>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {SORT_OPTIONS.map((option) => (
                <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                  {option.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
