export interface DashboardMetrics {
  totalCases?: number;
  ongoingCases?: number;
  accessibleChamberCases?: number;
  upcomingHearings?: number;
  overdueHearings?: number;
  casesNeedingHearingDate?: number;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description?: string;
  occurredAt: string;
  href?: string;
}

export interface DashboardOverviewData {
  metrics?: DashboardMetrics;
  recentActivity?: DashboardActivity[];
}
