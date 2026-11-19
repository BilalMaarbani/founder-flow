import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { isFollowUpDue } from "@/components/leads/lead";
import {
  getServerLeadById,
  getServerLeads,
} from "@/components/leads/server-leads";
import {
  assignedLabel,
  FOLLOW_UP_AFTER_DAYS,
  formatBudgetUsd,
} from "@/labs/day01/lead-rules";

// [id] = a DYNAMIC segment. /leads/3 -> params = { id: "3" }.
// Values from the URL are ALWAYS strings.
// In this Next.js version `params` is a Promise, so we `await` it.
type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// Tells Next.js which IDs exist at build time, so these pages are
// prerendered. Any other ID is checked when it is requested.
export function generateStaticParams() {
  return getServerLeads().map((lead) => ({ id: String(lead.id) }));
}

// /leads/[id] - the Lead DETAILS route. Server Component.
export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;

  // The ID in the URL is only a CLAIM. Anyone can type /leads/999.
  // We look it up, and if the server has no such lead we stop here.
  const lead = getServerLeadById(id);
  if (!lead) {
    notFound(); // renders src/app/leads/not-found.tsx with status 404
  }

  const followUpDue = isFollowUpDue(lead);

  return (
    <article aria-labelledby="lead-heading">
      <Link
        href="/leads"
        className="text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
      >
        &larr; Back to all leads
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1
          id="lead-heading"
          className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          {lead.companyName}
        </h1>
        <StatusBadge isClosed={lead.isClosed} followUpDue={followUpDue} />
      </div>

      <dl className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className="text-xs text-slate-600">Lead ID</dt>
          <dd className="font-medium text-slate-900">{lead.id}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">Status</dt>
          <dd className="font-medium text-slate-900">
            {lead.isClosed ? "Closed" : "Open"}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">Budget</dt>
          <dd className="font-medium text-slate-900">
            {formatBudgetUsd(lead.budgetUsd)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">Last contact</dt>
          <dd className="font-medium text-slate-900">
            {lead.daysSinceLastContact} days ago
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">Owner</dt>
          <dd className="font-medium text-slate-900">
            {assignedLabel(lead.assignedUserId)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">Follow-up</dt>
          <dd className="font-medium text-slate-900">
            {followUpDue
              ? `Due (${FOLLOW_UP_AFTER_DAYS}+ days without contact)`
              : "Not due"}
          </dd>
        </div>
      </dl>
    </article>
  );
}
