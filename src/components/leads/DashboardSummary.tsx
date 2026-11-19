import { SummaryCard } from "@/components/SummaryCard";
import {
  countFollowUps,
  FOLLOW_UP_AFTER_DAYS,
  formatBudgetUsd,
  sumOpenBudgetUsd,
} from "@/labs/day01/lead-rules";
import { isOpenLead, type Lead } from "./lead";

type DashboardSummaryProps = {
  leads: Lead[]; // the FILTERED leads chosen by the global dashboard filter
  // Name of the active filter, or null when "All Leads" is selected.
  // Used to label every card so a filtered number is never mistaken
  // for the full total.
  filterLabel: string | null;
};

// Shows the four summary cards. Every number is CALCULATED from `leads`
// on each render, so the cards always match the list.
export function DashboardSummary({ leads, filterLabel }: DashboardSummaryProps) {
  const openLeads = leads.filter(isOpenLead);
  const closedCount = leads.length - openLeads.length;
  const followUpCount = countFollowUps(leads);
  const openBudgetUsd = sumOpenBudgetUsd(leads);
  const unassignedOpenCount = openLeads.filter(
    (lead) => lead.assignedUserId === null,
  ).length;

  // "Total leads" -> "Total leads (Closed)" while a filter is active.
  function scoped(label: string): string {
    return filterLabel === null ? label : `${label} (${filterLabel})`;
  }

  return (
    <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        label={filterLabel === null ? "Total leads" : scoped("Leads")}
        value={String(leads.length)}
        note={`${openLeads.length} open · ${closedCount} closed`}
      />
      <SummaryCard
        label={scoped("Need follow-up")}
        value={String(followUpCount)}
        note={`${FOLLOW_UP_AFTER_DAYS}+ days since last contact`}
        highlight
      />
      <SummaryCard
        label={scoped("Open pipeline")}
        value={formatBudgetUsd(openBudgetUsd)}
        note="Budget of open leads"
      />
      <SummaryCard
        label={scoped("Unassigned")}
        value={String(unassignedOpenCount)}
        note="Open leads with no owner"
      />
    </dl>
  );
}
