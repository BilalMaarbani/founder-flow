import { needsFollowUp } from "@/labs/day01/lead-rules";

// The data contract for one lead.
// Same shape as the inline type in src/labs/day01/sample-leads.ts.
// TypeScript checks they match inside src/app/api/leads/route.ts, where
// sampleLeads is put into a LeadsResponse.
export type Lead = {
  id: number;
  companyName: string;
  budgetUsd: number;
  daysSinceLastContact: number;
  isClosed: boolean;
  assignedUserId: number | null;
};

// The JSON body that GET /api/leads sends back: { "leads": [ ... ] }.
// Shared by the server (route.ts) and the browser (FounderFlowDashboard).
export type LeadsResponse = {
  leads: Lead[];
};

// RUNTIME check for ONE value that arrived over the network.
// TypeScript types disappear when the code runs, so TypeScript cannot
// check JSON from a server. This function checks every field by hand.
export function isLead(value: unknown): value is Lead {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const lead = value as Record<string, unknown>;
  return (
    typeof lead.id === "number" &&
    typeof lead.companyName === "string" &&
    typeof lead.budgetUsd === "number" &&
    typeof lead.daysSinceLastContact === "number" &&
    typeof lead.isClosed === "boolean" &&
    (lead.assignedUserId === null || typeof lead.assignedUserId === "number")
  );
}

// Reads the leads out of a GET /api/leads JSON body.
// Returns null when the body does not have the expected shape,
// so the caller can show the Error state instead of broken data.
export function readLeadsResponse(data: unknown): Lead[] | null {
  if (typeof data !== "object" || data === null) {
    return null;
  }
  const leads = (data as Record<string, unknown>).leads;
  if (!Array.isArray(leads) || !leads.every(isLead)) {
    return null;
  }
  return leads;
}

// What the Add Lead form sends upward. No `id` and no `isClosed`:
// the state owner (FounderFlowDashboard) fills those in.
export type NewLead = {
  companyName: string;
  budgetUsd: number;
  daysSinceLastContact: number;
  assignedUserId: number | null;
};

// "Open" means "not closed". One named helper, used everywhere,
// so the summary cards and the filter can never disagree.
export function isOpenLead(lead: Lead): boolean {
  return !lead.isClosed;
}

// The follow-up rule itself lives in lead-rules.ts. We only call it.
export function isFollowUpDue(lead: Lead): boolean {
  return needsFollowUp(lead.isClosed, lead.daysSinceLastContact);
}

// Literal-union type: the GLOBAL dashboard filter can ONLY be one of these
// four strings. It controls every lead-dependent widget on the dashboard.
export type LeadFilter = "all" | "open" | "closed" | "follow-up-due";

export const LEAD_FILTER_OPTIONS: { value: LeadFilter; label: string }[] = [
  { value: "all", label: "All Leads" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
  { value: "follow-up-due", label: "Follow-up Due" },
];

export function getFilterLabel(filter: LeadFilter): string {
  return (
    LEAD_FILTER_OPTIONS.find((option) => option.value === filter)?.label ?? ""
  );
}

export function matchesFilter(lead: Lead, filter: LeadFilter): boolean {
  if (filter === "open") {
    return isOpenLead(lead);
  }
  if (filter === "closed") {
    return !isOpenLead(lead); // the exact opposite of "open", never a new rule
  }
  if (filter === "follow-up-due") {
    return isFollowUpDue(lead);
  }
  return true; // "all"
}

// Derived value: the leads every dashboard widget shows =
// source list + filter choice. Never stored in its own useState.
export function getFilteredLeads(leads: Lead[], filter: LeadFilter): Lead[] {
  return leads.filter((lead) => matchesFilter(lead, filter));
}
