"use client";
// "use client" is needed here (and only here) because this component uses
// useState and handles clicks. Everything it imports runs in the browser too.

import { useState } from "react";
import { PlannerSummary } from "./PlannerSummary";
import { SessionList } from "./SessionList";
import { sampleSessions } from "./sample-sessions";
import { getCompletedCount, type Session } from "./session";

// STATE OWNER for the Study Session Planner.
// It holds the sessions list in state and is the only place that changes it.
// Children receive the data as props and report clicks back via callbacks.
export function StudyPlanner() {
  // Typed state: a read-only list of Session objects.
  // sampleSessions is only the starting value.
  const [sessions, setSessions] = useState<readonly Session[]>(sampleSessions);

  // Derived from state on every render. NOT a second useState.
  const completedCount = getCompletedCount(sessions);

  // Also derived: a friendly message that matches the current count.
  let progressMessage = `${completedCount} of ${sessions.length} sessions completed.`;
  if (completedCount === 0) {
    progressMessage = "No sessions completed yet. Press Complete when you finish one.";
  } else if (completedCount === sessions.length) {
    progressMessage = "All sessions completed. Nice work!";
  }

  // Event handler, passed down to each SessionCard as onToggleComplete.
  function handleToggleComplete(sessionId: string) {
    // Functional setter: React gives us the latest list as `currentSessions`.
    setSessions((currentSessions) =>
      // map() builds a NEW array. Only the matching session is replaced
      // with a NEW object; every other session is returned untouched.
      currentSessions.map((session) =>
        session.id === sessionId
          ? { ...session, isCompleted: !session.isCompleted }
          : session,
      ),
    );
  }

  return (
    <>
      <section aria-labelledby="summary-heading" className="mt-8">
        <h2 id="summary-heading" className="sr-only">
          Summary
        </h2>
        <PlannerSummary sessions={sessions} completedCount={completedCount} />
      </section>

      <section aria-labelledby="sessions-heading" className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="sessions-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Planned sessions
          </h2>

          {/* Planned action. Disabled on purpose: forms arrive in a later lesson. */}
          <div className="flex items-center gap-2">
            <span
              id="add-session-note"
              className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900"
            >
              Coming soon
            </span>
            <button
              type="button"
              disabled
              aria-describedby="add-session-note"
              className="cursor-not-allowed rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white opacity-50"
            >
              + Add session
            </button>
          </div>
        </div>

        {/* Progress message. aria-live: screen readers announce it after each click. */}
        {sessions.length > 0 && (
          <p aria-live="polite" className="mt-2 text-sm text-slate-600">
            {progressMessage}
          </p>
        )}

        <div className="mt-4">
          <SessionList
            sessions={sessions}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </section>

      <section aria-labelledby="empty-heading" className="mt-12">
        <h2 id="empty-heading" className="text-lg font-semibold text-slate-900">
          Empty state preview
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          The same SessionList component, given an empty list.
        </p>
        <div className="mt-4">
          <SessionList sessions={[]} onToggleComplete={handleToggleComplete} />
        </div>
      </section>
    </>
  );
}
