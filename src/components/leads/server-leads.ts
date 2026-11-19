// SERVER-SIDE lead lookups for the /leads routes.
//
// Data source: the same fictional sample leads that GET /api/leads returns
// (src/labs/day01/sample-leads.ts). There is no database yet.
//
// Server Components (like src/app/leads/[id]/page.tsx) call these functions
// DIRECTLY. They do not fetch("/api/leads") from the server: the data is
// already here, so an HTTP request to ourselves would only add a round trip.
//
// IMPORTANT: leads added or removed on the Dashboard are NOT in this list.
// Add and Remove only change the browser's local copy (React state).

import { sampleLeads } from "@/labs/day01/sample-leads";
import type { Lead } from "./lead";

// Every lead the server knows about.
export function getServerLeads(): Lead[] {
  return sampleLeads;
}

// One lead by the `id` from the URL, or undefined when it does not exist.
//
// The URL gives us a STRING ("3"), the data has a NUMBER (3).
export function getServerLeadById(id: string): Lead | undefined {
  const leadId = Number(id);
  return sampleLeads[leadId];
}
