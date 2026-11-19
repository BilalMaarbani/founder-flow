import { AppShell } from "@/components/AppShell";
import { FounderFlowDashboard } from "@/components/leads/FounderFlowDashboard";
import { FOLLOW_UP_AFTER_DAYS } from "@/labs/day01/lead-rules";

// This page stays a SERVER component (no "use client").
// It renders the static parts: heading and rule note. The shared shell
// (navigation, <main>, footer) comes from AppShell.
// The interactive part (leads state, form, filter, remove) lives in the
// FounderFlowDashboard client component.
export default function DashboardPage() {
  return (
    <AppShell current="dashboard">
      <section id="overview" aria-labelledby="overview-heading">
        <h1
          id="overview-heading"
          className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Your sales pipeline at a glance.
        </p>

        <p className="mt-4 rounded-lg border border-brand-100 bg-brand-50 p-3 text-sm text-brand-900">
          <strong>Training rule (fictional):</strong> an open lead needs
          follow-up when {FOLLOW_UP_AFTER_DAYS} or more days have passed since
          the last contact.
        </p>
      </section>

      <FounderFlowDashboard />
    </AppShell>
  );
}
