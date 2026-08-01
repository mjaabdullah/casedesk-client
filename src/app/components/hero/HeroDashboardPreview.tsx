import { calendarItems, heroStats, recentCases } from "@/app/content/casedesk";
import { BriefcaseBusiness, CalendarDays } from "lucide-react";

export function HeroDashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-22px_rgba(15,23,42,0.28)] sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,160,23,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(35,39,47,0.12),transparent_40%)]" />
      <div className="relative grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
        <aside className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BriefcaseBusiness className="h-4 w-4 text-[#D4A017]" />
            Workspace
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            {[
              ["Cases", "bg-[#D4A017]/15 text-[#8a6110]"],
              ["Calendar", "bg-white text-slate-600"],
              ["Documents", "bg-white text-slate-600"],
              ["Clients", "bg-white text-slate-600"],
            ].map(([label, cls]) => (
              <div key={label} className={`rounded-xl px-3 py-2 ${cls}`}>
                {label}
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map(([label, value]) => (
              <div
                key={label}
                className="rounded-[20px] border border-slate-200 bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[20px] border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Recent cases
                </h3>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  On track
                </span>
              </div>
              <div className="space-y-3">
                {recentCases.map(([name, status]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {name}
                      </p>
                      <p className="text-xs text-slate-500">{status}</p>
                    </div>
                    <span className="rounded-full bg-[#D4A017]/10 px-2.5 py-1 text-xs font-semibold text-[#8a6110]">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Hearing calendar
                </h3>
                <CalendarDays className="h-4 w-4 text-[#D4A017]" />
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                {calendarItems.map(([time, title]) => (
                  <div
                    key={title}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3"
                  >
                    <span className="text-sm font-medium text-slate-800">
                      {title}
                    </span>
                    <span className="text-xs text-slate-500">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
