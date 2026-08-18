"use client";

import { Pagination } from "@heroui/react";

interface CasePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageEntry = number | "ellipsis";

/** Windows the page list around the current page so it stays compact on mobile. */
function getPageNumbers(current: number, total: number): PageEntry[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const keep = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = Array.from(keep)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: PageEntry[] = [];
  let previous = 0;
  for (const p of sorted) {
    if (previous && p - previous > 1) {
      result.push("ellipsis");
    }
    result.push(p);
    previous = p;
  }
  return result;
}

export function CasePagination({ page, totalPages, onPageChange }: CasePaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <Pagination className="flex-wrap justify-center gap-y-2">
      <Pagination.Content className="flex-wrap justify-center">
        <Pagination.Item>
          <Pagination.Previous isDisabled={page <= 1} onPress={() => onPageChange(page - 1)}>
            <Pagination.PreviousIcon />
            <span className="hidden sm:inline">Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {pageNumbers.map((entry, index) =>
          entry === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${index}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={entry}>
              <Pagination.Link isActive={entry === page} onPress={() => onPageChange(entry)}>
                {entry}
              </Pagination.Link>
            </Pagination.Item>
          )
        )}

        <Pagination.Item>
          <Pagination.Next isDisabled={page >= totalPages} onPress={() => onPageChange(page + 1)}>
            <span className="hidden sm:inline">Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
