import { Card, Skeleton } from "@heroui/react";

/**
 * Loading placeholder that mirrors the real two-column profile layout, so
 * there is no shift in shape once the data resolves.
 */
export function LoadingSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading profile"
      className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr] lg:items-start"
    >
      <Card className="items-center gap-6 py-8">
        <Skeleton className="size-24 rounded-full" />
        <div className="flex w-full flex-col items-center gap-3">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </Card>

      <div className="flex flex-col gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="gap-5">
            <Skeleton className="h-4 w-44 rounded-md" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
