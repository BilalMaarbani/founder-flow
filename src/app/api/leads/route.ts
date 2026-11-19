// GET /api/leads
//
// A READ-ONLY Route Handler. It runs on the SERVER, never in the browser.
// The dashboard calls it with fetch("/api/leads") and gets JSON back.
//
// Data source: the same fictional sample leads used by the Day 1 lab.
// There is no database yet, so this route only READS that fixed list.
// Nothing the user adds or removes in the browser is sent back here.

import type { LeadsResponse } from "@/components/leads/lead";
import { sampleLeads } from "@/labs/day01/sample-leads";

export async function GET() {
  // The type annotation makes TypeScript check that sampleLeads matches
  // the Lead shape the dashboard expects. One contract, both sides.
  const body: LeadsResponse = { leads: sampleLeads };
  console.log("GET /api/leads", body); // for debugging in the terminal
  // Response.json() turns the object into JSON text, sets the
  // "Content-Type: application/json" header and uses status 200 (OK).
  return Response.json(body);
}
