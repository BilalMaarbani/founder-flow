import Link from "next/link";

// Shown when a /leads route calls notFound(), e.g. /leads/999.
// It renders INSIDE leads/layout.tsx, so the sidebar and Leads header stay.
// "Not found" is a normal answer (404), not a crash (500).
export default function LeadNotFound() {
  return (
    <section
      aria-labelledby="lead-not-found-heading"
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h1
        id="lead-not-found-heading"
        className="text-xl font-semibold text-slate-900"
      >
        Lead not found
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        No lead with this ID exists in the server&apos;s data. Leads added on
        the Dashboard are local to that browser tab, so they have no details
        page.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/leads"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Back to all leads
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
}
