import { formatDuration, getTotalMinutes, type Session } from "./session";

type PlannerSummaryProps = {
  sessions: readonly Session[];
  completedCount: number; // derived by the parent from the same sessions state
};

// Shows totals that are CALCULATED from the sessions it receives.
export function PlannerSummary({ sessions, completedCount }: PlannerSummaryProps) {
  const totalMinutes = getTotalMinutes(sessions);

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <dt className="text-sm text-slate-600">Sessions</dt>
        <dd className="mt-1 text-2xl font-semibold text-slate-900">
          {sessions.length}
        </dd>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <dt className="text-sm text-slate-600">Total planned</dt>
        <dd className="mt-1 text-2xl font-semibold text-slate-900">
          {totalMinutes} min
        </dd>
        {totalMinutes >= 60 && (
          <dd className="text-xs text-slate-600">
            {formatDuration(totalMinutes)}
          </dd>
        )}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <dt className="text-sm text-slate-600">Completed</dt>
        <dd className="mt-1 text-2xl font-semibold text-slate-900">
          {completedCount} of {sessions.length}
        </dd>
      </div>
    </dl>
  );
}
