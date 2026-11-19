import type { Lead } from "./lead";
import { LeadCard } from "./LeadCard";

type LeadsListProps = {
  leads: Lead[]; // the leads to show (on the Dashboard: the FILTERED leads)
  emptyMessage: string; // shown when `leads` is empty
  // IDs that have a working /leads/[id] page (the leads the server knows).
  detailLeadIds: number[];
  // Passed straight through to every card. The list owns no state.
  // Optional: the read-only /leads page leaves it out (no Remove buttons).
  onRemoveLead?: (leadId: number) => void;
};

// Displays MANY leads (one LeadCard each), or an empty state when there are none.
export function LeadsList({
  leads,
  emptyMessage,
  detailLeadIds,
  onRemoveLead,
}: LeadsListProps) {
  if (leads.length === 0) {
    return (
      <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="font-medium text-slate-900">No leads to show</p>
        <p className="mt-1 text-sm text-slate-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="mt-4 grid gap-3 md:grid-cols-2">
      {/* key: the lead's stable id, not the array index. */}
      {leads.map((lead) => (
        <li key={lead.id}>
          <LeadCard
            lead={lead}
            showDetailsLink={detailLeadIds.includes(lead.id)}
            onRemove={onRemoveLead}
          />
        </li>
      ))}
    </ul>
  );
}
