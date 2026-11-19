import { assignedLabel, formatBudgetUsd } from "@/labs/day01/lead-rules";
import { isFollowUpDue, type Lead } from "./lead";

type FollowUpPrioritiesProps = {
  leads: Lead[]; // the FILTERED leads chosen by the global dashboard filter
  emptyMessage: string; // shown when no lead in `leads` needs follow-up
};

// Priority list: leads that need follow-up, longest silence first.
// Derived from `leads` on every render.
export function FollowUpPriorities({
  leads,
  emptyMessage,
}: FollowUpPrioritiesProps) {
  // filter() returns a new array, so sort() never mutates the parent's list.
  const priorityLeads = leads
    .filter(isFollowUpDue)
    .sort((a, b) => b.daysSinceLastContact - a.daysSinceLastContact);

  if (priorityLeads.length === 0) {
    return (
      <p className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ol className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
      {priorityLeads.map((lead) => (
        <li
          key={lead.id}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3"
        >
          <div>
            <p className="font-medium text-slate-900">{lead.companyName}</p>
            <p className="text-sm text-slate-600">
              {assignedLabel(lead.assignedUserId)}
            </p>
          </div>
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-amber-800">
              {lead.daysSinceLastContact} days
            </span>{" "}
            silent &middot; {formatBudgetUsd(lead.budgetUsd)}
          </p>
        </li>
      ))}
    </ol>
  );
}
