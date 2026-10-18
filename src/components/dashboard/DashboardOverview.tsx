import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CircleAlert,
  FilePlus2,
  FolderKanban,
  FolderSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import type { CaseDeskUser } from "@/components/layout/navbar/types";
import type { UserType } from "@/components/profile/profile";
import type {
  DashboardActivity,
  DashboardMetrics,
  DashboardOverviewData,
} from "@/types/dashboard";

interface DashboardOverviewProps {
  user: CaseDeskUser;
  userType: UserType;
  data?: DashboardOverviewData;
}

type MetricDefinition = {
  label: string;
  icon: LucideIcon;
  key: keyof DashboardMetrics;
};

const lawyerMetrics: MetricDefinition[] = [
  { label: "Total cases", icon: BriefcaseBusiness, key: "totalCases" },
  { label: "Ongoing cases", icon: FolderKanban, key: "ongoingCases" },
  {
    label: "Upcoming hearings",
    icon: CalendarClock,
    key: "upcomingHearings",
  },
  {
    label: "Overdue hearings",
    icon: CircleAlert,
    key: "overdueHearings",
  },
];

const assistantMetrics: MetricDefinition[] = [
  {
    label: "Accessible chamber cases",
    icon: BriefcaseBusiness,
    key: "accessibleChamberCases",
  },
  {
    label: "Upcoming hearings",
    icon: CalendarClock,
    key: "upcomingHearings",
  },
  {
    label: "Cases needing a hearing date",
    icon: CircleAlert,
    key: "casesNeedingHearingDate",
  },
];

function MetricCards({
  userType,
  data,
}: {
  userType: "lawyer" | "assistant";
  data?: DashboardOverviewData["metrics"];
}) {
  const metrics = userType === "lawyer" ? lawyerMetrics : assistantMetrics;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, icon: Icon, key }) => (
        <article
          key={label}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted">{label}</p>
            <Icon className="size-4 text-muted" aria-hidden="true" />
          </div>
          <p className="mt-5 text-sm font-medium text-foreground">
            {data?.[key] ?? "Not connected"}
          </p>
          <p className="mt-1 text-xs text-muted">
            Available when dashboard case data is connected.
          </p>
        </article>
      ))}
    </div>
  );
}

function ActivityList({ activities }: { activities: DashboardActivity[] }) {
  return (
    <ul className="mt-4 divide-y divide-border">
      {activities.map((activity) => {
        const content = (
          <>
            <span className="block text-sm font-medium text-foreground">
              {activity.title}
            </span>
            {activity.description ? (
              <span className="mt-1 block text-sm text-muted">
                {activity.description}
              </span>
            ) : null}
            <time
              className="mt-2 block text-xs text-muted"
              dateTime={activity.occurredAt}
            >
              {new Date(activity.occurredAt).toLocaleDateString()}
            </time>
          </>
        );

        return (
          <li key={activity.id} className="py-4 first:pt-0 last:pb-0">
            {activity.href ? (
              <Link
                href={activity.href}
                className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                {content}
              </Link>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}

function QuickAction({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: typeof FolderKanban;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-foreground/20 hover:bg-foreground/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
    >
      <span className="flex items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">
            {label}
          </span>
          <span className="mt-1 block text-xs text-muted">{description}</span>
        </span>
      </span>
      <ArrowRight
        className="size-4 shrink-0 text-muted transition group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export function DashboardOverview({
  user,
  userType,
  data,
}: DashboardOverviewProps) {
  const firstName = user.name?.trim().split(/\s+/)[0] || "there";

  if (userType === "general") {
    return (
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <p className="text-sm font-medium text-muted">Your CaseDesk space</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Welcome, {firstName}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Explore the public case listings and return to your workspace
            whenever you need.
          </p>
          <Link
            href="/cases"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            <FolderSearch className="size-4" aria-hidden="true" />
            Explore Cases
          </Link>
        </section>
      </div>
    );
  }

  const actions =
    userType === "lawyer"
      ? [
          {
            href: "/cases/add",
            label: "Add Case",
            description: "Create a case record.",
            icon: FilePlus2,
          },
          {
            href: "/cases/manage",
            label: "Manage Cases",
            description: "Open your case management workspace.",
            icon: FolderKanban,
          },
          {
            href: "/dashboard/my-chamber",
            label: "My Chamber",
            description: "View chamber details and related cases.",
            icon: BriefcaseBusiness,
          },
        ]
      : [
          {
            href: "/dashboard/my-chamber",
            label: "View Chamber",
            description: "View your chamber and its available details.",
            icon: BriefcaseBusiness,
          },
          {
            href: "/dashboard/chamber-cases",
            label: "View Chamber Cases",
            description: "Browse cases associated with your chamber.",
            icon: FolderKanban,
          },
        ];

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-muted">Your CaseDesk workspace</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          Welcome, {firstName}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {userType === "lawyer"
            ? "A quick view of your case workload and upcoming work."
            : "A quick view of chamber cases and upcoming work."}
        </p>
      </section>

      <section aria-label="Case and hearing summary">
        <MetricCards userType={userType} data={data?.metrics} />
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-foreground">
            Quick actions
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => (
            <QuickAction key={action.href} {...action} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold text-foreground">
          Recent activity
        </h3>
        {data?.recentActivity ? (
          data.recentActivity.length ? (
            <ActivityList activities={data.recentActivity} />
          ) : (
            <p className="mt-2 text-sm text-muted">
              No recent activity was returned.
            </p>
          )
        ) : (
          <p className="mt-2 text-sm text-muted">
            Activity will be shown here when the relevant case or chamber data
            source is connected.
          </p>
        )}
      </section>
    </div>
  );
}
