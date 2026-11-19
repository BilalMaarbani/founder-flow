import { LEAD_FILTER_OPTIONS, type LeadFilter } from "./lead";

type GlobalDashboardFilterProps = {
  filter: LeadFilter; // the current choice, owned by FounderFlowDashboard
  // Typed callback prop: the filter only REPORTS the new choice upward.
  onFilterChange: (filter: LeadFilter) => void;
  shownCount: number; // leads that match the filter
  totalCount: number; // all leads
};

// ONE page-wide filter. It replaces the old list-only LeadFilterBar, so the
// dashboard never has two filter controls that could disagree.
// Toggle buttons: aria-pressed tells screen readers which one is active.
export function GlobalDashboardFilter({
  filter,
  onFilterChange,
  shownCount,
  totalCount,
}: GlobalDashboardFilterProps) {
  return (
    <div className="rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            id="dashboard-filter-heading"
            className="text-sm font-semibold text-slate-900"
          >
            Dashboard filter
          </h2>
          <p className="text-xs text-slate-600">
            Applies to the summary, follow-ups and lead list.
          </p>
        </div>

        {/* aria-live: screen readers hear the new count after each change. */}
        <p aria-live="polite" className="text-sm font-medium text-slate-700">
          Showing {shownCount} of {totalCount} leads
        </p>
      </div>

      <div
        role="group"
        aria-labelledby="dashboard-filter-heading"
        className="mt-3 flex flex-wrap gap-2"
      >
        {LEAD_FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => onFilterChange(option.value)}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 aria-pressed:border-brand-600 aria-pressed:bg-brand-600 aria-pressed:text-white"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
