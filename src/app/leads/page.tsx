import { getServerLeads } from "@/components/leads/server-leads";
import { LeadsList } from "@/components/leads/LeadsList";

// /leads - the Leads COLLECTION route.
// Server Component: it reads the shared server data directly (no fetch,
// no useState). It is read-only: Add and Remove live on the Dashboard.
export default function LeadsPage() {
  const leads = getServerLeads();

  return (
    <section aria-labelledby="leads-page-heading">
      <h1
        id="leads-page-heading"
        className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
      >
        All leads
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        {leads.length} leads from the server&apos;s sample data. Open a lead to
        see its details. Leads you add or remove on the Dashboard are local to
        that tab and do not appear here.
      </p>

      <LeadsList
        leads={leads}
        emptyMessage="The server has no leads yet."
        detailLeadIds={leads.map((lead) => lead.id)}
      />
    </section>
  );
}
