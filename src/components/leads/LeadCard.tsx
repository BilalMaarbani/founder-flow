import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { assignedLabel, formatBudgetUsd } from "@/labs/day01/lead-rules";
import { isFollowUpDue, type Lead } from "./lead";

type LeadCardProps = {
  lead: Lead;
  // true only when the server knows this lead, so /leads/[id] can show it.
  // Leads added in the browser are local only: they get no details link.
  showDetailsLink: boolean;
  // Typed action callback. The card does not change any data itself.
  // It only tells the parent: "the user wants to remove THIS lead".
  // Optional: the read-only /leads page has no Remove button.
  onRemove?: (leadId: number) => void;
};

// Displays ONE lead. It does not know about the list around it.
// No "use client": it runs on the server on /leads, and in the browser
// when the client FounderFlowDashboard renders it.
export function LeadCard({ lead, showDetailsLink, onRemove }: LeadCardProps) {
  return (
    <article className="h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-slate-900">{lead.companyName}</h3>
        <StatusBadge
          isClosed={lead.isClosed}
          followUpDue={isFollowUpDue(lead)}
        />
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <div>
          <dt className="text-xs text-slate-600">Budget</dt>
          <dd className="text-slate-900">{formatBudgetUsd(lead.budgetUsd)}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">Last contact</dt>
          <dd className="text-slate-900">
            {lead.daysSinceLastContact} days ago
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">Owner</dt>
          <dd className="text-slate-900">
            {assignedLabel(lead.assignedUserId)}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {showDetailsLink ? (
          <Link
            href={`/leads/${lead.id}`}
            aria-label={`View details for ${lead.companyName}`}
            className="rounded-lg border border-brand-600 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            View details
          </Link>
        ) : (
          <span className="text-xs text-slate-600">
            Local only &middot; not saved, so no details page
          </span>
        )}

        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(lead.id)}
            aria-label={`Remove ${lead.companyName}`}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-800"
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
}
