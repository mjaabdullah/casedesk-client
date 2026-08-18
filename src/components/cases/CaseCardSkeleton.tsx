import { Card, Skeleton } from "@heroui/react";

/** Mirrors CaseCard's structure and spacing so the grid doesn't shift on load. */
export function CaseCardSkeleton() {
  return (
    <Card className="relative flex h-full flex-col justify-between overflow-hidden border-border bg-card">
      {/* Status is unknown while loading — neutral placeholder bar instead of a color guess */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-border"
      />

      <Card.Content className="flex flex-col gap-3 p-5 pl-6">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        <Skeleton className="h-6 w-4/5 rounded-md" />
        <Skeleton className="h-3 w-3/5 rounded-md" />

        <div className="border-t border-border" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-10 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-10 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>

          <div className="col-span-2 space-y-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>

          <div className="col-span-2 space-y-2">
            <Skeleton className="h-3 w-16 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
        </div>
      </Card.Content>

      <Card.Footer className="flex items-center justify-between gap-3 border-t border-border p-5 pl-6 pt-4">
        <Skeleton className="h-3 w-28 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </Card.Footer>
    </Card>
  );
}
