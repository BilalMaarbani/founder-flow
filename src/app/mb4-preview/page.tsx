import type { Metadata } from "next";
import { StudyPlanner } from "@/components/study-planner/StudyPlanner";

export const metadata: Metadata = {
  title: "Study Session Planner (Preview)",
  description:
    "Week 6 interactive preview. Mark sessions complete. Fictional sample data, nothing is saved.",
};

// Week 6 Day 1: this page stays a SERVER component (no "use client").
// It renders the static header and footer. The interactive part
// (state + click handling) lives in the StudyPlanner client component.
export default function StudyPlannerPreviewPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
          Week 6 preview &middot; interactive
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Study Session Planner
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Plan your study time and mark sessions complete as you finish them.
        </p>
      </header>

      <StudyPlanner />

      <footer className="mt-12 border-t border-slate-200 pt-4 text-xs text-slate-600">
        Educational preview &middot; fictional sample data &middot; changes
        reset on reload &middot; not connected to the FounderFlow dashboard
      </footer>
    </main>
  );
}
